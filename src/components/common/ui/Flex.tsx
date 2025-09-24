import React, { forwardRef } from 'react'
import {
  Pressable,
  type PressableProps,
  type StyleProp,
  type View,
  type ViewProps,
  type ViewStyle,
} from 'react-native'
import type { AnimatedProps } from 'react-native-reanimated'
import Animated from 'react-native-reanimated'

export type FlexProps = ViewProps &
  PressableProps &
  AnimatedProps<ViewProps> & {
    flex?: number
    justify?: ViewStyle['justifyContent']
    align?: ViewStyle['alignItems']
    direction?: ViewStyle['flexDirection']
    wrap?: ViewStyle['flexWrap']
    center?: boolean
    gap?: number
  }

type BaseFlexLayoutProps = Pick<
  FlexProps,
  'flex' | 'justify' | 'align' | 'direction' | 'wrap' | 'center' | 'gap'
>

function buildFlexStyle({
  flex,
  justify,
  align,
  direction,
  wrap,
  gap,
  center,
}: BaseFlexLayoutProps): ViewStyle[] {
  return [
    {
      flex: flex,
      display: 'flex',
      flexDirection: direction,
      justifyContent: justify,
      alignItems: align,
      flexWrap: wrap,
      gap: gap,
    },
    center && {
      justifyContent: 'center',
      alignItems: 'center',
    },
  ] as ViewStyle[]
}

const FlexComponent = forwardRef<View, FlexProps>(function Flex(
  {
    flex,
    justify,
    align,
    direction,
    wrap,
    gap,
    center,
    style,
    className,
    children,
    onPress,
    ...props
  },
  ref,
) {
  const baseStyle = buildFlexStyle({
    flex,
    justify,
    align,
    direction,
    wrap,
    gap,
    center,
  })

  if (onPress) {
    const pressableStyle: PressableProps['style'] =
      typeof style === 'function'
        ? (state) => {
            const st = style(state)
            const __style = Array.isArray(st) ? st : [st]
            return [
              ...baseStyle,
              ...__style,
              state.pressed && { opacity: 0.8 },
            ] as StyleProp<ViewStyle>
          }
        : ([...baseStyle, style] as StyleProp<ViewStyle>)

    return (
      <Pressable
        ref={ref}
        style={pressableStyle}
        className={className}
        onPress={onPress}
        {...props}
      >
        {children}
      </Pressable>
    )
  }

  return (
    <Animated.View
      ref={ref}
      style={[
        ...buildFlexStyle({
          flex,
          justify,
          align,
          direction,
          wrap,
          gap,
          center,
        }),
        style,
      ]}
      className={className}
      {...props}
    >
      {children}
    </Animated.View>
  )
})

export const Flex = Animated.createAnimatedComponent(FlexComponent)

export const Row = forwardRef<View, FlexProps>(function Row(
  props: Omit<FlexProps, 'direction'>,
  ref,
) {
  return <Flex direction="row" {...props} ref={ref} />
})

export const Col = forwardRef<View, FlexProps>(function Col(
  props: Omit<FlexProps, 'direction'>,
  ref,
) {
  return <Flex direction="column" {...props} ref={ref} />
})
