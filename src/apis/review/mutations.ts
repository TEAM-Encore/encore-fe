import { api } from '@/api'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import type { ReviewCreateReq } from 'api'
import { reviewKeys } from './keys'

export const reviewMutations = {
  createReview: () => {
    const queryClient = useQueryClient()

    return useMutation({
      mutationFn: ({ userId, ...data }: { userId: number } & ReviewCreateReq) =>
        api().createReview({ userId }, data),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: reviewKeys.list.all() })
      },
    })
  },
}
