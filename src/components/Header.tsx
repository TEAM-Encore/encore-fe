import { useRouter } from 'expo-router'
import { View } from 'react-native'
import { Icon } from './common/icons/Icon'
import { Flex, Row } from './common/ui/Flex'
import { Text } from './common/ui/Text'

export function Header({
  children,
  progress,
}: PropsWithStrictChildren<{ progress?: number }>) {
  return (
    <Row align="center" className="relative h-[70px] px-5">
      {children}
      {progress !== undefined && <Progress progress={progress} />}
    </Row>
  )
}

function Title({ children }: PropsWithStrictChildren) {
  return (
    <Text
      variant="subhead-05"
      className="-translate-y-1/2 pointer-events-none absolute inset-x-0 top-1/2 text-center text-gray-01"
    >
      {children}
    </Text>
  )
}

function Left({ children }: PropsWithStrictChildren) {
  return (
    <Flex align="center" className="z-10 mr-auto">
      {children}
    </Flex>
  )
}

function Right({ children }: PropsWithStrictChildren) {
  return (
    <Flex align="center" gap={12} className="z-10 ml-auto">
      {children}
    </Flex>
  )
}

function Progress({ progress }: { progress: number }) {
  return (
    <View className="absolute inset-x-0 bottom-0 h-[2px] bg-gray-09">
      <View
        className="z-10 h-full bg-primary-04"
        style={{ width: `${progress * 100}%` }}
      />
    </View>
  )
}

Header.Title = Title
Header.Left = Left
Header.Right = Right

Header.Back = () => {
  const router = useRouter()
  return (
    <Header.Left>
      <Icon
        name="ArrowLeft"
        onPress={() => router.back()}
        size={24}
        className="text-white"
      />
    </Header.Left>
  )
}

Header.Close = ({ onPress }: { onPress: () => void }) => {
  return (
    <Header.Right>
      <Icon name="Close" onPress={onPress} size={24} className="text-white" />
    </Header.Right>
  )
}
