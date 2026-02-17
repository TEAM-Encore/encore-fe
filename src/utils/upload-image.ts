import type { ImagePickerAsset } from 'expo-image-picker'
import { api } from '@/api'
import { CONFIG } from '@/constants/config'

export const uploadImage = async (
  asset: ImagePickerAsset,
): Promise<{
  url: string | undefined
  file_path: string | undefined
  dynamicUrl: string | undefined
}> => {
  const blob = await fetch(asset.uri).then((res) => res.blob())

  const { file_path, upload_url } = await api().saveImage({
    image_name: asset.fileName as string,
  })

  if (!upload_url) return { url: undefined, file_path, dynamicUrl: undefined }

  const uploadResponse = await fetch(upload_url, {
    method: 'PUT',
    headers: {
      'Content-Type': asset.mimeType || 'image/jpeg',
    },
    body: blob,
  })

  if (uploadResponse.ok) {
    const { url } = await api().viewImage({ file_path })
    if (url) {
      return {
        url,
        file_path,
        dynamicUrl: url.split(`${CONFIG.S3_BASE_URL}/`)[1].split('?')[0],
      }
    }
  }

  return {
    url: undefined,
    file_path,
    dynamicUrl: undefined,
  }
}
