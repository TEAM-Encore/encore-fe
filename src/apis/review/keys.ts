import type { GetReviewListParams, GetReviewParams } from 'api'

export const reviewKeys = {
  all: ['review'] as const,
  list: {
    all: () => [...reviewKeys.all, 'list'] as const,
    list: (params: GetReviewListParams) =>
      [...reviewKeys.list.all(), params] as const,
  },
  detail: (params: GetReviewParams) => [...reviewKeys.all, 'detail', params],
  viewImage: () => [...reviewKeys.all, 'viewImage'] as const,
} as const
