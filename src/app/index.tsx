import { LinearGradient } from 'expo-linear-gradient'
import { Link, useRouter } from 'expo-router'
import { overlay } from 'overlay-kit'
import { useEffect, useState } from 'react'
import { Button, StatusBar, View } from 'react-native'
import Animated, { useSharedValue, withTiming } from 'react-native-reanimated'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { Feather, Search, UserLinear } from '@/components/common/icons/svgs'
import { Flex, Row } from '@/components/common/ui/Flex'
import { Screen } from '@/components/common/ui/Screen'
import { Text } from '@/components/common/ui/Text'
import { Dialog } from '@/components/Dialog'
import AddReviewBottomSheet from './_components/AddReviewBottomSheet'
import ReviewStep from './_components/ReviewStep'
import TicketbookStep from './_components/TicketbookStep'
import { LogoText } from './(auth)/login/components/LogoText'

const tabs = [
  { label: '후기글', value: 'review' },
  { label: '티켓북', value: 'ticketbook' },
]

export default function Index() {
  const router = useRouter()
  const [selected, setSelected] = useState<(typeof tabs)[number]['value']>(
    tabs[0].value,
  )

  const translateX = useSharedValue(0)
  const insets = useSafeAreaInsets()

  useEffect(() => {
    const selectedIndex = tabs.findIndex((tab) => tab.value === selected)
    translateX.value = withTiming(selectedIndex * 85, { duration: 300 })
  }, [selected, translateX])

  return (
    <Screen className="px-0">
      <View className="flex-1">
        <Row
          justify="space-between"
          align="center"
          className="h-[66px] w-full px-5"
        >
          <LogoText height={28} width={66.5} />
          <Row align="center" gap={12}>
            <Flex onPress={() => router.push('/search')}>
              <Search width={20} height={20} className="text-gray-01" />
            </Flex>
            <Flex onPress={() => router.push('/mypage')}>
              <UserLinear width={24} height={24} className="text-gray-01" />
            </Flex>
          </Row>
        </Row>
        <Row
          align="center"
          className="relative h-[41px] border-b border-b-gray-09 px-[15px]"
        >
          {tabs.map((tab) => (
            <Row
              key={tab.value}
              className="relative w-[85px] p-[10px]"
              center
              onPress={() => setSelected(tab.value)}
            >
              <Text
                variant="subhead-04"
                color={selected === tab.value ? 'gray-01' : 'gray-08'}
              >
                {tab.label}
              </Text>
            </Row>
          ))}
          <Animated.View
            className="absolute bottom-[-1.5px] left-[15px] h-[3px] w-[85px] bg-primary-04"
            style={{ transform: [{ translateX }] }}
          />
        </Row>
        {selected === 'review' ? <ReviewStep /> : <TicketbookStep />}
      </View>
      <LinearGradient
        colors={['rgba(0, 0, 0, 0)', 'rgba(0, 0, 0, 0.1)', '#000000']}
        locations={[0, 0.5, 1]}
        style={{
          position: 'absolute',
          right: 0,
          bottom: insets.bottom - 70,
          left: 0,
          height: 200,
          zIndex: 40,
          pointerEvents: 'none',
        }}
      />
      <Row
        center
        className="absolute right-[22px] bottom-5 z-[9998] h-[60px] w-[60px] rounded-[30px] bg-primary-04"
        onPress={() => overlay.open((o) => <AddReviewBottomSheet {...o} />)}
      >
        <Feather color="#171717" />
      </Row>
    </Screen>
  )
}
