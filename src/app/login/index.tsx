import { api } from '@/api'
import { Col } from '@/components/common/ui/Flex'
import { Text, type TextProps } from '@/components/common/ui/Text'
import { TERMS_AND_PRIVACY } from '@/constants/login'
import { saveToken } from '@/lib/storage'
import { router } from 'expo-router'
import * as WebBrowser from 'expo-web-browser'
import { Image, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
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

  const onLogin = async (provider: 'KAKAO' | 'GOOGLE' | 'APPLE') => {
    try {
      const response = await api().getLoginUrl(provider)
      const url = response.url as string

      const result = await WebBrowser.openAuthSessionAsync(
        url,
        'encore://oauth',
      )

      if (result.type === 'success') {
        const parsed = new URL(result.url)
        const token = parsed.searchParams.get('token')

        if (token) {
          await saveToken('accessToken', token).then(async () => {
            const response = await api().getMyInfo()

            const { code, data } = response

            if (code === 1000) {
              // await saveToken('userInfo', JSON.stringify(data))
              router.replace('/')
            } else {
              router.push('/login/profile-setup')
            }
          })
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
