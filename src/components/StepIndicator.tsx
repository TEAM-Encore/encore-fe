import { Text } from "@/components/common/ui/Text";
import { View } from "react-native";

interface StepIndicatorProps {
    currentStep: number;
    totalSteps: number;
    instruction: string;
}

export function StepIndicator({
    currentStep,
    totalSteps,
    instruction,
}: StepIndicatorProps) {
    return (
        <View className="my-7">
            {/* Step Number */}
            <Text variant="body-01" className="text-gray-07 mb-3">
                {currentStep}/{totalSteps}
            </Text>

            {/* Instruction */}
            <Text variant="subhead-05" className="text-gray-01 font-semibold">
                {instruction}
            </Text>
        </View>
    );
}
