import { Flex } from '@/components/common/ui/Flex'
import { Text } from '@/components/common/ui/Text'
import { View } from 'react-native'

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
        <Text variant="display-05" className="text-red-500">
          테스트에요
        </Text>
        <Text variant="display-05" className="text-red-500">
          테스트에요
        </Text>
      </Flex>
    </View>
  )
}
