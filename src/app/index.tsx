import { Icon } from '@/components/common/icons/Icon'
import { Text } from '@/components/common/ui/Text'
import NavigationBar from '@/components/NavigationBar'
import { View } from 'react-native'
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context'

export default function Index() {
  const insets = useSafeAreaInsets()

  return (
    <SafeAreaView className="flex-1 items-center justify-center bg-gray-12 px-[20px]">
      <NavigationBar
        showBack
        title="내역 추가하기"
        right={<Icon name="Close" className="text-gray-01" />}
      />

      <NavigationBar
        title="티켓 내역"
        left={
          <Text variant={'subhead-long-03'} className="text-gray-01">
            취소
          </Text>
        }
        right={
          <Text variant={'subhead-long-03'} className="text-gray-01">
            확인
          </Text>
        }
      />

      <NavigationBar
        showBack
        right={
          <View className={'h-[24px] w-full flex-grow bg-pink-900'}></View>
        }
      />

      <NavigationBar
        left={
          <Text className="text-gray-01" variant={'headline'}>
            앙코르
          </Text>
        }
        right={
          <>
            <Icon name="Close" className="text-gray-01" />
            <Icon name="Close" className="text-gray-01" />
          </>
        }
      />
    </SafeAreaView>
  )
}
