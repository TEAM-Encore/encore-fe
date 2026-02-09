import { api } from '@/api'
import { queryOptions } from '@tanstack/react-query'
import { reviewKeys } from './keys'

export const reviewQueries = {
  getViewImage: () =>
    queryOptions({
      queryKey: reviewKeys.viewImage(),
      queryFn: () => api().viewImage1(),
    }),
}
