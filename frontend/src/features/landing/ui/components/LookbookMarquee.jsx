import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { products } from '../../api/products.js'

export default function LookbookMarquee() {
  const trackRef = useRef(null)
  const animationRef = useRef(null)
  const repeatedProducts = [...products, ...products]

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    animationRef.current = gsap.to(trackRef.current, {
      xPercent: -50,
      duration: 48,
      ease: 'none',
      repeat: -1,
    })

    return () => animationRef.current?.kill()
  }, [])

  return (
    <section className="lookbook-rail" aria-label="Seven collection in motion">
      <div className="lookbook-topline" aria-hidden="true">
        <span>SEVEN / IN MOTION</span>
        <span>COLLECTION 07 <i /> EVERYDAY, RECONSIDERED</span>
      </div>
      <div
        className="lookbook-track"
        ref={trackRef}
        onPointerEnter={() => animationRef.current?.pause()}
        onPointerLeave={() => animationRef.current?.resume()}
        onFocus={() => animationRef.current?.pause()}
        onBlur={(event) => {
          if (!event.currentTarget.contains(event.relatedTarget)) animationRef.current?.resume()
        }}
      >
        {repeatedProducts.map((product, index) => (
          <figure className="lookbook-frame" key={`${product.id}-${index}`} aria-hidden={index >= products.length}>
            <img
              src={product.image}
              alt={index < products.length ? product.alt : ''}
              loading="eager"
              draggable="false"
              referrerPolicy="no-referrer"
            />
            <figcaption>
              <span>{product.category} / 0{(index % products.length) + 1}</span>
              <strong>{product.name}</strong>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  )
}