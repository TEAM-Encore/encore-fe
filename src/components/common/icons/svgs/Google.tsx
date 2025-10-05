import Svg, { Path } from 'react-native-svg'
import type { SvgProps } from 'react-native-svg'
import { Ref, forwardRef } from 'react'
const Google = (props: SvgProps, ref: Ref<SVGSVGElement>) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={18}
    height={19}
    fill="none"
    viewBox="0 0 18 19"
    ref={ref}
    {...props}
  >
    <Path
      fill="#4285F4"
      fillRule="evenodd"
      d="M17.64 10.094q-.002-.958-.164-1.841H9v3.48h4.844a4.14 4.14 0 0 1-1.796 2.717v2.259h2.908c1.702-1.567 2.684-3.875 2.684-6.615"
      clipRule="evenodd"
    />
    <Path
      fill="#34A853"
      fillRule="evenodd"
      d="M9 18.889c2.43 0 4.467-.806 5.956-2.18l-2.909-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332a9 9 0 0 0 8.042 4.958"
      clipRule="evenodd"
    />
    <Path
      fill="#FBBC05"
      fillRule="evenodd"
      d="M3.964 11.6a5.4 5.4 0 0 1-.282-1.71c0-.594.102-1.17.282-1.71V5.846H.957A9 9 0 0 0 0 9.89c0 1.453.348 2.827.957 4.042z"
      clipRule="evenodd"
    />
    <Path
      fill="#EA4335"
      fillRule="evenodd"
      d="M9 4.469c1.32 0 2.507.454 3.44 1.345l2.581-2.58C13.462 1.78 11.425.888 9 .888A9 9 0 0 0 .957 5.847L3.963 8.18C4.671 6.052 6.655 4.469 9 4.469"
      clipRule="evenodd"
    />
  </Svg>
)
const ForwardRef = forwardRef(Google)
export { ForwardRef as Google }
