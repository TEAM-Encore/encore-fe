import { useMutation, useQueryClient } from '@tanstack/react-query'
import type { TicketCreateReq, TicketUpdateReq } from 'api'
import { api } from '@/api'

import { ticketKeys } from './keys'

export const ticketMutations = {
  createTicket: () => {
    const queryClient = useQueryClient()

    return useMutation({
      mutationFn: (data: TicketCreateReq) => api().createTicket(data),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ticketKeys.ticketList.all() })
      },
    })
  },

  updateTicket: () => {
    const queryClient = useQueryClient()

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
}
