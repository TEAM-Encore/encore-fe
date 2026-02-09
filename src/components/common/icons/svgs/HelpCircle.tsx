import Svg, { G, Path, Defs, ClipPath } from 'react-native-svg'
import type { SvgProps } from 'react-native-svg'
import { Ref, forwardRef } from 'react'
const HelpCircle = (props: SvgProps, ref: Ref<SVGSVGElement>) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={14}
    height={14}
    fill="none"
    viewBox="0 0 14 14"
    ref={ref}
    {...props}
  >
    <G
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.167}
      clipPath="url(#a)"
    >
      <Path d="M7 12.834A5.833 5.833 0 1 0 7 1.167a5.833 5.833 0 0 0 0 11.667" />
      <Path d="M5.302 5.25a1.75 1.75 0 0 1 3.401.583c0 1.166-1.75 1.75-1.75 1.75M7 9.917h.006" />
    </G>
    <Defs>
      <ClipPath id="a">
        <Path fill="currentColor" d="M0 0h14v14H0z" />
      </ClipPath>
    </Defs>
  </Svg>
)
const ForwardRef = forwardRef(HelpCircle)
export { ForwardRef as HelpCircle }
