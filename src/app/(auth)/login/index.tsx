import { router } from 'expo-router'
import * as WebBrowser from 'expo-web-browser'
import { Image, Pressable, SafeAreaView, View } from 'react-native'
import { Icon } from '@/components/common/icons/Icon'
import { Text } from '@/components/common/ui/Text'
import { TERMS_AND_PRIVACY } from '@/constants/login'

export default function Index() {
  const openWebPage = async (url: string) => {
    await WebBrowser.openBrowserAsync(url)
  }

  return (
    <View className="">
      <Image
        source={require('../../../../assets/images/login-bg.png')}
        className="h-full w-full"
      />
      <SafeAreaView className="absolute inset-0 mt-[122px] mb-[23px] flex flex-col items-center justify-between">
        <View className="flex flex-col items-center justify-center gap-4">
          <Image
            source={require('../../../../assets/images/logo-text.png')}
            className="h-12.5"
          />
          <Text variant="body-02" className="text-gray-01">
            생생한 뮤지컬 후기는 모두 여기에
          </Text>
        </View>
        <View className="flex w-full flex-col px-[19px]">
          <Pressable
            onPress={() => router.push('/profile-setup')}
            className="relative flex h-[50px] w-full items-center justify-center rounded-[60px] bg-[#FEE500] px-4"
          >
            <Text variant="body-02" className="text-gray-12">
              Kakao 로그인
            </Text>
            <Icon name="Kakao" size={18} className="absolute left-4" />
          </Pressable>
          <Pressable
            onPress={() => router.push('/profile-setup')}
            className="relative mt-4 flex h-[50px] w-full items-center justify-center rounded-[60px] bg-white px-4"
          >
            <Text variant="body-02" className="text-gray-12">
              Google 로그인
            </Text>
            <Icon name="Google" size={18} className="absolute left-4" />
          </Pressable>
          <View className="mt-[52px] flex flex-col items-center justify-center">
            <View className="flex-row">
              <Text variant="caption" className="text-gray-01">
                가입하면 앙코르의{' '}
              </Text>
              <Pressable onPress={() => openWebPage(TERMS_AND_PRIVACY.terms)}>
                <Text variant="caption" className="text-gray-01 underline">
                  이용약관{' '}
                </Text>
              </Pressable>
              <Text variant="caption" className="text-gray-01">
                및
              </Text>
            </View>
            <View className="flex-row">
              <Pressable onPress={() => openWebPage(TERMS_AND_PRIVACY.privacy)}>
                <Text variant="caption" className="text-gray-01 underline">
                  개인정보처리방침
                </Text>
              </Pressable>
              <Text variant="caption" className="text-gray-01">
                에 동의하게 됩니다.
              </Text>
            </View>
          </View>
        </View>
      </SafeAreaView>
    </View>
  )
}
