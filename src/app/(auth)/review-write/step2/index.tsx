import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'expo-router'
import { useForm } from 'react-hook-form'
import type { z } from 'zod'
import { Button } from '@/components/Button'
import { FormTextField } from '@/components/TextField'
import { useReviewWriteContext } from '@/contexts/ReviewWriteContext'
import { ReviewWriteStepLayout } from '../_components/ReviewWriteStepLayout'
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

  return (
    <ReviewWriteStepLayout
      instruction="후기의 제목을 입력해주세요."
      fixedButton={
        <Button onPress={handleNext} disabled={!form.formState.isValid}>
          다음
        </Button>
      }
    >
      <FormTextField
        control={form.control}
        name="title"
        placeholder="30자 이내로 입력해주세요."
      />
    </ReviewWriteStepLayout>
  )
}
