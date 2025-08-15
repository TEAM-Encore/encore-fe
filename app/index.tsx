import { Flex } from '@/components/common/ui/Flex'
import { BottomSheet } from '@/components/sheet/BottomSheet'
import { overlay } from 'overlay-kit'
import { Button, View } from 'react-native'

export default function Index() {
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
                <BottomSheet.Header>테스트</BottomSheet.Header>
              </BottomSheet.Root>
            ))
          }}
        />
      </Flex>
    </View>
  )
}
