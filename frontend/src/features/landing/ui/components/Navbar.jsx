import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowUpRight, Menu, ShoppingBag, X } from 'lucide-react'
import { useCart } from '../../hooks/useCart.js'

const links = [
  { label: 'New arrivals', href: '#featured' },
  { label: 'Clothing', href: '#featured' },
  { label: 'Our approach', href: '#story' },
]

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const { count } = useCart()

  return (
    <>
      <div className="announcement-bar">
        Complimentary delivery on orders over $150 <span>Worldwide, always.</span>
      </div>
      <header className="site-header">
        <Link className="wordmark" to="/" aria-label="Seven home">SEVEN<span>.</span></Link>
        <nav className={`main-nav ${menuOpen ? 'is-open' : ''}`} aria-label="Main navigation">
          {links.map((link) => (
            <a key={link.label} href={link.href} onClick={() => setMenuOpen(false)}>{link.label}</a>
          ))}
          <div className="mobile-account-links">
            <Link to="/login" onClick={() => setMenuOpen(false)}>Log in</Link>
            <Link to="/signup" onClick={() => setMenuOpen(false)}>Sign up <ArrowUpRight size={14} /></Link>
          </div>
        </nav>
        <div className="header-actions">
          <Link className="login-link" to="/login">Log in</Link>
          <Link className="signup-link" to="/signup">Sign up <ArrowUpRight size={14} /></Link>
          <a className="bag-link" href="#featured" aria-label={`Shopping bag, ${count} items`}>
            <ShoppingBag size={17} strokeWidth={1.6} /><span>Bag ({count})</span>
          </a>
        </div>
        <button className="menu-toggle" type="button" aria-label={menuOpen ? 'Close menu' : 'Open menu'} onClick={() => setMenuOpen((open) => !open)}>
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </header>
    </>
  )
}