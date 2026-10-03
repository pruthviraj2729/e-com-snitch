import axios from 'axios'
import { authEndpoints } from './authEndpoints.js'

const authClient = axios.create({
  baseURL: '/api',
  withCredentials: true,
})

async function postAuth(endpoint, credentials) {
  const response = await authClient.post(endpoint, credentials)
  return response.data.data
}

export const authApi = {
  login: (credentials) => postAuth(authEndpoints.login, credentials),
  signup: (details) => postAuth(authEndpoints.signup, details),
  logout: (accessToken) => authClient.post(authEndpoints.logout, null, {
    headers: { Authorization: `Bearer ${accessToken}` },
  }),
}