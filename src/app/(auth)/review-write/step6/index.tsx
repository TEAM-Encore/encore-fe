import { Button } from '@/components/Button'
import { Screen } from '@/components/common/ui/Screen'
import { Text } from '@/components/common/ui/Text'
import { StepHeader } from '@/components/StepHeader'
import { StepIndicator } from '@/components/StepIndicator'
import { useRouter } from 'expo-router'
import { View } from 'react-native'

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
        className="my-7"
      />

      <View className="flex-1 items-center justify-center">
        <Text className="mb-8 text-center text-white">
          6단계 페이지입니다.{'\n'}마지막 단계이며 아직 구현되지 않았습니다.
        </Text>
      </View>
    </Screen>
  )
}
