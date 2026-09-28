import { useState } from 'react'

export function useAuthForm() {
  const [message, setMessage] = useState('')

  function handleSubmit(event) {
    event.preventDefault()
    setMessage('Account services are not connected yet.')
  }

  return { message, handleSubmit }
}