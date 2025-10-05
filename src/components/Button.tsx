import { Pressable } from 'react-native'
import { cn } from '@/utils/cn'
import { Text } from './common/ui/Text'

export type ButtonProps = React.ComponentProps<typeof Pressable> & {
  children?: React.ReactNode | string | number
}

export function Button({
  ref,
  className,
  disabled = false,
  children,
  ...props
}: ButtonProps) {
  return (
    <Pressable
      ref={ref}
      role="button"
      className={cn(
        'flex-row items-center justify-center gap-[10px] whitespace-nowrap',
        'h-[52px] w-full rounded-[10px]',
        'bg-primary-04 active:bg-primary-04/80',
        disabled && 'bg-gray-08',
        className,
      )}
      disabled={disabled}
      {...props}
    >
      {typeof children === 'string' || typeof children === 'number' ? (
        <Text
          className={cn(
            'font-semibold text-[18px]',
            disabled ? 'text-sub-white' : 'text-gray-12',
          )}
        >
          {children}
        </Text>
      ) : (
        children
      )}
    </Pressable>
  )
}
