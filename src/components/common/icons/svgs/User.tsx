import Svg, { Path } from 'react-native-svg'
import type { SvgProps } from 'react-native-svg'
import { Ref, forwardRef } from 'react'
const User = (props: SvgProps, ref: Ref<SVGSVGElement>) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={9}
    height={11}
    fill="none"
    viewBox="0 0 9 11"
    ref={ref}
    {...props}
  >
    <Path
      fill="currentColor"
      d="M8.167 10.583H.833v-.916a2.29 2.29 0 0 1 2.292-2.292h2.75a2.29 2.29 0 0 1 2.292 2.292zM4.5 6.458a2.75 2.75 0 1 1 0-5.5 2.75 2.75 0 0 1 0 5.5"
    />
  </Svg>
)
const ForwardRef = forwardRef(User)
export { ForwardRef as User }
