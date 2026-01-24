import type { ImagePickerAsset } from 'expo-image-picker'
import { api } from '@/api'

export const uploadImage = async (
  asset: ImagePickerAsset,
): Promise<string | undefined> => {
  const blob = await fetch(asset.uri).then((res) => res.blob())

  const { file_path, upload_url } = await api().saveImage({
    image_name: asset.fileName as string,
  })

  if (upload_url) {
    const uploadResponse = await fetch(upload_url, {
      method: 'PUT',
      headers: {
        'Content-Type': blob.type,
      },
      body: blob,
    })

    if (uploadResponse.ok) {
      const { url } = await api().viewImage({ file_path })
      if (url) return url
    }
  }

  return undefined
}
