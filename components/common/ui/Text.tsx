import { cn } from '@/utils/cn'
import { cva, VariantProps } from 'class-variance-authority'
import * as React from 'react'
import { forwardRef } from 'react'
import { Text as RNText, type TextProps as RNTextProps } from 'react-native'

export const textVariants = cva('tracking-[-0.6px]', {
  variants: {
    variant: {
      // Body
      'body-02': 'text-[16px] leading-[24px] font-normal',
      'body-long-02': 'text-[16px] leading-[28px] font-normal',
      'body-01': 'text-[14px] leading-[20px] font-normal',
      'body-long-01': 'text-[14px] leading-[22px] font-normal',
      caption: 'text-[12px] leading-[18px] font-normal',

      // Title
      'display-05': 'text-[40px] leading-[52px] font-bold',
      'display-04': 'text-[36px] leading-[46px] font-bold',
      'display-03': 'text-[32px] leading-[42px] font-bold',
      'display-02': 'text-[28px] leading-[38px] font-bold',
      'display-01': 'text-[24px] leading-[34px] font-bold',
      headline: 'text-[20px] leading-[28px] font-bold',
      'subhead-03': 'text-[16px] leading-[22px] font-semibold',
      'subhead-long-03': 'text-[16px] leading-[28px] font-medium',
      'subhead-02': 'text-[14px] leading-[20px] font-semibold',
      'subhead-long-02': 'text-[14px] leading-[24px] font-medium',
      'subhead-01': 'text-[12px] leading-[18px] font-semibold',
      'subhead-long-01': 'text-[12px] leading-[18px] font-bold',
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
