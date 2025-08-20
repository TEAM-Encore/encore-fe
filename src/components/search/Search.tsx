import { colors } from '@/styles/color'
import { cn } from '@/utils/cn'
import { TextInput, View } from 'react-native'
import { Icon } from '../common/icons/Icon'

type SearchProps = React.ComponentProps<typeof TextInput> & {
  onDelete: VoidFunction
  value?: string
}

export function Search({ className, onDelete, value, ...rest }: SearchProps) {
  return (
    <View className="relative w-full">
      <Icon
        name="Search"
        size={18}
        className="absolute left-4 top-1/2 z-10 -translate-y-1/2 text-gray-01"
      />
      <TextInput
        value={value}
        placeholderTextColor={colors.gray['07']}
        placeholderClassName="text-[16px]"
        className={cn(
          'h-[48px] w-full rounded-[8px] bg-gray-10 pl-[43px] text-[16px] text-gray-01',
          className,
        )}
        {...rest}
      />
      {!!value?.length && (
        <Icon
          name="XCircle"
          size={20}
          className="absolute right-4 top-1/2 z-10 -translate-y-1/2"
          onPress={onDelete}
        />
      )}
    </View>
  )
}
