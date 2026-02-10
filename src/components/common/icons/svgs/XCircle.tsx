import { forwardRef, type Ref } from 'react'
import type { SvgProps } from 'react-native-svg'
import Svg, { Path } from 'react-native-svg'

const XCircle = (props: SvgProps, ref: Ref<SVGSVGElement>) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={20}
    height={20}
    fill="none"
    viewBox="0 0 20 20"
    ref={ref}
    {...props}
  >
    <Path
      fill="currentColor"
      d="M10 18.333a8.333 8.333 0 1 0 0-16.666 8.333 8.333 0 0 0 0 16.666"
    />
    <Path
      stroke="white"
      strokeLinecap="round"
      strokeLinejoin="round"
      d="m12.5 7.5-5 5m0-5 5 5"
    />
  </Svg>
)
const ForwardRef = forwardRef(XCircle)
export { ForwardRef as XCircle }
