import { Button } from '@/components/Button'
import { Screen } from '@/components/common/ui/Screen'
import { Dialog } from '@/components/Dialog'
import { StepHeader } from '@/components/StepHeader'
import { StepIndicator } from '@/components/StepIndicator'
import { FormTextField } from '@/components/TextField'
import { useReviewWriteContext } from '@/contexts/ReviewWriteContext'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'expo-router'
import { overlay } from 'overlay-kit'
import { useForm } from 'react-hook-form'
import type { z } from 'zod'
import { reviewWriteSchema } from '../schema'

const step2Schema = reviewWriteSchema.pick({ title: true })
type Step2FormType = z.infer<typeof step2Schema>

export default function ReviewWriteStep2() {
  const router = useRouter()
  const { setData } = useReviewWriteContext()

  const form = useForm<Step2FormType>({
    resolver: zodResolver(step2Schema),
    mode: 'onChange',
    defaultValues: {
      title: '',
    },
  })

  const handleNext = () => {
    const { title } = form.getValues()
    setData({ title })
    router.push('/review-write/step3')
  }

  const handleClose = () => {
    overlay.open((ov) => (
      <Dialog
        {...ov}
        title="리뷰 작성을 그만할까요?"
        description="중간에 나갈 시 작성한 내용이 삭제돼요."
        top="확인"
        bottom="취소"
        onTopPress={() => {
          router.push('/')
        }}
      />
    ))
  }

  return (
    <Screen
      header={
        <StepHeader
          title="후기글 추가"
          currentStep={2}
          totalSteps={6}
          onClose={handleClose}
        />
      }
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
