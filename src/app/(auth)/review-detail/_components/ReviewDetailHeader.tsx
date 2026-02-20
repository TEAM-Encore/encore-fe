import { router } from 'expo-router'
import { overlay } from 'overlay-kit'
import { reviewMutations } from '@/apis/review/mutations'
import { Icon } from '@/components/common/icons/Icon'
import { Dialog } from '@/components/Dialog'
import { Dropdown } from '@/components/Dropdown'
import { Header } from '@/components/Header'
import { ReportBottomSheet } from '@/components/ReportBottomSheet'
import { toast } from '@/components/Toaster'

interface ReviewDetailHeaderProps {
  isMyReview?: boolean
  reviewId: number
  from?: 'home' | 'mypage-reviews'
}

function ReviewDetailHeader({
  isMyReview,
  reviewId,
  from,
}: ReviewDetailHeaderProps) {
  const { mutate: deleteReview } = reviewMutations.deleteReview()
  const { mutate: reportReview } = reviewMutations.reportReview()

  const handleReport = () => {
    overlay.open((ov) => (
      <ReportBottomSheet
        {...ov}
        onReport={(reason) => {
          reportReview(
            { reviewId, reason },
            {
              onSuccess: () => toast.show('신고가 접수되었어요'),
              onError: (e) => toast.show(e?.message ?? '신고에 실패했어요.'),
            },
          )
        }}
      />
    ))
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
          deleteReview(
            { reviewId },
            {
              onSuccess: () => {
                toast.show('후기글을 삭제했어요.')
                if (from === 'home') {
                  router.push('/')
                } else if (from === 'mypage-reviews') {
                  router.push('/mypage/reviews')
                } else {
                  router.back()
                }
              },
              onError: (e) =>
                toast.show(e?.message ?? '후기글 삭제에 실패했어요.'),
            },
          )
        }}
      />
    ))
  }

  return (
    <Header>
      <Header.Left>
        <Icon
          name="ArrowLeft"
          onPress={() => router.back()}
          size={24}
          className="text-white"
        />
      </Header.Left>
      <Header.Center>후기글</Header.Center>
      <Header.Right>
        <Dropdown.Root>
          <Dropdown.Trigger>
            <Icon name="More" size={24} className="text-white" />
          </Dropdown.Trigger>
          <Dropdown.Content position="left">
            {isMyReview ? (
              <>
                <Dropdown.Item
                  onPress={() => router.push(`/review-edit/${reviewId}`)}
                >
                  수정
                </Dropdown.Item>
                <Dropdown.Item variant="destructive" onPress={handleDelete}>
                  삭제
                </Dropdown.Item>
              </>
            ) : (
              <Dropdown.Item variant="destructive" onPress={handleReport}>
                신고
              </Dropdown.Item>
            )}
          </Dropdown.Content>
        </Dropdown.Root>
      </Header.Right>
    </Header>
  )
}

export default ReviewDetailHeader
