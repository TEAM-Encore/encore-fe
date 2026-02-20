import { useEffect, useState } from 'react'
import { imageMutations } from '@/apis/image/mutations'

export function useSignedImageUrl(filePath: string | undefined) {
  const [url, setUrl] = useState<string | undefined>()
  const { mutate } = imageMutations.getViewImage()

  useEffect(() => {
    if (!filePath) {
      setUrl(undefined)
      return
    }
    mutate(
      { file_path: filePath },
      { onSuccess: (data) => setUrl(data?.url ?? '') },
    )
  }, [filePath, mutate])

  return url
}
