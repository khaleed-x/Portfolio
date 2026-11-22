import { useEffect, useMemo, useRef, useState } from 'react'
import ReactMarkdown from 'react-markdown'
import { parseFrontmatter } from '@/shared/lib/frontmatter'
import { blobToBase64, compressImage } from '@/shared/lib/compressImage'
import { loadPost, publishPost } from './api'
import { DeployStatus } from './DeployStatus'
import { Icon } from './icons'
import { ShareKit } from './ShareKit'

const slugify = (s: string) =>
  s.toLowerCase().normalize('NFKD').replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '').slice(0, 60)

interface Pending {
  path: string
  url: string
  blob: Blob
  preview: string
}

export function PostEditor({ editSlug, onDone }: { editSlug: string | null; onDone: () => void }) {
  const [title, setTitle] = useState('')
  const [slug, setSlug] = useState('')
  const [slugTouched, setSlugTouched] = useState(false)
  const [summary, setSummary] = useState('')
  const [tags, setTags] = useState('')
  const [body, setBody] = useState('')
  const [draft, setDraft] = useState(false)
  const [date, setDate] = useState('')
  const [coverUrl, setCoverUrl] = useState('')
  const [pending, setPending] = useState<Pending[]>([])
  const [showPreview, setShowPreview] = useState(false)
  const [busy, setBusy] = useState('')
  const [error, setError] = useState('')
  const [published, setPublished] = useState<{ sha: string; slug: string } | null>(null)
  const [live, setLive] = useState(false)
  const bodyRef = useRef<HTMLTextAreaElement>(null)

  const isEdit = Boolean(editSlug)
  const slugLocked = isEdit || pending.length > 0
  const words = body.trim() ? body.trim().split(/\s+/).length : 0

  useEffect(() => {
    if (!editSlug) return
    let cancelled = false
    loadPost(editSlug)
      .then((md) => {
        if (cancelled) return
        const { data, body: text } = parseFrontmatter(md)
        setTitle(String(data.title ?? ''))
        setSlug(editSlug)
        setSummary(String(data.summary ?? ''))
        setTags(Array.isArray(data.tags) ? data.tags.join(', ') : '')
        setDraft(data.draft === true)
        setDate(String(data.date ?? ''))
        setCoverUrl(typeof data.image === 'string' ? data.image : '')
        setBody(text.trim())
      })
      .catch((e: Error) => !cancelled && setError(e.message))
    return () => {
      cancelled = true
    }
  }, [editSlug])

  const onTitle = (v: string) => {
    setTitle(v)
    if (!slugTouched && !isEdit) setSlug(slugify(v))
  }

  const addImage = async (file: File, kind: 'cover' | 'inline') => {
    setError('')
    if (!slug) return setError('Add a title first. The image folder uses the slug.')
    try {
      setBusy('Compressing image…')
      const blob = await compressImage(file, kind === 'cover' ? { width: 1200, height: 630, maxBytes: 250_000 } : { width: 1200, maxBytes: 300_000 })
      const name = kind === 'cover' ? `cover-${Date.now()}` : `img-${Date.now()}`
      const item: Pending = { path: `public/posts/${slug}/${name}.jpg`, url: `/posts/${slug}/${name}.jpg`, blob, preview: URL.createObjectURL(blob) }
      setPending((p) => [...p, item])
      if (kind === 'cover') {
        setCoverUrl(item.url)
      } else {
        const at = bodyRef.current?.selectionStart ?? body.length
        setBody(`${body.slice(0, at)}\n\n![Describe the image](${item.url})\n\n${body.slice(at)}`)
      }
    } catch (e) {
      setError((e as Error).message)
    } finally {
      setBusy('')
    }
  }

  const previewMap = useMemo(() => Object.fromEntries(pending.map((p) => [p.url, p.preview])), [pending])

  const publish = async () => {
    setError('')
    if (!title.trim() || !slug || body.trim().length < 20) return setError('Add a title and some text first.')
    try {
      setBusy('Publishing…')
      const used = pending.filter((p) => p.url === coverUrl || body.includes(p.url))
      const images = await Promise.all(used.map(async (p) => ({ path: p.path, base64: await blobToBase64(p.blob) })))
      const tagList = tags.split(',').map((t) => t.trim()).filter(Boolean)
      const markdown = [
        '---',
        `title: ${title.trim()}`,
        `date: ${date || new Date().toISOString().slice(0, 16)}`,
        `summary: ${summary.replace(/\s+/g, ' ').trim()}`,
        `tags: [${tagList.join(', ')}]`,
        coverUrl ? `image: ${coverUrl}` : null,
        `draft: ${draft}`,
        '---',
        '',
        body.trim(),
        '',
      ].filter((l) => l !== null).join('\n')
      const { sha } = await publishPost({ slug, markdown, update: isEdit, images })
      setPublished({ sha, slug })
    } catch (e) {
      setError((e as Error).message)
    } finally {
      setBusy('')
    }
  }

  if (published) {
    return (
      <div className="ad-stack narrow">
        <section className="ad-card ad-done">
          <span className="ad-status ok">✓</span>
          <h3>{draft ? 'Draft saved' : isEdit ? 'Changes saved' : 'Post published'}</h3>
          <DeployStatus sha={published.sha} onLive={() => setLive(true)} />
          {live && !draft && <a className="pbtn pbtn-primary" href={`/blog/${published.slug}`} target="_blank" rel="noreferrer">Open post ↗</a>}
        </section>
        {!draft && <ShareKit slug={published.slug} title={title} />}
        <button className="pbtn pbtn-ghost" onClick={onDone}>Back to posts</button>
      </div>
    )
  }

  return (
    <div className="ed">
      <div className="ed-bar">
        <button className="ad-icon-btn" onClick={onDone} aria-label="Back"><Icon name="back" size={18} /></button>
        <span className="ad-muted">{words} words</span>
        <button className="ad-chip-btn ed-toggle" onClick={() => setShowPreview((p) => !p)}>{showPreview ? 'Edit' : 'Preview'}</button>
        <label className="ed-draft"><input type="checkbox" checked={draft} onChange={(e) => setDraft(e.target.checked)} /> Draft</label>
        <button className="pbtn pbtn-primary" disabled={Boolean(busy)} onClick={publish}>
          {busy || (isEdit ? 'Save changes' : draft ? 'Save draft' : 'Publish')}
        </button>
      </div>
      {error && <div className="ad-alert">{error}</div>}

      <div className="ed-grid">
        <div className={`ed-form ${showPreview ? 'hide' : ''}`}>
          <section className="ad-card">
            <label className="admin-field">Title
              <input value={title} onChange={(e) => onTitle(e.target.value)} placeholder="Post title" />
            </label>
            <label className="admin-field">Link ending (slug)
              <input value={slug} disabled={slugLocked} onChange={(e) => { setSlugTouched(true); setSlug(slugify(e.target.value)) }} />
            </label>
            <label className="admin-field">Summary (shown in link previews)
              <textarea rows={2} value={summary} onChange={(e) => setSummary(e.target.value)} />
            </label>
            <label className="admin-field">Tags, separated by commas
              <input value={tags} onChange={(e) => setTags(e.target.value)} placeholder="dotnet, notes" />
            </label>
          </section>

          <section className="ad-card">
            <div className="admin-field">
              Cover image (cropped to 1200×630 and compressed)
              <input type="file" accept="image/*" onChange={(e) => e.target.files?.[0] && addImage(e.target.files[0], 'cover')} />
              {coverUrl && <img className="admin-thumb" src={previewMap[coverUrl] ?? coverUrl} alt="" />}
            </div>
          </section>

          <section className="ad-card">
            <div className="ad-card-head">
              <h3>Post text</h3>
              <label className="ad-chip-btn">+ Image
                <input hidden type="file" accept="image/*" onChange={(e) => e.target.files?.[0] && addImage(e.target.files[0], 'inline')} />
              </label>
            </div>
            <textarea ref={bodyRef} className="ed-text" rows={18} value={body} onChange={(e) => setBody(e.target.value)} placeholder="Write in Markdown…" />
          </section>
        </div>

        <aside className={`ed-preview ${showPreview ? 'show' : ''}`}>
          <div className="ad-card ed-paper">
            <span className="ad-label">Live preview</span>
            <h1>{title || 'Untitled'}</h1>
            {coverUrl && <img className="admin-thumb" src={previewMap[coverUrl] ?? coverUrl} alt="" />}
            <div className="detail-body prose">
              <ReactMarkdown urlTransform={(u) => previewMap[u] ?? u}>{body}</ReactMarkdown>
            </div>
          </div>
        </aside>
      </div>
    </div>
  )
}
