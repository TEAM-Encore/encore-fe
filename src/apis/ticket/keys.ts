import type {
  GetTicketDetailParams,
  GetTicketListParams,
  SearchActorsParams,
} from 'api'

export const ticketKeys = {
  all: ['ticket'] as const,
  searchActors: (params: SearchActorsParams) => [
    ...ticketKeys.all,
    'searchActors',
    params,
  ],
  ticketList: {
    all: () => [...ticketKeys.all, 'ticketList'] as const,
    list: (params: GetTicketListParams) =>
      [...ticketKeys.ticketList.all(), 'list', params] as const,
  },
  getTicketDetail: (params: GetTicketDetailParams) => [
    ...ticketKeys.all,
    'getTicketDetail',
    params,
  ],
  unreviewed: () => [...ticketKeys.all, 'unreviewed'] as const,
} as const
