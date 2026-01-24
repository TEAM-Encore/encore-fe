import { api } from '@/api'
import { queryOptions } from '@tanstack/react-query'
import type {
  GetTicketDetailParams,
  GetTicketListParams,
  SearchActorsParams,
} from 'api'
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
      queryKey: ticketKeys.ticketList.list(params),
      queryFn: () => api().getTicketList(params),
      enabled: !!params.userId,
    }),
  getTicketDetail: ({ ticketId, userId }: GetTicketDetailParams) =>
    queryOptions({
      queryKey: ticketKeys.getTicketDetail({ ticketId, userId }),
      queryFn: () => api().getTicketDetail({ ticketId, userId }),
      enabled: !!ticketId && !!userId,
      select: (data) => data.data,
    }),
  getUnreviewedTicketList: () =>
    queryOptions({
      queryKey: ticketKeys.unreviewed(),
      queryFn: () => api().getUnreviewedTicketList(),
    }),
}
