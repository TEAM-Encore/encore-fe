import { Icon } from '@/components/common/icons/Icon'
import { Col } from '@/components/common/ui/Flex'
import { Dropdown } from '@/components/Dropdown'
import { View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

export default function Index() {
  const insets = useSafeAreaInsets()

  return (
    <View
      className="flex-1 items-center justify-center bg-gray-12"
      style={{ paddingTop: insets.top }}
    >
      <Col gap={16}>
        <Dropdown.Root>
          <Dropdown.Trigger>
            <Icon name="Search" size={24} className="text-gray-01" />
          </Dropdown.Trigger>
          <Dropdown.Content position="left">
            <Dropdown.Item onPress={() => {}}>수정</Dropdown.Item>
            <Dropdown.Item variant="destructive">삭제</Dropdown.Item>
          </Dropdown.Content>
        </Dropdown.Root>

        <Dropdown.Root>
          <Dropdown.Trigger>
            <Icon name="Search" size={24} className="text-gray-01" />
          </Dropdown.Trigger>
          <Dropdown.Content position="bottom">
            <Dropdown.Item onPress={() => {}}>보통이에요</Dropdown.Item>
            <Dropdown.Item>좋지 않아요</Dropdown.Item>
          </Dropdown.Content>
        </Dropdown.Root>
      </Col>
    </View>
  )
}
