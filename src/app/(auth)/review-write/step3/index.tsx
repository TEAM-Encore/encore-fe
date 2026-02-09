import { zodResolver } from '@hookform/resolvers/zod'
import { useQuery } from '@tanstack/react-query'
import { useRouter } from 'expo-router'
import { useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'
import { ScrollView } from 'react-native'
import type { z } from 'zod'
import { reviewQueries } from '@/apis/review/queries'
import { Button } from '@/components/Button'
import { Col } from '@/components/common/ui/Flex'
import { SeatViewImageGrid } from '@/components/SeatViewImageGrid'
import { FormTextField } from '@/components/TextField'
import { useReviewWriteContext } from '@/contexts/ReviewWriteContext'
import { ReviewWriteStepLayout } from '../_components/ReviewWriteStepLayout'
import { reviewWriteSchema } from '../schema'

const step3Schema = reviewWriteSchema.pick({
  seatViewImage: true,
  seatViewComment: true,
})
type Step3FormType = z.infer<typeof step3Schema>

export default function ReviewWriteStep3() {
  const router = useRouter()
  const { setData } = useReviewWriteContext()
  const { data, refetch } = useQuery(reviewQueries.getViewImage())
  const [selectedImage, setSelectedImage] = useState<string | null>(null)

  const images = useMemo(() => {
    return (
      data?.view_images?.map((img) => ({
        id: String(img.id ?? ''),
        url: img.url ?? '',
      })) ?? []
    )
  }, [data])

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
    refetch()
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

  const isFormValid =
    form.formState.isValid && selectedImage !== null && selectedImage !== ''

  return (
    <ReviewWriteStepLayout
      instruction={`관람한 공연의 시야와\n가장 비슷한 것을 선택해주세요!`}
      fixedButton={
        <Button onPress={handleNext} disabled={!isFormValid}>
          다음
        </Button>
      }
    >
      <ScrollView showsVerticalScrollIndicator={false}>
        <Col gap={20}>
          <SeatViewImageGrid
            images={images}
            selectedImage={selectedImage}
            onImageSelect={handleImageSelect}
            onRefresh={handleRefresh}
          />

          <FormTextField
            control={form.control}
            name="seatViewComment"
            placeholder={`시야와 관련된 추가 의견을 작성해주세요.\n(최소 20자)`}
            as="textarea"
            className="p-4 text-body-02 placeholder:text-gray-06"
          />
        </Col>
      </ScrollView>
    </ReviewWriteStepLayout>
  )
}
