import { Icon } from './common/icons/Icon'
import { Row } from './common/ui/Flex'
import { Text } from './common/ui/Text'
import { Dropdown } from './Dropdown'

export type Quality = 'GOOD' | 'AVERAGE' | 'POOR'
export const QUALITY_VALUES = ['GOOD', 'AVERAGE', 'POOR'] as const

type QualityDropdownProps = {
  value: number
  onChange: (index: number) => void
  type: 'sound' | 'facility'
}

const SOUND_LABELS = ['잘 들려요', '보통이에요', '좋지 않아요']
const FACILITY_LABELS = ['쾌적해요', '보통이에요', '좋지 않아요']

export function QualityDropdown({
  value,
  onChange,
  type,
}: QualityDropdownProps) {
  const labels = type === 'sound' ? SOUND_LABELS : FACILITY_LABELS

  return (
    <Dropdown.Root>
      <Dropdown.Trigger>
        <Row align="center" gap={8} className="rounded-lg bg-gray-11 px-3 py-2">
          <Text variant="body-02" className="font-semibold text-sub-04">
            {labels[value - 1]}
          </Text>
          <Icon name="ArrowDown" size={16} className="text-gray-01" />
        </Row>
      </Dropdown.Trigger>
      <Dropdown.Content position="bottom">
        {labels.map((label, index) => (
          <Dropdown.Item
            key={label}
            onPress={() => onChange(index)}
            className={
              index === value
                ? `bg-sub-04/80 ${index === 0 ? 'rounded-t-[8px]' : ''} ${index === labels.length - 1 ? 'rounded-b-[8px]' : ''}`
                : ''
            }
          >
            {label}
          </Dropdown.Item>
        ))}
      </Dropdown.Content>
    </Dropdown.Root>
  )
}
