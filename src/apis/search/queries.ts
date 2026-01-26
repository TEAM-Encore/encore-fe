import { queryOptions } from '@tanstack/react-query'
import { api } from '@/api'
import { searchKeys } from './keys'

export const searchQueries = {
  getRecentSearchLogs: () =>
    queryOptions({
      queryKey: searchKeys.all,
      queryFn: () => api().getRecentSearchLogs(),
      select: (data) => data.data,
      staleTime: 0,
      retryOnMount: true,
    }),
}
