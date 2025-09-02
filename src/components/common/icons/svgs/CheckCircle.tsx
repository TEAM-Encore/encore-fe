import { forwardRef, Ref } from 'react'
import type { SvgProps } from 'react-native-svg'
import Svg, { Path } from 'react-native-svg'

const CheckCircle = (props: SvgProps, ref: Ref<SVGSVGElement>) => (
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
      fill="currentColor"
      fillRule="evenodd"
      d="M12 3.5c-4.687 0-8.5 3.813-8.5 8.5s3.813 8.5 8.5 8.5 8.5-3.813 8.5-8.5-3.813-8.5-8.5-8.5M12 22C6.486 22 2 17.514 2 12S6.486 2 12 2s10 4.486 10 10-4.486 10-10 10"
      clipRule="evenodd"
    />
    <Path
      fill="currentColor"
      fillRule="evenodd"
      d="M11.124 15.246a.75.75 0 0 1-.53-.22L8.22 12.653a.749.749 0 1 1 1.06-1.06l1.844 1.842L15.34 9.22a.749.749 0 1 1 1.06 1.06l-4.746 4.746a.74.74 0 0 1-.53.22"
      clipRule="evenodd"
    />
  </Svg>
)
const ForwardRef = forwardRef(CheckCircle)
export { ForwardRef as CheckCircle }
