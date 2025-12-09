import { cn } from '@/utils/cn'
import { View } from 'react-native'
import { Text } from './common/ui/Text'

type TagProps = {
  label: string
  variant?: 'default' | 'primary'
  className?: string
}

export function Tag({ label, variant = 'default', className }: TagProps) {
  return (
    <View
      className={cn(
        'items-center justify-center rounded-lg px-4 py-2.5',
        {
          'bg-gray-10': variant === 'default',
          'bg-primary-04': variant === 'primary',
        },
        className,
      )}
    >
      <Text
        variant="body-02"
        className={cn({
          'text-gray-01': variant === 'default',
          'font-semibold text-gray-12': variant === 'primary',
        })}
      >
        {label}
      </Text>
    </View>
  )
}
