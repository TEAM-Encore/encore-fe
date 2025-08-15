import { Flex } from '@/components/common/ui/Flex'
import { Text } from '@/components/common/ui/Text'
import { BottomSheet } from '@/components/sheet/BottomSheet'
import { overlay } from 'overlay-kit'
import { Button, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function Index() {
  return (
    <SafeAreaView className="flex-1">
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
                <BottomSheet.Root
                  isOpen={isOpen}
                  close={close}
                  unmount={unmount}
                >
                  <BottomSheet.Header>테스트</BottomSheet.Header>
                  <BottomSheet.Content>
                    <Text>테스트</Text>
                  </BottomSheet.Content>
                  <BottomSheet.Footer></BottomSheet.Footer>
                </BottomSheet.Root>
              ))
            }}
          />
        </Flex>
      </View>
    </SafeAreaView>
  )
}
