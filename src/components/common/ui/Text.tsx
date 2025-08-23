import { cn } from '@/utils/cn'
import { cva, VariantProps } from 'class-variance-authority'
import * as React from 'react'
import { forwardRef } from 'react'
import {
  Animated,
  Text as RNText,
  type TextProps as RNTextProps,
} from 'react-native'

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
      'subhead-03': 'text-subhead-03',
      'subhead-long-03': 'text-subhead-long-03',
      'subhead-02': 'text-subhead-02',
      'subhead-long-02': 'text-subhead-long-02',
      'subhead-01': 'text-subhead-01',
      'subhead-long-01': 'text-subhead-long-01',
    },
  },
})

export type TextProps = RNTextProps & {
  variant?: VariantProps<typeof textVariants>['variant']
}

export const Text = forwardRef<RNText, TextProps>(function Text(
  { children, className, variant = 'body-01', ...props },
  ref,
) {
  return (
    <RNText
      ref={ref}
      className={cn(textVariants({ variant }), className)}
      {...props}
    >
      {children}
    </RNText>
  )
})

export const AnimatedText = Animated.createAnimatedComponent(Text)
