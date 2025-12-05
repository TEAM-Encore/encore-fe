import { queryOptions } from '@tanstack/react-query'
import type { SearchActorsParams } from 'api'
import { api } from '@/api'
import { ticketKeys } from './keys'

export const ticketQueries = {
  searchActors: (params: SearchActorsParams) =>
    queryOptions({
      queryKey: ticketKeys.searchActors(params),
      queryFn: () => api().searchActors(params),
      enabled: !!params.keyword,
    }),
}
