import { Pressable } from 'react-native'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { BottomSheet } from '@/components/BottomSheet'
import { Icon } from '@/components/common/icons/Icon'
import { Text } from '@/components/common/ui/Text'

export function GalleryBottomSheet({ isOpen, close, unmount }: OverlayProps) {
  return (
    <GestureHandlerRootView
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 9999,
      }}
    >
      <BottomSheet.Root
        isOpen={isOpen}
        close={() => {
          close()
          unmount?.()
        }}
        backgroundColor="#FFFFFF"
        borderTopRadius={20}
      >
        <BottomSheet.Content className="bg-white">
          <Pressable className="flex h-[68px] flex-row items-center justify-center gap-2.5 bg-white py-5">
            <Icon name="Image" size={24} className="text-gray-09" />
            <Text variant="subhead-long-03" color="gray-09">
              갤러리에서 변경하기
            </Text>
          </Pressable>
          <Pressable className="flex h-[68px] flex-row items-center justify-center gap-2.5 bg-white py-5">
            <Icon name="Delete" size={24} className="text-sub-alert" />
            <Text variant="subhead-long-03" color="sub-alert">
              사진 삭제하기
            </Text>
          </Pressable>
        </BottomSheet.Content>
      </BottomSheet.Root>
    </GestureHandlerRootView>
  )
}
