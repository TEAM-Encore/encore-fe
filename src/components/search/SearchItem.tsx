import { cn } from '@/utils/cn'
import { Row } from '../common/ui/Flex'
import { Text } from '../common/ui/Text'

export function SearchItem({
  selected,
  onPress,
  children,
}: PropsWithStrictChildren<{
  selected: boolean
  onPress: () => void
}>) {
  return (
    <Row
      align="center"
      onPress={onPress}
      className={cn('h-12 rounded-lg bg-gray-11 px-[13px] py-2', {
        'bg-primary-04': selected,
      })}
    >
      <Text
        variant="body-02"
        numberOfLines={1}
        className={cn('text-gray-07', {
          'text-gray-12': selected,
        })}
      >
        {children}
      </Text>
    </Row>
  )
}
