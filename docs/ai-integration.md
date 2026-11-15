# Connecting the AI backend

The UI is finished and talks to a `ChatClient` (`src/features/ai-chat/types.ts`).
Until your backend exists it uses `MockChatClient`. To go live:

1. Copy `.env.example` to `.env` and set `VITE_AI_API_URL=https://your-api.example.com`
2. Restart the dev server. No code changes.

## Endpoint your backend must expose

`POST {VITE_AI_API_URL}/chat`

Request body:

```json
{
  "sessionId": "uuid",
  "messages": [
    { "role": "user", "content": "What do you build?" }
  ]
}
```

`messages` is the full conversation so far, so the backend stays stateless if you want.

Response (any one of these):

| Content-Type | Body |
| --- | --- |
| `text/event-stream` (recommended) | `data: <chunk>` lines; `data: [DONE]` ends the stream |
| `application/json` | `{ "reply": "full text" }` |
| `text/plain` | raw chunks streamed |

Remember to enable CORS for your site's origin on the backend.

## ASP.NET Core sketch

```csharp
app.MapPost("/chat", async (ChatRequest req, HttpResponse res, CancellationToken ct) =>
{
    res.ContentType = "text/event-stream";
    await foreach (var chunk in ai.StreamAsync(req.Messages, ct))
    {
        await res.WriteAsync($"data: {chunk}\n\n", ct);
        await res.Body.FlushAsync(ct);
    }
    await res.WriteAsync("data: [DONE]\n\n", ct);
});
```

Note: SSE chunks containing newlines need escaping (e.g. send JSON-encoded chunks) if you stream multi-line text.
