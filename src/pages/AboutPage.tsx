import { Link } from 'react-router-dom'
import { aboutIntro, story } from '@/content/about'
import { gallery } from '@/content/gallery'
import { profile } from '@/content/profile'
import { Gallery } from '@/features/gallery/Gallery'
import { usePageTitle } from '@/shared/hooks/usePageTitle'
import { SectionHeader } from '@/shared/ui/SectionHeader'

export function AboutPage() {
  usePageTitle('About · Khalid Oyekunle')
  const chapters = story.filter((c) => !c.draft)

  return (
    <>
      <section className="section page-top">
        <SectionHeader eyebrow="// About" title="The story" emphasis="so far" />
        <div className="about-intro">
          <img className="about-photo" src={profile.photo} alt={profile.name} />
          <div className="about-body">
            {aboutIntro.paragraphs.map((p) => <p key={p}>{p}</p>)}
          </div>
        </div>
      </section>

      <section className="section section-alt">
        <SectionHeader eyebrow="// Timeline" title="How I got" emphasis="here" />
        <div className="timeline">
          {chapters.map((c) => (
            <div className="timeline-item" key={`${c.period}-${c.title}`}>
              <div className="timeline-dot" />
              <div className="timeline-period">{c.period}</div>
              <div className="timeline-role">{c.title}</div>
              <div className="story-text">{c.text.map((t) => <p key={t}>{t}</p>)}</div>
            </div>
          ))}
        </div>
      </section>

      {gallery.length > 0 && (
        <section className="section">
          <SectionHeader eyebrow="// Gallery" title="Moments &" emphasis="work" />
          <Gallery />
        </section>
      )}

      <section className="section about-cta">
        <p>Want to work together, or just say hello?</p>
        <Link to={{ pathname: '/', hash: 'contact' }} className="pbtn pbtn-primary">Get in touch</Link>
      </section>
    </>
  )
}
