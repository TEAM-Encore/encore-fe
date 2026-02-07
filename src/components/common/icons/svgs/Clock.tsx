import Svg, { Path } from 'react-native-svg'
import type { SvgProps } from 'react-native-svg'
import { Ref, forwardRef } from 'react'
const Clock = (props: SvgProps, ref: Ref<SVGSVGElement>) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={11}
    height={12}
    fill="none"
    viewBox="0 0 11 12"
    ref={ref}
    {...props}
  >
    <Path
      fill="currentColor"
      d="M5.5 10.583a4.583 4.583 0 1 1 0-9.166 4.583 4.583 0 0 1 0 9.166M5.958 6V3.708h-.916v3.209h2.75V6z"
    />
  </Svg>
)
const ForwardRef = forwardRef(Clock)
export { ForwardRef as Clock }
