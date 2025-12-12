import { getToken } from '@/lib/storage'
import { router, Stack, usePathname } from 'expo-router'
import { useEffect } from 'react'

export default function Layout() {
  const pathname = usePathname();

  useEffect(() => {
    const checkAccess = async () => {
      const preventNavigate = ['/login', '/login/profile-setup'];
      const isLoggedIn = await getToken('accessToken')
      if (!isLoggedIn && !preventNavigate.includes(pathname)) router.replace('/login')
    }

    checkAccess().catch(console.error)
  }, [pathname])

  return <Stack screenOptions={{ headerShown: false }} />
}
