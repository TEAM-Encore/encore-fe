import type { ImagePickerAsset } from 'expo-image-picker'
import { api } from '@/api'

export const uploadImage = async (
  asset: ImagePickerAsset,
): Promise<string | undefined> => {
  const { file_path, upload_url } = await api().saveImage({
    image_name: asset.fileName as string,
  })

  if (!upload_url) return undefined

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
    if (url) return url
  }

  return undefined
}
