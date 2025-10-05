import { router } from 'expo-router'
import * as WebBrowser from 'expo-web-browser'
import { Image, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { Col } from '@/components/common/ui/Flex'
import { Text, type TextProps } from '@/components/common/ui/Text'
import { TERMS_AND_PRIVACY } from '@/constants/login'
import LoginButton from './components/LoginButton'
import { LogoText } from './components/LogoText'

export default function Index() {
  const insets = useSafeAreaInsets()

  const openWebPage = async (url: string) => {
    await WebBrowser.openBrowserAsync(url)
  }

  const termsProps: TextProps = {
    color: 'gray-01',
    variant: 'caption',
  }

  return (
    <View className="flex-1">
      <Image
        source={require('../../../../assets/images/login-bg.png')}
        className="absolute h-full w-full"
        resizeMode="cover"
      />
      <Col
        justify="space-between"
        align="center"
        className="flex-1"
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
        <Col gap={16} className="w-full px-[19px]">
          <LoginButton
            type="Kakao"
            onPress={() => router.push('/profile-setup')}
          />
          <LoginButton
            type="Google"
            onPress={() => router.push('/profile-setup')}
          />
          <View className="mt-[52px] flex flex-col items-center justify-center">
            <Text {...termsProps} className="text-center">
              가입하면 앙코르의{' '}
              <Text
                onPress={() => openWebPage(TERMS_AND_PRIVACY.terms)}
                className="underline"
                {...termsProps}
              >
                이용약관
              </Text>{' '}
              및{'\n'}
              <Text
                onPress={() => openWebPage(TERMS_AND_PRIVACY.privacy)}
                className="underline"
                {...termsProps}
              >
                개인정보처리방침
              </Text>
              에 동의하게 됩니다.
            </Text>
          </View>
        </Col>
      </Col>
    </View>
  )
}
