import { useCallback, useMemo, useRef, useState } from 'react'
import { createChatClient } from './clients'
import type { ChatMessage } from './types'

const uid = () => crypto.randomUUID()

export function useChat() {
  const client = useMemo(createChatClient, [])
  const sessionId = useMemo(uid, [])
  const abortRef = useRef<AbortController | null>(null)
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [streaming, setStreaming] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const send = useCallback(
    async (text: string) => {
      const content = text.trim()
      if (!content || streaming) return

      const userMsg: ChatMessage = { id: uid(), role: 'user', content, createdAt: Date.now() }
      const replyId = uid()
      const history = [...messages, userMsg]
      setMessages([...history, { id: replyId, role: 'assistant', content: '', createdAt: Date.now() }])
      setError(null)
      setStreaming(true)

      const controller = new AbortController()
      abortRef.current = controller
      try {
        const request = {
          sessionId,
          messages: history.map(({ role, content }) => ({ role, content })),
        }
        for await (const chunk of client.stream(request, controller.signal)) {
          setMessages((prev) => prev.map((m) => (m.id === replyId ? { ...m, content: m.content + chunk } : m)))
        }
      } catch (e) {
        if ((e as Error).name !== 'AbortError') {
          setError('The assistant is unavailable right now. Please try again.')
          setMessages((prev) => prev.filter((m) => m.id !== replyId || m.content))
        }
      } finally {
        setStreaming(false)
        abortRef.current = null
      }
    },
    [client, messages, sessionId, streaming],
  )

  const stop = useCallback(() => abortRef.current?.abort(), [])
  const reset = useCallback(() => {
    abortRef.current?.abort()
    setMessages([])
    setError(null)
  }, [])

  return { messages, streaming, error, send, stop, reset }
}
