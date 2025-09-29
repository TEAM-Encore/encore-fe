import dayjs from 'dayjs'
import { cn } from '@/utils/cn'
import 'dayjs/locale/ko'
import { useState } from 'react'
import { Modal, useWindowDimensions } from 'react-native'
import { FadeIn, FadeOut } from 'react-native-reanimated'
import { useLilius } from 'use-lilius'
import { Icon } from './common/icons/Icon'
import { Col, Flex, Row } from './common/ui/Flex'
import { Text } from './common/ui/Text'

type CalendarProps = OverlayProps & {
  date: string
  onConfirm: (date: Date) => void
}

export function Calendar({ isOpen, close, date, onConfirm }: CalendarProps) {
  const lilius = useLilius({
    viewing: new Date(date),
  })
  const dims = useWindowDimensions()

  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    new Date(date),
  )

  return (
    <Modal visible={isOpen} transparent animationType="fade">
      <Col center className="absolute inset-0 flex-1">
        <Flex
          onPress={close}
          entering={FadeIn.duration(150)}
          exiting={FadeOut.duration(150)}
          className="absolute inset-0 flex-1 bg-black/50"
        />
        <Col
          entering={FadeIn.duration(150)}
          exiting={FadeOut.duration(150)}
          style={{
            width: dims.width - 98,
          }}
          className="z-10 h-[350px] rounded-[20px] bg-gray-10"
        >
          <Row align="flex-end" className="border-gray-09 border-b p-[14px]">
            <Text variant="subhead-03" className="text-white">
              공연 일정
            </Text>
          </Row>
          <Row align="center" justify="space-between" className="px-[14px]">
            <Text variant="subhead-01" className="text-white">
              {dayjs(lilius.viewing).format('YYYY년 M월')}
            </Text>
            <Row
              align="center"
              onPress={() => {
                lilius.viewPreviousMonth()
              }}
            >
              <Flex
                center
                className="size-[35px]"
                onPress={() => {
                  lilius.viewPreviousMonth()
                }}
              >
                <Icon name="Before" size={20} className="text-white" />
              </Flex>
              <Flex
                center
                className="size-[35px]"
                onPress={() => {
                  lilius.viewNextMonth()
                }}
              >
                <Icon name="Next" size={20} className="text-white" />
              </Flex>
            </Row>
          </Row>
          <Col flex={1}>
            <Row align="center" className="px-1">
              {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, index) => (
                <Flex key={index} center flex={1} className="size-[35px]">
                  <Text variant="subhead-03" className="flex-1 text-primary-04">
                    {day}
                  </Text>
                </Flex>
              ))}
            </Row>
            {lilius.calendar[0].map((week, index) => (
              <Row
                key={week[0].toISOString()}
                flex={1}
                className="h-[35px] px-1"
              >
                {week.map((day, index) => {
                  const isDayOfCurrentMonth = dayjs(day).isSame(
                    dayjs(lilius.viewing),
                    'month',
                  )

                  return (
                    <Flex
                      key={index}
                      center
                      disabled={dayjs(day).isBefore(dayjs().startOf('day'))}
                      flex={1}
                      className={cn('relative size-[35px]')}
                      onPress={() => {
                        setSelectedDate(day)
                      }}
                    >
                      <Col
                        center
                        className={cn('size-[30px]', {
                          'rounded-full border border-primary-04':
                            dayjs(day).isSame(dayjs().startOf('day'), 'day') &&
                            isDayOfCurrentMonth,
                          'rounded-full bg-primary-04':
                            dayjs(day).isSame(selectedDate, 'day') &&
                            isDayOfCurrentMonth,
                        })}
                      >
                        <Text
                          variant="subhead-03"
                          className={cn('z-10 text-white', {
                            'text-gray-07': dayjs(day).isBefore(
                              dayjs().startOf('day'),
                            ),
                            'text-primary-04': dayjs(day).isSame(
                              dayjs().startOf('day'),
                              'day',
                            ),
                            'text-gray-12': dayjs(day).isSame(
                              selectedDate,
                              'day',
                            ),
                          })}
                        >
                          {dayjs(day).month() === dayjs(lilius.viewing).month()
                            ? dayjs(day).format('D')
                            : ''}
                        </Text>
                      </Col>
                    </Flex>
                  )
                })}
              </Row>
            ))}
          </Col>
          <Row align="center" justify="flex-end" className="px-[10px]">
            <Flex center className="p-3" onPress={close}>
              <Text variant="caption" className="font-medium text-gray-06">
                취소
              </Text>
            </Flex>
            <Flex
              center
              className="p-3"
              onPress={() => {
                if (selectedDate) {
                  onConfirm(selectedDate)
                  close()
                }
              }}
            >
              <Text variant="caption" className="font-medium text-primary-04">
                확인
              </Text>
            </Flex>
          </Row>
        </Col>
      </Col>
    </Modal>
  )
}
