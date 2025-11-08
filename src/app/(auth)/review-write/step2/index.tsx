import { Button } from '@/components/Button'
import { Screen } from '@/components/common/ui/Screen'
import { StepHeader } from '@/components/StepHeader'
import { StepIndicator } from '@/components/StepIndicator'
import { FormTextField } from '@/components/TextField'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'expo-router'
import { useForm } from 'react-hook-form'
import type { z } from 'zod'
import { reviewWriteSchema } from '../schema'

const step2Schema = reviewWriteSchema.pick({ title: true })
type Step2FormType = z.infer<typeof step2Schema>

export default function ReviewWriteStep2() {
  const router = useRouter()

  const form = useForm<Step2FormType>({
    resolver: zodResolver(step2Schema),
    mode: 'onChange',
    defaultValues: {
      title: '',
    },
  })

  const handleNext = () => {
    const title = form.getValues('title')
    // TODO: 제목 저장 로직 (상태 관리 또는 라우터 params)
    router.push('/review-write/step3')
  }

  return (
    <Screen
      header={<StepHeader title="후기글 추가" currentStep={2} totalSteps={6} />}
      fixedButton={
        <Button onPress={handleNext} disabled={!form.formState.isValid}>
          다음
        </Button>
      }
    >
      <StepIndicator
        currentStep={2}
        totalSteps={6}
        instruction="후기의 제목을 입력해주세요."
        className="my-7"
      />

      <FormTextField
        control={form.control}
        name="title"
        placeholder="30자 이내로 입력해주세요."
      />
    </Screen>
  )
}
