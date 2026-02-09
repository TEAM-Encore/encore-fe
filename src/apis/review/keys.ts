import type { GetReviewListParams } from 'api'

export const reviewKeys = {
  all: ['review'] as const,
  list: {
    all: () => [...reviewKeys.all, 'list'] as const,
    list: (params: GetReviewListParams) =>
      [...reviewKeys.list.all(), params] as const,
  },
  detail: (reviewId: number) => [...reviewKeys.all, 'detail', reviewId],
  viewImage: () => [...reviewKeys.all, 'viewImage'] as const,
} as const
