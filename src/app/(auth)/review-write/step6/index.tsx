import { reviewMutations } from '@/apis/review/mutations'
import { Button } from '@/components/Button'
import { Icon } from '@/components/common/icons/Icon'
import { Col, Row } from '@/components/common/ui/Flex'
import { Screen } from '@/components/common/ui/Screen'
import { Text } from '@/components/common/ui/Text'
import { Dialog } from '@/components/Dialog'
import { InfoDialog } from '@/components/InfoDialog'
import { RatingSlider } from '@/components/RatingSlider'
import { StepHeader } from '@/components/StepHeader'
import { FormTextField } from '@/components/TextField'
import { toast } from '@/components/Toaster'
import { useReviewWriteContext } from '@/contexts/ReviewWriteContext'
import type { ReviewWriteData } from '@/contexts/ReviewWriteContext'
import { useUser } from '@/providers/user.provider'
import { zodResolver } from '@hookform/resolvers/zod'
import type { ReviewCreateReq } from 'api'
import { useRouter } from 'expo-router'
import { overlay } from 'overlay-kit'
import { useForm } from 'react-hook-form'
import { ScrollView, View } from 'react-native'
import type { z } from 'zod'
import { reviewWriteSchema } from '../schema'

const step6Schema = reviewWriteSchema.pick({
  ratingNumber: true,
  ratingStory: true,
  ratingRewatch: true,
  ratingActing: true,
  ratingPerformance: true,
  overallComment: true,
})
type Step6FormType = z.infer<typeof step6Schema>

// GOOD/AVERAGE/POOR → 3/2/1 변환
const qualityLevelMap = {
  GOOD: 3,
  AVERAGE: 2,
  POOR: 1,
} as const

// Context 데이터를 API 요청 형식으로 변환
function buildReviewPayload(
  contextData: ReviewWriteData,
  formData: Step6FormType,
): ReviewCreateReq {
  const ratings = [
    formData.ratingNumber,
    formData.ratingStory,
    formData.ratingRewatch,
    formData.ratingActing,
    formData.ratingPerformance,
  ]
  const totalRating =
    ratings.reduce((sum, rating) => sum + rating, 0) / ratings.length

  return {
    ticket_id: contextData.ticketId,
    title: contextData.title,
    review_data_req: {
      view: {
        view_level: contextData.seatViewImage
          ? Number.parseInt(contextData.seatViewImage.replace(/\D/g, ''), 10) ||
            1
          : 1,
        view_review: contextData.seatViewComment,
      },
      sound: {
        sound_level: contextData.soundQuality
          ? qualityLevelMap[contextData.soundQuality]
          : 2,
        sound_review: contextData.soundQualityReason,
      },
      facility: {
        facility_level: contextData.facilityQuality
          ? qualityLevelMap[contextData.facilityQuality]
          : 2,
        facility_review: contextData.facilityQualityReason,
      },
      rating: {
        number_rating: formData.ratingNumber,
        story_rating: formData.ratingStory,
        revisit_rating: formData.ratingRewatch,
        actor_rating: formData.ratingActing,
        performance_rating: formData.ratingPerformance,
        total_rating: totalRating,
        rating_review: formData.overallComment,
      },
    },
  }
}

export default function ReviewWriteStep6() {
  const router = useRouter()
  const user = useUser()
  const { data: contextData } = useReviewWriteContext()
  const createReviewMutation = reviewMutations.createReview()

  const form = useForm<Step6FormType>({
    resolver: zodResolver(step6Schema),
    mode: 'onChange',
    defaultValues: {
      ratingNumber: 1,
      ratingStory: 1,
      ratingRewatch: 1,
      ratingActing: 1,
      ratingPerformance: 1,
      overallComment: '',
    },
  })

  const ratings = form.watch([
    'ratingNumber',
    'ratingStory',
    'ratingRewatch',
    'ratingActing',
    'ratingPerformance',
  ])
  const averageRating = (
    ratings.reduce((sum, rating) => sum + rating, 0) / ratings.length
  ).toFixed(1)

  const handleComplete = async () => {
    const formData = form.getValues()
    const payload = buildReviewPayload(contextData, formData)

    try {
      await createReviewMutation.mutateAsync({
        userId: user?.id as number,
        ...payload,
      })
      toast.show('10포인트를 획득했어요')
      router.push('/')
    } catch {
      toast.show('후기 등록에 실패했습니다.')
    }
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

  const handleNumberHelp = () => {
    overlay.open((ov) => (
      <InfoDialog
        {...ov}
        title="넘버란?"
        description="뮤지컬 넘버는 뮤지컬에서 사용되는 노래나 음악을 의미하며, 극의 전개와 인물의 감정을 전달하는 중요한 역할을 한다."
      />
    ))
  }

  const isFormValid = form.formState.isValid
  const isLoading = createReviewMutation.isPending

  return (
    <Screen
      header={
        <StepHeader
          title="후기글 추가"
          currentStep={6}
          totalSteps={6}
          showBack={true}
          showClose={true}
          onClose={handleClose}
        />
      }
      fixedButton={
        <Button onPress={handleComplete} disabled={!isFormValid || isLoading}>
          {isLoading ? '등록 중...' : '등록'}
        </Button>
      }
    >
      <Col className="mt-6 gap-5">
        <Text variant="body-01" className="text-gray-07">
          6/6
        </Text>

        <Text variant="subhead-05" className="font-semibold text-gray-01">
          관람한 공연의 총평을 입력해주세요.
        </Text>
      </Col>

      <ScrollView showsVerticalScrollIndicator={false} className="mt-5">
        <Col className="gap-4">
          <View className="relative mb-2 self-start">
            <View className="rounded-lg bg-gray-09 px-3 py-2">
              <Text variant="caption" className="text-gray-01">
                터치해서 별점을 변경해보세요!
              </Text>
            </View>
            <View
              className="-bottom-1.5 absolute left-4"
              style={{
                width: 0,
                height: 0,
                borderLeftWidth: 6,
                borderRightWidth: 6,
                borderTopWidth: 6,
                borderLeftColor: 'transparent',
                borderRightColor: 'transparent',
                borderTopColor: 'rgb(62, 62, 62)',
              }}
            />
          </View>

          <RatingSlider
            label="넘버"
            value={form.watch('ratingNumber')}
            onChange={(value) =>
              form.setValue('ratingNumber', value, { shouldValidate: true })
            }
            showHelp={true}
            onHelpPress={handleNumberHelp}
          />

          <RatingSlider
            label="스토리 구성"
            value={form.watch('ratingStory')}
            onChange={(value) =>
              form.setValue('ratingStory', value, { shouldValidate: true })
            }
          />

          <RatingSlider
            label="재관람 의사"
            value={form.watch('ratingRewatch')}
            onChange={(value) =>
              form.setValue('ratingRewatch', value, { shouldValidate: true })
            }
          />

          <RatingSlider
            label="배우업"
            value={form.watch('ratingActing')}
            onChange={(value) =>
              form.setValue('ratingActing', value, { shouldValidate: true })
            }
          />

          <RatingSlider
            label="퍼포먼스"
            value={form.watch('ratingPerformance')}
            onChange={(value) =>
              form.setValue('ratingPerformance', value, {
                shouldValidate: true,
              })
            }
          />

          <Row
            align="center"
            className="mt-2 self-start rounded-lg bg-gray-11 p-3"
          >
            <Text variant="body-02" className="mr-2 font-semibold text-gray-01">
              전체
            </Text>
            <Icon name="Star" size={16} className="text-gray-01" />
            <Text variant="body-02" className="ml-1 font-semibold text-gray-01">
              {averageRating}
            </Text>
          </Row>

          <FormTextField
            control={form.control}
            name="overallComment"
            placeholder="자유롭게 총평을 작성해주세요. (최소 20자)"
            as="textarea"
            className="mt-2"
          />
        </Col>
      </ScrollView>
    </Screen>
  )
}
