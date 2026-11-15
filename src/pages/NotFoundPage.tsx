import { Link } from 'react-router-dom'

export function NotFoundPage() {
  return (
    <section className="section page-top detail">
      <h1 className="detail-title">Page not found</h1>
      <p className="detail-body">That page doesn't exist.</p>
      <Link to="/" className="btn-primary">Back home</Link>
    </section>
  )
}
