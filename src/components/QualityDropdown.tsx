import { Icon } from './common/icons/Icon'
import { Row } from './common/ui/Flex'
import { Text } from './common/ui/Text'
import { Dropdown } from './Dropdown'

type QualityValue = 'GOOD' | 'AVERAGE' | 'POOR'

type QualityDropdownProps = {
  value: QualityValue
  onChange: (value: QualityValue) => void
  type: 'sound' | 'facility'
}

const SOUND_LABELS: Record<QualityValue, string> = {
  GOOD: '잘 들려요',
  AVERAGE: '보통이에요',
  POOR: '좋지 않아요',
}

const FACILITY_LABELS: Record<QualityValue, string> = {
  GOOD: '쾌적해요',
  AVERAGE: '보통이에요',
  POOR: '좋지 않아요',
}

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
            {labels[value]}
          </Text>
          <Icon name="ArrowDown" size={16} className="text-gray-01" />
        </Row>
      </Dropdown.Trigger>
      <Dropdown.Content position="bottom">
        {(Object.keys(labels) as QualityValue[]).map((key) => (
          <Dropdown.Item key={key} onPress={() => onChange(key)}>
            {labels[key]}
          </Dropdown.Item>
        ))}
      </Dropdown.Content>
    </Dropdown.Root>
  )
}
