import { useQuery } from '@tanstack/react-query'
import { api } from '@/api'

export function useSignedImageUrl(filePath: string | undefined) {
  const { data } = useQuery({
    queryKey: ['signedImageUrl', filePath],
    queryFn: () => api().viewImage({ file_path: filePath as string }),
    enabled: !!filePath,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  })

  return data?.url
}
