import { Icon } from '@/components/common/icons/Icon'
import { Col, PressableFlex, Row } from '@/components/common/ui/Flex'
import { Text } from '@/components/common/ui/Text'
import { cn } from '@/utils/cn'
import React from 'react'
import { Image, View } from 'react-native'

type TicketBookProps = {
  title: string
  date: string
  theaterseat: string
  attendees: string[]
  posterUrl?: number
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
    <PressableFlex
      onPress={onPress}
      
      direction="row"
      align="center"
      className={cn(
        'w-[320px] h-[120px] p-[16px] rounded-md flex-row items-center',
        active ? 'bg-gray-03' : 'bg-gray-11',
        className,
      )}
    >
      {/* 포스터 */}
      <View className="w-[66px] h-[92px] rounded-[4.79px] overflow-hidden bg-white/5">
        {posterUrl ? (
          <Image
            source={posterUrl}
            className="w-full h-full"
            resizeMode="cover"
          />
        ) : null}
      </View>

      {/* 티켓북 정보 */}
      <Col className="flex-1 ml-[16px] gap-[8px]">
        <Text variant="subhead-03"
          className={cn('text-[16px]', active ? 'text-gray-12' : 'text-gray-01')}
          numberOfLines={1}>
          {title}
        </Text>

        <Col className="gap-1">
          {/* 날짜 */}
          <Row className="items-center gap-[6.92px]">
            <Icon
              name="Clock"
              size={11}
              className={cn(active ? 'text-gray-10' : 'text-gray-01')}
              fill="currentColor"
            />
            <Text
              variant="body-02"
              className={cn('text-[10px]', active ? 'text-gray-08' : 'text-gray-06')}
              numberOfLines={1}
            >
              {date}
            </Text>
          </Row>

          {/* 좌석 */}
          <Row className="items-center gap-[6.92px]">
             <Icon
              name="TheaterSeat"
              size={11}
              className={cn(active ? 'text-gray-10' : 'text-gray-01')}
              fill="currentColor"
            />
            <Text
              variant="body-02"
              className={cn('text-[10px]', active ? 'text-gray-08' : 'text-gray-06')}
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              {theaterseat}
            </Text>
          </Row>

          {/* 유저 */}
          <Row className="items-center gap-[6.92px]">
            <Icon
              name="User"
              size={11}
              className={cn(active ? 'text-gray-10' : 'text-gray-01')}
              fill="currentColor"
            />
            <Text
              variant="body-02"
              className={cn('text-[10px]', active ? 'text-gray-08' : 'text-gray-06')}
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              {attendees.join(' ')}
            </Text>
          </Row>
        </Col>
      </Col>
    </PressableFlex>
  )
}
