import { Icon } from '@/components/common/icons/Icon'
import { Col, Flex, Row } from '@/components/common/ui/Flex'
import { Text } from '@/components/common/ui/Text'
import { cn } from '@/utils/cn'
import React from 'react'
import { Image, View } from 'react-native'

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
        'w-full h-[120px] py-[16px] px-4 rounded-lg flex-row items-center',
        {
          'bg-gray-03': active,
          'bg-gray-11': !active,
        },
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
          className={cn({
            'text-gray-12': active,
            'text-gray-01': !active,
          })}
          numberOfLines={1}>
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
            <Text variant={"caption"}
              className={cn(
                'font-regular text-[10px]',
                {
                  'text-gray-08': active,
                  'text-gray-06': !active,
                }
              )}
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
            <Text variant={"caption"}
              className={cn(
                'font-regular text-[10px]',
                {
                  'text-gray-08': active,
                  'text-gray-06': !active,
                }
              )}
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
            <Text variant={"caption"}
              className={cn(
                'font-regular text-[10px]',
                {
                  'text-gray-08': active,
                  'text-gray-06': !active,
                }
              )}
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
