import { Col } from '@/components/common/ui/Flex'
import { Text } from '@/components/common/ui/Text'

interface StepIndicatorProps {
  currentStep: number
  totalSteps: number
  instruction: string
  className?: string
}

export function StepIndicator({
  currentStep,
  totalSteps,
  instruction,
  className,
}: StepIndicatorProps) {
  return (
    <Col gap={12} className={className}>
      <Text variant="body-01" color="gray-07">
        {currentStep}/{totalSteps}
      </Text>
      <Text
        variant="subhead-05"
        color="gray-01"
        className="whitespace-pre-line font-semibold"
      >
        {instruction}
      </Text>
    </Col>
  )
}
