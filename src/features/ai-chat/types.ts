/**
 * The contract between the UI and the AI backend.
 * Implement `ChatClient` for any transport; the UI never knows which one is active.
 */
export type ChatRole = 'user' | 'assistant'

export interface ChatMessage {
  id: string
  role: ChatRole
  content: string
  createdAt: number
}

/** Wire format sent to the backend. */
export interface ChatRequest {
  sessionId: string
  messages: { role: ChatRole; content: string }[]
}

export interface ChatClient {
  /** Yields the assistant reply as incremental text chunks. Must stop when `signal` aborts. */
  stream(request: ChatRequest, signal: AbortSignal): AsyncIterable<string>
}
