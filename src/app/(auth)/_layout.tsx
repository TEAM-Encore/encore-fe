import { Redirect, Stack } from 'expo-router'
import { useUser } from '@/providers/user.provider'

export default function AuthLayout() {
  const user = useUser()

  if (!user) {
    return <Redirect href="/login" />
  }

  return <Stack screenOptions={{ headerShown: false }} />
}
