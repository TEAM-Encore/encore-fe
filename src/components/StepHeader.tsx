import { View } from 'react-native'
import { useRouter } from 'expo-router'
import { Header } from '@/components/Header'

interface StepHeaderProps {
  title: string
  currentStep: number
  totalSteps: number
  onBack?: () => void
}

export function StepHeader({ title, currentStep, totalSteps, onBack }: StepHeaderProps) {
  const router = useRouter()
  const progress = (currentStep / totalSteps) * 100

  return (
    <>
      <Header progress={progress}>
        <Header.Back onPress={onBack || (() => router.back())} />
        <Header.Center>{title}</Header.Center>
      </Header>
    </>
  )
}