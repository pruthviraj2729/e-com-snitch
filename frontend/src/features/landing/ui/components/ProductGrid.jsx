import { useState } from 'react'
import { ArrowUpRight, Check, Plus } from 'lucide-react'
import { collections, products } from '../../api/products.js'
import { useCart } from '../../hooks/useCart.js'

export default function ProductGrid() {
  const [activeCollection, setActiveCollection] = useState('All pieces')
  const [addedProduct, setAddedProduct] = useState('')
  const { addItem } = useCart()
  const visibleProducts = activeCollection === 'All pieces'
    ? products
    : products.filter((product) => product.category === activeCollection)

  function handleAdd(product) {
    addItem(product)
    setAddedProduct(product.id)
    window.setTimeout(() => setAddedProduct(''), 1400)
  }

  return (
    <section className="featured section-wrap" id="featured" aria-labelledby="featured-title">
      <div className="section-heading">
        <div>
          <p className="eyebrow">Made to be worn, and worn again</p>
          <h2 id="featured-title">The considered edit<span>.</span></h2>
        </div>
        <a className="text-link desktop-link" href="#story">A note on how we make <ArrowUpRight size={15} /></a>
      </div>
      <div className="collection-tabs" role="group" aria-label="Filter products by collection">
        {collections.map((collection) => (
          <button
            className={activeCollection === collection ? 'collection-tab active' : 'collection-tab'}
            key={collection}
            type="button"
            aria-pressed={activeCollection === collection}
            onClick={() => setActiveCollection(collection)}
          >
            {collection}
          </button>
        ))}
      </div>
      <div className="product-grid">
        {visibleProducts.map((product, index) => (
          <article className="product-card" key={product.id} style={{ '--card-order': index }}>
            <div className="product-image-wrap">
              <img className="product-image" src={product.image} alt={product.alt} loading="lazy" />
              <span className="product-tag">{product.tag}</span>
              <button className="add-button" type="button" aria-label={`Add ${product.name} to bag`} onClick={() => handleAdd(product)}>
                {addedProduct === product.id ? <Check size={18} /> : <Plus size={18} />}
                <span>{addedProduct === product.id ? 'Added' : 'Add to bag'}</span>
              </button>
            </div>
            <div className="product-meta">
              <div><h3>{product.name}</h3><p>{product.color}</p></div>
              <span>${product.price}</span>
            </div>
          </article>
        ))}
      </div>
      <a className="all-pieces-link" href="#newsletter">A good wardrobe starts here <ArrowUpRight size={16} /></a>
    </section>
  )
}