import { cn } from '@/utils/cn'
import { Flex, Row } from './common/ui/Flex'
import { Text } from './common/ui/Text'

type Option<T extends string> = {
  label: string
  value: T
}

type ReviewOptionsProps<T extends string> = {
  value: T
  options: Option<T>[]
  onSelect: (value: T) => void
}

export function ReviewOptions<T extends string>({
  options,
  value,
  onSelect,
}: ReviewOptionsProps<T>) {
  return (
    <Row className="w-full overflow-hidden rounded-tl-[10px] rounded-tr-[10px] rounded-br-[10px] rounded-bl-[10px]">
      {options.map((option, index) => (
        <Flex
          key={option.value}
          center
          className={cn(
            'h-[54px] flex-1 border-gray-10 border-r-[0.5px] bg-gray-11 px-2 py-4',
            {
              'bg-primary-04': value === option.value,
              'bg-gray-11': value !== option.value,
              'border-r-0': index === options.length - 1,
            },
          )}
          onPress={() => onSelect(option.value)}
        >
          <Text
            variant={value !== option.value ? 'body-02' : 'subhead-03'}
            color={value !== option.value ? 'gray-08' : 'gray-12'}
            numberOfLines={1}
            adjustsFontSizeToFit
          >
            {option.label}
          </Text>
        </Flex>
      ))}
    </Row>
  )
}
