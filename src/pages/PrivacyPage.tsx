import { SectionHeader } from '@/shared/ui/SectionHeader'
import { usePageTitle } from '@/shared/hooks/usePageTitle'

export function PrivacyPage() {
  usePageTitle('Privacy · Khalid Oyekunle')
  return (
    <section className="section page-top detail">
      <SectionHeader eyebrow="// Privacy" title="How this site" emphasis="counts visitors" />
      <div className="detail-body prose">
        <p>I like to know which posts people read, so this site keeps simple, anonymous statistics. Here is exactly what is recorded.</p>
        <h2>What is recorded</h2>
        <ul>
          <li>The page visited and the time.</li>
          <li>Approximate location (country, region and city), worked out from your IP address by my host.</li>
          <li>Device type, operating system and browser.</li>
          <li>The website you came from, or the campaign tag on the link.</li>
          <li>A scrambled visitor code made from your IP address and browser. It changes every day and cannot be turned back into your IP address, so I can tell how many different visitors there were without knowing who they are.</li>
        </ul>
        <h2>What is not recorded</h2>
        <ul>
          <li>Your IP address is not stored in my visit log.</li>
          <li>No name, email or account details. Cookies are not used for these statistics.</li>
        </ul>
        <h2>How long it is kept</h2>
        <p>Visit records are deleted automatically after about 90 days.</p>
        <h2>Other tools</h2>
        <p>The site is hosted on Vercel, which handles requests (including IP addresses) to deliver pages, and offers its own cookie-free analytics and performance measurements. Blog comments use GitHub Discussions, so commenting requires a GitHub account.</p>
        <h2>Your choices</h2>
        <p>If your browser sends a Do Not Track signal, this site does not record your visit. Questions or deletion requests: use the email on the home page.</p>
      </div>
    </section>
  )
}
