import { cn } from '@/utils/cn'
import { Pressable } from 'react-native'
import { Text } from './common/ui/Text'

type CTAButtonProps = React.ComponentProps<typeof Pressable> & {
  text?: string
  children?: React.ReactNode
}

function CTAButton({
  ref,
  className,
  disabled = false,
  text = '다음',
  children,
  ...props
}: CTAButtonProps) {
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
      {children ? (
        children
      ) : (
        <Text
          className={cn(
            'font-semibold text-[18px]',
            disabled ? 'text-sub-white' : 'text-gray-12',
          )}
        >
          {text}
        </Text>
      )}
    </Pressable>
  )
}

export { CTAButton }
