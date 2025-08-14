import { Flex } from '@/components/common/ui/Flex'
import { toast } from '@/components/Toaster'
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
            toast.show({
              text: '테스트에요',
            })
          }}
        />
      </Flex>
    </View>
  )
}
