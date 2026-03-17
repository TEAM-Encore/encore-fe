import { Image, type ImageSourcePropType, View } from 'react-native'
import { Icon } from '@/components/common/icons/Icon'
import { Col, Flex, Row } from '@/components/common/ui/Flex'
import { Text } from '@/components/common/ui/Text'
import { cn } from '@/utils/cn'
import { Spacing } from './common/ui/Spacing'

type ReviewCardProps = {
  title: string
  summary: string
  author: string
  likes: number
  posterUrl?: ImageSourcePropType | undefined
  onPress?: () => void
  className?: string
  active?: boolean
  hideImage?: boolean
}

export function ReviewCard({
  title,
  summary,
  author,
  likes,
  posterUrl,
  onPress,
  className,
  active = false,
  hideImage = false,
}: ReviewCardProps) {
  return (
    <Flex
      direction="row"
      onPress={onPress}
      className={cn(
        'h-[126px] w-full flex-row rounded-[8px] bg-gray-11 px-[16px] py-[17px]',
        {
          'bg-gray-03': active,
          'bg-gray-11': !active,
        },
        className,
      )}
    >
      {!hideImage && posterUrl && (
        <View className="h-[92px] w-[66px] overflow-hidden rounded-[12px] bg-white/5">
          {posterUrl ? (
            <Image
              source={posterUrl}
              style={{ width: '100%', height: '100%' }}
              resizeMode="cover"
            />
          ) : null}
        </View>
      )}

      {!hideImage && posterUrl && <Spacing size={16} />}
      <Col className="flex-1">
        <Text
          variant="subhead-03"
          className={cn(active ? 'text-gray-12' : 'text-gray-01')}
          numberOfLines={1}
        >
          {title}
        </Text>

        <Text
          variant="body-01"
          className={cn('text-gray-07', 'mt-[6px]')}
          numberOfLines={2}
          flex={1}
          ellipsizeMode="tail"
        >
          {summary}
        </Text>

        <Row className="mt-[8px] gap-x-[8px]" align="center">
          <Row className="gap-x-[4px]" align="center">
            <Icon
              name="User"
              size={12}
              className={cn({
                'text-gray-10': active,
                'text-gray-01': !active,
              })}
            />
            <Text
              variant="caption"
              className={cn({
                'text-gray-10': active,
                'text-gray-01': !active,
              })}
              numberOfLines={1}
            >
              {author}
            </Text>
          </Row>

          <Row className="gap-x-[4px]" align="center">
            <Icon
              name="Like"
              size={12}
              className={cn({
                'text-gray-10': active,
                'text-gray-01': !active,
              })}
            />
            <Text
              variant="caption"
              className={cn({
                'text-gray-10': active,
                'text-gray-01': !active,
              })}
            >
              {likes}
            </Text>
          </Row>
        </Row>
      </Col>
    </Flex>
  )
}
