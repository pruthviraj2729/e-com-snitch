import { ArrowRight, ArrowUpRight } from 'lucide-react'
import { products } from '../../api/products.js'

export default function Hero() {
  const featuredProduct = products.find((product) => product.id === 'day-trouser')

  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="hero-content">
        <p className="hero-eyebrow"><span>SEVEN / 01</span><span>SPRING — SUMMER 2026</span></p>
        <h1 id="hero-title">The new<br /><em>everyday.</em></h1>
        <p className="hero-copy">Modern essentials, considered from the first cut to the last detail. Made to be worn on repeat.</p>
        <div className="hero-actions">
          <a className="button button-dark" href="#featured">Discover the collection <ArrowRight size={16} /></a>
          <a className="hero-secondary-link" href="#story">The Seven standard <ArrowUpRight size={15} /></a>
        </div>
        <div className="hero-details">
          <span>01</span>
          <p><strong>Fewer, better things.</strong><br />Designed for the long run.</p>
        </div>
      </div>
      <div className="hero-visual">
        <figure className="hero-image-frame">
          <img
            className="hero-image"
            src="https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=1600&q=90"
            alt="Model wearing a sculptural black outfit in the city"
          />
          <figcaption><span>THE SPRING EDIT</span><span>01 / 04</span></figcaption>
        </figure>
        <div className="hero-visual-note"><span>FORM, FUNCTION</span><span>& FEELING</span></div>
        <a className="hero-product-card" href="#featured" aria-label={`Discover ${featuredProduct.name}`}>
          <img src={featuredProduct.image} alt="" />
          <span className="hero-product-info">
            <span className="hero-product-label">IN FOCUS / 001</span>
            <strong>{featuredProduct.name}</strong>
            <span>{featuredProduct.color}</span>
          </span>
          <span className="hero-product-price">${featuredProduct.price}</span>
        </a>
      </div>
    </section>
  )
}