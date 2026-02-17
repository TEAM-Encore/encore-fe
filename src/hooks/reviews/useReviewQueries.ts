import { useQuery } from '@tanstack/react-query'
import { useEffect } from 'react'
import { reviewQueries } from '@/apis/review/queries'
import { ticketQueries } from '@/apis/ticket/queries'
import { userQueries } from '@/apis/user/queries'
import { toast } from '@/components/Toaster'

type ReviewDetailTicket = {
  ticket_id?: number
  ticket_title?: string
  viewed_date?: string
  image_url?: string
}

function useReviewQueries(reviewId: number) {
  const reviewQuery = useQuery(reviewQueries.getReview(reviewId))
  const { data: myInfo } = useQuery(userQueries.getMyInfo())

  const ticket = reviewQuery?.data?.ticket as ReviewDetailTicket

  const ticketQuery = useQuery(
    ticketQueries.getTicketDetail(ticket?.ticket_id ?? 0),
  )
  const { data: viewImageResponse } = useQuery(reviewQueries.getViewImages())

  useEffect(() => {
    if (reviewQuery.isError && !reviewQuery.isLoading) {
      toast.show(
        (reviewQuery.error as any)?.error?.message ||
          '리뷰를 불러오는데 실패했습니다.',
      )
    }
  }, [reviewQuery.isError, reviewQuery.isLoading, reviewQuery.error])

  return {
    reviewQuery,
    ticketQuery,
    viewImageResponse,
    myInfo,
  }
}

export default useReviewQueries
