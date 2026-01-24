import { api } from '@/api'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import type {
  DeleteReviewParams,
  LikeReviewParams,
  ReportReviewParams,
  ReviewCreateReq,
} from 'api'
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

  deleteReview: () => {
    const queryClient = useQueryClient()

    return useMutation({
      mutationFn: (params: DeleteReviewParams) => api().deleteReview(params),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: reviewKeys.list.all() })
      },
    })
  },

  likeReview: () => {
    const queryClient = useQueryClient()

    return useMutation({
      mutationFn: (params: LikeReviewParams) => api().likeReview(params),
      onSuccess: (_, variables) => {
        queryClient.invalidateQueries({
          queryKey: reviewKeys.detail({
            reviewId: variables.reviewId,
            userId: variables.userId,
          }),
        })
      },
    })
  },

  reportReview: () => {
    return useMutation({
      mutationFn: (params: ReportReviewParams) => api().reportReview(params),
    })
  },
}
