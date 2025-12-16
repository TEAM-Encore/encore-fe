import { queryOptions } from '@tanstack/react-query'
import type { SearchMusicalsParams } from 'api'
import { api } from '@/api'
import { musicalKeys } from './keys'

export const musicalQueries = {
  searchMusicals: (params: SearchMusicalsParams) =>
    queryOptions({
      queryKey: musicalKeys.searchMusicals(params),
      queryFn: () => api().searchMusicals(params),
      enabled: !!params.keyword,
    }),
}
