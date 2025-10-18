import { Button } from '@/components/Button'
import { Screen } from '@/components/common/ui/Screen'
import { Text } from '@/components/common/ui/Text'
import { StepHeader } from '@/components/StepHeader'
import { StepIndicator } from '@/components/StepIndicator'
import { useRouter } from 'expo-router'
import { View } from 'react-native'

export default function ReviewWriteStep5() {
  const router = useRouter()

  const handleNext = () => {
    router.push('/review-write/step6')
  }

  return (
    <Screen
      header={<StepHeader title="후기글 추가" currentStep={5} totalSteps={6} />}
      fixedButton={<Button onPress={handleNext}>다음</Button>}
    >
      <StepIndicator
        currentStep={5}
        totalSteps={6}
        instruction="5단계 - 구현 예정"
        className="my-7"
      />

      <View className="flex-1 items-center justify-center">
        <Text className="mb-8 text-center text-white">
          5단계 페이지입니다.{'\n'}아직 구현되지 않았습니다.
        </Text>
      </View>
    </Screen>
  )
}
