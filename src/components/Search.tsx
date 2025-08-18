import { colors } from '@/styles/color'
import { cn } from '@/utils/cn'
import { TextInput } from 'react-native'

type SearchProps = React.ComponentProps<typeof TextInput> & {
  rightElement?: (value?: string) => React.ReactNode
}

export function Search({ rightElement, className, ...rest }: SearchProps) {
  return (
    <TextInput
      placeholderTextColor={colors.gray['07']}
      placeholderClassName="text-display-01"
      className={cn(
        'text-display-01 h-[48px] w-full rounded-[8px] bg-gray-10 pl-[43px] text-gray-01',
        className,
      )}
      {...rest}
    />
  )
}
