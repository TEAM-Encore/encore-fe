import Svg, { Path } from 'react-native-svg'
import type { SvgProps } from 'react-native-svg'
import { Ref, forwardRef } from 'react'
const Like = (props: SvgProps, ref: Ref<SVGSVGElement>) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={12}
    height={12}
    fill="none"
    viewBox="0 0 12 12"
    ref={ref}
    {...props}
  >
    <Path
      fill="currentColor"
      d="M1.598 6.054c.753 2.236 3.73 4.045 4.52 4.493.794-.453 3.792-2.281 4.52-4.491.48-1.43.035-3.239-1.73-3.782-.856-.262-1.854-.102-2.543.406a.42.42 0 0 1-.489.003 2.92 2.92 0 0 0-2.551-.409c-1.763.543-2.206 2.352-1.727 3.78"
    />
  </Svg>
)
const ForwardRef = forwardRef(Like)
export { ForwardRef as Like }
