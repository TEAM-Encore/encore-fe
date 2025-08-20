import { Icon } from '@/components/common/icons/Icon'
import { Text } from '@/components/common/ui/Text'
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
      <Dropdown.Root>
        <Dropdown.Trigger>
          <Icon name="Search" size={24} className="text-gray-01" />
          <Text className="text-gray-01">Dropdown</Text>
        </Dropdown.Trigger>
        <Dropdown.Content position="bottom">
          <Dropdown.Item onPress={() => {}}>
            <Text className="text-gray-01">Item 1</Text>
          </Dropdown.Item>
          <Dropdown.Item onPress={() => {}}>
            <Text className="text-gray-01">Item 1</Text>
          </Dropdown.Item>
        </Dropdown.Content>
      </Dropdown.Root>

      <Dropdown.Root>
        <Dropdown.Trigger>
          <Icon name="Search" size={24} className="text-gray-01" />
        </Dropdown.Trigger>
        <Dropdown.Content position="left">
          <Dropdown.Item onPress={() => {}}>
            <Text className="text-gray-01">Item 1</Text>
          </Dropdown.Item>
        </Dropdown.Content>
      </Dropdown.Root>
    </View>
  )
}
