import { api } from '@/api'
import { CONFIG } from '@/constants/config'
import type { ImagePickerAsset } from 'expo-image-picker'

export const uploadImage = async (
  asset: ImagePickerAsset,
): Promise<{ url: string; dynamicUrl: string } | undefined> => {
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

      if (url)
        return {
          url,
          dynamicUrl: url.split(CONFIG.S3_BASE_URL + '/')[1].split('?')[0],
        }
    }
  }

  return undefined
}
