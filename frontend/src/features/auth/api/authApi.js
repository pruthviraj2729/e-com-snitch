import axiosInstance from '../../../config/axios.js'
import { authEndpoints } from './authEndpoints.js'

async function postAuth(endpoint, credentials) {
  const response = await axiosInstance.post(endpoint, credentials)
  return response.data.data
}

export const authApi = {
  login: (credentials) => postAuth(authEndpoints.login, credentials),
  signup: (details) => postAuth(authEndpoints.signup, details),
  logout: (accessToken) => axiosInstance.post(authEndpoints.logout, null, {
    headers: { Authorization: `Bearer ${accessToken}` },
  }),
}