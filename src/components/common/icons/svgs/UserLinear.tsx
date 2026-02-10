import Svg, { Path } from 'react-native-svg'
import type { SvgProps } from 'react-native-svg'
import { Ref, forwardRef } from 'react'
const UserLinear = (props: SvgProps, ref: Ref<SVGSVGElement>) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    viewBox="0 0 24 24"
    ref={ref}
    {...props}
  >
    <Path
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.4}
      d="M20 20v-1a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v1m8-8a4 4 0 1 0 0-8 4 4 0 0 0 0 8"
    />
  </Svg>
)
const ForwardRef = forwardRef(UserLinear)
export { ForwardRef as UserLinear }
