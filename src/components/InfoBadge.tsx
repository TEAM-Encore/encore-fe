import type { IconName } from './common/icons/Icon'
import { Icon } from './common/icons/Icon'
import { Row } from './common/ui/Flex'
import { Text } from './common/ui/Text'

type InfoBadgeProps = {
  label: string
  icon?: IconName
}

export function InfoBadge({ label, icon }: InfoBadgeProps) {
  return (
    <Row gap={2} align="center" className="h-[34px] rounded-lg bg-gray-11 px-3">
      {icon && (
        <Icon name={icon} color="gray-01" size={14} className="py-0.5" />
      )}
      <Text variant="subhead-02" color="sub-04">
        {label}
      </Text>
    </Row>
  )
}
