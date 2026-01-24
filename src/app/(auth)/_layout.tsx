import { useUser } from '@/providers/user.provider'
import { Redirect, Stack } from 'expo-router'

export default function AuthLayout() {
  const user = useUser()

  // exp가 고정된 값(1970년)으로 들어와서 우선 제거함
  if (!user) return <Redirect href="/login" />

  return <Stack screenOptions={{ headerShown: false }} />
}
