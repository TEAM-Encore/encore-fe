import Svg, { Path } from 'react-native-svg'
import type { SvgProps } from 'react-native-svg'
import { Ref, forwardRef } from 'react'
const Uncheckbox = (props: SvgProps, ref: Ref<SVGSVGElement>) => (
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
      fill="currentColor"
      fillRule="evenodd"
      d="M5.665 1.5C3.135 1.5 1.5 3.233 1.5 5.916v8.168c0 2.683 1.635 4.416 4.165 4.416h8.668c2.531 0 4.167-1.733 4.167-4.416V5.916c0-2.683-1.636-4.416-4.166-4.416zM14.333 20H5.665C2.276 20 0 17.622 0 14.084V5.916C0 2.378 2.276 0 5.665 0h8.669C17.723 0 20 2.378 20 5.916v8.168C20 17.622 17.723 20 14.333 20"
      clipRule="evenodd"
    />
  </Svg>
)
const ForwardRef = forwardRef(Uncheckbox)
export { ForwardRef as Uncheckbox }
