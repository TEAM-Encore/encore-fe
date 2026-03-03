import { useState } from 'react'
import { ActivityIndicator, Image, View } from 'react-native'
import { Icon } from '@/components/common/icons/Icon'
import { Col, Row } from '@/components/common/ui/Flex'
import { Text } from '@/components/common/ui/Text'
import { useSignedImageUrl } from '@/hooks/useSignedImageUrl'

type TicketCardProps = {
  posterUrl?: string
  showName?: string
  venueName?: string
  date?: string
  seat?: {
    col?: string
    floor?: string
    number?: string
    zone?: string
  }
  actorName?: string
}

export function TicketCard({
  posterUrl = '',
  showName = '',
  venueName = '',
  date = '',
  seat,
  actorName = '',
}: TicketCardProps) {
  const { floor = '', zone = '', col = '', number = '' } = seat ?? {}
  const isRelativePath = posterUrl && !posterUrl.startsWith('http')
  const signedUrl = useSignedImageUrl(isRelativePath ? posterUrl : undefined)
  const imageUrl = isRelativePath ? signedUrl : posterUrl
  const [isImageLoaded, setIsImageLoaded] = useState(false)

  return (
    <Row className="gap-4 rounded-lg bg-gray-11 p-4">
      {/* 포스터 썸네일 */}
      <View className="h-[92px] w-[66px] items-center justify-center overflow-hidden rounded-[4.79px]">
        {imageUrl && (
          <Image
            source={{ uri: imageUrl }}
            className="h-full w-full"
            resizeMode="cover"
            onLoad={() => setIsImageLoaded(true)}
            onError={() => setIsImageLoaded(true)}
          />
        )}
        {(!imageUrl || !isImageLoaded) && (
          <ActivityIndicator color="white" className="absolute" />
        )}
      </View>

      {/* 티켓 정보 */}
      <Col className="flex-1" gap={8} justify="center">
        {/* 공연명 [공연장명] */}
        <Text variant="subhead-03" color="gray-01" numberOfLines={1}>
          {showName}{' '}
          <Text variant="subhead-03" color="gray-01">
            [{venueName}]
          </Text>
        </Text>

        <Col>
          {/* 날짜 */}
          <Row align="center" gap={6}>
            <Icon name="Clock" size={11} className="text-gray-01" />
            <Text variant="caption" color="gray-06">
              {date.replaceAll('-', '.')}
            </Text>
          </Row>

          {/* 좌석 */}
          <Row align="center" gap={6}>
            <Icon name="Theaterseat" size={11} className="text-gray-01" />
            <Text variant="caption" color="gray-06">
              {`${floor}층 ${zone}구역 ${col}열 ${number}번`}
            </Text>
          </Row>

          {/* 배우명 */}
          <Row align="center" gap={6}>
            <Icon name="User" size={11} className="text-gray-01" />
            <Text variant="caption" color="gray-06">
              {actorName}
            </Text>
          </Row>
        </Col>
      </Col>
    </Row>
  )
}
