import { Button } from '@/components/Button'
import { Col } from '@/components/common/ui/Flex'
import { Screen } from '@/components/common/ui/Screen'
import { Text } from '@/components/common/ui/Text'
import { Dialog } from '@/components/Dialog'
import { ReviewOptions } from '@/components/ReviewOptions'
import { StepHeader } from '@/components/StepHeader'
import { FormTextField } from '@/components/TextField'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'expo-router'
import { overlay } from 'overlay-kit'
import { useForm } from 'react-hook-form'
import { ScrollView } from 'react-native'
import type { z } from 'zod'
import { reviewWriteSchema } from '../schema'

const step4Schema = reviewWriteSchema.pick({
  soundQuality: true,
  soundQualityReason: true,
})
type Step4FormType = z.infer<typeof step4Schema>

const soundQualityOptions = [
  { value: 'GOOD' as const, label: '잘 들려요' },
  { value: 'AVERAGE' as const, label: '보통이에요' },
  { value: 'POOR' as const, label: '좋지 않아요' },
]

export default function ReviewWriteStep4() {
  const router = useRouter()

  const form = useForm<Step4FormType>({
    resolver: zodResolver(step4Schema),
    mode: 'onChange',
    defaultValues: {
      soundQuality: 'GOOD',
      soundQualityReason: '',
    },
  })

  const selectedQuality = form.watch('soundQuality')

  const handleQualitySelect = (value: 'GOOD' | 'AVERAGE' | 'POOR') => {
    form.setValue('soundQuality', value, { shouldValidate: true })
  }

  const handleNext = () => {
    const values = form.getValues()
    router.push('/review-write/step5')
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

  const isFormValid = form.formState.isValid

  return (
    <Screen
      header={
        <StepHeader
          title="후기글 추가"
          currentStep={4}
          totalSteps={6}
          showBack={true}
          showClose={true}
          onClose={handleClose}
        />
      }
      fixedButton={
        <Button onPress={handleNext} disabled={!isFormValid}>
          다음
        </Button>
      }
    >
      <Col className="mt-6 gap-5">
        <Text variant="body-01" className="text-gray-07">
          4/6
        </Text>

        <Text variant="subhead-05" className="font-semibold text-gray-01">
          관람한 공연의 음향은 어떤가요?
        </Text>
      </Col>

      <ScrollView showsVerticalScrollIndicator={false} className="mt-5">
        <Col className="gap-5">
          <ReviewOptions
            options={soundQualityOptions}
            value={selectedQuality}
            onSelect={handleQualitySelect}
          />

          <FormTextField
            control={form.control}
            name="soundQualityReason"
            placeholder="자유롭게 이유를 작성해주세요. (최소 20자)"
            as="textarea"
          />
        </Col>
      </ScrollView>
    </Screen>
  )
}
