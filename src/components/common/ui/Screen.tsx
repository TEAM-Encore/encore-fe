import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { type ColorKeys, colors } from '@/styles/color'
import { Col } from './Flex'

export function Screen({
  children,
  bg,
  header,
}: PropsWithStrictChildren<{ header?: React.ReactNode; bg?: ColorKeys }>) {
  const insets = useSafeAreaInsets()
  return (
    <Col
      style={{
        flex: 1,
        paddingTop: insets.top,
        paddingBottom: insets.bottom,
        paddingHorizontal: insets.left,
        backgroundColor: bg ?? colors.gray[12],
      }}
    >
      {header}
      <Col style={{ flex: 1 }}>{children}</Col>
    </Col>
  )
}
