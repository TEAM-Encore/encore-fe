import { BottomSheet } from '@/components/BottomSheet'
import { Icon } from '@/components/common/icons/Icon'
import { Row } from '@/components/common/ui/Flex'
import { Text } from '@/components/common/ui/Text'

interface GalleryBottomSheetProps extends OverlayProps {
  onOpenGallery: () => void
  onDeletePhoto: () => void
}

function GalleryBottomSheet({ onOpenGallery, onDeletePhoto, ...props }: GalleryBottomSheetProps) {
  return (
    <BottomSheet.Root
      {...props}
      backgroundColor="#FFFFFF"
      borderTopRadius={20}
    >
      <BottomSheet.Content className="bg-white">
        <Row
          align="center"
          justify="center"
          gap={10}
          className="h-[68px] bg-white py-5"
          onPress={onOpenGallery}
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
          onPress={onDeletePhoto}
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