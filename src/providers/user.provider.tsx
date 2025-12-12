import { decodeJwt } from 'jose'
import { useCallback, useEffect, useState } from 'react'
import { getToken } from '@/lib/storage'
import { createSafeContext } from '@/utils/create-safe-context'

type User = {
  auth: string
  email: string
  exp: number
  iat: number
  id: number
  sub: string
}

const [Provider, useUser] = createSafeContext<User | undefined>('UserContext')

export { useUser }

export function UserProvider({ children }: PropsWithStrictChildren) {
  const [user, setUser] = useState<User>()

  const sync = useCallback(async () => {
    const token = await getToken('accessToken')
    if (token) {
      const decoded = decodeJwt(token) as User

      setUser(decoded)
    }
  }, [setUser])

  useEffect(() => {
    sync()
  }, [sync])

  return <Provider value={user}>{children}</Provider>
}
