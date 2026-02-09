import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'expo-router'
import { overlay } from 'overlay-kit'
import { useForm } from 'react-hook-form'
import { ScrollView } from 'react-native'
import type { z } from 'zod'
import { Button } from '@/components/Button'
import { Col } from '@/components/common/ui/Flex'
import { Dialog } from '@/components/Dialog'
import { ReviewOptions } from '@/components/ReviewOptions'
import { FormTextField } from '@/components/TextField'
import { useReviewWriteContext } from '@/contexts/ReviewWriteContext'
import { ReviewWriteStepLayout } from '../_components/ReviewWriteStepLayout'
import { reviewWriteSchema } from '../schema'

const step5Schema = reviewWriteSchema.pick({
  facilityQuality: true,
  facilityQualityReason: true,
})
type Step5FormType = z.infer<typeof step5Schema>

const facilityQualityOptions = [
  { value: 'GOOD' as const, label: '쾌적해요' },
  { value: 'AVERAGE' as const, label: '보통이에요' },
  { value: 'POOR' as const, label: '좋지 않아요' },
]

export default function ReviewWriteStep5() {
  const router = useRouter()
  const { setData } = useReviewWriteContext()

  const form = useForm<Step5FormType>({
    resolver: zodResolver(step5Schema),
    mode: 'onChange',
    defaultValues: {
      facilityQuality: 'GOOD',
      facilityQualityReason: '',
    },
  })

  const selectedQuality = form.watch('facilityQuality')

  const handleQualitySelect = (value: 'GOOD' | 'AVERAGE' | 'POOR') => {
    form.setValue('facilityQuality', value, { shouldValidate: true })
  }

  const handleNext = () => {
    const values = form.getValues()
    setData({
      facilityQuality: values.facilityQuality,
      facilityQualityReason: values.facilityQualityReason,
    })
    router.push('/review-write/step6')
  }

  const isFormValid = form.formState.isValid

  return (
    <ReviewWriteStepLayout
      instruction="관람한 공연의 시설은 어떤가요?"
      fixedButton={
        <Button onPress={handleNext} disabled={!isFormValid}>
          다음
        </Button>
      }
    >
      <ScrollView showsVerticalScrollIndicator={false}>
        <Col gap={20}>
          <ReviewOptions
            options={facilityQualityOptions}
            value={selectedQuality}
            onSelect={handleQualitySelect}
          />

          <FormTextField
            control={form.control}
            name="facilityQualityReason"
            placeholder="자유롭게 이유를 작성해주세요. (최소 20자)"
            as="textarea"
            className="p-4 text-body-02 placeholder:text-gray-06"
          />
        </Col>
      </ScrollView>
    </ReviewWriteStepLayout>
  )
}
