import { Header } from '@/components/Header'
import { useRouter } from 'expo-router'

interface StepHeaderProps {
  title: string
  currentStep: number
  totalSteps: number
  onBack?: () => void
  onClose?: () => void
  showBack?: boolean
  showClose?: boolean
}

export function StepHeader({
  title,
  currentStep,
  totalSteps,
  onBack,
  onClose,
  showBack = true,
  showClose = false,
}: StepHeaderProps) {
  const router = useRouter()
  const progress = (currentStep / totalSteps) * 100

  return (
    <>
      <Header progress={progress}>
        {showBack && <Header.Back onPress={onBack || (() => router.back())} />}
        <Header.Center>{title}</Header.Center>
        {showClose && onClose && <Header.Close onPress={onClose} />}
      </Header>
    </>
  )
}
