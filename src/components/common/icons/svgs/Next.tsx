import Svg, { Path } from 'react-native-svg'
import type { SvgProps } from 'react-native-svg'
import { Ref, forwardRef } from 'react'
const Next = (props: SvgProps, ref: Ref<SVGSVGElement>) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={21}
    height={21}
    fill="none"
    viewBox="0 0 21 21"
    ref={ref}
    {...props}
  >
    <Path
      fill="currentColor"
      d="M11 10.5 7.165 6.667 8.333 5.5l5 5-5 5-1.167-1.167z"
    />
  </Svg>
)
const ForwardRef = forwardRef(Next)
export { ForwardRef as Next }
