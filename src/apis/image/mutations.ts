import { useMutation } from '@tanstack/react-query'
import type { ImageGetPresignedUrlRequest } from 'api'
import { api } from '@/api'

export const imageMutations = {
  getViewImage: () => {
    return useMutation({
      mutationFn: (data: ImageGetPresignedUrlRequest) => api().viewImage(data),
    })
  },
}
