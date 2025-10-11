import type React from 'react'
import { type ReactNode, useLayoutEffect, useRef, useState } from 'react'
import { Modal, Pressable, View } from 'react-native'
import { cn } from '@/utils/cn'
import { createSafeContext } from '@/utils/create-safe-context'
import { Col, Row } from './common/ui/Flex'
import { Text } from './common/ui/Text'

type DropdownContextValue = {
  isOpen: boolean
  open: () => void
  close: () => void
  triggerRef: React.RefObject<View | null>
}

const [Provider, useDropdown] =
  createSafeContext<DropdownContextValue>('Dropdown')

function Root({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false)
  const triggerRef = useRef<View>(null)

  const open = () => setIsOpen(true)
  const close = () => setIsOpen(false)

  return (
    <Provider value={{ isOpen, open, close, triggerRef }}>
      <View className="relative">{children}</View>
    </Provider>
  )
}

function Trigger({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) {
  const { open, close, triggerRef, isOpen } = useDropdown()

  return (
    <Pressable
      ref={triggerRef}
      onPress={isOpen ? close : open}
      className={className}
    >
      {children}
    </Pressable>
  )
}

function Content({
  children,
  className,
  position = 'bottom',
}: {
  children: ReactNode
  className?: string
  position?: 'bottom' | 'left'
}) {
  const { isOpen, close, triggerRef } = useDropdown()
  const [triggerLayout, setTriggerLayout] = useState({
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  })
  const [contentLayout, setContentLayout] = useState({
    width: 0,
    height: 0,
  })

  useLayoutEffect(() => {
    if (isOpen && triggerRef.current) {
      triggerRef.current.measureInWindow((x, y, width, height) => {
        setTriggerLayout({ x, y, width, height })
      })
    }
  }, [isOpen])

  if (!isOpen) return null

  console.log(triggerLayout)

  return (
    <Modal transparent visible={isOpen} onRequestClose={close}>
      <Col
        className={cn('self-start rounded-[8px] bg-gray-10', className)}
        onPress={close}
        onLayout={(event) => {
          const { width, height } = event.nativeEvent.layout
          setContentLayout({ width, height })
        }}
        style={{
          ...(position === 'bottom' && {
            top: triggerLayout.y + triggerLayout.height + 16,
            left: triggerLayout.x,
          }),
          ...(position === 'left' && {
            top: triggerLayout.y,
            left: Math.max(8, triggerLayout.x - contentLayout.width - 8),
          }),
        }}
      >
        {children}
      </Col>
    </Modal>
  )
}

function Item({
  onPress,
  children,
  className,
  variant = 'default',
}: {
  onPress?: () => void
  children: ReactNode
  className?: string
  variant?: 'default' | 'destructive'
}) {
  const { close } = useDropdown()

  return (
    <Row
      onPress={() => {
        onPress?.()
        close()
      }}
      className={cn('px-[22px] py-[10px]', className)}
      style={{
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 13.5,
        elevation: 1,
      }}
    >
      <Text
        variant={'subhead-02'}
        className={cn(
          'text-gray-01',
          variant === 'destructive' && 'text-sub-alert',
        )}
      >
        {children as string}
      </Text>
    </Row>
  )
}

export const Dropdown = {
  Root,
  Trigger,
  Content,
  Item,
}
