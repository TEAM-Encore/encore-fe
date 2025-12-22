import type { GetTicketListParams, SearchActorsParams } from 'api'

export const ticketKeys = {
  all: ['ticket'] as const,
  searchActors: (params: SearchActorsParams) =>
    [...ticketKeys.all, 'searchActors', params] as const,
  getTicketList: (params: GetTicketListParams) =>
    [...ticketKeys.all, 'getTicketList', params] as const,
}
