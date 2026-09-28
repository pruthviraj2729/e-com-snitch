import axiosInstance from '../../../config/axios.js'

export const productQueryKeys = {
  published: ['products', 'published'],
  seller: ['products', 'seller'],
}

export async function getPublishedProducts({ signal } = {}) {
  const response = await axiosInstance.get('/products', { signal })
  return response.data.data.products
}

export async function getSellerProducts({ signal } = {}) {
  const response = await axiosInstance.get('/products/seller', { signal })
  return response.data.data.products
}

export async function createProduct(productForm) {
  const response = await axiosInstance.post('/products', productForm)
  return response.data.data.product
}

export async function setProductPublished({ id, published }) {
  const action = published ? 'unlist' : 'list'
  const response = await axiosInstance.patch(`/products/${action}/${id}`)
  return response.data
}