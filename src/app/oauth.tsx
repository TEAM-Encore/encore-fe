import { router, useLocalSearchParams } from 'expo-router'
import * as WebBrowser from 'expo-web-browser'
import { useEffect } from 'react'
import { View } from 'react-native'
import { saveToken } from '@/lib/storage'
import { useAuth } from '@/providers/user.provider'

WebBrowser.maybeCompleteAuthSession()

/**
 * OAuth 콜백 라우트 (encore://oauth?token=...&isInitialized=...).
 */
export default function OAuthCallback() {
  const { token, isInitialized } = useLocalSearchParams<{
    token?: string
    isInitialized?: string
  }>()
  const { sync } = useAuth()

  useEffect(() => {
    let cancelled = false

    const handle = async () => {
      if (!token || cancelled) {
        if (!cancelled) router.replace('/login')
        return
      }
      await saveToken('accessToken', token)
      await sync()
      if (cancelled) return
      if (isInitialized === 'true') {
        router.replace('/')
      } else {
        router.replace('/login/profile-setup')
      }
    }

    handle()
    return () => {
      cancelled = true
    }
  }, [token, isInitialized, sync])

  return <View style={{ flex: 1 }} />
}
