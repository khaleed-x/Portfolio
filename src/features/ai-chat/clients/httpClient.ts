import type { ChatClient, ChatRequest } from '../types'

/**
 * Talks to your backend: POST {baseUrl}/chat with a ChatRequest body.
 * Accepted responses:
 *  - text/event-stream : `data: <chunk>` lines (a `data: [DONE]` line ends the stream)
 *  - application/json  : { "reply": "full text" }
 *  - anything else     : raw streamed text chunks
 */
export class HttpChatClient implements ChatClient {
  constructor(private readonly baseUrl: string) {}

  async *stream(request: ChatRequest, signal: AbortSignal): AsyncIterable<string> {
    const res = await fetch(`${this.baseUrl.replace(/\/$/, '')}/chat`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(request),
      signal,
    })
    if (!res.ok) throw new Error(`AI service responded with ${res.status}`)

    const type = res.headers.get('content-type') ?? ''
    if (type.includes('application/json')) {
      const json = (await res.json()) as { reply?: string }
      yield json.reply ?? ''
      return
    }
    if (!res.body) throw new Error('AI service returned an empty response')

    const reader = res.body.getReader()
    const decoder = new TextDecoder()
    const isSse = type.includes('text/event-stream')
    let buffer = ''

    while (true) {
      const { done, value } = await reader.read()
      if (done) break
      const text = decoder.decode(value, { stream: true })
      if (!isSse) {
        yield text
        continue
      }
      buffer += text
      const lines = buffer.split('\n')
      buffer = lines.pop() ?? ''
      for (const line of lines) {
        if (!line.startsWith('data:')) continue
        const payload = line.slice(5).replace(/^ /, '')
        if (payload === '[DONE]') return
        yield payload
      }
    }
  }
}
