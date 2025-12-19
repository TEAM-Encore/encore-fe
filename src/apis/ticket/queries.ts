import { queryOptions } from '@tanstack/react-query'
import type { GetTicketDetailParams, SearchActorsParams } from 'api'
import { api } from '@/api'
import { ticketKeys } from './keys'

export const ticketQueries = {
  searchActors: (params: SearchActorsParams) =>
    queryOptions({
      queryKey: ticketKeys.searchActors(params),
      queryFn: () => api().searchActors(params),
      enabled: !!params.keyword,
    }),

  ticketDetail: (params: GetTicketDetailParams) =>
    queryOptions({
      queryKey: ticketKeys.ticketDetail(params),
      queryFn: () => api().getTicketDetail(params),
      select: (data) => data.data,
      enabled: !!params.userId && !!params.ticketId,
    }),
}
