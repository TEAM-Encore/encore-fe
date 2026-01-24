import { api } from '@/api'
import type { GetReviewParams } from 'api'
import { queryOptions } from '@tanstack/react-query'
import { reviewKeys } from './keys'

export const reviewQueries = {
  getViewImage: () =>
    queryOptions({
      queryKey: reviewKeys.viewImage(),
      queryFn: () => api().viewImage1(),
    }),

  getReview: (params: GetReviewParams) =>
    queryOptions({
      queryKey: reviewKeys.detail(params),
      queryFn: () => api().getReview(params),
      enabled: !!params.reviewId && !!params.userId,
    }),
}
