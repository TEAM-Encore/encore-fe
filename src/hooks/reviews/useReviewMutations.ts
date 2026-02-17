import { imageMutations } from '@/apis/image/mutations'
import { reviewMutations } from '@/apis/review/mutations'

function useReviewMutations() {
  const { mutate: unlockReview } = reviewMutations.unlockReview()

  const { mutate: likeReview, isPending: isPendingLike } =
    reviewMutations.likeReview()

  return {
    unlockReview,
    likeReview,
    isPendingLike,
  }
}

export default useReviewMutations
