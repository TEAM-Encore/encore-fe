import { useState } from 'react'
import {
  Modal,
  TextInput,
  type TextInputProps,
  useWindowDimensions,
} from 'react-native'
import { FadeIn, FadeOut } from 'react-native-reanimated'
import { cn } from '@/utils/cn'
import { Col, Row } from './common/ui/Flex'
import { Text } from './common/ui/Text'
import { toast } from './Toaster'

type TimePickerProps = OverlayProps & {
  hour: string
  minute: string
  onConfirm: (hour: string, minute: string) => void
}

export function TimePicker({
  isOpen,
  close,
  hour,
  minute,
  onConfirm,
}: TimePickerProps) {
  const dims = useWindowDimensions()

  const [__hour, setHour] = useState(hour)
  const [__minute, setMinute] = useState(minute)

  return (
    <Modal visible={isOpen} transparent animationType="fade">
      <Col center flex={1} className="absolute inset-0">
        <Col
          onPress={close}
          entering={FadeIn.duration(150)}
          exiting={FadeOut.duration(150)}
          className="absolute inset-0 size-full flex-1 bg-black/50"
        />
        <Col
          style={{ width: dims.width - 48 }}
          className="rounded-[20px] bg-gray-10 px-[30px] py-4"
          gap={18}
        >
          <Text variant="subhead-03" className="text-gray-01">
            공연 회차
          </Text>
          <Row center gap={10}>
            <Col flex={1} gap={14}>
              <TimePickerInput value={__hour} onChangeText={setHour} />
              <Text variant="subhead-long-02" className="text-gray-01">
                시
              </Text>
            </Col>
            <Col center className="h-[67px] w-[22px] self-start">
              <Text className="text-[52px] text-gray-06">:</Text>
            </Col>
            <Col flex={1} gap={6}>
              <TimePickerInput value={__minute} onChangeText={setMinute} />
              <Text variant="subhead-long-02" className="text-gray-01">
                분
              </Text>
            </Col>
          </Row>
          <Row justify="flex-end">
            <Row gap={24} className="px-3 py-[6px]">
              <Text
                variant="subhead-long-02"
                className="text-gray-01"
                onPress={close}
              >
                취소
              </Text>
              <Text
                variant="subhead-long-02"
                color="primary-04"
                onPress={() => {
                  if (__hour.length !== 2 || __minute.length !== 2) {
                    toast.show('시간을 입력해주세요.')
                    return
                  }
                  onConfirm(__hour, __minute)
                  close()
                }}
              >
                확인
              </Text>
            </Row>
          </Row>
        </Col>
      </Col>
    </Modal>
  )
}

function TimePickerInput({ className, ...props }: TextInputProps) {
  const [isFocused, setIsFocused] = useState(false)

  return (
    <TextInput
      textAlign="center"
      textAlignVertical="center"
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
      maxLength={2}
      className={cn(
        'h-[66px] rounded-[8px] px-[14px] py-2 text-[40px] text-gray-01 leading-[52px] tracking-[-0.3px]',
        {
          'border-2 border-primary-04': isFocused,
          'bg-gray-09': !isFocused,
        },
      )}
      {...props}
    />
  )
}
