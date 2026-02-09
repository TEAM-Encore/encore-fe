import { decodeJwt } from 'jose'
import { useCallback, useEffect, useState } from 'react'
import { deleteToken, getToken } from '@/lib/storage'
import { createSafeContext } from '@/utils/create-safe-context'

type User = {
  auth: string
  email: string
  exp: number
  iat: number
  id: number
  sub: string
}

type UserContext = {
  user: User | undefined
  isLoading: boolean
  logout: VoidFunction
  sync: VoidFunction
}

const [Provider, useAuth] = createSafeContext<UserContext>('UserContext')

export { useAuth }

export const useUser = () => {
  return useAuth().user
}

export const useUserLoading = () => {
  return useAuth().isLoading
}

export function UserProvider({ children }: PropsWithStrictChildren) {
  const [user, setUser] = useState<User>()
  const [isLoading, setIsLoading] = useState(true)

  const sync = useCallback(async () => {
    setIsLoading(true)
    try {
      const token = await getToken('accessToken')
      if (token) {
        const decoded = decodeJwt(token) as User
        setUser(decoded)
      } else {
        setUser(undefined)
      }
    } finally {
      setIsLoading(false)
    }
  }, [])

  const logout = useCallback(async () => {
    await deleteToken('accessToken')
    setUser(undefined)
  }, [])

  useEffect(() => {
    sync()
  }, [sync])

  return (
    <Provider
      value={{
        user,
        isLoading,
        logout,
        sync,
      }}
    >
      {children}
    </Provider>
  )
}
