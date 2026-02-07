import { type PropsWithChildren, type ReactNode, useState } from 'react'
import { type StyleProp, Text, View, type ViewStyle } from 'react-native'
import Animated, {
  type SharedValue,
  useAnimatedStyle,
  useFrameCallback,
  useSharedValue,
} from 'react-native-reanimated'
import { Row } from './common/ui/Flex'

const MeasureElement = ({
  onLayout,
  children,
}: PropsWithChildren<{ onLayout: (event: number) => void }>) => (
  <Animated.ScrollView
    horizontal
    className="z-[-1] opacity-0"
    pointerEvents="box-none"
  >
    <View onLayout={(ev) => onLayout(ev.nativeEvent.layout.width)}>
      {children}
    </View>
  </Animated.ScrollView>
)

const TranslatedElement = ({
  index,
  children,
  offset,
  childrenWidth,
}: PropsWithChildren<{
  index: number
  offset: SharedValue<number>
  childrenWidth: number
}>) => {
  const animatedStyle = useAnimatedStyle(() => {
    return {
      left: (index - 1) * childrenWidth,
      transform: [{ translateX: offset.value }],
    }
  })
  return (
    <Animated.View style={[{ position: 'absolute' }, animatedStyle]}>
      {children}
    </Animated.View>
  )
}

const getIndicesArray = (length: number) => Array.from({ length }, (_, i) => i)

const Cloner = ({
  count,
  renderChild,
}: {
  count: number
  renderChild: (index: number) => ReactNode
}) => <>{getIndicesArray(count).map(renderChild)}</>

const ChildrenScroller = ({
  duration,
  childrenWidth,
  parentWidth,
  children,
}: PropsWithChildren<{
  duration: number
  childrenWidth: number
  parentWidth: number
}>) => {
  const offset = useSharedValue(0)
  const coeff = useSharedValue(-1)

  useFrameCallback((i) => {
    offset.value +=
      (coeff.value * ((i.timeSincePreviousFrame ?? 1) * childrenWidth)) /
      duration
    offset.value = offset.value % childrenWidth
  }, true)

  const count = Math.round(parentWidth / childrenWidth) + 2
  const renderChild = (index: number) => (
    <TranslatedElement
      key={`clone-${index}`}
      index={index}
      offset={offset}
      childrenWidth={childrenWidth}
    >
      {children}
    </TranslatedElement>
  )

  return <Cloner count={count} renderChild={renderChild} />
}

function Marquee({
  duration = 2000,
  children,
  className,
}: PropsWithChildren<{
  duration?: number
  className?: string
}>) {
  const [parentWidth, setParentWidth] = useState(0)
  const [childrenWidth, setChildrenWidth] = useState(0)

  const shouldMarquee =
    childrenWidth > 0 && parentWidth > 0 && childrenWidth > parentWidth

  return shouldMarquee ? (
    <View
      className={className}
      onLayout={(ev) => {
        setParentWidth(ev.nativeEvent.layout.width)
      }}
      pointerEvents="box-none"
    >
      <Row className="overflow-hidden" pointerEvents="box-none">
        <MeasureElement onLayout={setChildrenWidth}>{children}</MeasureElement>

        <ChildrenScroller
          duration={duration}
          parentWidth={parentWidth}
          childrenWidth={childrenWidth + 50}
        >
          {children}
        </ChildrenScroller>
      </Row>
    </View>
  ) : (
    children
  )
}

export default Marquee
