import { useQuery } from '@tanstack/react-query'
import { reviewQueries } from '@/apis/review/queries'

type ReviewDetailTicket = {
  image_url: string
  ticket_id: number
  ticket_title: string
  viewed_date: string
}

export const useReviews = (reviewId: number) => {
  const { data: reviewData, ...reviewQueryProps } = useQuery(
    reviewQueries.getReview(reviewId),
  )

  const rating = reviewData?.review_data_res?.rating
  const sound = reviewData?.review_data_res?.sound
  const facility = reviewData?.review_data_res?.facility
  const view = reviewData?.review_data_res?.view
  const isMyReview = reviewData?.is_my_review
  const ticket = reviewData?.ticket as ReviewDetailTicket

  return {
    reviewData,
    reviewQueryProps,
    rating,
    sound,
    facility,
    view,
    isMyReview,
    ticket,
  }
}
