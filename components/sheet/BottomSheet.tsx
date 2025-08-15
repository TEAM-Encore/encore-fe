import { cn } from '@/utils/cn'
import { BottomSheetBackdrop, BottomSheetView } from '@gorhom/bottom-sheet'
import { BottomSheetDefaultBackdropProps } from '@gorhom/bottom-sheet/lib/typescript/components/bottomSheetBackdrop/types'
import { type Ref, useCallback, useEffect, useMemo, useRef } from 'react'
import { View } from 'react-native'
import { Flex } from '../common/ui/Flex'
import { Text } from '../common/ui/Text'
import { createSafeContext } from '../util/create-safe-context'
import { GorhomSheet } from './gorhom-sheet'

type ContextValue = {
  ref: Ref<GorhomSheet>
  close: VoidFunction
}

const [Provider, useSheet] = createSafeContext<ContextValue>('BottomSheet')

function Root({
  isOpen,
  close,
  unmount,
  children,
}: PropsWithStrictChildren<OverlayProps>) {
  const ref = useRef<GorhomSheet>(null)

  useEffect(() => {
    if (!ref.current) return

    if (isOpen) {
      ref.current?.expand()
    } else {
      ref.current?.collapse()
    }
  }, [isOpen])

  const value = useMemo(
    () => ({
      ref,
      close: () => {
        ref.current?.close()
        close()
        setTimeout(() => {
          unmount?.()
        }, 100)
      },
    }),
    [ref, close, unmount],
  )

  const renderBackdrop = useCallback(
    (props: BottomSheetDefaultBackdropProps) => (
      <BottomSheetBackdrop
        {...props}
        disappearsOnIndex={1}
        appearsOnIndex={2}
        opacity={0.7}
        onPress={() => {
          value.close()
        }}
      />
    ),
    [close, unmount],
  )

  return (
    <Provider value={value}>
      <GorhomSheet
        ref={ref}
        backdropComponent={renderBackdrop}
        handleComponent={null}
      >
        <BottomSheetView className="bg-[#333333] p-4">
          {children}
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
    <Flex center className={cn('relative h-[70px] px-4', className)}>
      <Text className="font-semibold text-[18px] text-white">{children}</Text>
    </Flex>
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

function Footer({
  children,
  className,
}: PropsWithStrictChildren<{
  className?: string
}>) {
  return (
    <View className={`mt-4 border-t border-gray-200 pt-4 ${className}`}>
      {children}
    </View>
  )
}

export const BottomSheet = {
  Root,
  Header,
  Content,
  Footer,
}
