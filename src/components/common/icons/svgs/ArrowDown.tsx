import Svg, { Path } from 'react-native-svg'
import type { SvgProps } from 'react-native-svg'
import { Ref, forwardRef } from 'react'
const ArrowDown = (props: SvgProps, ref: Ref<SVGSVGElement>) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={18}
    height={18}
    fill="none"
    viewBox="0 0 18 18"
    ref={ref}
    {...props}
  >
    <Path
      fill="currentColor"
      d="M3.352 5.977c.2-.2.512-.218.733-.054l.063.054L9 10.83l4.852-4.852c.2-.2.512-.218.733-.054l.063.054c.2.2.218.512.054.733l-.054.063-5.25 5.25c-.2.2-.512.218-.733.054l-.063-.054-5.25-5.25a.563.563 0 0 1 0-.796"
    />
  </Svg>
)
const ForwardRef = forwardRef(ArrowDown)
export { ForwardRef as ArrowDown }
