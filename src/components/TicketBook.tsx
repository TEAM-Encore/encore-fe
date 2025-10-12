import React from 'react'
import { Image, View } from 'react-native'
import { Icon } from '@/components/common/icons/Icon'
import { Col, Flex, Row } from '@/components/common/ui/Flex'
import { Text } from '@/components/common/ui/Text'
import { cn } from '@/utils/cn'

type TicketBookProps = {
  title: string
  date: string
  theaterseat: string
  attendees: string[]
  posterUrl: string
  onPress?: () => void
  className?: string
  active?: boolean
}

export function TicketBook({
  title,
  date,
  theaterseat,
  attendees,
  posterUrl,
  onPress,
  className,
  active = false,
}: TicketBookProps) {
  return (
    <Flex
      onPress={onPress}
      direction="row"
      align="center"
      className={cn(
        'h-[120px] w-full flex-row items-center rounded-lg px-4 py-[16px]',
        {
          'bg-gray-03': active,
          'bg-gray-11': !active,
        },
        className,
      )}
    >
      {/* 포스터 */}
      <View className="h-[92px] w-[66px] overflow-hidden rounded-[4.79px] bg-white/5">
        {posterUrl ? (
          <Image
            source={
              typeof posterUrl === 'string' ? { uri: posterUrl } : posterUrl
            }
            className="h-full w-full"
            resizeMode="cover"
          />
        ) : null}
      </View>

      {/* 티켓북 정보 */}
      <Col className="ml-[16px] flex-1 gap-[8px]">
        {/* 제목 */}
        <Text
          variant="subhead-03"
          className={cn({
            'text-gray-12': active,
            'text-gray-01': !active,
          })}
          numberOfLines={1}
        >
          {title}
        </Text>

        <Col className="gap-1">
          {/* 날짜 */}
          <Row className="items-center gap-x-[6px]">
            <Icon
              name="Clock"
              size={11}
              className={cn({
                'text-gray-10': active,
                'text-gray-01': !active,
              })}
            />
            <Text
              variant={'caption'}
              className={cn('font-regular text-[10px]', {
                'text-gray-08': active,
                'text-gray-06': !active,
              })}
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              {attendees.join(' ')}
            </Text>
          </Row>

          {/* 좌석 */}
          <Row className="items-center gap-x-[6px]">
            <Icon
              name="TheaterSeat"
              size={11}
              className={cn({
                'text-gray-10': active,
                'text-gray-01': !active,
              })}
            />
            <Text
              variant={'caption'}
              className={cn('font-regular text-[10px]', {
                'text-gray-08': active,
                'text-gray-06': !active,
              })}
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              {theaterseat}
            </Text>
          </Row>

          {/* 유저 */}
          <Row className="items-center gap-x-[6px]">
            <Icon
              name="User"
              size={11}
              className={cn({
                'text-gray-10': active,
                'text-gray-01': !active,
              })}
            />
            <Text
              variant={'caption'}
              className={cn('font-regular text-[10px]', {
                'text-gray-08': active,
                'text-gray-06': !active,
              })}
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              {attendees.join(' ')}
            </Text>
          </Row>
        </Col>
      </Col>
    </Flex>
  )
}
