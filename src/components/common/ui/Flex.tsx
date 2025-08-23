import React, { forwardRef } from 'react'
import {
  Animated,
  Pressable,
  PressableProps,
  StyleProp,
  View,
  ViewProps,
  ViewStyle,
} from 'react-native'

export type FlexProps = ViewProps &
  PressableProps & {
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

export const Flex = forwardRef<View, FlexProps>(function Flex(
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
            return [...baseStyle, ...__style] as StyleProp<ViewStyle>
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
    <View
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
    </View>
  )
})

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

export const AnimatedFlex = Animated.createAnimatedComponent(Flex)
