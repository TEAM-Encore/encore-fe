import { forwardRef, Ref } from 'react'
import type { SvgProps } from 'react-native-svg'
import Svg, { G, Mask, Path } from 'react-native-svg'

const Close = (props: SvgProps, ref: Ref<SVGSVGElement>) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    viewBox="0 0 24 24"
    ref={ref}
    {...props}
  >
    <Mask
      id="a"
      width={24}
      height={24}
      x={0}
      y={0}
      maskUnits="userSpaceOnUse"
      style={{
        maskType: 'alpha',
      }}
    >
      <Path fill="currentColor" d="M0 0h24v24H0z" />
    </Mask>
    <G mask="url(#a)">
      <Path
        fill="currentColor"
        d="m12 13.054-5.073 5.073a.73.73 0 0 1-.522.213.7.7 0 0 1-.532-.213.72.72 0 0 1-.217-.527q0-.31.217-.527L10.946 12 5.873 6.927a.73.73 0 0 1-.212-.522.7.7 0 0 1 .212-.532.72.72 0 0 1 .527-.217q.31 0 .527.217L12 10.946l5.073-5.073a.73.73 0 0 1 .522-.212.7.7 0 0 1 .532.212q.217.217.217.527a.72.72 0 0 1-.217.527L13.054 12l5.073 5.073q.208.209.213.522a.7.7 0 0 1-.213.532.72.72 0 0 1-.527.217.72.72 0 0 1-.527-.217z"
      />
    </G>
  </Svg>
)
const ForwardRef = forwardRef(Close)
export { ForwardRef as Close }
