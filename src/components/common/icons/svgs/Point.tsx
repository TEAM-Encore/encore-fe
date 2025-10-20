import Svg, { Circle, Path } from 'react-native-svg'
import type { SvgProps } from 'react-native-svg'
import { Ref, forwardRef } from 'react'
const Point = (props: SvgProps, ref: Ref<SVGSVGElement>) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 15 16"
    ref={ref}
    {...props}
  >
    <Circle
      cx={7.181}
      cy={7.882}
      r={6.566}
      stroke="currentColor"
      strokeWidth={1.229}
    />
    <Path
      fill="currentColor"
      d="M5.327 10.299v-5.5h2.158c1.25 0 1.967.77 1.967 1.853 0 1.098-.73 1.854-1.998 1.854h-.987v1.793zm1.14-2.712h.805c.676 0 1.006-.38 1.003-.935.003-.547-.327-.915-1.003-.919h-.805z"
    />
  </Svg>
)
const ForwardRef = forwardRef(Point)
export { ForwardRef as Point }
