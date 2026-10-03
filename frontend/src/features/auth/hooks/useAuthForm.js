import { useContext } from 'react'
import { useMutation } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { authApi } from '../api/authApi.js'
import { MyStore } from '../../../context/MyStore.jsx'


export function useAuthForm(mode) {
  const { setAccessToken, setUser } = useContext(MyStore)
  const navigate = useNavigate()
  const mutation = useMutation({
    mutationFn: authApi[mode],
    onSuccess: (result) => {
      setAccessToken(result.accessToken)
      setUser(result.user)
      navigate(mode === 'login' && result.user.role === 'seller' ? '/seller' : '/', { replace: true })
    },
  })

  function handleSubmit(event) {
    event.preventDefault()
    console.log(mutation.error)
    const formData = new FormData(event.currentTarget)
    const requestBody = Object.fromEntries(formData.entries())
    mutation.mutate(requestBody)
  }

  return { message: mutation.error?.message || '', handleSubmit, isSubmitting: mutation.isPending }
}