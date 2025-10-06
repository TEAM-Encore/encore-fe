import { View } from 'react-native'
import { useRouter } from 'expo-router'
import { Screen } from '@/components/common/ui/Screen'
import { StepHeader } from '@/components/StepHeader'
import { StepIndicator } from '@/components/StepIndicator'
import { Button } from '@/components/Button'
import { Text } from '@/components/common/ui/Text'

export default function ReviewWriteStep6() {
  const router = useRouter()

  const handleComplete = () => {
    // 완료 후 메인 페이지로 이동
    router.push('/')
  }

  return (
    <Screen
      header={<StepHeader title="후기글 추가" currentStep={6} totalSteps={6} />}
      fixedButton={<Button onPress={handleComplete}>완료</Button>}
    >
      <StepIndicator
        currentStep={6}
        totalSteps={6}
        instruction="6단계 - 구현 예정 (마지막 단계)"
      />

      <View className="flex-1 items-center justify-center">
        <Text className="text-white text-center mb-8">
          6단계 페이지입니다.{'\n'}마지막 단계이며 아직 구현되지 않았습니다.
        </Text>
      </View>
    </Screen>
  )
}