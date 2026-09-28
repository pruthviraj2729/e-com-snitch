import { ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-top">
        <Link className="wordmark footer-wordmark" to="/">SEVEN<span>.</span></Link>
        <p>Less, but with feeling.</p>
        <a className="back-to-top" href="#top">Back to top <ArrowUpRight size={14} /></a>
      </div>
      <div className="footer-bottom">
        <span>© 2026 Seven Studio</span>
        <div><a href="#story">Instagram <ArrowUpRight size={12} /></a><a href="#story">Shipping & returns</a><a href="#story">Privacy</a></div>
        <span>Made with intention.</span>
      </div>
    </footer>
  )
}