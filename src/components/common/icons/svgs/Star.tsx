import Svg, { Path } from 'react-native-svg'
import type { SvgProps } from 'react-native-svg'
import { Ref, forwardRef } from 'react'
const Star = (props: SvgProps, ref: Ref<SVGSVGElement>) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={16}
    height={16}
    fill="none"
    viewBox="0 0 16 16"
    ref={ref}
    {...props}
  >
    <Path
      fill="#FFDD56"
      d="M7.555 2.869a.5.5 0 0 1 .89 0l1.29 2.52a.5.5 0 0 0 .376.268l2.856.402a.5.5 0 0 1 .272.86l-2.042 1.917a.5.5 0 0 0-.15.452l.485 2.725a.5.5 0 0 1-.718.534l-2.588-1.312a.5.5 0 0 0-.452 0l-2.588 1.312a.5.5 0 0 1-.718-.534l.485-2.725a.5.5 0 0 0-.15-.452L2.76 6.919a.5.5 0 0 1 .272-.86l2.856-.402a.5.5 0 0 0 .375-.268z"
    />
  </Svg>
)
const ForwardRef = forwardRef(Star)
export { ForwardRef as Star }
