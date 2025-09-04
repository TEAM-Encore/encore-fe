import { Modal, Pressable, TouchableWithoutFeedback, View } from 'react-native'
import { Col } from './common/ui/Flex'
import { Text } from './common/ui/Text'

type PopupProps = {
  isOpen: boolean
  title?: string
  subtitle?: string
  primaryLabel?: string
  secondaryLabel?: string
  onClose?: (result: boolean) => void
}

export const Popup = ({
  title,
  subtitle,
  primaryLabel,
  secondaryLabel,
  isOpen,
  onClose,
}: PopupProps) => {
  return (
    <Modal visible={isOpen} transparent animationType="fade">
      <TouchableWithoutFeedback onPress={() => onClose?.(false)}>
        <View className="absolute inset-0 bg-black/40" />
      </TouchableWithoutFeedback>
      <Col className="absolute inset-0 px-6" center>
        <Col className="w-full max-w-[287px] rounded-[8px] bg-gray-10 px-[15.5px] pt-[21px] pb-[14px]">
          <Text variant="subhead-03" className="text-center text-white">
            {title}
          </Text>

          {!!subtitle && (
            <Text
              variant="body-01"
              className="mt-[6px] text-center font-regular text-gray-07"
            >
              {subtitle}
            </Text>
          )}

          <Pressable className="mt-[13px] w-full items-center rounded-[4px] bg-[#FFDD56] py-[13px] active:scale-95">
            <Text variant="subhead-02" className="font-bold text-gray-12">
              {primaryLabel}
            </Text>
          </Pressable>

          <Pressable className="mt-[9px] w-full items-center py-[7px] active:opacity-70">
            <Text variant="subhead-02" className="font-semibold text-gray-07">
              {secondaryLabel}
            </Text>
          </Pressable>
        </Col>
      </Col>
    </Modal>
  )
}
