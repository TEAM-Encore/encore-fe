import React, { forwardRef } from 'react'
import { StyleProp, View, ViewProps, ViewStyle } from 'react-native'

type FlexProps = {
  flex?: number
  justify?: ViewStyle['justifyContent']
  align?: ViewStyle['alignItems']
  direction?: ViewStyle['flexDirection']
  wrap?: ViewStyle['flexWrap']
  style?: StyleProp<ViewStyle>
  children: React.ReactNode
  gap?: number
} & ViewProps

export const Flex = forwardRef<View, FlexProps>(function Flex(
  {
    flex,
    justify,
    align,
    direction,
    wrap,
    style,
    gap,
    children,
    className,
    ...props
  }: FlexProps,
  ref,
) {
  return (
    <View
      ref={ref}
      style={[
        {
          flex: flex,
          display: 'flex',
          flexDirection: direction,
          justifyContent: justify,
          alignItems: align,
          flexWrap: wrap,
          gap: gap,
        },
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
