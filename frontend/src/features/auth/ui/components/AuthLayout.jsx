import { Link } from 'react-router-dom'

export default function AuthLayout({ title, eyebrow, children }) {
  return (
    <main className="auth-page">
      <section className="auth-panel">
        <Link className="wordmark" to="/">SEVEN<span>.</span></Link>
        <div className="auth-content">
          <p className="eyebrow">{eyebrow}</p>
          <h1>{title}</h1>
          {children}
        </div>
        <Link className="auth-back-link" to="/">Back to the store</Link>
      </section>
      <aside className="auth-visual" aria-label="Seven collection">
        <img src="https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=1500&q=85" alt="Model wearing a modern monochrome look" />
        <p>Get dressed<br />for yourself.</p>
        <span>SEVEN / COLLECTION 07</span>
      </aside>
    </main>
  )
}