import { useMutation } from '@tanstack/react-query'
import type { ReportReviewParamsReason, ReviewCreateReq } from 'api'
import { api } from '@/api'
import { queryClient } from '@/lib/query-client'
import { reviewKeys } from './keys'

export const reviewMutations = {
  createReview: () => {
    return useMutation({
      mutationFn: (data: ReviewCreateReq) => api().createReview(data),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: reviewKeys.list.all() })
      },
    })
  },

  likeReview: () => {
    return useMutation({
      mutationFn: ({ reviewId }: { reviewId: number }) =>
        api().likeReview(reviewId),
      onSuccess: (_, variables) => {
        queryClient.invalidateQueries({
          queryKey: reviewKeys.detail(variables.reviewId),
        })
      },
    })
  },

  unlockReview: () => {
    return useMutation({
      mutationFn: ({ reviewId }: { reviewId: number }) =>
        api().unlockReview(reviewId),
      onSuccess: (_, variables) => {
        queryClient.invalidateQueries({
          queryKey: reviewKeys.detail(variables.reviewId),
        })
      },
    })
  },

  deleteReview: () => {
    return useMutation({
      mutationFn: ({ reviewId }: { reviewId: number }) =>
        api().deleteReview(reviewId),
      onSuccess: (_, variables) => {
        queryClient.invalidateQueries({
          queryKey: reviewKeys.detail(variables.reviewId),
        })
      },
    })
  },

  reportReview: () => {
    return useMutation({
      mutationFn: ({
        reviewId,
        reason,
      }: {
        reviewId: number
        reason: ReportReviewParamsReason
      }) => api().reportReview({ reviewId, reason }),
    })
  },
}
