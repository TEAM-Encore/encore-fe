import { useMutation } from '@tanstack/react-query'
import type { TicketCreateReq, TicketUpdateReq } from 'api'
import { api } from '@/api'
import { queryClient } from '@/lib/query-client'
import { ticketKeys } from './keys'

export const ticketMutations = {
  createTicket: () => {
    return useMutation({
      mutationFn: (data: TicketCreateReq) => api().createTicket(data),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ticketKeys.ticketList.all() })
      },
    })
  },

  updateTicket: () => {
    return useMutation({
      mutationFn: ({
        ticketId,
        ...data
      }: { ticketId: number } & TicketUpdateReq) =>
        api().updateTicket(ticketId, data),
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ticketKeys.ticketList.all(),
        })
      },
    })
  },

  deleteTicket: () => {
    return useMutation({
      mutationFn: ({ ticketId }: { ticketId: number }) =>
        api().deletePost(ticketId),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ticketKeys.ticketList.all() })
      },
    })
  },
}
