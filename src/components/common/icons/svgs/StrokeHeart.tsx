import Svg, { Path } from 'react-native-svg'
import type { SvgProps } from 'react-native-svg'
import { Ref, forwardRef } from 'react'
const StrokeHeart = (props: SvgProps, ref: Ref<SVGSVGElement>) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={18}
    height={20}
    fill="none"
    viewBox="0 0 18 20"
    ref={ref}
    {...props}
  >
    <Path
      fill="#FBFBFB"
      fillRule="evenodd"
      d="M9 15.095a.4.4 0 0 1-.192-.047c-.168-.087-4.13-2.171-5.096-5.04-.606-1.806.069-4.076 2.247-4.746A3.77 3.77 0 0 1 9 5.628c.874-.527 2.034-.673 3.037-.366 2.18.67 2.858 2.94 2.252 4.746-.934 2.835-4.925 4.95-5.094 5.04a.4.4 0 0 1-.193.047m0-.829c-.79-.447-3.767-2.256-4.52-4.493C4 8.346 4.444 6.536 6.207 5.994a2.92 2.92 0 0 1 2.551.41.42.42 0 0 0 .49-.004c.688-.509 1.686-.668 2.541-.406 1.766.543 2.21 2.353 1.732 3.781-.73 2.21-3.727 4.039-4.52 4.491"
      clipRule="evenodd"
    />
  </Svg>
)
const ForwardRef = forwardRef(StrokeHeart)
export { ForwardRef as StrokeHeart }
