import { useMutation } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { authApi } from '../api/authApi.js'
import { useAuthSession } from '../state/useAuthSession.js'

export function useAuthForm(mode) {
  const { signIn } = useAuthSession()
  const navigate = useNavigate()
  const mutation = useMutation({
    mutationFn: authApi[mode],
    onSuccess: (result) => {
      signIn({ accessToken: result.accessToken, user: result.user })
      navigate(mode === 'login' && result.user.role === 'seller' ? '/seller' : '/', { replace: true })
    },
  })

  function handleSubmit(event) {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const requestBody = Object.fromEntries(formData.entries())
    mutation.mutate(requestBody)
  }

  return { message: mutation.error?.message || '', handleSubmit, isSubmitting: mutation.isPending }
}