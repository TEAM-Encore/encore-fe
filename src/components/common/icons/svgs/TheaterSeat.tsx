import Svg, { Path } from 'react-native-svg'
import type { SvgProps } from 'react-native-svg'
import { Ref, forwardRef } from 'react'
const Theaterseat = (props: SvgProps, ref: Ref<SVGSVGElement>) => (
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
      d="M7.333 1.875H3.667c-1.013 0-1.834.82-1.834 1.833v.459a2.29 2.29 0 0 1 2.292 2.291h2.75a2.29 2.29 0 0 1 2.292-2.291v-.459a1.834 1.834 0 0 0-1.834-1.833m1.834 3.208c-.76 0-1.375.616-1.375 1.375v1.375h-.917v-.458h-2.75v.458h-.917V6.458a1.375 1.375 0 1 0-1.833 1.297v2.37h.917v-.458h6.416v.458h.917v-2.37a1.376 1.376 0 0 0-.458-2.672"
    />
  </Svg>
)
const ForwardRef = forwardRef(Theaterseat)
export { ForwardRef as Theaterseat }
