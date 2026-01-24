import { Button } from '@/components/Button'
import { Col } from '@/components/common/ui/Flex'
import { Screen } from '@/components/common/ui/Screen'
import { Text } from '@/components/common/ui/Text'
import { Dialog } from '@/components/Dialog'
import { SeatViewImageGrid } from '@/components/SeatViewImageGrid'
import { StepHeader } from '@/components/StepHeader'
import { FormTextField } from '@/components/TextField'
import { useReviewWriteContext } from '@/contexts/ReviewWriteContext'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'expo-router'
import { overlay } from 'overlay-kit'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { ScrollView } from 'react-native'
import type { z } from 'zod'
import { reviewWriteSchema } from '../schema'

const step3Schema = reviewWriteSchema.pick({
  seatViewImage: true,
  seatViewComment: true,
})
type Step3FormType = z.infer<typeof step3Schema>

// TODO: API 연동 후 실제 이미지로 교체
const generateMockImages = () => {
  return Array.from({ length: 4 }, (_, i) => ({
    id: `image-${i + 1}-${Date.now()}`,
    url: `https://via.placeholder.com/400x300?text=Seat+View+${i + 1}`,
  }))
}

export default function ReviewWriteStep3() {
  const router = useRouter()
  const { setData } = useReviewWriteContext()
  const [images, setImages] = useState(generateMockImages())
  const [selectedImage, setSelectedImage] = useState<string | null>(null)

  const form = useForm<Step3FormType>({
    resolver: zodResolver(step3Schema),
    mode: 'onChange',
    defaultValues: {
      seatViewImage: '',
      seatViewComment: '',
    },
  })

  const handleImageSelect = (imageId: string) => {
    setSelectedImage(imageId)
    form.setValue('seatViewImage', imageId, { shouldValidate: true })
  }

  const handleRefresh = () => {
    setImages(generateMockImages())
    setSelectedImage(null)
    form.setValue('seatViewImage', '', { shouldValidate: true })
  }

  const handleNext = () => {
    const values = form.getValues()
    setData({
      seatViewImage: values.seatViewImage,
      seatViewComment: values.seatViewComment,
    })
    router.push('/review-write/step4')
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

  const isFormValid =
    form.formState.isValid && selectedImage !== null && selectedImage !== ''

  return (
    <Screen
      header={
        <StepHeader
          title="후기글 추가"
          currentStep={3}
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
          3/6
        </Text>

        <Text variant="subhead-05" className="font-semibold text-gray-01">
          관람한 공연의 시야와{'\n'}가장 비슷한 것을 선택해주세요!
        </Text>
      </Col>

      <ScrollView showsVerticalScrollIndicator={false} className="mt-5">
        <Col className="gap-5">
          <SeatViewImageGrid
            images={images}
            selectedImage={selectedImage}
            onImageSelect={handleImageSelect}
            onRefresh={handleRefresh}
          />

          <FormTextField
            control={form.control}
            name="seatViewComment"
            placeholder="시야와 관련된 추가 의견을 작성해주세요. (최소 20자)"
            as="textarea"
          />
        </Col>
      </ScrollView>
    </Screen>
  )
}
