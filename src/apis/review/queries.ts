import { queryOptions } from '@tanstack/react-query'
import { api } from '@/api'
import { reviewKeys } from './keys'

export const reviewQueries = {
  getViewImage: () =>
    queryOptions({
      queryKey: reviewKeys.viewImage(),
      queryFn: () => api().viewImage1(),
      select: (data) => data.data,
    }),

  getReview: (reviewId: number) =>
    queryOptions({
      queryKey: reviewKeys.detail(reviewId),
      queryFn: () => api().getReview(reviewId),
      enabled: !!reviewId,
      select: (data) => data.data,
    }),
}
