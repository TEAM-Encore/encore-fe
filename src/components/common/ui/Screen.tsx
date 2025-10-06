import { type ColorKeys, colors } from '@/styles/color'
import { cn } from '@/utils/cn'
import { ScrollView } from 'react-native-gesture-handler'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { Col, Row } from './Flex'

export function Screen({
  children,
  bg,
  header,
  className,
  fixedButton,
  scrollable,
}: PropsWithStrictChildren<{
  header?: React.ReactNode
  bg?: ColorKeys
  className?: string
  fixedButton?: React.ReactNode
  scrollable?: boolean
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
      {scrollable ? (
        <ScrollView contentContainerClassName={cn('px-5', className)}>
          {children}
        </ScrollView>
      ) : (
        <Col style={{ flex: 1 }} className={cn('px-5', className)}>
          {children}
        </Col>
      )}

      {fixedButton && (
        <Row
          style={{
            bottom: insets.bottom,
          }}
          className={cn('absolute inset-x-0 px-5 py-4')}
        >
          {fixedButton}
        </Row>
      )}
    </Col>
  )
}
