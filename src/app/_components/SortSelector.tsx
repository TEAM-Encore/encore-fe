import { Flex, Row } from '@/components/common/ui/Flex'
import { Text } from '@/components/common/ui/Text'
import { cn } from '@/utils/cn'

interface SortSelectorProps {
  tabs: { label: string; value: string }[]
  value: string
  onChange: (value: string) => void
}

function SortSelector({ tabs, value, onChange }: SortSelectorProps) {
  return (
    <Row gap={8} align="center" className="p-5">
      {tabs.map((tab) => (
        <Flex
          key={tab.value}
          center
          className={cn(
            'rounded-[18px] border px-3.5 py-2',
            value === tab.value
              ? 'border-primary-04 bg-primary-04'
              : 'border-gray-04',
          )}
          onPress={() => onChange(tab.value)}
        >
          <Text
            variant="subhead-02"
            color={value === tab.value ? 'gray-12' : 'gray-04'}
          >
            {tab.label}
          </Text>
        </Flex>
      ))}
    </Row>
  )
}

export default SortSelector