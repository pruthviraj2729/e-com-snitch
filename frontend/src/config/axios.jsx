import axios from 'axios'
import { useContext } from 'react'
import { MyStore } from '../context/MyStore'


export default function useApi() {
    const myContext = useContext(MyStore)

    const AxiosInstense = axios.create({
        baseURL: '/api',
        withCredentials: true
    })

    AxiosInstense.interceptors.request.use(config => {
        if(myContext.accessToken) {
            config.headers.Authorization = `Bearer ${myContext.accessToken}`
        }

        return config
    })

    AxiosInstense.interceptors.response.use(
        response=>response,
        async(error) => {
            if(error.response.status === 401 && !error.config._retry && error.config.url !== '/auth/refresh-token') {
                error.config._retry = true

                const res = await axios.post(
                    "/api/auth/refresh-token",
                    {},
                    { withCredentials: true }
                )

                myContext.accessToken(res.data.accessToken)

                error.config.headers.Authorization = `Bearer ${res.data.accessToken}`

                return AxiosInstense(error.config)
            }

            return Promise.reject(error)
        }
    )

    return AxiosInstense
}
