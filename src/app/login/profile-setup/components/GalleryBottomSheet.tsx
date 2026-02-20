import * as ImagePicker from 'expo-image-picker'
import { BottomSheet } from '@/components/BottomSheet'
import { Icon } from '@/components/common/icons/Icon'
import { Row } from '@/components/common/ui/Flex'
import { Text } from '@/components/common/ui/Text'
import { uploadImage } from '@/utils/upload-image'

interface GalleryBottomSheetProps extends OverlayProps {
  onOpenGallery: (url: string, file_path: string) => void
  onDeletePhoto: () => void
  onUploadStart?: () => void
  onUploadEnd?: () => void
}

function GalleryBottomSheet({
  onOpenGallery,
  onDeletePhoto,
  onUploadStart,
  onUploadEnd,
  ...props
}: GalleryBottomSheetProps) {
  return (
    <BottomSheet.Root {...props} backgroundColor="#FFFFFF" borderTopRadius={20}>
      <BottomSheet.Content className="bg-white">
        <Row
          align="center"
          justify="center"
          gap={10}
          className="h-[68px] bg-white py-5"
          onPress={async () => {
            props.unmount?.()
            const result = await ImagePicker.launchImageLibraryAsync({
              mediaTypes: ['images'],
              allowsEditing: false,
              aspect: [1, 1],
              quality: 1,
              base64: true,
            })

            if (result.canceled || !result.assets?.length) return

            const asset = result?.assets?.[0] as ImagePicker.ImagePickerAsset
            onUploadStart?.()
            const res = await uploadImage(asset)
            const { url, file_path } = res
            onUploadEnd?.()
            if (url && file_path) {
              onOpenGallery(url, file_path)
            }
          }}
        >
          <Icon name="Image" size={24} className="text-gray-09" />
          <Text variant="subhead-long-03" color="gray-09">
            갤러리에서 변경하기
          </Text>
        </Row>
        <Row
          align="center"
          justify="center"
          gap={10}
          className="h-[68px] bg-white py-5"
          onPress={() => {
            props.unmount?.()
            onDeletePhoto()
          }}
        >
          <Icon name="Delete" size={24} className="text-sub-alert" />
          <Text variant="subhead-long-03" color="sub-alert">
            사진 삭제하기
          </Text>
        </Row>
      </BottomSheet.Content>
    </BottomSheet.Root>
  )
}

export default GalleryBottomSheet
