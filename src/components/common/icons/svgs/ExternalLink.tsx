import Svg, { Path } from 'react-native-svg'
import type { SvgProps } from 'react-native-svg'
import { Ref, forwardRef } from 'react'
const ExternalLink = (props: SvgProps, ref: Ref<SVGSVGElement>) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={19}
    height={20}
    fill="none"
    viewBox="0 0 19 20"
    ref={ref}
    {...props}
  >
    <Path
      stroke="#FBFBFB"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.542}
      d="M13.875 10.77v4.626a1.54 1.54 0 0 1-1.542 1.541H3.854a1.54 1.54 0 0 1-1.541-1.541v-8.48a1.54 1.54 0 0 1 1.541-1.541H8.48m3.083-2.312h4.624v4.624m-8.479 3.855 8.48-8.48"
    />
  </Svg>
)
const ForwardRef = forwardRef(ExternalLink)
export { ForwardRef as ExternalLink }
