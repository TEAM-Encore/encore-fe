import { Ref, forwardRef } from 'react'
import type { SvgProps } from 'react-native-svg'
import Svg, { Path } from 'react-native-svg'

const Clock = (props: SvgProps, ref: Ref<SVGSVGElement>) => (
  <Svg
    width={11}
    height={11}
    viewBox="0 0 11 12"   
    fill="none"
    ref={ref}
    {...props}
  >
    <Path
      d="M5.49996 10.5833C2.96865 10.5833 0.916626 8.53124 0.916626 5.99996C0.916626 3.46865 2.96865 1.41663 5.49996 1.41663C8.03124 1.41663 10.0833 3.46865 10.0833 5.99996C10.0833 8.53124 8.03124 10.5833 5.49996 10.5833ZM5.95829 5.99996V3.70829H5.04163V6.91663H7.79163V5.99996H5.95829Z"
      fill="currentColor" 
    />
  </Svg>
)

const ForwardRef = forwardRef(Clock)
export { ForwardRef as Clock }
