import { useState } from 'react'
import type { ProjectImage } from '@/content/projects'

export function ProjectGallery({ images }: { images?: ProjectImage[] }) {
  const [index, setIndex] = useState(0)

  if (!images || images.length === 0) {
    return <div className="gallery-empty">Screenshots coming soon</div>
  }
  const current = images[index]

  return (
    <div className="gallery">
      <img className="gallery-main" src={current.src} alt={current.alt} loading="lazy" />
      {images.length > 1 && (
        <div className="gallery-thumbs">
          {images.map((img, i) => (
            <button
              key={img.src}
              className={`gallery-thumb ${i === index ? 'active' : ''}`}
              onClick={() => setIndex(i)}
              aria-label={`Show image ${i + 1}`}
            >
              <img src={img.src} alt="" loading="lazy" />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
