import { Col, Row } from '@/components/common/ui/Flex'
import { Text } from '@/components/common/ui/Text'

interface PointItemProps {
  title: string
  date: string
  point: string
}

export function PointItem({ title, date, point }: PointItemProps) {
  return (
    <Row align="center" className="border-b border-b-gray-09 py-[13px]">
      <Col gap={4} className="flex-1">
        <Text variant="body-01" color="gray-01">
          {title}
        </Text>
        <Text variant="caption" className="text-[#6D6D6D]">
          {date.split('T')[0].replaceAll('-', '/')}
        </Text>
      </Col>
      <Text
        variant="body-02"
        className={point.includes('+') ? 'text-[#237BFF]' : 'text-sub-alert'}
      >
        {point}
      </Text>
    </Row>
  )
}
