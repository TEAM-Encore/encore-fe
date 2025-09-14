import { Pressable } from 'react-native'
import { cn } from '@/utils/cn'
import { Text } from './common/ui/Text'

export type ButtonProps = React.ComponentProps<typeof Pressable> & {
  text?: string
  children?: React.ReactNode
}

export function Button({
  ref,
  className,
  disabled = false,
  text = '다음',
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
      <Text
        className={cn(
          'font-semibold text-[18px]',
          disabled ? 'text-sub-white' : 'text-gray-12',
        )}
      >
        {children}
      </Text>
    </Pressable>
  )
}
