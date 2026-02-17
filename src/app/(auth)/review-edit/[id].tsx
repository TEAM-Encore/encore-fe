import { zodResolver } from '@hookform/resolvers/zod'
import { useQuery } from '@tanstack/react-query'
import { useLocalSearchParams, useRouter } from 'expo-router'
import { overlay } from 'overlay-kit'
import { useEffect, useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Pressable, ScrollView } from 'react-native'
import type { z } from 'zod'
import { imageMutations } from '@/apis/image/mutations'
import { reviewMutations } from '@/apis/review/mutations'
import { reviewQueries } from '@/apis/review/queries'
import { ticketQueries } from '@/apis/ticket/queries'
import { reviewEditSchema } from '@/app/(auth)/review-write/schema'
import { TicketBook } from '@/components'
import { Avatar } from '@/components/Avatar'
import { Col, Row } from '@/components/common/ui/Flex'
import { Screen } from '@/components/common/ui/Screen'
import { Spacing } from '@/components/common/ui/Spacing'
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

type ReviewEditFormType = z.infer<typeof reviewEditSchema>
type ReviewDetailTicket = {
  ticket_id?: number
  ticket_title?: string
  viewed_date?: string
  image_url?: string
}

export default function ReviewEdit() {
  const router = useRouter()
  const params = useLocalSearchParams<{ id: string }>()
  const reviewId = params.id ? Number(params.id) : 0

  const { data: review } = useQuery(reviewQueries.getReview(reviewId))
  const { data: viewImageResponse } = useQuery(reviewQueries.getViewImage())
  const { data: tickets } = useQuery(
    ticketQueries.getTicketDetail(
      (review?.ticket as ReviewDetailTicket)?.ticket_id ?? 0,
    ),
  )
  const { data, refetch } = useQuery(reviewQueries.getViewImage())

  const { mutate: getProfileImage } = imageMutations.getViewImage()
  const { mutate: updateReview } = reviewMutations.updateReview()
  const { mutate: getTicketImage } = imageMutations.getViewImage()

  useEffect(() => {
    if (!review?.profile_image_url) {
      setProfileImageUrl(undefined)
      return
    }
    getProfileImage(
      { file_path: review?.profile_image_url },
      {
        onSuccess: (data) => setProfileImageUrl(data?.url ?? ''),
      },
    )
  }, [review?.profile_image_url, getProfileImage])

  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [profileImageUrl, setProfileImageUrl] = useState<string | undefined>()
  const [ticketImageUrl, setTicketImageUrl] = useState<string | undefined>()

  const viewImages = viewImageResponse?.view_images ?? []
  const viewLevel = review?.review_data_res?.view?.view_level
  const viewImageUrl = viewLevel
    ? viewImages.find((img) => img.level === viewLevel)?.url
    : undefined

  const images = useMemo(() => {
    return (
      data?.view_images?.map((img) => ({
        id: String(img.id ?? ''),
        url: img.url ?? '',
      })) ?? []
    )
  }, [data])

  const form = useForm<ReviewEditFormType>({
    resolver: zodResolver(reviewEditSchema),
    mode: 'onChange',
    defaultValues: {
      title: review?.title,
      seatViewImage: viewImageUrl || '',
      seatViewComment: review?.review_data_res?.view?.view_review || '',
      soundQuality: Number(review?.review_data_res?.sound?.sound_level) || 0,
      soundQualityReason: review?.review_data_res?.sound?.sound_review || '',
      facilityQuality:
        Number(review?.review_data_res?.facility?.facility_level) || 0,
      facilityQualityReason:
        review?.review_data_res?.facility?.facility_review || '',
      ratingNumber: review?.review_data_res?.rating?.number_rating || 0,
      ratingStory: review?.review_data_res?.rating?.story_rating || 0,
      ratingRewatch: review?.review_data_res?.rating?.revisit_rating || 0,
      ratingActing: review?.review_data_res?.rating?.actor_rating || 0,
      ratingPerformance:
        review?.review_data_res?.rating?.performance_rating || 0,
      overallComment: review?.review_data_res?.rating?.rating_review || '',
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

  const handleCancel = () => router.back()

  const handleSave = () => {
    const values = form.getValues()
    console.log(values)
    updateReview(
      {
        reviewId,
        data: {
          title: values.title,
          review_data_req: {
            view: {
              view_level: Number(values.seatViewImage.replace(/\D/g, '')),
              view_review: values.seatViewComment,
            },
            sound: {
              sound_level: values.soundQuality,
              sound_review: values.soundQualityReason,
            },
            facility: {
              facility_level: values.facilityQuality,
              facility_review: values.facilityQualityReason,
            },
            rating: {
              number_rating: values.ratingNumber,
              story_rating: values.ratingStory,
              revisit_rating: values.ratingRewatch,
              actor_rating: values.ratingActing,
              performance_rating: values.ratingPerformance,
              total_rating: Number(averageRating),
              rating_review: values.overallComment,
            },
          },
        },
      },
      {
        onSuccess: () => {
          router.back()
          toast.show('후기를 수정했어요.')
        },
        onError: () => toast.show('모든 항목을 올바르게 입력해주세요.'),
      },
    )
  }

  const handleImageSelect = (imageId: string) => {
    setSelectedImage(imageId)
    form.setValue('seatViewImage', imageId, { shouldValidate: true })
  }

  const handleImageRefresh = () => {
    refetch()
    setSelectedImage(null)
    form.setValue('seatViewImage', '', { shouldValidate: true })
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

  useEffect(() => {
    if (!tickets?.ticket_image_url) {
      setTicketImageUrl(undefined)
      return
    }
    const match = tickets?.ticket_image_url?.match(/dynamic\/[\w-]+\.\w+/)?.[0]

    getTicketImage(
      { file_path: match },
      {
        onSuccess: (data) => setTicketImageUrl(data?.url ?? ''),
      },
    )
  }, [tickets?.ticket_image_url, getTicketImage])

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
            <Pressable onPress={() => handleSave()}>
              <Text variant="subhead-02" className="text-white">
                확인
              </Text>
            </Pressable>
          </Header.Right>
        </Header>
      }
    >
      <ScrollView showsVerticalScrollIndicator={false}>
        <Col gap={32}>
          <Col>
            <FormTextField
              control={form.control}
              name="title"
              placeholder="30자 이내로 입력해주세요."
            />
            <Spacing size={12} />
            <Row align="center" className="justify-between">
              <Row align="center" gap={8}>
                <Avatar
                  imageUrl={profileImageUrl}
                  config={{
                    container: 'size-[23px]',
                    iconSize: 23,
                    camera: 'size-[10px]',
                    cameraIcon: 10,
                  }}
                />
                <Text variant="body-02" color="gray-01">
                  {review?.nick_name}
                </Text>
              </Row>
            </Row>
            <Spacing size={20} />
            <TicketBook
              posterUrl={ticketImageUrl ?? ''}
              title={`${tickets?.musical_title} ${tickets?.location}`}
              date={tickets?.viewed_date?.replace(/-/g, '.') ?? ''}
              theaterseat={`${tickets?.floor}층 ${tickets?.zone}구역 ${tickets?.col}열 ${tickets?.number}번`}
              attendees={
                tickets?.actors?.map((actor) => actor.name).join(' ') ?? ''
              }
            />
          </Col>

          <Col>
            <Row align="center" gap={10}>
              <Text
                variant="subhead-04"
                color="gray-01"
                className="text-[18px]"
              >
                총평
              </Text>
              <InfoBadge label={averageRating} icon="Star" />
            </Row>
            <Spacing size={16} />
            <FormTextField
              control={form.control}
              name="overallComment"
              placeholder="자유롭게 총평을 작성해주세요. (최소 20자)"
              as="textarea"
            />
            <Spacing size={20} />
            <Col gap={7} className="rounded-lg bg-gray-11 px-4 py-[14px]">
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
          </Col>

          <Col className="gap-10">
            <Col gap={10}>
              <Row align="center" gap={10}>
                <Text
                  variant="subhead-04"
                  color="gray-01"
                  className="text-[18px]"
                >
                  음향
                </Text>
                <QualityDropdown
                  value={form.watch('soundQuality')}
                  onChange={(value: number) => {
                    form.setValue('soundQuality', value, {
                      shouldValidate: true,
                    })
                  }}
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
                <Text
                  variant="subhead-04"
                  color="gray-01"
                  className="text-[18px]"
                >
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
              <Text
                variant="subhead-04"
                color="gray-01"
                className="text-[18px]"
              >
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
                selectedImage={selectedImage}
                onImageSelect={handleImageSelect}
                onRefresh={handleImageRefresh}
                className="mt-8"
              />
            </Col>
          </Col>

          <Text
            variant="caption"
            className="my-8 whitespace-pre-line text-center text-gray-06 leading-normal"
          >
            {`리뷰에 대한 권리는 작성자에게 있으며 무단 사용을 금지합니다.\n개인적인 후기는 하나의 감상평으로 참고해주세요.`}
          </Text>
        </Col>
      </ScrollView>
    </Screen>
  )
}
