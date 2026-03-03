import { queryOptions } from '@tanstack/react-query'
import type { GetReviewListParams } from 'api'
import { api } from '@/api'
import { reviewKeys } from './keys'

export const reviewQueries = {
  getReviewList: (params: GetReviewListParams) =>
    queryOptions({
      queryKey: reviewKeys.all,
      queryFn: () => api().getReviewList(params),
      select: (data) => data.data,
    }),

  getViewImages: () =>
    queryOptions({
      queryKey: reviewKeys.viewImage(),
      queryFn: () => api().viewImage1(),
      select: (data) => data.data,
      staleTime: 5 * 60 * 1000,
    }),

  getReview: (reviewId: number) =>
    queryOptions({
      queryKey: reviewKeys.detail(reviewId),
      queryFn: () => api().getReview(reviewId),
      enabled: !!reviewId,
      select: (data) => data.data,
    }),
}
