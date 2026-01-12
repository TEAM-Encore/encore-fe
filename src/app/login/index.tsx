import type { UserSignupReqProvider } from 'api'
import { router } from 'expo-router'
import * as WebBrowser from 'expo-web-browser'
import { Image, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { userQueries } from '@/apis/user/queries'
import { Col } from '@/components/common/ui/Flex'
import { Text, type TextProps } from '@/components/common/ui/Text'
import { TERMS_AND_PRIVACY } from '@/constants/login'
import { queryClient } from '@/lib/query-client'
import { saveToken } from '@/lib/storage'
import LoginButton from './components/LoginButton'
import LogoText from './components/LogoText'

const termsProps: TextProps = {
  color: 'gray-01',
  variant: 'caption',
}

WebBrowser.maybeCompleteAuthSession()

export default function Index() {
  const insets = useSafeAreaInsets()

  const onOpenWebPage = async (url: string) => {
    await WebBrowser.openBrowserAsync(url)
  }

  const onLogin = async (provider: UserSignupReqProvider) => {
    try {
      const response = await queryClient.fetchQuery(
        userQueries.getLoginUrl(provider),
      )
      const url = response.url as string
      const redirectUri = 'encore://oauth'

      const result = await WebBrowser.openAuthSessionAsync(url, redirectUri)

      if (result.type === 'success') {
        const parsed = new URL(result.url)
        const token = parsed.searchParams.get('token')
        const isInitialized = parsed.searchParams.get('isInitialized')

        if (token) {
          await saveToken('accessToken', token)

          if (isInitialized === 'true') {
            router.replace('/')
          } else {
            router.push('/login/profile-setup')
          }
        }
      }
    } catch (error) {
      console.error('로그인 실패:', error)
    }
  }

  return (
    <View className="flex-1">
      <Image
        source={require('@/assets/images/login-bg.png')}
        className="absolute h-full w-full"
        resizeMode="cover"
      />
      <Col
        justify="space-between"
        align="center"
        className="flex-1 px-[19px]"
        style={{
          paddingTop: insets.top + 112,
          paddingBottom: insets.bottom + 23,
        }}
      >
        <Col gap={16} center>
          <LogoText />
          <Text variant="body-02" className="text-gray-01">
            생생한 뮤지컬 후기는 모두 여기에
          </Text>
        </Col>

        <Col gap={52} className="w-full">
          <Col gap={16} className="w-full">
            <LoginButton type="Kakao" onPress={() => onLogin('KAKAO')} />
            <LoginButton type="Google" onPress={() => onLogin('GOOGLE')} />
          </Col>
          <Text {...termsProps} className="text-center">
            가입하면 앙코르의{' '}
            <Text
              onPress={() => onOpenWebPage(TERMS_AND_PRIVACY.terms)}
              className="underline"
              {...termsProps}
            >
              이용약관
            </Text>{' '}
            및{'\n'}
            <Text
              onPress={() => onOpenWebPage(TERMS_AND_PRIVACY.privacy)}
              className="underline"
              {...termsProps}
            >
              개인정보처리방침
            </Text>
            에 동의하게 됩니다.
          </Text>
        </Col>
      </Col>
    </View>
  )
}
