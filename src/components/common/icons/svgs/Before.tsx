import Svg, { Path } from 'react-native-svg'
import type { SvgProps } from 'react-native-svg'
import { Ref, forwardRef } from 'react'
const Before = (props: SvgProps, ref: Ref<SVGSVGElement>) => (
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
      d="m12.166 15.5-5-5 5-5 1.167 1.167L9.499 10.5l3.834 3.833z"
    />
  </Svg>
)
const ForwardRef = forwardRef(Before)
export { ForwardRef as Before }
