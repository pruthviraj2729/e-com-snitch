import axios from 'axios'

const axiosInstance = axios.create({
  baseURL: '/api',
  withCredentials: true,
})

axiosInstance.interceptors.request.use((config) => {
  try {
    const session = JSON.parse(sessionStorage.getItem('snitch.authSession'))
    if (session?.accessToken) config.headers.Authorization = `Bearer ${session.accessToken}`
  } catch {
    sessionStorage.removeItem('snitch.authSession')
  }
  return config
})

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    const message = error.response?.data?.errors?.[0]?.msg
      || error.response?.data?.message
      || error.message
      || 'Unable to reach the service.'
    return Promise.reject(new Error(message))
  },
)

export default axiosInstance