import { useEffect, useRef, useState, type FormEvent } from 'react'
import { useChat } from '../useChat'

export function ChatWidget() {
  const [open, setOpen] = useState(false)
  const [draft, setDraft] = useState('')
  const { messages, streaming, error, send, stop, reset } = useChat()
  const endRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    endRef.current?.scrollIntoView({ block: 'end' })
  }, [messages, open])

  const submit = (e: FormEvent) => {
    e.preventDefault()
    void send(draft)
    setDraft('')
  }

  return (
    <>
      {!open && (
        <button className="chat-launcher" onClick={() => setOpen(true)} aria-label="Open AI assistant">
          ✦ Ask AI
        </button>
      )}
      {open && (
        <div className="chat-panel" role="dialog" aria-label="AI assistant">
          <div className="chat-head">
            <span>✦ Ask Khalid's AI</span>
            <div>
              <button onClick={reset} aria-label="Clear conversation">Clear</button>
              <button onClick={() => setOpen(false)} aria-label="Close">✕</button>
            </div>
          </div>
          <div className="chat-body">
            {messages.length === 0 && (
              <p className="chat-empty">Ask about my projects, stack, or experience.</p>
            )}
            {messages.map((m) => (
              <div key={m.id} className={`chat-msg ${m.role}`}>{m.content || '…'}</div>
            ))}
            {error && <div className="chat-error">{error}</div>}
            <div ref={endRef} />
          </div>
          <form className="chat-form" onSubmit={submit}>
            <input
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              placeholder="Type a message…"
              aria-label="Message"
            />
            {streaming ? (
              <button type="button" onClick={stop}>Stop</button>
            ) : (
              <button type="submit" disabled={!draft.trim()}>Send</button>
            )}
          </form>
        </div>
      )}
    </>
  )
}
