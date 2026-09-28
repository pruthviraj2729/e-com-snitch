import { useState } from 'react'
import { ArrowRight, ArrowUpRight } from 'lucide-react'
import { products } from '../../api/products.js'

const looks = [
  {
    id: 'off-duty',
    number: '01',
    name: 'Off-duty, on point',
    description: 'Relaxed fits for the days that do not need a dress code.',
    productIds: ['everyday-tee', 'straight-denim', 'field-jacket'],
  },
  {
    id: 'clean-lines',
    number: '02',
    name: 'Clean lines only',
    description: 'Sharp layers. Easy proportions. Nothing extra.',
    productIds: ['form-shirt', 'day-trouser', 'everyday-knit'],
  },
  {
    id: 'after-hours',
    number: '03',
    name: 'After hours',
    description: 'A little more character for plans after the usual.',
    productIds: ['studio-tee', 'utility-cargo', 'weekend-polo'],
  },
]

export default function StylePlaybook() {
  const [activeLookId, setActiveLookId] = useState(looks[0].id)
  const activeLook = looks.find((look) => look.id === activeLookId)
  const lookProducts = activeLook.productIds.map((productId) => products.find((product) => product.id === productId))

  return (
    <section className="style-playbook" id="style-playbook" aria-labelledby="style-playbook-title">
      <div className="playbook-intro">
        <p className="eyebrow"><span /> THE SNITCH FIT CHECK / 001</p>
        <h2 id="style-playbook-title">Build your<br /><em>rotation.</em></h2>
        <p className="playbook-copy">Three pieces. A hundred ways to wear them. Pick a mood and make it yours.</p>
        <div className="look-selector" role="group" aria-label="Choose an outfit mood">
          {looks.map((look) => (
            <button
              className={activeLookId === look.id ? 'look-option active' : 'look-option'}
              key={look.id}
              type="button"
              aria-pressed={activeLookId === look.id}
              onClick={() => setActiveLookId(look.id)}
            >
              <span>{look.number}</span>
              <strong>{look.name}</strong>
              <ArrowUpRight size={15} />
            </button>
          ))}
        </div>
      </div>
      <div className="playbook-edit">
        <div className="playbook-edit-heading" aria-live="polite">
          <div>
            <span>THE ROTATION / {activeLook.number}</span>
            <h3>{activeLook.name}</h3>
            <p>{activeLook.description}</p>
          </div>
          <span className="playbook-piece-count">03 PIECES</span>
        </div>
        <div className="playbook-products">
          {lookProducts.map((product, index) => (
            <a className="playbook-product" href="#featured" key={product.id}>
              <span className="playbook-product-image">
                <img src={product.image} alt={product.alt} loading="lazy" />
                <span>0{index + 1}</span>
              </span>
              <span className="playbook-product-meta">
                <strong>{product.name}</strong>
                <span>${product.price}</span>
              </span>
            </a>
          ))}
        </div>
        <a className="playbook-shop-link" href="#featured">Shop the full edit <ArrowRight size={16} /></a>
      </div>
    </section>
  )
}