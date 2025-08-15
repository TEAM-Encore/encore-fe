import { Button } from '@/components/common/ui/Button'
import { Flex } from '@/components/common/ui/Flex'
import { Text } from '@/components/common/ui/Text'
import { View } from 'react-native'

export default function Index() {
  return (
    <View style={{ flex: 1 }}>
      <Flex flex={1} justify="center" align="center" gap={10}>
        <Button variant={'variant2'} className="px-[10px] py-[5px]">
          <Text variant={'caption'}>중복 확인</Text>
        </Button>
        <Button variant={'default'} size={'cta'} className="w-[300px]">
          <Text>다음</Text>
        </Button>
        <Button variant={'variant2'} size={'cta'} className="w-[300px]">
          <Text>다음</Text>
        </Button>
      </Flex>
    </View>
  )
}
