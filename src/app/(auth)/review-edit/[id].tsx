import { reviewEditSchema } from '@/app/(auth)/review-write/schema'
import { Avatar } from '@/components/Avatar'
import { Icon } from '@/components/common/icons/Icon'
import { Col, Row } from '@/components/common/ui/Flex'
import { Screen } from '@/components/common/ui/Screen'
import { Text } from '@/components/common/ui/Text'
import { Header } from '@/components/Header'
import { InfoBadge } from '@/components/InfoBadge'
import { InfoDialog } from '@/components/InfoDialog'
import { QualityDropdown } from '@/components/QualityDropdown'
import { RatingSlider } from '@/components/RatingSlider'
import { SeatViewImageGrid } from '@/components/SeatViewImageGrid'
import { FormTextField } from '@/components/TextField'
import { TicketCard } from '@/components/TicketCard'
import { toast } from '@/components/Toaster'
import { zodResolver } from '@hookform/resolvers/zod'
import { useLocalSearchParams, useRouter } from 'expo-router'
import { overlay } from 'overlay-kit'
import { useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Pressable, ScrollView } from 'react-native'
import type { z } from 'zod'

// TODO: API 연동 시 제거
const MOCK_REVIEW_DATA = {
  id: '1',
  title: '비더슈탄트 5회차 관람 후기',
  author: {
    nickname: '뮤사랑',
    avatarUrl: undefined,
  },
  likes: 9,
  isOwnPost: true,
  ticket: {
    posterUrl: 'https://via.placeholder.com/66x92',
    showName: '비더슈탄트',
    venueName: '샤롯데시어터',
    date: '2025.06.21',
    seat: '3층 1구역 D열 4번',
    actorName: '송락갈라타 김대현 이태예',
  },
  ratings: {
    number: 1,
    story: 2,
    rewatch: 4,
    acting: 4,
    performance: 3,
  },
  soundQuality: 'GOOD' as const,
  facilityQuality: 'GOOD' as const,
  seatViewImage: 'https://via.placeholder.com/320x137',
  soundQualityReason:
    '전반적으로 시설이 만족스러웠습니다. 배우들의 발란과 넘버의 퀄리티가 매우 만족스러웠 재관람 할 의사가 있음.',
  facilityQualityReason:
    '전반적으로 시설이 만족스러웠습니다. 배우들의 발란과 넘버의 퀄리티가 매우 만족스러웠 재관람 할 의사가 있음.',
  overallComment:
    '전반적으로 시설이 만족스러웠습니다. 배우들의 발란과 넘버의 퀄리티가 매우 만족스러웠 재관람 할 의사가 있음.',
  seatViewComment:
    '전반적으로 시설이 만족스러웠습니다. 배우들의 발란과 넘버의 퀄리티가 매우 만족스러웠 재관람 할 의사가 있음.',
}

type ReviewEditFormType = z.infer<typeof reviewEditSchema>

export default function ReviewEdit() {
  const router = useRouter()
  const params = useLocalSearchParams<{ id: string }>()

  const review = MOCK_REVIEW_DATA

  // TODO: API 연동 - 시야 이미지 목록 불러오기
  const generateMockImages = () => {
    return Array.from({ length: 4 }, (_, i) => ({
      id: `image-${i + 1}-${Date.now()}`,
      url: `https://picsum.photos/seed/seat${i + 1}/320/274`,
    }))
  }

  const [images, setImages] = useState(generateMockImages())
  const [selectedSeatViewImage, setSelectedSeatViewImage] = useState<
    string | null
  >(review.seatViewImage ? images[0]?.id || null : null)

  const form = useForm<ReviewEditFormType>({
    resolver: zodResolver(reviewEditSchema),
    mode: 'onChange',
    defaultValues: {
      title: review.title,
      seatViewImage: review.seatViewImage || '',
      seatViewComment: review.seatViewComment,
      soundQuality: review.soundQuality,
      soundQualityReason: review.soundQualityReason,
      facilityQuality: review.facilityQuality,
      facilityQualityReason: review.facilityQualityReason,
      ratingNumber: review.ratings.number,
      ratingStory: review.ratings.story,
      ratingRewatch: review.ratings.rewatch,
      ratingActing: review.ratings.acting,
      ratingPerformance: review.ratings.performance,
      overallComment: review.overallComment,
    },
  })

  const ratings = form.watch([
    'ratingNumber',
    'ratingStory',
    'ratingRewatch',
    'ratingActing',
    'ratingPerformance',
  ])
  const averageRating = useMemo(() => {
    const sum = ratings.reduce((acc, rating) => acc + rating, 0)
    return (sum / 5).toFixed(1)
  }, [ratings])

  const handleCancel = () => {
    router.back()
  }

  const handleSave = form.handleSubmit(
    (values) => {
      // TODO: API 연동 - 수정 내용 저장
      console.log('Save review', values)

      router.back()
    },
    () => {
      toast.show('모든 항목을 올바르게 입력해주세요.')
    },
  )

  const handleImageSelect = (imageId: string) => {
    setSelectedSeatViewImage(imageId)
    form.setValue('seatViewImage', imageId, { shouldValidate: true })
  }

  const handleImageRefresh = () => {
    const newImages = generateMockImages()
    setImages(newImages)
    setSelectedSeatViewImage(null)
    form.setValue('seatViewImage', '', { shouldValidate: true })
  }

  const handleLike = () => {
    toast.show('자신의 글에 좋아요를 누를 수 없어요.')
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

  return (
    <Screen
      header={
        <Header>
          <Header.Left>
            <Pressable onPress={handleCancel}>
              <Text variant="subhead-02" className="text-white">
                취소
              </Text>
            </Pressable>
          </Header.Left>
          <Header.Center>후기글</Header.Center>
          <Header.Right>
            <Pressable onPress={handleSave}>
              <Text variant="subhead-02" className="text-white">
                확인
              </Text>
            </Pressable>
          </Header.Right>
        </Header>
      }
    >
      <ScrollView showsVerticalScrollIndicator={false}>
        <Col className="gap-3 pb-10">
          {/* 제목 수정 */}
          <Col className="mt-6 gap-3">
            <FormTextField
              control={form.control}
              name="title"
              placeholder="30자 이내로 입력해주세요."
            />
            <Pressable onPress={handleLike} className="self-end">
              <Row align="center" gap={4}>
                <Icon name="Like" size={16} className="text-gray-11" />
                <Text variant="body-02" className="text-gray-11">
                  {review.likes}
                </Text>
              </Row>
            </Pressable>
          </Col>

          <Col className="mb-8 gap-5">
            <Row align="center" className="justify-between">
              <Row align="center" gap={8}>
                <Avatar imageUrl={review.author.avatarUrl} size="xsmall" />
                <Text variant="body-02" className="text-gray-01">
                  {review.author.nickname}
                </Text>
              </Row>
            </Row>

            <TicketCard
              posterUrl={review.ticket.posterUrl}
              showName={review.ticket.showName}
              venueName={review.ticket.venueName}
              date={review.ticket.date}
              seat={review.ticket.seat}
              actorName={review.ticket.actorName}
            />
          </Col>

          <Col className="gap-4">
            <Row align="center" gap={10}>
              <Text variant="subhead-04" className="text-gray-01">
                총평
              </Text>
              <InfoBadge label={averageRating} icon="Star" />
            </Row>

            <Col className="mb-8 gap-4 rounded-lg bg-gray-11 p-4">
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
                  form.setValue('ratingRewatch', value, {
                    shouldValidate: true,
                  })
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
            </Col>

            <FormTextField
              control={form.control}
              name="overallComment"
              placeholder="자유롭게 총평을 작성해주세요. (최소 20자)"
              as="textarea"
            />
          </Col>

          <Col className="gap-10">
            <Col className="gap-4">
              <Row align="center" gap={10}>
                <Text variant="subhead-04" className="text-gray-01">
                  음향
                </Text>
                <QualityDropdown
                  value={form.watch('soundQuality')}
                  onChange={(value) =>
                    form.setValue('soundQuality', value, {
                      shouldValidate: true,
                    })
                  }
                  type="sound"
                />
              </Row>

              <FormTextField
                control={form.control}
                name="soundQualityReason"
                placeholder="자유롭게 이유를 작성해주세요. (최소 20자)"
                as="textarea"
              />
            </Col>

            <Col className="gap-4">
              <Row align="center" gap={10}>
                <Text variant="subhead-04" className="text-gray-01">
                  시설
                </Text>
                <QualityDropdown
                  value={form.watch('facilityQuality')}
                  onChange={(value) =>
                    form.setValue('facilityQuality', value, {
                      shouldValidate: true,
                    })
                  }
                  type="facility"
                />
              </Row>

              <FormTextField
                control={form.control}
                name="facilityQualityReason"
                placeholder="자유롭게 이유를 작성해주세요. (최소 20자)"
                as="textarea"
              />
            </Col>

            <Col className="gap-4">
              <Text variant="subhead-04" className="text-gray-01">
                시야
              </Text>

              <FormTextField
                control={form.control}
                name="seatViewComment"
                placeholder="시야와 관련된 추가 의견을 작성해주세요. (최소 20자)"
                as="textarea"
              />

              <SeatViewImageGrid
                images={images}
                selectedImage={selectedSeatViewImage}
                onImageSelect={handleImageSelect}
                onRefresh={handleImageRefresh}
                className="mt-8"
              />
            </Col>
          </Col>

          <Text variant="caption" className="mt-8 text-center text-gray-06">
            리뷰에 대한 권리는 작성자에게 있으며 무단 사용을 금지합니다.
            개인적인 후기는 하나의 감상평으로 참고해주세요.
          </Text>
        </Col>
      </ScrollView>
    </Screen>
  )
}
