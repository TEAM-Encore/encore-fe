import { cva, type VariantProps } from 'class-variance-authority'
import * as React from 'react'
import { forwardRef } from 'react'
import {
  Animated,
  type Text as RNText,
  type TextProps as RNTextProps,
  type TextStyle,
} from 'react-native'
import { type ColorKeys, flattenColorKeys } from '@/styles/color'
import { cn } from '@/utils/cn'

export const textVariants = cva('tracking-[-0.6px]', {
  variants: {
    variant: {
      // Body
      'body-02': 'text-body-02',
      'body-long-02': 'text-body-long-02',
      'body-01': 'text-body-01',
      'body-long-01': 'text-body-long-01',
      caption: 'text-caption',

      // Title
      'display-05': 'text-display-05',
      'display-04': 'text-display-04',
      'display-03': 'text-display-03',
      'display-02': 'text-display-02',
      'display-01': 'text-display-01',
      headline: 'text-headline',
      'subhead-05': 'text-subhead-05',
      'subhead-04': 'text-subhead-04',
      'subhead-03': 'text-subhead-03',
      'subhead-long-03': 'text-subhead-long-03',
      'subhead-02': 'text-subhead-02',
      'subhead-long-02': 'text-subhead-long-02',
      'subhead-01': 'text-subhead-01',
      'subhead-long-01': 'text-subhead-long-01',
    },
    color: {
      'gray-12': 'text-gray-12',
      'gray-11': 'text-gray-11',
      'gray-10': 'text-gray-10',
      'gray-09': 'text-gray-09',
      'gray-08': 'text-gray-08',
      'gray-07': 'text-gray-07',
      'gray-06': 'text-gray-06',
      'gray-05': 'text-gray-05',
      'gray-04': 'text-gray-04',
      'gray-03': 'text-gray-03',
      'gray-02': 'text-gray-02',
      'gray-01': 'text-gray-01',
      'primary-04': 'text-primary-04',
      'primary-03': 'text-primary-03',
      'primary-02': 'text-primary-02',
      'primary-01': 'text-primary-01',
      'sub-alert': 'text-sub-alert',
      'sub-black': 'text-sub-black',
      'sub-white': 'text-sub-white',
    },
  },
})

export type TextProps = RNTextProps & {
  variant?: VariantProps<typeof textVariants>['variant']
  color?: ColorKeys
  flex?: number
}

export const Text = forwardRef<RNText, TextProps>(function Text(
  {
    children,
    className,
    variant = 'body-01',
    color = 'gray-12',
    flex,
    style,
    ...props
  },
  ref,
) {
  return (
    <Animated.Text
      ref={ref}
      className={cn(textVariants({ variant, color }), className)}
      style={[{ flex }, style]}
      {...props}
    >
      {children}
    </Animated.Text>
  )
})
