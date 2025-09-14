import Svg, { Path } from 'react-native-svg'
import type { SvgProps } from 'react-native-svg'
import { Ref, forwardRef } from 'react'
const Checkbox = (props: SvgProps, ref: Ref<SVGSVGElement>) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={20}
    height={20}
    fill="none"
    viewBox="0 0 20 20"
    ref={ref}
    {...props}
  >
    <Path
      fill="#FBFBFB"
      fillRule="evenodd"
      d="M5.67 0h8.67C17.73 0 20 2.38 20 5.92v8.171C20 17.62 17.73 20 14.34 20H5.67C2.28 20 0 17.62 0 14.091V5.92C0 2.38 2.28 0 5.67 0m3.76 12.99 4.75-4.75c.34-.34.34-.89 0-1.24a.88.88 0 0 0-1.24 0l-4.13 4.13-1.75-1.75a.88.88 0 0 0-1.24 0c-.34.34-.34.89 0 1.24l2.38 2.37c.17.17.39.25.61.25.23 0 .45-.08.62-.25"
      clipRule="evenodd"
    />
  </Svg>
)
const ForwardRef = forwardRef(Checkbox)
export { ForwardRef as Checkbox }
