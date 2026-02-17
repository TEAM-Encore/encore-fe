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
  const { file_path, upload_url } = await api().saveImage({
    image_name: asset.fileName as string,
  })

  if (!upload_url) return { url: undefined, file_path, dynamicUrl: undefined }

  const uploaded = await new Promise<boolean>((resolve) => {
    const xhr = new XMLHttpRequest()
    xhr.open('PUT', upload_url)
    xhr.setRequestHeader('Content-Type', asset.mimeType || 'image/jpeg')
    xhr.onload = () => resolve(xhr.status === 200)
    xhr.onerror = () => resolve(false)
    xhr.send({
      uri: asset.uri,
      type: asset.mimeType || 'image/jpeg',
      name: asset.fileName || 'image.jpg',
    })
  })

  if (uploaded) {
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
