import { useQuery } from '@tanstack/react-query'
import { useLocalSearchParams, useRouter } from 'expo-router'
import { overlay } from 'overlay-kit'
import { useEffect, useState } from 'react'
import {
  ActivityIndicator,
  Image,
  Pressable,
  ScrollView,
  View,
} from 'react-native'
import { reviewKeys } from '@/apis/review/keys'
import { reviewMutations } from '@/apis/review/mutations'
import { reviewQueries } from '@/apis/review/queries'
import { ticketQueries } from '@/apis/ticket/queries'
import { userQueries } from '@/apis/user/queries'
import { TicketBook } from '@/components'
import { Avatar } from '@/components/Avatar'
import { Icon } from '@/components/common/icons/Icon'
import { Col, Flex, Row } from '@/components/common/ui/Flex'
import { Screen } from '@/components/common/ui/Screen'
import { Spacing } from '@/components/common/ui/Spacing'
import { Text } from '@/components/common/ui/Text'
import { Dialog } from '@/components/Dialog'
import { Header } from '@/components/Header'
import { InfoBadge } from '@/components/InfoBadge'
import { InfoDialog } from '@/components/InfoDialog'
import { InsufficientPointDialog } from '@/components/InsufficientPointDialog'
import { RatingSlider } from '@/components/RatingSlider'
import { ReviewInfoSection } from '@/components/ReviewInfoSection'
import { toast } from '@/components/Toaster'
import { FACILITY_LEVEL_LABELS, SOUND_LEVEL_LABELS } from '@/constants/review'
import { useSignedImageUrl } from '@/hooks/useSignedImageUrl'
import { queryClient } from '@/lib/query-client'
import { useUser } from '@/providers/user.provider'
import { colors } from '@/styles/color'
import { cn } from '@/utils/cn'
import { showPointRewardToast } from '@/utils/pointReward'
import ReviewDetailHeader from './_components/ReviewDetailHeader'

type ReviewDetailTicket = {
  ticket_id?: number
  ticket_title?: string
  viewed_date?: string
  image_url?: string
}

export default function ReviewDetail() {
  const user = useUser()
  const router = useRouter()
  const params = useLocalSearchParams<{ id: string; from?: string }>()
  const reviewId = params.id ? Number(params.id) : 0

  const {
    data: reviewData,
    isLoading: isReviewLoading,
    isError,
    error,
    refetch,
  } = useQuery(reviewQueries.getReview(reviewId))
  const { data: myInfo } = useQuery(userQueries.getMyInfo())
  const { data: ticketData } = useQuery(
    ticketQueries.getTicketDetail(
      (reviewData?.ticket as ReviewDetailTicket)?.ticket_id ?? 0,
    ),
  )
  const { data: viewImageResponse } = useQuery(reviewQueries.getViewImages())

  useEffect(() => {
    if (isError && !isReviewLoading) {
      toast.show(
        (error as any)?.error?.message || '리뷰를 불러오는데 실패했습니다.',
      )
    }
  }, [isError, isReviewLoading, error])

  const { mutate: unlockReview } = reviewMutations.unlockReview()
  const { mutate: likeReview, isPending: isPendingLike } =
    reviewMutations.likeReview()

  const isLiked = reviewData?.like_res?.like_type !== 'NONE'
  const viewImageUrl = viewImageResponse?.view_images?.find(
    (img) =>
      img.level === Number(reviewData?.review_data_res?.view?.view_level) + 1,
  )?.url

  const [isViewImageLoading, setIsViewImageLoading] = useState(true)

  const handleLike = () => {
    if (reviewData?.is_my_review) {
      toast.show('자신의 글에 좋아요를 누를 수 없어요.')
      return
    }

    if (isPendingLike) return

    likeReview(
      { reviewId },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: reviewKeys.detail(reviewId),
          })
          if (!isLiked) {
            showPointRewardToast(5)
          }
        },
      },
    )
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

  const rating = reviewData?.review_data_res?.rating
  const sound = reviewData?.review_data_res?.sound
  const facility = reviewData?.review_data_res?.facility
  const view = reviewData?.review_data_res?.view

  const profileImageUrl = useSignedImageUrl(reviewData?.profile_image_url)
  const ticketImageUrl = useSignedImageUrl(ticketData?.ticket_image_url)

  useEffect(() => {
    if ((myInfo?.point ?? 0) < 5 && myInfo !== undefined) {
      overlay.open((ov) => <InsufficientPointDialog {...ov} />)
    }
  }, [myInfo])

  useEffect(() => {
    if (isError && (error as any)?.error?.message === '리뷰가 잠겨있습니다.') {
      overlay.open((ov) => (
        <Dialog
          {...ov}
          title="5포인트를 사용할까요?"
          description="사용한 포인트는 되돌릴 수 없어요."
          top="확인"
          bottom="취소"
          onTopPress={() => {
            unlockReview(
              { reviewId },
              {
                onSuccess: () => {
                  toast.show('5포인트로 리뷰를 해제했어요.')
                  refetch()
                },
                onError: (e) => {
                  toast.show(e?.message ?? '잠금 해제에 실패했어요.')
                },
              },
            )
          }}
          onBottomPress={() => router.back()}
        />
      ))
    }
  }, [isError, error, unlockReview, reviewId, refetch, router.back])

  // 로딩 또는 데이터 없음
  if (isReviewLoading || !reviewData || user?.id !== reviewData?.user_id) {
    return (
      <Screen
        header={
          <Header>
            <Header.Left>
              <Icon
                name="ArrowLeft"
                onPress={router.back}
                size={24}
                className="text-white"
              />
            </Header.Left>
            <Header.Center>후기글</Header.Center>
          </Header>
        }
      >
        <View className="flex-1 items-center justify-center">
          {isReviewLoading ? (
            <ActivityIndicator size="large" color={colors.primary['04']} />
          ) : (
            <Text variant="body-01" className="text-gray-06">
              {(error as any)?.error?.message === '리뷰가 잠겨있습니다.'
                ? '리뷰가 잠겨있습니다.'
                : '후기를 찾을 수 없습니다.'}
            </Text>
          )}
        </View>
      </Screen>
    )
  }

  return (
    <Screen
      header={
        <ReviewDetailHeader
          isMyReview={reviewData.is_my_review}
          reviewId={reviewId}
        />
      }
    >
      <ScrollView showsVerticalScrollIndicator={false}>
        <Col>
          {/* 제목 & 좋아요 */}
          <Row align="center" className="mt-6 justify-between">
            <Text variant="subhead-05" className="flex-1 text-gray-01">
              {reviewData.title}
            </Text>
            <Pressable onPress={handleLike}>
              <Row align="center" gap={2}>
                <Icon
                  name={isLiked ? 'Like' : 'StrokeHeart'}
                  size={22}
                  className={cn(
                    reviewData.is_my_review
                      ? 'text-gray-11'
                      : isLiked
                        ? 'text-sub-point'
                        : 'text-gray-01',
                    'mt-px',
                  )}
                />
                <Text
                  variant="body-02"
                  color={reviewData.is_my_review ? 'gray-11' : 'gray-01'}
                >
                  {reviewData.like_res?.like_count_res?.total_like_count ?? 0}
                </Text>
              </Row>
            </Pressable>
          </Row>
          <Spacing size={12} />
          <Col className="gap-5">
            {/* 프로필 */}
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
                <Text variant="body-02" className="text-gray-01">
                  {reviewData.nick_name || '익명'}
                </Text>
              </Row>
            </Row>

            {/* 티켓 카드 */}
            {ticketData && (
              <TicketBook
                posterUrl={ticketImageUrl as string}
                title={`${ticketData?.musical_title} ${ticketData?.location}`}
                date={ticketData?.viewed_date?.replace(/-/g, '.') ?? ''}
                theaterseat={`${ticketData?.floor}층 ${ticketData?.zone}구역 ${ticketData?.col}열 ${ticketData?.number}번`}
                attendees={
                  ticketData?.actors?.map((actor) => actor.name).join(' ') ?? ''
                }
              />
            )}
          </Col>

          <Spacing size={32} />

          {/* 총평 섹션 */}
          <Col>
            {/* 총평 제목 & 평균 별점 */}
            <Row align="center" gap={10}>
              <Text
                variant="subhead-04"
                color="gray-01"
                className="text-[18px]"
              >
                총평
              </Text>
              <InfoBadge
                label={String(rating?.total_rating?.toFixed(1) ?? '0.0')}
                icon="Star"
              />
            </Row>
            <Spacing size={16} />
            {/* 총평 텍스트 */}
            <Text variant="body-long-01" color="gray-01" className="leading-6">
              {reviewData.review_data_res?.rating?.rating_review ?? ''}
            </Text>
            <Spacing size={20} />
            {/* 평점 슬라이더들 */}
            <Col gap={7} className="rounded-lg bg-gray-11 p-3.5">
              <RatingSlider
                label="넘버"
                value={rating?.number_rating ?? 0}
                showHelp={true}
                onHelpPress={handleNumberHelp}
              />

              <RatingSlider
                label="스토리 구성"
                value={rating?.story_rating ?? 0}
              />

              <RatingSlider
                label="재관람 의사"
                value={rating?.revisit_rating ?? 0}
              />

              <RatingSlider label="배우업" value={rating?.actor_rating ?? 0} />

              <RatingSlider
                label="퍼포먼스"
                value={rating?.performance_rating ?? 0}
              />
            </Col>
          </Col>
          <Spacing size={32} />
          <Col gap={32}>
            {/* 음향 섹션 */}
            <ReviewInfoSection
              title="음향"
              badgeLabel={
                SOUND_LEVEL_LABELS[sound?.sound_level ?? 2] ?? '보통이에요'
              }
              description={sound?.sound_review ?? ''}
            />

            {/* 시설 섹션 */}
            <ReviewInfoSection
              title="시설"
              badgeLabel={
                FACILITY_LEVEL_LABELS[facility?.facility_level ?? 2] ??
                '보통이에요'
              }
              description={facility?.facility_review ?? ''}
            />

            {/* 시야 섹션 */}
            <ReviewInfoSection
              title="시야"
              badgeLabel=""
              description={view?.view_review ?? ''}
            />

            {/* 시야 이미지 - view_level로 매칭된 이미지가 있을 때만 표시 */}
            {viewImageUrl && (
              <View className="h-[137px] overflow-hidden rounded-lg">
                {isViewImageLoading && (
                  <Flex
                    justify="center"
                    align="center"
                    className="absolute inset-0 z-10 rounded-[10px] bg-gray-11"
                  >
                    <ActivityIndicator color={colors.primary['04']} />
                  </Flex>
                )}
                <Image
                  source={{ uri: viewImageUrl }}
                  className="h-full w-full rounded-[10px]"
                  resizeMode="cover"
                  onLoadStart={() => setIsViewImageLoading(true)}
                  onLoadEnd={() => setIsViewImageLoading(false)}
                />
              </View>
            )}
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
