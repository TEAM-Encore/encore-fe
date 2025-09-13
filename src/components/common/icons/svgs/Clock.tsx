import Svg, { Path } from 'react-native-svg'
import type { SvgProps } from 'react-native-svg'
import { Ref, forwardRef } from 'react'
const Clock = (props: SvgProps, ref: Ref<SVGSVGElement>) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={14}
    height={14}
    fill="none"
    viewBox="0 0 14 14"
    ref={ref}
    {...props}
  >
    <Path
      fill="currentColor"
      d="M7 14A7 7 0 1 1 7 0a7 7 0 0 1 0 14m.7-7V3.5H6.3v4.9h4.2V7z"
    />
  </Svg>
)
const ForwardRef = forwardRef(Clock)
export { ForwardRef as Clock }
