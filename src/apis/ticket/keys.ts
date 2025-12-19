import type { GetTicketDetailParams, SearchActorsParams } from 'api'

export const ticketKeys = {
  all: ['ticket'] as const,
  searchActors: (params: SearchActorsParams) =>
    [...ticketKeys.all, 'searchActors', params] as const,
  ticketDetail: (params: GetTicketDetailParams) =>
    [...ticketKeys.all, 'ticketDetail', params] as const,
} as const
