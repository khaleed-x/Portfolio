import { profile } from '@/content/profile'

export function Footer() {
  return (
    <footer className="footer">
      © {new Date().getFullYear()} {profile.fullName} · {profile.handle} Technology
    </footer>
  )
}
