import { useEffect, useState } from 'react'
import { Keyboard, Platform } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { type ColorKeys, colors } from '@/styles/color'
import { cn } from '@/utils/cn'
import { Col, Row } from './Flex'

export function Screen({
  children,
  bg,
  header,
  className,
  fixedButton,
  scrollable,
  scrollRef,
}: PropsWithStrictChildren<{
  header?: React.ReactNode
  bg?: ColorKeys
  className?: string
  fixedButton?: React.ReactNode
  scrollable?: boolean
  scrollRef?: React.Ref<ScrollView>
}>) {
  const insets = useSafeAreaInsets()
  const [isKeyboardVisible, setIsKeyboardVisible] = useState(false)

  useEffect(() => {
    const showEvent =
      Platform.OS === 'ios' ? 'keyboardWillShow' : 'keyboardDidShow'
    const hideEvent =
      Platform.OS === 'ios' ? 'keyboardWillHide' : 'keyboardDidHide'
    const showSub = Keyboard.addListener(showEvent, () =>
      setIsKeyboardVisible(true),
    )
    const hideSub = Keyboard.addListener(hideEvent, () =>
      setIsKeyboardVisible(false),
    )
    return () => {
      showSub.remove()
      hideSub.remove()
    }
  }, [])

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
        <ScrollView
          ref={scrollRef}
          contentContainerClassName={cn('px-5', className)}
        >
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
            bottom: isKeyboardVisible ? 10 : insets.bottom,
          }}
          className={cn('absolute inset-x-0 px-5 py-4')}
        >
          {fixedButton}
        </Row>
      )}
    </Col>
  )
}
