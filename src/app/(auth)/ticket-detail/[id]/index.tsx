import { zodResolver } from '@hookform/resolvers/zod'
import dayjs from 'dayjs'
import { router, useLocalSearchParams } from 'expo-router'
import { overlay } from 'overlay-kit'
import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { TextInput } from 'react-native'
import { FlatList, ScrollView } from 'react-native-gesture-handler'
import z from 'zod'
import { BottomSheet } from '@/components/BottomSheet'
import { Calendar } from '@/components/Calendar'
import { Icon } from '@/components/common/icons/Icon'
import { Col, Flex, Row } from '@/components/common/ui/Flex'
import { Screen } from '@/components/common/ui/Screen'
import { Text } from '@/components/common/ui/Text'
import { Dialog } from '@/components/Dialog'
import { Dropdown } from '@/components/Dropdown'
import { Header } from '@/components/Header'
import { Search } from '@/components/search/Search'
import { FormTextField } from '@/components/TextField'
import { TimePicker } from '@/components/TimePicker'
import { cn } from '@/utils/cn'
import { type FormType, schema } from '../../add-ticket/schema'

const ACTORS = [
  {
    id: 1,
    name: '옥주현',
  },
  {
    id: 2,
    name: '서경수',
  },
  {
    id: 3,
    name: '이준호',
  },
  {
    id: 4,
    name: '김민수',
  },
  {
    id: 5,
    name: '박준호',
  },
]

export default function TicketDetailScreen() {
  const { id } = useLocalSearchParams()

  const form = useForm<FormType>({
    resolver: zodResolver(schema),
    defaultValues: {
      floor: '1',
      area: '1',
      row: '1',
      seatNumber: '1',
      viewedDate: '2025-01-01',
      showTime: {
        hour: '12',
        minute: '00',
      },
      hall: '세종문화회관',
    },
  })

  const [isEdit, setIsEdit] = useState(false)

  const onDelete = async () => {
    overlay.open(({ isOpen, close }) => (
      <Dialog
        isOpen={isOpen}
        close={close}
        title="관람 내역을 삭제할까요?"
        description="삭제한 내역은 되돌릴 수 없어요."
        top="확인"
        bottom="취소"
      />
    ))
  }

  return (
    <Screen
      className="pt-[15px] pb-[170px]"
      scrollable
      header={
        <Header>
          {isEdit ? (
            <Text
              variant="body-02"
              color="gray-01"
              onPress={() => setIsEdit(false)}
            >
              취소
            </Text>
          ) : (
            <Header.Back />
          )}
          <Header.Center>관람 내역</Header.Center>
          {isEdit ? (
            <Header.Right>
              <Text
                variant="body-02"
                color="gray-01"
                onPress={() => setIsEdit(false)}
              >
                확인
              </Text>
            </Header.Right>
          ) : (
            <Dropdown.Root>
              <Header.Right>
                <Dropdown.Trigger>
                  <Icon name="More" size={24} className="text-gray-01" />
                </Dropdown.Trigger>
                <Dropdown.Content position="left">
                  <Dropdown.Item onPress={() => setIsEdit(true)}>
                    수정
                  </Dropdown.Item>
                  <Dropdown.Item variant="destructive" onPress={onDelete}>
                    삭제
                  </Dropdown.Item>
                </Dropdown.Content>
              </Header.Right>
            </Dropdown.Root>
          )}
        </Header>
      }
    >
      <Col gap={34}>
        <Col gap={12}>
          <Text variant="subhead-02" color="gray-01">
            공연 제목
          </Text>
          <Row align="center" className="rounded bg-gray-10 px-3 py-[10px]">
            <Text variant="body-01" color={isEdit ? 'gray-08' : 'gray-01'}>
              알라딘 [샤롯데시어터]
            </Text>
          </Row>
        </Col>
        <Col gap={12}>
          <Text variant="subhead-02" color="gray-01">
            관람 좌석
          </Text>
          <Row align="center" gap={12}>
            <Row align="center" gap={6}>
              <FormTextField
                variant="short"
                control={form.control}
                name="floor"
                className={cn({
                  'border-gray-01': isEdit,
                })}
              />
              <Text variant="body-01" className="text-white">
                층
              </Text>
            </Row>
            <Row align="center" gap={6}>
              <FormTextField
                variant="short"
                control={form.control}
                name="area"
                className={cn({
                  'border-gray-01': isEdit,
                })}
              />
              <Text variant="body-01" className="text-white">
                구역
              </Text>
            </Row>
            <Row align="center" gap={6}>
              <FormTextField
                variant="short"
                control={form.control}
                name="row"
                className={cn({
                  'border-gray-01': isEdit,
                })}
              />
              <Text variant="body-01" className="text-white">
                열
              </Text>
            </Row>
            <Row align="center" gap={6}>
              <FormTextField
                variant="short"
                control={form.control}
                name="seatNumber"
                className={cn({
                  'border-gray-01': isEdit,
                })}
              />
              <Text variant="body-01" className="text-white">
                번
              </Text>
            </Row>
          </Row>
        </Col>
        <Col gap={12}>
          <Text variant="subhead-02" className="text-white">
            공연 일정
          </Text>
          <Row
            align="center"
            gap={8}
            onPress={() => {
              overlay.open(({ isOpen, close }) => (
                <Calendar
                  isOpen={isOpen}
                  close={close}
                  date={form.watch('viewedDate')}
                  onConfirm={(date) => {
                    form.setValue(
                      'viewedDate',
                      dayjs(date).format('YYYY-MM-DD'),
                    )
                  }}
                />
              ))
            }}
            className="self-start rounded-[4px] bg-gray-10 px-3 py-[10px]"
          >
            <Icon name="Clock" size={14} className="text-white" />
            <Text variant="body-01" className="text-white">
              {dayjs(form.watch('viewedDate')).format('YYYY년 MM월 DD일')}
            </Text>
            <Icon name="ArrowDown" size={18} className="text-white" />
          </Row>
        </Col>
        <Col gap={12}>
          <Text variant="subhead-02" className="text-white">
            공연 회차
          </Text>
          <Row
            align="center"
            gap={8}
            onPress={() => {
              overlay.open(({ isOpen, close }) => (
                <TimePicker
                  isOpen={isOpen}
                  close={close}
                  hour={form.watch('showTime').hour}
                  minute={form.watch('showTime').minute}
                  onConfirm={(hour, minute) => {
                    form.setValue('showTime', { hour, minute })
                  }}
                />
              ))
            }}
            className="self-start rounded-[4px] bg-gray-10 px-3 py-[10px]"
          >
            <Text variant="body-01" className="text-white">
              {form.watch('showTime').hour}:{form.watch('showTime').minute}
            </Text>
            <Icon name="ArrowDown" size={18} className="text-white" />
          </Row>
        </Col>
        <Col gap={12}>
          <Text variant="subhead-02" className="text-white">
            공연장
          </Text>
          <Controller
            control={form.control}
            name="hall"
            render={({ field: { value, onChange, onBlur, ref } }) => (
              <TextInput
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                ref={ref}
                readOnly
                className={cn(
                  'h-10 rounded-[4px] bg-gray-10 px-3 py-[10px] text-body-1 text-gray-01',
                  {
                    'text-gray-08': isEdit,
                  },
                )}
              />
            )}
          />
        </Col>
        <Col gap={12}>
          <Text variant="subhead-02" color="gray-01">
            티켓 사진
          </Text>
          <Flex center className="h-[176px] rounded-lg bg-gray-10">
            {isEdit ? (
              <Col
                gap={4}
                align="center"
                onPress={() => {
                  overlay.open(({ isOpen, close, unmount }) => (
                    <BottomSheet.Root
                      isOpen={isOpen}
                      close={close}
                      backgroundColor="#FFFFFF"
                      borderTopRadius={20}
                    >
                      {({ onClose }) => (
                        <BottomSheet.Content>
                          <Row
                            center
                            className="py-5"
                            gap={6}
                            onPress={() => {
                              onClose()
                            }}
                          >
                            <Icon name="Image" size={24} />
                            <Text variant="subhead-03" color="gray-09">
                              갤러리에서 사진 변경하기
                            </Text>
                          </Row>
                          <Row
                            center
                            className="py-5"
                            gap={6}
                            onPress={() => {
                              onClose()
                            }}
                          >
                            <Icon name="Delete" size={24} color="sub-alert" />
                            <Text variant="subhead-03" color="sub-alert">
                              사진 삭제하기
                            </Text>
                          </Row>
                        </BottomSheet.Content>
                      )}
                    </BottomSheet.Root>
                  ))
                }}
              >
                <Icon name="Camera" size={24} className="text-gray-01" />
                <Text variant="subhead-02" color="gray-01">
                  사진 추가
                </Text>
              </Col>
            ) : (
              <Text
                variant="caption"
                color="gray-07"
              >{`티켓 사진을 업로드하고\n후기를 작성해보세요!`}</Text>
            )}
          </Flex>
        </Col>
        <Col gap={12}>
          <Text variant="subhead-02" color="gray-01">
            배우
          </Text>
          {isEdit && (
            <Search onDelete={() => {}} placeholder="추가할 배우 검색하기" />
          )}
          <Row align="center" gap={4} wrap="wrap" className="mt-3">
            {ACTORS.map((actor) => (
              <Col
                key={actor.id}
                align="center"
                gap={4}
                className="relative h-[100px] w-[78px]"
              >
                {isEdit && (
                  <Icon
                    name="XCircle"
                    size={20}
                    className="-top-[7px] -right-1 absolute z-10"
                  />
                )}
                <Col className="size-[60px] rounded-lg bg-gray-06" />
                <Text variant="caption" color="gray-01">
                  {actor.name}
                </Text>
              </Col>
            ))}
          </Row>
        </Col>
      </Col>
    </Screen>
  )
}
