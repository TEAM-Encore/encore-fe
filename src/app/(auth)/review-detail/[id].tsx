import { reviewQueries } from '@/apis/review/queries'
import { Avatar } from '@/components/Avatar'
import { Icon } from '@/components/common/icons/Icon'
import { Col, Row } from '@/components/common/ui/Flex'
import { Screen } from '@/components/common/ui/Screen'
import { Text } from '@/components/common/ui/Text'
import { Dialog } from '@/components/Dialog'
import { Dropdown } from '@/components/Dropdown'
import { Header } from '@/components/Header'
import { InfoBadge } from '@/components/InfoBadge'
import { InfoDialog } from '@/components/InfoDialog'
import { RatingSlider } from '@/components/RatingSlider'
import { ReportBottomSheet } from '@/components/ReportBottomSheet'
import { ReviewInfoSection } from '@/components/ReviewInfoSection'
import { TicketCard } from '@/components/TicketCard'
import { toast } from '@/components/Toaster'
import { useUser } from '@/providers/user.provider'
import { formatActorNames, formatDate, formatSeatInfo } from '@/utils/format'
import { showPointRewardToast } from '@/utils/pointReward'
import { useQuery } from '@tanstack/react-query'
import { useLocalSearchParams, useRouter } from 'expo-router'
import { overlay } from 'overlay-kit'
import React from 'react'
import { ActivityIndicator, Image, Pressable, ScrollView, View } from 'react-native'

// 음향 레벨 → 텍스트 변환
const SOUND_LEVEL_LABELS: Record<number, string> = {
  1: '좋지 않아요',
  2: '보통이에요',
  3: '잘 들려요',
}

// 시설 레벨 → 텍스트 변환
const FACILITY_LEVEL_LABELS: Record<number, string> = {
  1: '좋지 않아요',
  2: '보통이에요',
  3: '쾌적해요',
}

export default function ReviewDetail() {
  const router = useRouter()
  const params = useLocalSearchParams<{ id: string; from?: string }>()
  const user = useUser()
  const reviewId = params.id ? Number(params.id) : 0
  const userId = user?.id ?? 0

  // 리뷰 상세 조회
  const { data: reviewResponse, isLoading: isReviewLoading } = useQuery(
    reviewQueries.getReview({ reviewId, userId }),
  )

  // 시야 이미지 목록 조회
  const { data: viewImageResponse } = useQuery(reviewQueries.getViewImage())

  const reviewData = reviewResponse?.data
  const viewImages = viewImageResponse?.data?.view_images ?? []

  // 시야 이미지 URL 찾기 (view_level로 매칭)
  const viewImageUrl = React.useMemo(() => {
    const viewLevel = reviewData?.review_data_res?.view?.view_level
    if (!viewLevel) return undefined
    const matched = viewImages.find((img) => img.level === viewLevel)
    return matched?.url
  }, [reviewData?.review_data_res?.view?.view_level, viewImages])

  const [isLiked, setIsLiked] = React.useState(false)

  // 좋아요 상태 초기화
  React.useEffect(() => {
    if (reviewData?.like_res?.like_type) {
      setIsLiked(reviewData.like_res.like_type !== 'NONE')
    }
  }, [reviewData?.like_res?.like_type])

  const handleBack = () => {
    router.back()
  }

  const handleEdit = () => {
    router.push(`/review-edit/${params.id}`)
  }

  const handleDelete = () => {
    overlay.open((ov) => (
      <Dialog
        {...ov}
        title="후기글 삭제할까요?"
        description="삭제한 후기는 되돌릴 수 없어요."
        top="확인"
        bottom="취소"
        onTopPress={() => {
          // TODO: API 연동 - DELETE /api/mvp/review/{reviewId}

          if (params.from === 'home') {
            router.push('/')
          } else if (params.from === 'mypage-reviews') {
            router.push('/mypage/reviews')
          } else {
            router.back()
          }
        }}
      />
    ))
  }

  const handleLike = async () => {
    if (reviewData?.is_my_review) {
      toast.show('자신의 글에 좋아요를 누를 수 없어요.')
      return
    }

    // TODO: API 연동 - PATCH /api/mvp/review/{reviewId}/like
    setIsLiked(!isLiked)

    if (!isLiked) {
      await showPointRewardToast(5)
    }
  }

  const handleReport = () => {
    overlay.open((ov) => (
      <ReportBottomSheet
        {...ov}
        onReport={(reason) => {
          // TODO: API 연동 - POST /api/mvp/review/{reviewId}/report
          console.log('신고 사유:', reason)
          toast.show('신고가 접수되었어요')
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

  // 로딩 상태
  if (isReviewLoading) {
    return (
      <Screen
        header={
          <Header>
            <Header.Left>
              <Icon
                name="ArrowLeft"
                onPress={handleBack}
                size={24}
                className="text-white"
              />
            </Header.Left>
            <Header.Center>후기글</Header.Center>
          </Header>
        }
      >
        <View className="flex-1 items-center justify-center">
          <ActivityIndicator size="large" color="#FFD700" />
        </View>
      </Screen>
    )
  }

  // 데이터가 없는 경우
  if (!reviewData) {
    return (
      <Screen
        header={
          <Header>
            <Header.Left>
              <Icon
                name="ArrowLeft"
                onPress={handleBack}
                size={24}
                className="text-white"
              />
            </Header.Left>
            <Header.Center>후기글</Header.Center>
          </Header>
        }
      >
        <View className="flex-1 items-center justify-center">
          <Text variant="body-01" className="text-gray-06">
            후기를 찾을 수 없습니다.
          </Text>
        </View>
      </Screen>
    )
  }

  const ticket = reviewData.ticket
  const rating = reviewData.review_data_res?.rating
  const sound = reviewData.review_data_res?.sound
  const facility = reviewData.review_data_res?.facility
  const view = reviewData.review_data_res?.view

  return (
    <Screen
      header={
        <Header>
          <Header.Left>
            <Icon
              name="ArrowLeft"
              onPress={handleBack}
              size={24}
              className="text-white"
            />
          </Header.Left>
          <Header.Center>후기글</Header.Center>
          <Header.Right>
            {reviewData.is_my_review ? (
              <Dropdown.Root>
                <Dropdown.Trigger>
                  <Icon name="More" size={24} className="text-white" />
                </Dropdown.Trigger>
                <Dropdown.Content position="left">
                  <Dropdown.Item onPress={handleEdit}>수정</Dropdown.Item>
                  <Dropdown.Item variant="destructive" onPress={handleDelete}>
                    삭제
                  </Dropdown.Item>
                </Dropdown.Content>
              </Dropdown.Root>
            ) : (
              <Dropdown.Root>
                <Dropdown.Trigger>
                  <Icon name="More" size={24} className="text-white" />
                </Dropdown.Trigger>
                <Dropdown.Content position="left">
                  <Dropdown.Item variant="destructive" onPress={handleReport}>
                    신고
                  </Dropdown.Item>
                </Dropdown.Content>
              </Dropdown.Root>
            )}
          </Header.Right>
        </Header>
      }
    >
      <ScrollView showsVerticalScrollIndicator={false}>
        <Col className="gap-3 pb-10">
          {/* 제목 & 좋아요 */}
          <Row align="center" className="mt-6 justify-between">
            <Text variant="subhead-05" className="flex-1 text-gray-01">
              {reviewData.title}
            </Text>
            <Pressable onPress={handleLike}>
              <Row align="center" gap={4}>
                <Icon
                  name={isLiked ? 'Like' : 'StrokeHeart'}
                  size={isLiked ? 16 : 18}
                  className={
                    reviewData.is_my_review
                      ? 'text-gray-11'
                      : isLiked
                        ? 'text-sub-point'
                        : 'text-gray-01'
                  }
                />
                <Text
                  variant="body-02"
                  className={
                    reviewData.is_my_review ? 'text-gray-11' : 'text-gray-01'
                  }
                >
                  {reviewData.like_res?.like_count_res?.total_like_count ?? 0}
                </Text>
              </Row>
            </Pressable>
          </Row>

          <Col className="mb-8 gap-5">
            {/* 프로필 */}
            <Row align="center" className="justify-between">
              <Row align="center" gap={8}>
                <Avatar imageUrl={reviewData.profile_image_url} size="xsmall" />
                <Text variant="body-02" className="text-gray-01">
                  {/* TODO: 백엔드에 nickname 필드 추가 요청 필요 - 현재 API에 nickname 없음 */}
                  익명
                </Text>
              </Row>
            </Row>

            {/* 티켓 카드 */}
            {ticket && (
              <TicketCard
                posterUrl={ticket.musical_image_url ?? ''}
                showName={ticket.musical_title ?? ''}
                venueName={ticket.location ?? ''}
                date={formatDate(ticket.viewed_date)}
                seat={formatSeatInfo(ticket)}
                actorName={formatActorNames(ticket.actors)}
              />
            )}
          </Col>

          {/* 총평 섹션 */}
          <Col className="gap-4">
            {/* 총평 제목 & 평균 별점 */}
            <Row align="center" gap={10}>
              <Text variant="subhead-04" className="text-gray-01">
                총평
              </Text>
              <InfoBadge
                label={String(rating?.total_rating?.toFixed(1) ?? '0.0')}
                icon="Star"
              />
            </Row>

            {/* 총평 텍스트 */}
            <Text variant="body-01" className="text-gray-01">
              {rating?.rating_review}
            </Text>

            {/* 평점 슬라이더들 */}
            <Col className="mb-8 gap-4 rounded-lg bg-gray-11 p-4">
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

          <Col className="gap-10">
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
            <Col className="gap-4">
              <Text variant="subhead-04" className="text-gray-01">
                시야
              </Text>

              <Text variant="body-01" className="text-gray-01">
                {view?.view_review}
              </Text>

              {/* 시야 이미지 - view_level로 매칭된 이미지가 있을 때만 표시 */}
              {viewImageUrl && (
                <View className="overflow-hidden rounded-lg">
                  <Image
                    source={{ uri: viewImageUrl }}
                    style={{
                      width: '100%',
                      height: 137,
                    }}
                    resizeMode="cover"
                  />
                </View>
              )}
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
