import { Text } from "@/components/common/ui/Text";
import { Col } from "@/components/common/ui/Flex";
import { cn } from "@/utils/cn";

interface StepIndicatorProps {
    currentStep: number;
    totalSteps: number;
    instruction: string;
    className?: string;
}

export function StepIndicator({
    currentStep,
    totalSteps,
    instruction,
    className,
}: StepIndicatorProps) {
    return (
        <Col className={className}>
            {/* Step Number */}
            <Text variant="body-01" className="text-gray-07 mb-3">
                {currentStep}/{totalSteps}
            </Text>

            {/* Instruction */}
            <Text variant="subhead-05" className="text-gray-01 font-semibold">
                {instruction}
            </Text>
        </Col>
    );
}
