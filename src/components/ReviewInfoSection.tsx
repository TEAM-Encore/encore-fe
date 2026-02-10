import { Col, Row } from './common/ui/Flex'
import { Text } from './common/ui/Text'
import { InfoBadge } from './InfoBadge'

type ReviewInfoSectionProps = {
  title: string
  badgeLabel: string
  description: string
}

export function ReviewInfoSection({
  title,
  badgeLabel,
  description,
}: ReviewInfoSectionProps) {
  return (
    <Col gap={16}>
      <Row align="center" gap={10}>
        <Text variant="subhead-04" color="gray-01" className="text-[18px]">
          {title}
        </Text>
        {badgeLabel && <InfoBadge label={badgeLabel} />}
      </Row>

      <Text variant="body-01" className="text-gray-01">
        {description}
      </Text>
    </Col>
  )
}
