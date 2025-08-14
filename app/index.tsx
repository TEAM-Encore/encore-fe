import { Flex } from '@/components/common/ui/Flex'
import { BottomSheet } from '@/components/sheet/BottomSheet'
import { overlay } from 'overlay-kit'
import { useRef } from 'react'
import { Button, View } from 'react-native'

export default function Index() {
  const ref = useRef<BottomSheet>(null)

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Flex flex={1} justify="center" align="center">
        <Button
          title="토스트"
          onPress={() => {
            overlay.open(({ isOpen, close, unmount }) => (
              <BottomSheet.Root isOpen={isOpen} close={close} unmount={unmount}>
                <BottomSheet.Header></BottomSheet.Header>
              </BottomSheet.Root>
            ))
          }}
        />
      </Flex>
    </View>
  )
}
