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
}
