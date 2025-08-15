import { cssInterop } from 'nativewind'
import { forwardRef } from 'react'
import type { SvgProps } from 'react-native-svg'
import Svg from 'react-native-svg'
import * as Icons from './svgs'

cssInterop(Svg, { className: { target: 'style' } })

export type IconName = keyof typeof Icons

export type IconProps = SvgProps & {
  name: IconName
  size?: number
  className?: string
}

export const Icon = forwardRef(function Icon(
  props: IconProps,
  ref?: React.Ref<SVGSVGElement>,
) {
  const {
    name,
    width = props.width ?? props.size ?? 24,
    height = props.height ?? props.size ?? 24,
    fill = 'none',
    className,
    style,
    ...rest
  } = props

  const IconElement = Icons[name]

  return (
    <IconElement
      ref={ref}
      width={width}
      height={height}
      fill={fill}
      className={className}
      style={[{ flexShrink: 0 }, style]}
      {...rest}
    />
  )
})
