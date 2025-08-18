import { Icon } from '@/components/common/icons/Icon'
import { Row } from '@/components/common/ui/Flex'
import { Text } from '@/components/common/ui/Text'
import NavigationBar from '@/components/Header'
import { View } from 'react-native'
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context'

export default function Index() {
  const insets = useSafeAreaInsets()

  return (
    <SafeAreaView className="bg-gray-12 flex-1 items-center justify-center px-[20px]">
      <NavigationBar
        showBackButton
        title="내역 추가하기"
        rightComponent={<Icon name="Close" className="text-gray-01" />}
      />

      <NavigationBar
        title="티켓 내역"
        leftComponent={
          <Text variant={'subhead-long-03'} className="text-gray-01">
            취소
          </Text>
        }
        rightComponent={
          <Text variant={'subhead-long-03'} className="text-gray-01">
            확인
          </Text>
        }
      />

      <NavigationBar
        showBackButton
        rightComponent={
          <View className={'h-[24px] w-full flex-grow bg-pink-900'}></View>
        }
      />

      <NavigationBar
        leftComponent={
          <Text className="text-gray-01" variant={'headline'}>
            앙코르
          </Text>
        }
        rightComponent={
          <Row className="gap-2">
            <Icon name="Close" className="text-gray-01" />
            <Icon name="Close" className="text-gray-01" />
          </Row>
        }
      />
    </SafeAreaView>
  )
}
