import { useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { authApi } from '../api/authApi.js'
import { AuthSessionContext } from './authSessionContext.js'

const sessionStorageKey = 'snitch.authSession'

function readSession() {
  try {
    return JSON.parse(sessionStorage.getItem(sessionStorageKey))
  } catch {
    return null
  }
}

export function AuthSessionProvider({ children }) {
  const [session, setSession] = useState(readSession)
  const queryClient = useQueryClient()
  const logoutMutation = useMutation({ mutationFn: authApi.logout })

  function signIn(nextSession) {
    sessionStorage.setItem(sessionStorageKey, JSON.stringify(nextSession))
    setSession(nextSession)
  }

  function signOut() {
    const accessToken = session?.accessToken
    sessionStorage.removeItem(sessionStorageKey)
    setSession(null)
    queryClient.clear()
    if (!accessToken) return Promise.resolve()
    return logoutMutation.mutateAsync(accessToken).catch(() => {}).finally(() => queryClient.clear())
  }

  return (
    <AuthSessionContext.Provider value={{ ...session, signIn, signOut }}>
      {children}
    </AuthSessionContext.Provider>
  )
}