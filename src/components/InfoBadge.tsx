import { Row } from './common/ui/Flex'
import { Text } from './common/ui/Text'
import { Icon } from './common/icons/Icon'
import type { IconName } from './common/icons/Icon'

type InfoBadgeProps = {
  label: string
  icon?: IconName
}

export function InfoBadge({ label, icon }: InfoBadgeProps) {
  return (
    <Row align="center" className="rounded-lg bg-gray-11 px-3 py-2">
      {icon && <Icon name={icon} size={16} className="text-gray-01" />}
      <Text
        variant="body-02"
        className={icon ? 'ml-1 font-semibold text-sub-04' : 'font-semibold text-sub-04'}
      >
        {label}
      </Text>
    </Row>
  )
}
