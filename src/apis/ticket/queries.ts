import { queryOptions } from '@tanstack/react-query'
import type { GetTicketListParams, SearchActorsParams } from 'api'
import { api } from '@/api'
import { ticketKeys } from './keys'

export const ticketQueries = {
  searchActors: (params: SearchActorsParams) =>
    queryOptions({
      queryKey: ticketKeys.searchActors(params),
      queryFn: () => api().searchActors(params),
      enabled: !!params.keyword,
    }),
  getTicketList: (params: GetTicketListParams) =>
    queryOptions({
      queryKey: ticketKeys.getTicketList(params),
      queryFn: () => api().getTicketList(params),
      enabled: !!params.userId,
    }),
}
