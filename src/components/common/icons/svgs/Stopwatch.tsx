import Svg, { G, Path, Defs, ClipPath } from 'react-native-svg'
import type { SvgProps } from 'react-native-svg'
import { Ref, forwardRef } from 'react'
const Stopwatch = (props: SvgProps, ref: Ref<SVGSVGElement>) => (
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
      strokeWidth={1.2}
      clipPath="url(#a)"
    >
      <Path
        strokeLinejoin="round"
        d="M8.534 4.394c1.178-.193 1.808-.362 2.874-.77-.18-1.127-.349-1.757-.77-2.874"
      />
      <Path d="M12.488 9.359A5.625 5.625 0 1 1 10.44 3.07l.942.567" />
    </G>
    <Defs>
      <ClipPath id="a">
        <Path fill="currentColor" d="M0 0h14v14H0z" />
      </ClipPath>
    </Defs>
  </Svg>
)
const ForwardRef = forwardRef(Stopwatch)
export { ForwardRef as Stopwatch }
