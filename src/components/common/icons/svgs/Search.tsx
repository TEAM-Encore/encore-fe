import Svg, { Mask, Path, G } from 'react-native-svg'
import type { SvgProps } from 'react-native-svg'
import { Ref, forwardRef } from 'react'
const Search = (props: SvgProps, ref: Ref<SVGSVGElement>) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={18}
    height={18}
    fill="none"
    viewBox="0 0 18 18"
    ref={ref}
    {...props}
  >
    <Mask
      id="a"
      width={16}
      height={16}
      x={1}
      y={1}
      maskUnits="userSpaceOnUse"
      style={{
        maskType: 'luminance',
      }}
    >
      <Path
        fill="currentColor"
        fillRule="evenodd"
        d="M1.5 1.5h14.608v14.608H1.5z"
        clipRule="evenodd"
      />
    </Mask>
    <G mask="url(#a)">
      <Path
        fill="currentColor"
        fillRule="evenodd"
        d="M8.804 2.625a6.186 6.186 0 0 0-6.18 6.179 6.186 6.186 0 0 0 6.18 6.179 6.186 6.186 0 0 0 6.179-6.18 6.185 6.185 0 0 0-6.179-6.178m0 13.483c-4.027 0-7.304-3.277-7.304-7.305S4.777 1.5 8.804 1.5s7.304 3.276 7.304 7.304c0 4.027-3.277 7.304-7.304 7.304"
        clipRule="evenodd"
      />
    </G>
    <Mask
      id="b"
      width={5}
      height={5}
      x={12}
      y={13}
      maskUnits="userSpaceOnUse"
      style={{
        maskType: 'luminance',
      }}
    >
      <Path
        fill="currentColor"
        fillRule="evenodd"
        d="M12.93 13.28h3.768v3.761H12.93z"
        clipRule="evenodd"
      />
    </Mask>
    <G mask="url(#b)">
      <Path
        fill="currentColor"
        fillRule="evenodd"
        d="M16.136 17.041a.56.56 0 0 1-.398-.164l-2.643-2.635a.563.563 0 0 1 .795-.798l2.643 2.637a.562.562 0 0 1-.397.96"
        clipRule="evenodd"
      />
    </G>
  </Svg>
)
const ForwardRef = forwardRef(Search)
export { ForwardRef as Search }
