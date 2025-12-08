import { TextInput, View } from 'react-native'
import { colors } from '@/styles/color'
import { cn } from '@/utils/cn'
import { Icon } from '../common/icons/Icon'
import { Row } from '../common/ui/Flex'

type SearchProps = React.ComponentProps<typeof TextInput> & {
  onDelete: VoidFunction
  value?: string
}

export function Search({ className, onDelete, value, ...rest }: SearchProps) {
  return (
    <Row className="relative w-full">
      <Icon
        name="Search"
        size={18}
        className="-translate-y-1/2 absolute top-1/2 left-4 z-10 text-gray-01"
      />
      <TextInput
        value={value}
        placeholderTextColor={colors.gray['07']}
        placeholderClassName="text-[16px]"
        textAlignVertical="center"
        className={cn(
          'h-[48px] w-full rounded-[8px] bg-gray-10 px-[43px] text-[16px] text-gray-01',
          className,
        )}
        {...rest}
      />
      {!!value?.length && (
        <Icon
          name="XCircle"
          size={20}
          className="-translate-y-1/2 absolute top-1/2 right-4 z-10"
          onPress={onDelete}
        />
      )}
    </Row>
  )
}
