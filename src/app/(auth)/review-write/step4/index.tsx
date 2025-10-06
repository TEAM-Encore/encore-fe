import { View } from 'react-native'
import { useRouter } from 'expo-router'
import { Screen } from '@/components/common/ui/Screen'
import { StepHeader } from '@/components/StepHeader'
import { StepIndicator } from '@/components/StepIndicator'
import { Button } from '@/components/Button'
import { Text } from '@/components/common/ui/Text'

export default function ReviewWriteStep4() {
  const router = useRouter()

  const handleNext = () => {
    router.push('/review-write/step5')
  }

  return (
    <Screen
      header={<StepHeader title="후기글 추가" currentStep={4} totalSteps={6} />}
      fixedButton={<Button onPress={handleNext}>다음</Button>}
    >
      <StepIndicator
        currentStep={4}
        totalSteps={6}
        instruction="4단계 - 구현 예정"
      />

      <View className="flex-1 items-center justify-center">
        <Text className="text-white text-center mb-8">
          4단계 페이지입니다.{'\n'}아직 구현되지 않았습니다.
        </Text>
      </View>
    </Screen>
  )
}