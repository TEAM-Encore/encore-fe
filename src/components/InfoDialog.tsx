import { Modal, Pressable, useWindowDimensions } from 'react-native'
import { FadeIn, FadeOut } from 'react-native-reanimated'
import { Icon } from './common/icons/Icon'
import { Col } from './common/ui/Flex'
import { Text } from './common/ui/Text'

type InfoDialogProps = OverlayProps & {
  title: string
  description: string
}

export function InfoDialog({
  isOpen,
  close,
  title,
  description,
}: InfoDialogProps) {
  const dims = useWindowDimensions()

  return (
    <Modal visible={isOpen} transparent animationType="fade">
      <Col center className="absolute inset-0">
        <Col
          entering={FadeIn.duration(150)}
          exiting={FadeOut.duration(150)}
          className="absolute inset-0 bg-black/70"
          onPress={close}
        />
        <Col
          entering={FadeIn.duration(150)}
          exiting={FadeOut.duration(150)}
          style={{ width: dims.width - 108 }}
          className="rounded-lg bg-gray-10 px-6 py-7"
        >
          <Pressable
            onPress={close}
            className="absolute top-4 right-4 z-10"
            hitSlop={8}
          >
            <Icon name="Close" size={24} className="text-gray-01" />
          </Pressable>

          <Col gap={4} className="mt-2">
            <Text variant="subhead-02" className="text-gray-01">
              {title}
            </Text>
            <Text variant="body-01" className="text-gray-01">
              {description}
            </Text>
          </Col>
        </Col>
      </Col>
    </Modal>
  )
}
