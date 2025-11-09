import { Image, View } from 'react-native'
import { Icon } from '@/components/common/icons/Icon'
import { Col, Row } from '@/components/common/ui/Flex'
import { Text } from '@/components/common/ui/Text'

type TicketCardProps = {
  posterUrl: string
  showName: string
  venueName: string
  date: string
  seat: string
  actorName: string
}

export function TicketCard({
  posterUrl,
  showName,
  venueName,
  date,
  seat,
  actorName,
}: TicketCardProps) {
  return (
    <Row className="gap-4 rounded-lg bg-gray-11 p-4">
      {/* 포스터 썸네일 */}
      <View className="h-[92px] w-[66px] overflow-hidden rounded-[4.79px] bg-white/5">
        <Image
          source={typeof posterUrl === 'string' ? { uri: posterUrl } : posterUrl}
          className="h-full w-full"
          resizeMode="cover"
        />
      </View>

      {/* 티켓 정보 */}
      <Col className="flex-1 gap-2">
        {/* 공연명 [공연장명] */}
        <Text variant="subhead-03" className="text-gray-01" numberOfLines={1}>
          {showName}{' '}
          <Text variant="subhead-03" className="text-gray-06">
            [{venueName}]
          </Text>
        </Text>

        {/* 날짜 */}
        <Row align="center" gap={6}>
          <Icon name="Clock" size={11} className="text-gray-01" />
          <Text variant="caption" className="text-[10px] text-gray-06">
            {date}
          </Text>
        </Row>

        {/* 좌석 */}
        <Row align="center" gap={6}>
          <Icon name="TheaterSeat" size={11} className="text-gray-01" />
          <Text variant="caption" className="text-[10px] text-gray-06">
            {seat}
          </Text>
        </Row>

        {/* 배우명 */}
        <Row align="center" gap={6}>
          <Icon name="User" size={11} className="text-gray-01" />
          <Text variant="caption" className="text-[10px] text-gray-06">
            {actorName}
          </Text>
        </Row>
      </Col>
    </Row>
  )
}
