import { LinearGradient } from 'expo-linear-gradient'
import { router } from 'expo-router'
import { FlatList, Image, StyleSheet } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { Icon } from '@/components/common/icons/Icon'
import { Col, Flex, Row } from '@/components/common/ui/Flex'
import { Screen } from '@/components/common/ui/Screen'
import { Spacing } from '@/components/common/ui/Spacing'
import { Text } from '@/components/common/ui/Text'
import { Header } from '@/components/Header'
import { PointItem } from '../_components/PointItem'

const MOCK = [
  {
    title: '[5년차 뮤덕의 알라딘 후기] 열람',
    date: '2024-10-19T14:30:00',
    point: '-10',
  },
  {
    title: '[게시글 좋아요 3회] 이벤트 참여',
    date: '2024-10-18T19:45:00',
    point: '+10',
  },
  {
    title: '[위키드 관람 후기] 열람',
    date: '2024-10-17T22:15:00',
    point: '-10',
  },
  {
    title: '리뷰 작성',
    date: '2024-10-16T16:20:00',
    point: '+30',
  },
  {
    title: '[알라딘 3회차 후기] 열람',
    date: '2024-10-15T12:00:00',
    point: '-10',
  },
  {
    title: '[알라딘 4회차 후기] 열람',
    date: '2024-10-14T09:15:00',
    point: '-10',
  },
  {
    title: '[알라딘 5회차 후기] 열람',
    date: '2024-10-13T18:30:00',
    point: '-10',
  },
  {
    title: '[알라딘 6회차 후기] 열람',
    date: '2024-10-12T15:45:00',
    point: '-10',
  },
]

export default function Point() {
  const insets = useSafeAreaInsets()

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
          <Icon name="Point" size={24} color="#FBFBFB" />
          <Text variant="display-02" color="gray-01">
            15
          </Text>
        </Row>
        <Flex
          style={styles.image}
          className="-right-1.5 absolute bottom-1.5 h-[100px] w-[180px] rounded-lg"
        >
          <Image source={require('@/assets/images/point-bg.png')} />
        </Flex>
      </Col>
      <Spacing size={22} />
      <FlatList
        contentContainerStyle={{ paddingBottom: 38, paddingRight: 4 }}
        showsVerticalScrollIndicator={false}
        data={MOCK}
        renderItem={({ item }) => <PointItem {...item} />}
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
        className="absolute bottom-[23px] z-[9998] mx-5 w-full rounded-[10px] bg-gray-10 p-[14px]"
        onPress={() => router.push('/mypage/point/guide')}
      >
        <Col>
          <Text variant="caption" color="gray-03">
            포인트가 궁금해요!
          </Text>
          <Text variant="subhead-03" color="gray-03">
            포인트 안내 페이지
          </Text>
        </Col>
        <Icon
          name="ArrowLeft"
          size={24}
          color="#FBFBFB"
          className="rotate-180"
        />
      </Row>
    </Screen>
  )
}
const styles = StyleSheet.create({
  image: {
    mixBlendMode: 'screen',
  },
})
