import { zodResolver } from '@hookform/resolvers/zod'
import dayjs from 'dayjs'
import { useLocalSearchParams, useRouter } from 'expo-router'
import { overlay } from 'overlay-kit'
import { Controller, useForm } from 'react-hook-form'
import { TextInput } from 'react-native'
import { Button } from '@/components/Button'
import { Calendar } from '@/components/Calendar'
import { Icon } from '@/components/common/icons/Icon'
import { Col, Row } from '@/components/common/ui/Flex'
import { Screen } from '@/components/common/ui/Screen'
import { Spacing } from '@/components/common/ui/Spacing'
import { Text } from '@/components/common/ui/Text'
import { FormTextField } from '@/components/TextField'
import { TimePicker } from '@/components/TimePicker'
import AddTicketHeader from '../components/AddTicketHeader'
import { type FormType, schema } from '../schema'

export default function Step2() {
  const params = useLocalSearchParams<{
    data: string
  }>()
  const parsedData: Pick<FormType, 'musicalId' | 'hall'> = JSON.parse(
    params.data,
  )
  const router = useRouter()
  const form = useForm<
    Pick<
      FormType,
      | 'musicalId'
      | 'floor'
      | 'zone'
      | 'col'
      | 'seatNumber'
      | 'viewedDate'
      | 'showTime'
      | 'hall'
    >
  >({
    resolver: zodResolver(
      schema.pick({
        musicalId: true,
        floor: true,
        zone: true,
        col: true,
        seatNumber: true,
        viewedDate: true,
        showTime: true,
        hall: true,
      }),
    ),
    defaultValues: {
      musicalId: parsedData.musicalId,
      viewedDate: dayjs().format('YYYY-MM-DD'),
      floor: '',
      zone: '',
      col: '',
      seatNumber: '',
      showTime: {
        hour: '00',
        minute: '00',
      },
      hall: parsedData.hall,
    },
  })

  const onSubmit = form.handleSubmit((data) => {
    router.push({
      pathname: '/add-ticket/step3',
      params: {
        data: JSON.stringify(data),
      },
    })
  })

  return (
    <Screen
      className="py-7"
      header={<AddTicketHeader progress={50} onBack={() => router.back()} />}
      fixedButton={
        <Button disabled={!form.formState.isValid} onPress={onSubmit}>
          확인
        </Button>
      }
    >
      <Col gap={8}>
        <Text variant="body-01" className="text-gray-07">
          2/4
        </Text>
        <Text variant="subhead-05" className="text-gray-01">
          관람한 공연을 검색해주세요.
        </Text>
      </Col>
      <Col gap={32}>
        <Col gap={12}>
          <Text variant="subhead-02" className="mt-[21px] text-white">
            관람 좌석
          </Text>
          <Row align="center" gap={12}>
            <Row align="center" gap={6}>
              <FormTextField
                variant="short"
                control={form.control}
                name="floor"
              />
              <Text variant="body-01" className="text-white">
                층
              </Text>
            </Row>
            <Row align="center" gap={6}>
              <FormTextField
                variant="short"
                control={form.control}
                name="zone"
              />
              <Text variant="body-01" className="text-white">
                구역
              </Text>
            </Row>
            <Row align="center" gap={6}>
              <FormTextField
                variant="short"
                control={form.control}
                name="col"
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
                readOnly
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                ref={ref}
                className="h-10 rounded-[4px] bg-gray-10 px-3 py-[10px] text-body-1 text-gray-07"
              />
            )}
          />
        </Col>
      </Col>
    </Screen>
  )
}
