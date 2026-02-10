import { Redirect, Stack } from 'expo-router'
import { useAuth } from '@/providers/user.provider'

export default function AuthLayout() {
  const { user, isLoading } = useAuth()

  if (isLoading) return null

  // exp가 고정된 값(1970년)으로 들어와서 우선 제거함
  if (!user) return <Redirect href="/login" />

  return <Stack screenOptions={{ headerShown: false }} />
}
