import { AnimatePresence } from 'moti'
import { useWindowDimensions } from 'react-native'
import { FadeIn, FadeOut } from 'react-native-reanimated'
import { Col, Flex } from './common/ui/Flex'
import { Text } from './common/ui/Text'

type DialogProps = OverlayProps & {
  title: string
  description: string
  topLabel: string
  bottomLabel: string
  onTopPress: VoidFunction
  onBottomPress: VoidFunction
}

export function Dialog({
  isOpen,
  close,
  unmount,
  title,
  description,
  topLabel,
  bottomLabel,
  onTopPress,
  onBottomPress,
}: DialogProps) {
  const dims = useWindowDimensions()

  return (
    <AnimatePresence>
      {isOpen && (
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
            className="rounded-lg bg-gray-10 p-5"
          >
            <Col gap={12}>
              <Col gap={6} center>
                {title && (
                  <Text variant="subhead-03" color="gray-01">
                    {title}
                  </Text>
                )}
                {description && (
                  <Text variant="body-01" color="gray-07">
                    {description}
                  </Text>
                )}
              </Col>
              <Col gap={16}>
                <Flex
                  center
                  className="h-[46px] rounded-[4px] bg-primary-04"
                  onPress={() => {
                    onTopPress()
                    close()
                  }}
                >
                  <Text variant="subhead-02">{topLabel}</Text>
                </Flex>
                <Text
                  variant="subhead-02"
                  color="gray-07"
                  className="text-center"
                  onPress={() => {
                    onBottomPress()
                    close()
                  }}
                >
                  {bottomLabel}
                </Text>
              </Col>
            </Col>
          </Col>
        </Col>
      )}
    </AnimatePresence>
  )
}
