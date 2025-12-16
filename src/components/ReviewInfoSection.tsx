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
    <Col className="gap-4">
      <Row align="center" gap={10}>
        <Text variant="subhead-04" className="text-gray-01">
          {title}
        </Text>
        <InfoBadge label={badgeLabel} />
      </Row>

      <Text variant="body-01" className="text-gray-01">
        {description}
      </Text>
    </Col>
  )
}
