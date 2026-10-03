import { useRef, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { ArrowLeft, ArrowRight, ArrowUpRight, Check, Plus } from 'lucide-react'
import { collections, products } from '../../api/products.js'
import { getPublishedProducts, productQueryKeys } from '../../api/productApi.js'
import { useCart } from '../../hooks/useCart.js'
import useApi from '../../../../config/axios.jsx'

const categories = [
  { label: 'T-shirts', filter: 'T-shirts', productId: 'everyday-tee' },
  { label: 'Jeans', filter: 'Jeans', productId: 'straight-denim' },
  { label: 'Cargo pants', filter: 'Cargo pants', productId: 'utility-cargo' },
  { label: 'Polos', filter: 'Polos', productId: 'weekend-polo' },
  { label: 'Shirts', filter: 'Shirts', productId: 'form-shirt' },
  { label: 'Outerwear', filter: 'Outerwear', productId: 'field-jacket' },
  { label: 'Trousers', filter: 'Trousers', productId: 'day-trouser' },
  { label: 'Knitwear', filter: 'Knitwear', productId: 'everyday-knit' },
]

const shirtStyles = [
  { label: 'Everyday tees', filter: 'T-shirts', productId: 'everyday-tee' },
  { label: 'Graphic tees', filter: 'T-shirts', productId: 'studio-tee' },
  { label: 'Oxford shirts', filter: 'Shirts', productId: 'form-shirt' },
  { label: 'Polo shirts', filter: 'Polos', productId: 'weekend-polo' },
  { label: 'Light layers', filter: 'Outerwear', productId: 'field-jacket' },
  { label: 'Knitwear', filter: 'Knitwear', productId: 'everyday-knit' },
]

function matchesFilter(product, filter) {
  if (filter === 'All pieces') return true
  return product.category === filter || product.type === filter
}

export default function ProductGrid() {
  const [activeCollection, setActiveCollection] = useState('All pieces')
  const [addedProduct, setAddedProduct] = useState('')
  const categoriesRef = useRef(null)
  const productsRef = useRef(null)
  const { addItem } = useCart()
  const axiosInstance = useApi()
  const publishedProductsQuery = useQuery({
    queryKey: productQueryKeys.published,
    queryFn: ({ signal }) => getPublishedProducts(axiosInstance, { signal }),
  })
  const sellerProducts = (publishedProductsQuery.data || []).map((product) => ({
    id: product._id,
    name: product.title,
    category: product.category,
    type: product.type,
    price: product.price.amount,
    color: product.sizes?.filter((size) => size.stock > 0).map((size) => size.size).join(', ') || 'Available now',
    image: product.images?.[0],
    alt: product.title,
    tag: 'JUST IN',
  })).filter((product) => product.image)

  const catalogProducts = [...products, ...sellerProducts]
  const visibleProducts = catalogProducts.filter((product) => matchesFilter(product, activeCollection))

  function scrollCategories(direction) {
    categoriesRef.current?.scrollBy({ left: direction * 300, behavior: 'smooth' })
  }

  function selectStyle(filter) {
    setActiveCollection(filter)
    productsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  function handleAdd(product) {
    addItem(product)
    setAddedProduct(product.id)
    window.setTimeout(() => setAddedProduct(''), 1400)
  }

  return (
    <section className="featured section-wrap" aria-labelledby="category-title">
      <div className="category-heading">
        <div>
          <p className="eyebrow">Find your next favourite</p>
          <h2 id="category-title">Shop by category<span>.</span></h2>
        </div>
        <div className="category-controls" aria-label="Scroll categories">
          <button type="button" aria-label="Scroll categories left" onClick={() => scrollCategories(-1)}>
            <ArrowLeft size={17} />
          </button>
          <button type="button" aria-label="Scroll categories right" onClick={() => scrollCategories(1)}>
            <ArrowRight size={17} />
          </button>
        </div>
      </div>
      <div className="category-rail" ref={categoriesRef} aria-label="Shop by category">
        {categories.map((category, index) => {
          const itemCount = catalogProducts.filter((product) => matchesFilter(product, category.filter)).length
          const categoryProduct = products.find((product) => product.id === category.productId)
          return (
            <button
              className={`category-card${activeCollection === category.filter ? ' active' : ''}`}
              key={category.filter}
              type="button"
              aria-pressed={activeCollection === category.filter}
              onClick={() => selectStyle(category.filter)}
            >
              <img src={categoryProduct.image} alt={categoryProduct.alt} loading="lazy" />
              <span className="category-card-shade" />
              <span className="category-card-index">0{index + 1}</span>
              <span className="category-card-copy">
                <strong>{category.label}</strong>
                <span>{String(itemCount).padStart(2, '0')} {itemCount === 1 ? 'piece' : 'pieces'}</span>
              </span>
            </button>
          )
        })}
      </div>

      <section className="category-campaign" aria-labelledby="campaign-title">
        <div className="category-campaign-image">
          <img
            src="https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=1400&q=90"
            alt="Model wearing a modern streetwear look in the city"
            loading="lazy"
          />
          <span>SEVEN / SPRING—SUMMER 2026</span>
        </div>
        <div className="category-campaign-copy">
          <p className="eyebrow">The new season is here</p>
          <h2 id="campaign-title">Wear it<br /><em>your way.</em></h2>
          <p>Everyday pieces, made for the plans you have and the ones you don't.</p>
          <a className="button button-dark" href="#shirt-styles">Explore the edit <ArrowRight size={16} /></a>
          <span className="campaign-index">COLLECTION 08 <i /> BUILT TO BE WORN</span>
        </div>
        <span className="category-campaign-mark" aria-hidden="true">S / 08</span>
      </section>

      <section className="shirt-styles" id="shirt-styles" aria-labelledby="shirt-styles-title">
        <div className="shirt-styles-heading">
          <div>
            <p className="eyebrow">Good things start at the top</p>
            <h2 id="shirt-styles-title">Tees, shirts & layers<span>.</span></h2>
          </div>
          <a className="text-link desktop-link" href="#featured">Shop all clothing <ArrowUpRight size={15} /></a>
        </div>
        <div className="shirt-style-grid">
          {shirtStyles.map((style, index) => {
            const styleProduct = products.find((product) => product.id === style.productId)
            return (
              <button className="shirt-style-card" key={style.label} type="button" onClick={() => selectStyle(style.filter)}>
                <span className="shirt-style-image">
                  <img src={styleProduct.image} alt={styleProduct.alt} loading="lazy" />
                  <span>0{index + 1}</span>
                </span>
                <span className="shirt-style-label">{style.label}<ArrowUpRight size={14} /></span>
              </button>
            )
          })}
        </div>
      </section>

      <div className="section-heading">
        <div>
          <p className="eyebrow">A considered wardrobe</p>
          <h2 id="featured-title">The clothing edit<span>.</span></h2>
        </div>
        <a className="text-link desktop-link" href="#story">A note on how we make <ArrowUpRight size={15} /></a>
      </div>
      <div className="collection-tabs" id="featured" ref={productsRef} role="group" aria-label="Filter clothing by collection">
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
      {visibleProducts.length > 0 ? (
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
      ) : (
        <div className="empty-products">
          <p>Nothing in this category just yet.</p>
          <button type="button" onClick={() => setActiveCollection('All pieces')}>Browse all pieces <ArrowUpRight size={15} /></button>
        </div>
      )}
      <a className="all-pieces-link" href="#style-playbook">A good wardrobe starts here <ArrowUpRight size={16} /></a>
    </section>
  )
}