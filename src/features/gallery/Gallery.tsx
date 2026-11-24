import { useEffect, useRef, useState, type TouchEvent as ReactTouchEvent } from 'react'
import { gallery, type GalleryGroup } from '@/content/gallery'

type Filter = GalleryGroup | 'all'
const labels: Record<Filter, string> = { all: 'All', work: 'Work', life: 'Life' }

interface LightboxProps {
  items: typeof gallery
  index: number
  onIndex: (i: number) => void
  onClose: () => void
}

function Lightbox({ items, index, onIndex, onClose }: LightboxProps) {
  const startX = useRef<number | null>(null)
  const n = items.length
  const item = items[index]

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowRight') onIndex((index + 1) % n)
      if (e.key === 'ArrowLeft') onIndex((index - 1 + n) % n)
    }
    window.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [index, n, onIndex, onClose])

  const onTouchEnd = (e: ReactTouchEvent<HTMLDivElement>) => {
    if (startX.current === null) return
    const dx = e.changedTouches[0].clientX - startX.current
    startX.current = null
    if (Math.abs(dx) > 50) onIndex((index + (dx < 0 ? 1 : -1) + n) % n)
  }

  return (
    <div
      className="lb"
      role="dialog"
      aria-modal="true"
      aria-label={item.caption}
      onClick={onClose}
      onTouchStart={(e) => { startX.current = e.touches[0].clientX }}
      onTouchEnd={onTouchEnd}
    >
      <button className="lb-close" onClick={onClose} aria-label="Close">✕</button>
      {n > 1 && <button className="lb-nav prev" onClick={(e) => { e.stopPropagation(); onIndex((index - 1 + n) % n) }} aria-label="Previous">‹</button>}
      <figure onClick={(e) => e.stopPropagation()}>
        <img src={item.src} alt={item.alt} />
        <figcaption>{item.caption} <span>{index + 1} / {n}</span></figcaption>
      </figure>
      {n > 1 && <button className="lb-nav next" onClick={(e) => { e.stopPropagation(); onIndex((index + 1) % n) }} aria-label="Next">›</button>}
    </div>
  )
}

export function Gallery() {
  const [filter, setFilter] = useState<Filter>('all')
  const [open, setOpen] = useState<number | null>(null)

  if (gallery.length === 0) return null
  const groups = [...new Set(gallery.map((g) => g.group))]
  const items = filter === 'all' ? gallery : gallery.filter((g) => g.group === filter)

  return (
    <>
      {groups.length > 1 && (
        <div className="gal-filter">
          {(['all', ...groups] as Filter[]).map((f) => (
            <button key={f} className={filter === f ? 'on' : ''} onClick={() => setFilter(f)}>{labels[f]}</button>
          ))}
        </div>
      )}
      <div className="gal">
        {items.map((g, i) => (
          <button key={g.src} className="gal-item" onClick={() => setOpen(i)} aria-label={`Open: ${g.caption}`}>
            <img src={g.src} alt={g.alt} loading="lazy" />
            <span>{g.caption}</span>
          </button>
        ))}
      </div>
      {open !== null && <Lightbox items={items} index={open} onIndex={setOpen} onClose={() => setOpen(null)} />}
    </>
  )
}
