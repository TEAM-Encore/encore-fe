import { BottomSheetBackdrop, BottomSheetView } from '@gorhom/bottom-sheet'
import type { BottomSheetDefaultBackdropProps } from '@gorhom/bottom-sheet/lib/typescript/components/bottomSheetBackdrop/types'
import {
  type PropsWithChildren,
  type Ref,
  useCallback,
  useEffect,
  useMemo,
  useRef,
} from 'react'
import { View } from 'react-native'
import { interpolate } from 'react-native-reanimated'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { cn } from '@/utils/cn'
import { createSafeContext } from '../utils/create-safe-context'
import { GorhomSheet } from '.'
import { Button, type ButtonProps } from './Button'
import { Icon } from './common/icons/Icon'
import { Row } from './common/ui/Flex'
import { Text } from './common/ui/Text'

type ContextValue = {
  ref: Ref<GorhomSheet>
  close: VoidFunction
}

type RootProps = OverlayProps & {
  backgroundColor?: string
  borderTopRadius?: number
}

const [Provider, useSheet] = createSafeContext<ContextValue>('BottomSheet')

function Root({
  isOpen,
  close,
  unmount,
  children,
  backgroundColor = '#333333',
  borderTopRadius = 25,
}: RenderPropsChildren<
  RootProps,
  {
    onClose: VoidFunction
  }
>) {
  const ref = useRef<GorhomSheet>(null)
  const insets = useSafeAreaInsets()

  const animatedBackdrop = useCallback(
    ({ animatedIndex }: BottomSheetDefaultBackdropProps) => {
      return {
        opacity: interpolate(animatedIndex.value, [-1, 0], [0, 0.7]),
      }
    },
    [],
  )

  const value = useMemo(
    () => ({
      ref,
      close: () => {
        ref.current?.close()
        close()
        setTimeout(() => {
          unmount?.()
        }, 300)
      },
    }),
    [ref, close, unmount],
  )

  const renderBackdrop = useCallback(
    (props: BottomSheetDefaultBackdropProps) => (
      <BottomSheetBackdrop
        disappearsOnIndex={-1}
        appearsOnIndex={0}
        style={[{ backgroundColor: '#000000' }, animatedBackdrop(props)]}
        onPress={() => {
          value.close()
        }}
        {...props}
      />
    ),
    [value],
  )

  useEffect(() => {
    if (!ref.current) return

    if (isOpen) {
      ref.current?.expand()
    }
  }, [isOpen])

  return (
    <Provider value={value}>
      <GorhomSheet
        ref={ref}
        backdropComponent={renderBackdrop}
        handleComponent={null}
        backgroundStyle={{
          backgroundColor,
          borderTopLeftRadius: borderTopRadius,
          borderTopRightRadius: borderTopRadius,
          overflow: 'hidden',
        }}
        enablePanDownToClose
        onClose={value.close}
      >
        <BottomSheetView
          className="z-modal rounded-t-[25px]"
          style={{
            paddingBottom: insets.bottom,
            backgroundColor,
            overflow: 'hidden',
          }}
        >
          {typeof children === 'function'
            ? children({ onClose: value.close })
            : children}
        </BottomSheetView>
      </GorhomSheet>
    </Provider>
  )
}

function Header({
  children,
  className,
}: PropsWithStrictChildren<{
  className?: string
}>) {
  const context = useSheet()

  return (
    <Row center className={cn('relative h-[70px] px-4', className)}>
      <Text className="text-center font-semibold text-[18px] text-gray-01">
        {children}
      </Text>
      <Icon
        name="Close"
        width={24}
        height={24}
        size={24}
        className="-translate-y-1/2 absolute top-1/2 right-4 text-gray-01"
        onPress={() => {
          context.close()
        }}
      />
    </Row>
  )
}

function Content({
  children,
  className,
}: PropsWithStrictChildren<{
  className?: string
}>) {
  return <View className={cn('flex-1', className)}>{children}</View>
}

/**
 * TODO: 버튼 컴포넌트 타입 상속
 */
function Footer({
  children,
  className,
  buttonProps,
}: PropsWithChildren<{
  className?: string
  buttonProps: ButtonProps
}>) {
  const { onPress, ...rest } = buttonProps
  const context = useSheet()

  return (
    <View className={cn('px-5 py-4', className)}>
      {children ?? (
        <Button
          onPress={(e) => {
            onPress?.(e)
            context.close()
          }}
          {...rest}
        />
      )}
    </View>
  )
}

export const BottomSheet = {
  Root,
  Header,
  Content,
  Footer,
}
