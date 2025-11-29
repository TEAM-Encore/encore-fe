import { useRouter } from 'expo-router'
import { View } from 'react-native'
import { cn } from '@/utils/cn'
import { Icon } from './common/icons/Icon'
import { Flex, Row } from './common/ui/Flex'
import { Text } from './common/ui/Text'

export function Header({
  children,
  progress,
  className,
}: PropsWithStrictChildren<{ progress?: number; className?: string }>) {
  return (
    <Row align="center" className={cn('relative h-[66px] px-5', className)}>
      {children}
      {progress !== undefined && <Progress progress={progress} />}
    </Row>
  )
}

function Center({ children }: PropsWithStrictChildren) {
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

function Right({
  children,
  className,
}: PropsWithStrictChildren<{ className?: string }>) {
  return (
    <Flex align="center" gap={12} className={cn('z-10 ml-auto', className)}>
      {children}
    </Flex>
  )
}

function Progress({ progress }: { progress: number }) {
  return (
    <View className="absolute inset-x-0 bottom-0 h-[2px] bg-gray-09">
      <View
        className="z-10 h-full bg-primary-04"
        style={{ width: `${(progress / 100) * 100}%` }}
      />
    </View>
  )
}

Header.Center = Center
Header.Left = Left
Header.Right = Right

Header.Back = ({ onPress }: { onPress?: () => void }) => {
  const router = useRouter()
  return (
    <Header.Left>
      <Icon
        name="ArrowLeft"
        onPress={() => {
          if (onPress) {
            onPress()
          } else {
            router.back()
          }
        }}
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
