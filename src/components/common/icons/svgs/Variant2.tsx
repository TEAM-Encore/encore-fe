import Svg, { Rect, Path } from 'react-native-svg'
import type { SvgProps } from 'react-native-svg'
import { Ref, forwardRef } from 'react'
const Variant2 = (props: SvgProps, ref: Ref<SVGSVGElement>) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={20}
    height={20}
    fill="none"
    viewBox="0 0 20 20"
    ref={ref}
    {...props}
  >
    <Rect width={20} height={20} fill="currentColor" rx={10} />
    <Path
      fill="currentColor"
      stroke="currentColor"
      strokeWidth={0.4}
      d="M8.95 5.8v1.104A2.95 2.95 0 0 1 14.2 8.75v.2h-1.105a2.95 2.95 0 0 1-1.845 5.25h-.2v-1.105A2.95 2.95 0 0 1 5.8 11.25v-.2h1.105A2.95 2.95 0 0 1 8.75 5.8z"
    />
  </Svg>
)
const ForwardRef = forwardRef(Variant2)
export { ForwardRef as Variant2 }
