export const productQueryKeys = {
  published: ['products', 'published'],
  seller: ['products', 'seller'],
}

export async function getPublishedProducts(axiosInstance, { signal } = {}) {
  const response = await axiosInstance.get('/products', { signal })
  return response.data.data.products
}

export async function getSellerProducts(axiosInstance, { signal } = {}) {
  const response = await axiosInstance.get('/products/seller', { signal })
  return response.data.data.products
}

export async function createProduct(axiosInstance, productForm) {
  const response = await axiosInstance.post('/products', productForm)
  return response.data.data.product
}


export async function setProductPublished(axiosInstance, { id, published }) {
  const action = published ? 'unlist' : 'list'
  const response = await axiosInstance.patch(`/products/${action}/${id}`)
  return response.data
}
