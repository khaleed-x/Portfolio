import { Link } from 'react-router-dom'
import {
  Hero,
  About,
  Services,
  Skills,
  Experience,
  Education,
  Contact,
} from '@/features/profile'
import { ProjectsSection } from '@/features/projects'
import { PostCard, posts } from '@/features/blog'
import { Marquee } from '@/shared/ui/Marquee'
import { SectionHeader } from '@/shared/ui/SectionHeader'


export function HomePage() {
  const goTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  const latest = posts.slice(0, 2)

  return (
    <>
      <Hero onNavigate={goTo} />
      <Marquee />
      <About />
      <Services />
      <ProjectsSection />
      <Skills />
      <Experience />
      <Education />
      {latest.length > 0 && (
        <section className="section" id="writing">
          <SectionHeader eyebrow="// 06 — Blogs" title="Latest" emphasis="Blogs" />
          <div className="projects-grid">
            {latest.map((p) => <PostCard key={p.slug} post={p} />)}
          </div>
          <p className="section-more"><Link to="/blog" className="project-link">All posts →</Link></p>
        </section>
      )}
      <Contact />
    </>
  )
}
