import { CTAButton } from '@/components/CTAButton'
import { Flex } from '@/components/common/ui/Flex'
import { Text } from '@/components/common/ui/Text'
import { View } from 'react-native'

export default function Index() {
  return (
    <View style={{ flex: 1, marginHorizontal: 20 }}>
      <Flex flex={1} justify="center" align="center" gap={10}>
        <CTAButton />
        <CTAButton disabled />
        <CTAButton>
          <Text>Icon</Text>
          <Text variant={'caption'}>확인</Text>
        </CTAButton>
      </Flex>
    </View>
  )
}
