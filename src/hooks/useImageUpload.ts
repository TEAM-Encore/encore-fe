export const useImageUpload = () => {
	const uploadImage = async ({ uri, fileName }: { uri: string, fileName: string }) => {
		const blob = await fetch(uri).then(res => res.blob())

		const response = await fetch(`${process.env.EXPO_PUBLIC_API_HOST}/api/v1/image/presigned-url`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ image_name: fileName }),
		})

		if (!response.ok) {
			throw new Error('이미지 등록에 실패했습니다.')
		}

		const { file_path, upload_url } = await response.json()

		const uploadResponse = await fetch(upload_url, {
			method: 'PUT',
			headers: {
				'Content-Type': blob.type,
			},
			body: blob,
		})

		if (!uploadResponse.ok) {
			throw new Error('이미지 등록에 실패했습니다.')
		}

		const getImageResponse = await fetch(`${process.env.EXPO_PUBLIC_API_HOST}/api/v1/image/view/presigned-url`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ file_path }),
		})

		if (!getImageResponse.ok) {
			throw new Error('이미지 등록에 실패했습니다.')
		}

		const { url } = await getImageResponse.json()

		return url
	}

	return uploadImage
}