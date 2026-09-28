import Navbar from '../components/Navbar.jsx'
import LookbookMarquee from '../components/LookbookMarquee.jsx'
import Hero from '../components/Hero.jsx'
import ProductGrid from '../components/ProductGrid.jsx'
import StylePlaybook from '../components/StylePlaybook.jsx'
import Footer from '../components/Footer.jsx'

export default function LandingPage() {
  return (
    <div className="storefront" id="top">
      <Navbar />
      <LookbookMarquee />
      <main>
        <Hero />
        <div className="promise-strip" aria-label="Our commitments">
          <span>Designed to last</span><i />
          <span>Made in considered batches</span><i />
          <span>Free shipping over $150</span>
        </div>
        <ProductGrid />
        <StylePlaybook />
      </main>
      <Footer />
    </div>
  )
}