import { colors } from '@/styles/color'
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
    <Row className="w-full overflow-hidden rounded-bl-[10px] rounded-br-[10px] rounded-tl-[10px] rounded-tr-[10px]">
      {options.map((option, index) => (
        <Flex
          center
          key={option.value}
          style={[
            {
              backgroundColor:
                option.value === value
                  ? colors.primary['04']
                  : colors.gray['11'],
              transitionProperty: 'backgroundColor',
              transitionDuration: '200ms',
            },
          ]}
          className={cn(
            'h-14 flex-1 border-r-[0.5px] border-gray-10 bg-gray-11',
            {
              'bg-primary-04': value === option.value,
              'border-r-0': index === options.length - 1,
            },
          )}
          onPress={() => onSelect(option.value)}
        >
          <Text
            variant="body-02"
            className={cn({
              'text-gray-08': value !== option.value,
              'font-semibold text-gray-12': value === option.value,
            })}
          >
            {option.label}
          </Text>
        </Flex>
      ))}
    </Row>
  )
}
