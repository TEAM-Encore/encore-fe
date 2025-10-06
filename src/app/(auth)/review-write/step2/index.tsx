import { Button } from '@/components/Button'
import { Screen } from '@/components/common/ui/Screen'
import { Text } from '@/components/common/ui/Text'
import { StepHeader } from '@/components/StepHeader'
import { StepIndicator } from '@/components/StepIndicator'
import { useRouter } from 'expo-router'
import React from 'react'
import { View } from 'react-native'

export default function ReviewWriteStep2() {
  const router = useRouter()

  const handleNext = () => {
    router.push('/review-write/step3')
  }

  return (
    <Screen
      header={<StepHeader title="후기글 추가" currentStep={2} totalSteps={6} />}
      fixedButton={<Button onPress={handleNext}>다음</Button>}
    >
      <StepIndicator
        currentStep={2}
        totalSteps={6}
        instruction="2단계 - 구현 예정"
      />

      <View className="flex-1 items-center justify-center">
        <Text className="text-white text-center mb-8">
          2단계 페이지입니다.{'\n'}아직 구현되지 않았습니다.
        </Text>
      </View>
    </Screen>
  )
}