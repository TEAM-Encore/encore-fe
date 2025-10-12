import Svg, { Path, Mask, G } from 'react-native-svg'
import type { SvgProps } from 'react-native-svg'
import { Ref, forwardRef } from 'react'
const Ticket = (props: SvgProps, ref: Ref<SVGSVGElement>) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={36}
    height={36}
    fill="none"
    viewBox="0 0 36 36"
    ref={ref}
    {...props}
  >
    <Path
      fill="currentColor"
      fillRule="evenodd"
      d="M19.6 14.171a.75.75 0 0 1-.75-.75V11a.75.75 0 0 1 1.5 0v2.421a.75.75 0 0 1-.75.75m0 13.113a.75.75 0 0 1-.75-.75v-2.023a.75.75 0 1 1 1.5 0v2.023a.75.75 0 0 1-.75.75m0-5.459a.75.75 0 0 1-.75-.75v-4.82a.75.75 0 0 1 1.5 0v4.82a.75.75 0 0 1-.75.75"
      clipRule="evenodd"
    />
    <Mask
      id="a"
      width={22}
      height={18}
      x={7}
      y={10}
      maskUnits="userSpaceOnUse"
      style={{
        maskType: 'luminance',
      }}
    >
      <Path
        fill="currentColor"
        fillRule="evenodd"
        d="M7 10h21.5v17.5H7z"
        clipRule="evenodd"
      />
    </Mask>
    <G mask="url(#a)">
      <Path
        fill="currentColor"
        fillRule="evenodd"
        d="M8.5 21.554v1.939C8.5 24.875 9.643 26 11.048 26h13.404C25.857 26 27 24.875 27 23.492v-1.939a2.91 2.91 0 0 1-2.177-2.803c0-1.343.925-2.474 2.177-2.802l-.001-1.941c0-1.383-1.143-2.508-2.548-2.508H11.049c-1.405 0-2.548 1.125-2.548 2.508L8.5 16.025c1.267.31 2.177 1.397 2.177 2.726A2.91 2.91 0 0 1 8.5 21.553M24.452 27.5H11.048C8.816 27.5 7 25.7 7 23.492v-2.591a.75.75 0 0 1 .75-.75c.787 0 1.427-.628 1.427-1.4 0-.75-.614-1.317-1.427-1.317a.75.75 0 0 1-.75-.75l.001-2.677c0-2.21 1.816-4.007 4.048-4.007h13.402c2.232 0 4.048 1.797 4.048 4.007L28.5 16.6a.75.75 0 0 1-.75.75c-.787 0-1.427.628-1.427 1.4s.64 1.4 1.427 1.4a.75.75 0 0 1 .75.75v2.592c0 2.209-1.816 4.007-4.048 4.007"
        clipRule="evenodd"
      />
    </G>
  </Svg>
)
const ForwardRef = forwardRef(Ticket)
export { ForwardRef as Ticket }
