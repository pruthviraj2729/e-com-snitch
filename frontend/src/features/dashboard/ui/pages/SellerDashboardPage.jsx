import { useContext, useState } from 'react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { ArrowLeft, ArrowUpRight, ImagePlus, LogOut, Plus, RefreshCw } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import {
  createProduct,
  getSellerProducts,
  productQueryKeys,
  setProductPublished,
} from '../../../landing/api/productApi.js'
import { MyStore } from '../../../../context/MyStore.jsx'
import useApi from '../../../../config/axios.jsx'

const apparelTypes = ['T-shirts', 'Jeans', 'Cargo pants', 'Polos', 'Shirts', 'Outerwear', 'Trousers', 'Knitwear']
const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL']

export default function SellerDashboardPage() {
  const { accessToken, user } = useContext(MyStore)
  const axiosInstance = useApi()
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const [notice, setNotice] = useState('')
  const [error, setError] = useState('')
  const productsQuery = useQuery({
    queryKey: productQueryKeys.seller,
    queryFn: ({ signal }) => getSellerProducts(axiosInstance, { signal }),
    enabled: Boolean(accessToken),
  })
  const products = productsQuery.data || []
  const createMutation = useMutation({
    mutationFn: (productForm) => createProduct(axiosInstance, productForm),
    onSuccess: async () => {
      setNotice('Product saved as a draft. Publish it when it is ready for the store.')
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: productQueryKeys.seller }),
        queryClient.invalidateQueries({ queryKey: productQueryKeys.published }),
      ])
    },
  })
  const publishMutation = useMutation({
    mutationFn: (variables) => setProductPublished(axiosInstance, variables),
    onSuccess: async (_, variables) => {
      setNotice(variables.published ? 'Product removed from the store.' : 'Product is now live in the store.')
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: productQueryKeys.seller }),
        queryClient.invalidateQueries({ queryKey: productQueryKeys.published }),
      ])
    },
  })

  async function handleCreateProduct(event) {
    event.preventDefault()
    const form = event.currentTarget
    setNotice('')
    setError('')
    createMutation.reset()

    const values = new FormData(event.currentTarget)
    const image = values.get('image')

    if (!image || image.size === 0) {
      setError('Choose a product image to continue.')
      return
    }
    if (image.size > 1024 * 1024) {
      setError('The image must be smaller than 1 MB.')
      return
    }

    const stockBySize = sizes.map((size) => ({
      size,
      stock: Number(values.get(`stock-${size}`) || 0),
    }))
    const body = new FormData()
    body.append('title', values.get('title'))
    body.append('description', values.get('description'))
    body.append('category', values.get('category'))
    body.append('type', values.get('type'))
    body.append('price', JSON.stringify({
      amount: Number(values.get('price')),
      currency: values.get('currency'),
    }))
    body.append('sizes', JSON.stringify(stockBySize))
    body.append('images', image)

    createMutation.mutate(body, { onSuccess: () => form.reset() })
  }

  function togglePublished(product) {
    setError('')
    setNotice('')
    publishMutation.reset()
    publishMutation.mutate({ id: product._id, published: product.published })
  }

  function handleSignOut() {
    signOut()
    navigate('/', { replace: true })
  }

  return (
    <main className="seller-page">
      <header className="seller-header">
        <Link className="wordmark" to="/">SEVEN<span>.</span></Link>
        <div className="seller-header-actions">
          <span>{user?.email}</span>
          <Link to="/"><ArrowLeft size={15} /> Store</Link>
          <button type="button" onClick={handleSignOut} aria-label="Sign out"><LogOut size={16} /></button>
        </div>
      </header>
      <div className="seller-workspace">
        <div className="seller-page-heading">
          <div>
            <p className="eyebrow">Seller studio / 01</p>
            <h1>Make room<br />for <em>something new.</em></h1>
            <p className="seller-intro">Add a piece to the collection, set its size stock, then publish it when it is ready.</p>
          </div>
          <div className="seller-product-total"><strong>{products.length.toString().padStart(2, '0')}</strong><span>YOUR PIECES</span></div>
        </div>

        <section className="seller-create-section" aria-labelledby="seller-create-title">
          <div className="seller-section-heading">
            <div><p className="eyebrow">Product studio / 01</p><h2 id="seller-create-title">Add a product</h2></div>
            <span>DRAFTS ARE PRIVATE UNTIL PUBLISHED</span>
          </div>
          <form className="seller-product-form" onSubmit={handleCreateProduct}>
            <label className="seller-image-picker">
              <ImagePlus size={22} />
              <strong>Product image</strong>
              <span>JPG, PNG or WEBP · up to 1 MB</span>
              <input name="image" type="file" accept="image/*" required />
            </label>
            <div className="seller-form-fields">
              <label>Product name<input name="title" type="text" placeholder="The Everyday Tee" minLength={2} maxLength={100} required /></label>
              <div className="seller-form-row">
                <label>Department<select name="category" defaultValue="Men"><option>Men</option><option>Women</option></select></label>
                <label>Clothing type<select name="type" defaultValue="T-shirts">{apparelTypes.map((type) => <option key={type}>{type}</option>)}</select></label>
              </div>
              <label>Description<textarea name="description" placeholder="Describe the fabric, fit and details." minLength={20} maxLength={500} rows={3} required /></label>
              <div className="seller-form-row seller-price-row">
                <label>Price<input name="price" type="number" min="1" step="0.01" placeholder="0.00" required /></label>
                <label>Currency<select name="currency" defaultValue="INR"><option value="INR">INR</option><option value="USD">USD</option></select></label>
              </div>
              <fieldset className="stock-fieldset">
                <legend>Available stock by size</legend>
                <div className="stock-grid">
                  {sizes.map((size) => <label key={size}>{size}<input name={`stock-${size}`} type="number" min="0" step="1" defaultValue="0" /></label>)}
                </div>
              </fieldset>
              {(error || createMutation.error?.message || publishMutation.error?.message) && (
                <p className="seller-feedback error" role="alert">{error || createMutation.error?.message || publishMutation.error?.message}</p>
              )}
              {notice && <p className="seller-feedback" role="status">{notice}</p>}
              <button className="button button-dark seller-submit" type="submit" disabled={createMutation.isPending}>
                {createMutation.isPending ? 'Saving product…' : 'Save product draft'} <Plus size={16} />
              </button>
            </div>
          </form>
        </section>

        <section className="seller-inventory" aria-labelledby="seller-inventory-title">
          <div className="seller-section-heading">
            <div><p className="eyebrow">Your catalogue / 02</p><h2 id="seller-inventory-title">Your products</h2></div>
            <button className="seller-refresh" type="button" onClick={() => void productsQuery.refetch()} disabled={productsQuery.isFetching}><RefreshCw size={15} /> Refresh</button>
          </div>
          {productsQuery.isLoading ? <p className="seller-empty">Loading your products…</p> : productsQuery.error ? (
            <p className="seller-feedback error" role="alert">{productsQuery.error.message}</p>
          ) : products.length === 0 ? (
            <p className="seller-empty">Your first piece is waiting to be added above.</p>
          ) : (
            <div className="seller-inventory-list">
              {products.map((product) => (
                <article className="seller-inventory-item" key={product._id}>
                  <img src={product.images?.[0]} alt="" />
                  <div className="seller-inventory-info">
                    <span>{product.category} / {product.type}</span>
                    <h3>{product.title}</h3>
                    <p>{product.price.currency} {product.price.amount} · {product.sizes.reduce((total, size) => total + size.stock, 0)} in stock</p>
                  </div>
                  <span className={product.published ? 'seller-status live' : 'seller-status'}>{product.published ? 'LIVE' : 'DRAFT'}</span>
                  <button className="seller-publish-button" type="button" onClick={() => togglePublished(product)} disabled={publishMutation.isPending}>
                    {product.published ? 'Unpublish' : 'Publish'} <ArrowUpRight size={14} />
                  </button>
                </article>
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  )
}
