import { Flex, Row } from '@/components/common/ui/Flex'
import { Text } from '@/components/common/ui/Text'
import { cn } from '@/utils/cn'

interface SortSelectorProps {
  data: string[]
  value: string
  onChange: (value: string) => void
}

export function SortSelector({ data, value, onChange }: SortSelectorProps) {
  return (
    <Row gap={8} align="center" className="p-5">
      {data.map((item) => (
        <Flex
          key={item}
          align="center"
          justify="center"
          className={cn(
            'rounded-[18px] border px-3.5 py-2',
            value === item
              ? 'border-primary-04 bg-primary-04'
              : 'border-gray-04',
          )}
          onPress={() => onChange(item)}
        >
          <Text
            variant="subhead-02"
            color={value === item ? 'gray-12' : 'gray-04'}
          >
            {item}
          </Text>
        </Flex>
      ))}
    </Row>
  )
}
