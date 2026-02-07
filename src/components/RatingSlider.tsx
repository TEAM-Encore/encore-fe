import { Pressable, View } from 'react-native'
import { cn } from '@/utils/cn'
import { Icon } from './common/icons/Icon'
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
        <Text variant="caption" color="gray-01">
          {label}
        </Text>
        {showHelp && (
          <Pressable onPress={onHelpPress} hitSlop={8}>
            <Icon name="HelpCircle" color="gray-06" size={14} />
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
              className={cn('h-3', {
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

      <Text variant="caption" color="gray-07" className="shrink-0">
        {value}점
      </Text>
    </Row>
  )
}
