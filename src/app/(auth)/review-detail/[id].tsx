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
import { showPointRewardToast } from '@/utils/pointReward'
import { useLocalSearchParams, useRouter } from 'expo-router'
import { overlay } from 'overlay-kit'
import React from 'react'
import { Image, Pressable, ScrollView, View } from 'react-native'

// TODO: API 연동 시 제거
type LikeType =
  | 'FOLLOW_UP_RECOMMENDATION'
  | 'FULL_OF_TIPS'
  | 'THOROUGH_ANALYSIS'
  | 'NONE'

const MOCK_REVIEW_DATA = {
  id: '1',
  title: '비더슈탄트 5회차 관람 후기',
  author: {
    nickname: '뮤사랑',
    avatarUrl: undefined,
  },
  // API 스키마: ReviewDetailRes
  is_my_review: false,
  like_res: {
    like_type: 'NONE' as LikeType,
    like_count_res: {
      total_like_count: 9,
      follow_up_like_count: 3,
      full_of_tips_like_count: 4,
      thorough_analysis_like_count: 2,
    },
  },
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
  averageRating: 2.8,
  soundQuality: 'GOOD' as const,
  facilityQuality: 'GOOD' as const,
  seatViewImage: 'https://picsum.photos/seed/seatview/320/274',
  soundQualityReason:
    '전반적으로 시설이 만족스러웠습니다. 배우들의 발란과 넘버의 퀄리티가 매우 만족스러웠 재관람 할 의사가 있음.',
  facilityQualityReason:
    '전반적으로 시설이 만족스러웠습니다. 배우들의 발란과 넘버의 퀄리티가 매우 만족스러웠 재관람 할 의사가 있음.',
  overallComment:
    '전반적으로 시설이 만족스러웠습니다. 배우들의 발란과 넘버의 퀄리티가 매우 만족스러웠 재관람 할 의사가 있음.',
  seatViewComment:
    '전반적으로 시설이 만족스러웠습니다. 배우들의 발란과 넘버의 퀄리티가 매우 만족스러웠 재관람 할 의사가 있음.',
}

const QUALITY_LABELS = {
  GOOD: '잘 들려요',
  AVERAGE: '보통이에요',
  POOR: '좋지 않아요',
} as const

const FACILITY_QUALITY_LABELS = {
  GOOD: '쾌적해요',
  AVERAGE: '보통이에요',
  POOR: '좋지 않아요',
} as const

export default function ReviewDetail() {
  const router = useRouter()
  const params = useLocalSearchParams<{ id: string; from?: string }>()

  const review = MOCK_REVIEW_DATA

  const [isLiked, setIsLiked] = React.useState(
    review.like_res?.like_type !== 'NONE',
  )

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
          // TODO: API 연동 - 삭제 요청

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
    if (review.is_my_review) {
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
            {review.is_my_review ? (
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
              {review.title}
            </Text>
            <Pressable onPress={handleLike}>
              <Row align="center" gap={4}>
                <Icon
                  name={isLiked ? 'Like' : 'StrokeHeart'}
                  size={isLiked ? 16 : 18}
                  className={
                    review.is_my_review
                      ? 'text-gray-11'
                      : isLiked
                        ? 'text-sub-point'
                        : 'text-gray-01'
                  }
                />
                <Text
                  variant="body-02"
                  className={
                    review.is_my_review ? 'text-gray-11' : 'text-gray-01'
                  }
                >
                  {review.like_res?.like_count_res?.total_like_count ?? 0}
                </Text>
              </Row>
            </Pressable>
          </Row>

          <Col className="mb-8 gap-5">
            {/* 프로필 */}
            <Row align="center" className="justify-between">
              <Row align="center" gap={8}>
                <Avatar imageUrl={review.author.avatarUrl} size="xsmall" />
                <Text variant="body-02" className="text-gray-01">
                  {review.author.nickname}
                </Text>
              </Row>
            </Row>

            {/* 티켓 카드 */}
            <TicketCard
              posterUrl={review.ticket.posterUrl}
              showName={review.ticket.showName}
              venueName={review.ticket.venueName}
              date={review.ticket.date}
              seat={review.ticket.seat}
              actorName={review.ticket.actorName}
            />
          </Col>

          {/* 총평 섹션 */}
          <Col className="gap-4">
            {/* 총평 제목 & 평균 별점 */}
            <Row align="center" gap={10}>
              <Text variant="subhead-04" className="text-gray-01">
                총평
              </Text>
              <InfoBadge label={String(review.averageRating)} icon="Star" />
            </Row>

            {/* 총평 텍스트 */}
            <Text variant="body-01" className="text-gray-01">
              {review.overallComment}
            </Text>

            {/* 평점 슬라이더들 */}
            <Col className="mb-8 gap-4 rounded-lg bg-gray-11 p-4">
              <RatingSlider
                label="넘버"
                value={review.ratings.number}
                showHelp={true}
                onHelpPress={handleNumberHelp}
              />

              <RatingSlider label="스토리 구성" value={review.ratings.story} />

              <RatingSlider
                label="재관람 의사"
                value={review.ratings.rewatch}
              />

              <RatingSlider label="배우업" value={review.ratings.acting} />

              <RatingSlider
                label="퍼포먼스"
                value={review.ratings.performance}
              />
            </Col>
          </Col>

          <Col className="gap-10">
            {/* 음향 섹션 */}
            <ReviewInfoSection
              title="음향"
              badgeLabel={QUALITY_LABELS[review.soundQuality]}
              description={review.soundQualityReason}
            />

            {/* 시설 섹션 */}
            <ReviewInfoSection
              title="시설"
              badgeLabel={FACILITY_QUALITY_LABELS[review.facilityQuality]}
              description={review.facilityQualityReason}
            />
            {/* 시야 섹션 */}
            <Col className="gap-4">
              <Text variant="subhead-04" className="text-gray-01">
                시야
              </Text>

              <Text variant="body-01" className="text-gray-01">
                {review.seatViewComment}
              </Text>

              {/* 시야 이미지 */}
              <View className="overflow-hidden rounded-lg">
                <Image
                  source={{ uri: review.seatViewImage }}
                  style={{
                    width: '100%',
                    height: 137,
                  }}
                  resizeMode="cover"
                />
              </View>
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
