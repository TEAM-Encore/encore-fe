export const useImageUpload = () => {
	const uploadImage = async ({ uri, fileName }: { uri: string, fileName: string }) => {
		const blob = await fetch(uri).then(res => res.blob())

		const response = await fetch(`${process.env.EXPO_PUBLIC_API_HOST}/api/v1/image/presigned-url`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				image_name: fileName,
			}),
		})
		const { file_path, upload_url } = await response.json()

		const uploadResponse = await fetch(upload_url, {
			body: blob,
			method: 'PUT',
			headers: {
				'Content-Type': blob.type,
			},
		})

		if (uploadResponse.ok) {
			const getImageResponse = await fetch(`${process.env.EXPO_PUBLIC_API_HOST}/api/v1/image/view/presigned-url`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ file_path }),
			})
			const { url } = await getImageResponse.json()

			return url
		}

		throw new Error('Failed to upload image')
	}

	return uploadImage
}