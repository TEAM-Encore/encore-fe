import { useState } from 'react'
import { ActivityIndicator, Image } from 'react-native'
import { Icon } from '@/components/common/icons/Icon'
import { Col, Flex, Row } from '@/components/common/ui/Flex'
import { Text } from '@/components/common/ui/Text'
import { useSignedImageUrl } from '@/hooks/useSignedImageUrl'
import { cn } from '@/utils/cn'
import Marquee from './Marquee'

type TicketBookProps = {
  title: string
  date: string
  theaterseat: string
  attendees: string
  posterUrl: string
  onPress?: () => void
  className?: string
  active?: boolean
  isImageUploaded?: boolean
}

export function TicketBook({
  title,
  posterUrl,
  onPress,
  className,
  active = false,
  isImageUploaded,
  ...rest
}: TicketBookProps) {
  const [isImageLoaded, setIsImageLoaded] = useState(false)
  const isRelativePath = posterUrl && !posterUrl.startsWith('http')
  const signedUrl = useSignedImageUrl(posterUrl)
  const imageUrl = isRelativePath ? signedUrl : posterUrl

  return (
    <Flex
      onPress={onPress}
      direction="row"
      align="center"
      gap={16}
      className={cn(
        'h-30 w-full rounded-lg p-4',
        active ? 'bg-gray-03' : 'bg-gray-11',
        className,
      )}
    >
      {/* 포스터 */}
      <Flex
        align="center"
        justify="center"
        className="h-[92px] w-[66px] overflow-hidden rounded-[4.79px]"
      >
        {imageUrl && (
          <Image
            source={{ uri: imageUrl }}
            onLoad={() => setIsImageLoaded(true)}
            onError={() => setIsImageLoaded(true)}
            style={{ width: '100%', height: '100%' }}
            resizeMode="cover"
          />
        )}
        {(!imageUrl || !isImageLoaded) && (
          <ActivityIndicator color="white" className="absolute" />
        )}
      </Flex>

      {/* 티켓북 정보 */}
      <Col gap={8} className="relative flex-1">
        <Marquee duration={15000}>
          <Text
            variant="subhead-03"
            color={active ? 'gray-12' : 'gray-01'}
            numberOfLines={1}
            className="marquee-text whitespace-nowrap"
          >
            {title}
          </Text>
        </Marquee>

        <Col>
          {['date', 'theaterseat', 'attendees'].map((key) => {
            const iconName =
              key === 'date'
                ? 'Clock'
                : key === 'theaterseat'
                  ? 'Theaterseat'
                  : 'User'
            if (key === 'theaterseat' && rest.theaterseat === '') return null
            return (
              <Row key={key} align="center" gap={6}>
                <Icon
                  name={iconName}
                  size={11}
                  className={cn(active ? 'text-gray-10' : 'text-gray-01')}
                />
                <Text
                  variant={'caption'}
                  color={active ? 'gray-08' : 'gray-06'}
                  numberOfLines={1}
                  ellipsizeMode="tail"
                >
                  {rest[key as keyof typeof rest]}
                </Text>
              </Row>
            )
          })}
        </Col>
      </Col>
    </Flex>
  )
}
