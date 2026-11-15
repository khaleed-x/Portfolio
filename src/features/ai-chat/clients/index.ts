import type { ChatClient } from '../types'
import { HttpChatClient } from './httpClient'
import { MockChatClient } from './mockClient'

/** Set VITE_AI_API_URL to switch from the mock to the real backend. No other code changes. */
export function createChatClient(): ChatClient {
  const url = import.meta.env.VITE_AI_API_URL
  return url ? new HttpChatClient(url) : new MockChatClient()
}
