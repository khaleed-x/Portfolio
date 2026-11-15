import type { ChatClient, ChatRequest } from '../types'

const sleep = (ms: number, signal: AbortSignal) =>
  new Promise<void>((resolve, reject) => {
    const t = setTimeout(resolve, ms)
    signal.addEventListener('abort', () => {
      clearTimeout(t)
      reject(new DOMException('Aborted', 'AbortError'))
    })
  })

/** Stand-in used until the real backend exists. Streams a canned reply word by word. */
export class MockChatClient implements ChatClient {
  async *stream(request: ChatRequest, signal: AbortSignal): AsyncIterable<string> {
    const last = request.messages[request.messages.length - 1]?.content ?? ''
    const reply =
      `The AI assistant isn't connected yet, so this is a placeholder reply. You asked: "${last}". ` +
      `Once the backend is live, answers will come from it automatically.`
    await sleep(500, signal)
    for (const word of reply.split(' ')) {
      yield word + ' '
      await sleep(40, signal)
    }
  }
}
