import { useMutation, useQueryClient } from '@tanstack/react-query'
import type { ReviewCreateReq } from 'api'
import { api } from '@/api'
import { reviewKeys } from './keys'

export const reviewMutations = {
  createReview: () => {
    const queryClient = useQueryClient()

    return useMutation({
      mutationFn: (data: ReviewCreateReq) => api().createReview(data),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: reviewKeys.list.all() })
      },
    })
  },
}
