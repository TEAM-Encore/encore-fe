import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { type ColorKeys, colors } from '@/styles/color'
import { cn } from '@/utils/cn'
import { Col } from './Flex'

export function Screen({
  children,
  bg,
  header,
  className,
}: PropsWithStrictChildren<{
  header?: React.ReactNode
  bg?: ColorKeys
  className?: string
}>) {
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
      <Col style={{ flex: 1 }} className={cn('px-5', className)}>
        {children}
      </Col>
    </Col>
  )
}
