import type React from 'react'
import { View } from 'react-native'
import { cn } from '@/utils/cn'

type SpacingProps = Omit<React.ComponentProps<typeof View>, 'children'> & {
  children?: never
  direction?: 'vertical' | 'horizontal'
  size: number
}

export function Spacing({
  size,
  className,
  direction = 'vertical',
  ...rest
}: SpacingProps) {
  return (
    <View
      className={cn('flex-none', className)}
      style={{
        [direction === 'vertical' ? 'height' : 'width']: size,
      }}
      {...rest}
    />
  )
}
