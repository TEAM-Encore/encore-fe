import { cn } from '@/utils/cn'
import { Pressable, View } from 'react-native'
import { Row } from './common/ui/Flex'
import { Text } from './common/ui/Text'

type RatingSliderProps = {
  label: string
  value: number
  onChange?: (value: number) => void
  showHelp?: boolean
  onHelpPress?: () => void
}

export function RatingSlider({
  label,
  value,
  onChange,
  showHelp,
  onHelpPress,
}: RatingSliderProps) {
  return (
    <Row align="center" gap={12} className="w-full">
      <Row align="center" gap={4} className="w-20">
        <Text variant="body-02" className="text-gray-01">
          {label}
        </Text>
        {showHelp && (
          <Pressable onPress={onHelpPress} hitSlop={8}>
            <View className="h-4 w-4 items-center justify-center rounded-full border border-gray-06">
              <Text variant="caption" className="text-gray-06 text-xs">
                ?
              </Text>
            </View>
          </Pressable>
        )}
      </Row>

      <Row className="flex-1">
        {[1, 2, 3, 4, 5].map((step, idx) => {
          const isSelected = step <= value
          const isNextSelected = step + 1 <= value
          const shouldHaveGap = step < 5 && !(isSelected && isNextSelected)

          const bar = (
            <View
              key={idx}
              className={cn('h-4', {
                'bg-primary-04': step <= value,
                'bg-gray-10': step > value,
                'rounded-l-full': step === 1,
                'rounded-r-full': step === 5,
              })}
            />
          )

          const container = onChange ? (
            <Pressable
              key={step}
              onPress={() => onChange(step)}
              className={cn('flex-1', { 'mr-0.5': shouldHaveGap })}
            >
              {bar}
            </Pressable>
          ) : (
            <View
              key={step}
              className={cn('flex-1', { 'mr-0.5': shouldHaveGap })}
            >
              {bar}
            </View>
          )

          return container
        })}
      </Row>

      <Text variant="body-02" className="w-8 text-right text-gray-06">
        {value}점
      </Text>
    </Row>
  )
}
