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
        'bg-[#FFDD56] active:bg-[#FFDD56]/80',
        disabled && 'bg-[#6F6F6F]',
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
            disabled ? 'text-white' : 'text-[#171717]',
          )}
        >
          {text}
        </Text>
      )}
    </Pressable>
  )
}

export { CTAButton }
