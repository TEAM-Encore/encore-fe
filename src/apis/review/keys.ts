export const reviewKeys = {
  all: ['review'] as const,
  list: () => [...reviewKeys.all, 'list'] as const,
  detail: (reviewId: number) => [...reviewKeys.all, 'detail', reviewId],
  viewImage: () => [...reviewKeys.all, 'viewImage'] as const,
} as const
