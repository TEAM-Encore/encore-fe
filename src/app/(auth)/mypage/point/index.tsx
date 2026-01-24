import { useQuery } from '@tanstack/react-query'
import { LinearGradient } from 'expo-linear-gradient'
import { router } from 'expo-router'
import { FlatList, Image, StyleSheet } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { api } from '@/api'
import { pointQueries } from '@/apis/point/queries'
import { Icon } from '@/components/common/icons/Icon'
import { Col, Flex, Row } from '@/components/common/ui/Flex'
import { Screen } from '@/components/common/ui/Screen'
import { Spacing } from '@/components/common/ui/Spacing'
import { Text } from '@/components/common/ui/Text'
import { Header } from '@/components/Header'
import { useInfiniteList } from '@/hooks/useInfiniteList'
import PointItem from '../_components/PointItem'

type PointHistoryItem = {
  id: number
  change_amount: number
  balance_after: number
  description: string
  type: 'REVIEW_WRITE' | 'REVIEW_VIEW' | 'DAILY_LIKE'
  createdAt: string
}

export default function Point() {
  const insets = useSafeAreaInsets()

  const { data: point } = useQuery(pointQueries.getMyBalance())

  const { rows: pointHistory } = useInfiniteList<
    PointHistoryItem,
    { cursor?: number }
  >({
    queryKey: 'pointHistory',
    fn: async ({ cursor }) => {
      const res = await api().getMyPointHistory({
        page: cursor ?? 0,
        size: 3,
      })
      return res.data
    },
    params: {},
  })

  return (
    <Screen
      className="flex-1"
      header={
        <Header>
          <Header.Back />
          <Header.Center>포인트 내역</Header.Center>
        </Header>
      }
    >
      <Spacing size={28} />
      <Col
        gap={8}
        justify="center"
        className="relative h-[129px] w-full rounded-lg bg-gray-10 pl-5"
      >
        <Text variant="subhead-03" color="gray-01">
          보유 포인트
        </Text>
        <Row gap={7} align="center">
          <Icon name="Point" size={24} className="text-gray-01" />
          <Text variant="display-02" color="gray-01">
            {point?.data.current_balance ?? 0}
          </Text>
        </Row>
        <Flex
          style={styles.image}
          className="-right-1.5 absolute bottom-1.5 h-[100px] w-[180px] rounded-lg"
        >
          <Image
            source={require('../../../../../assets/images/point-bg.png')}
          />
        </Flex>
      </Col>
      <Spacing size={22} />
      <FlatList
        contentContainerStyle={{ paddingBottom: 108, paddingRight: 4 }}
        showsVerticalScrollIndicator={false}
        data={pointHistory}
        renderItem={({ item }) => (
          <PointItem
            title={item.description}
            date={item.createdAt}
            point={item.change_amount.toString()}
          />
        )}
      />
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
        align="center"
        justify="space-between"
        className="absolute bottom-[23px] z-[9998] mx-5 w-full rounded-[10px] bg-primary-04 p-[14px]"
        onPress={() => router.push('/mypage/point/guide')}
      >
        <Col>
          <Text variant="caption" color="gray-12" className="leading-[18px]">
            포인트가 궁금해요!
          </Text>
          <Text variant="subhead-03" color="gray-12" className="leading-[22px]">
            포인트 안내 페이지
          </Text>
        </Col>
        <Icon name="ArrowLeft" size={24} className="rotate-180 text-gray-12" />
      </Row>
    </Screen>
  )
}
const styles = StyleSheet.create({
  image: {
    mixBlendMode: 'screen',
  },
})
