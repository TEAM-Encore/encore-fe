import { cn } from '@/utils/cn'
import { cva, VariantProps } from 'class-variance-authority'
import * as React from 'react'
import { Pressable } from 'react-native'
import { TextClassContext } from './Text'

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md',
  {
    variants: {
      variant: {
        default: 'bg-[#6F6F6F] active:bg-[#6F6F6F]/80 text-white',
        variant2: 'bg-[#FFDD56] active:bg-[#FFDD56]/80 text-black',
      },
      size: {
        default: 'px-4 py-2',
        cta: 'h-[52px] w-full rounded-[10px]',
      },
    },
    defaultVariants: {
      variant: 'variant2',
      size: 'default',
    },
  },
)

const buttonTextVariants = cva('text-sm font-medium text-foreground', {
  variants: {
    variant: {
      default: 'text-white',
      variant2: 'text-black',
    },
    size: {
      default: '',
      cta: 'text-[18px] font-semibold', // Subhead-04
    },
    defaultVariants: {
      variant: 'variant2',
      size: 'default',
    },
  },
})

type ButtonProps = React.ComponentProps<typeof Pressable> &
  VariantProps<typeof buttonVariants>

function Button({ ref, className, variant, size, ...props }: ButtonProps) {
  return (
    <TextClassContext.Provider value={buttonTextVariants({ variant, size })}>
      <Pressable
        ref={ref}
        role="button"
        className={cn(
          props.disabled && 'opacity-50',
          buttonVariants({ variant, size, className }),
        )}
        {...props}
      />
    </TextClassContext.Provider>
  )
}

export { Button, buttonVariants }
export type { ButtonProps }
