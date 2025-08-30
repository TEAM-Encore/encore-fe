import { forwardRef, Ref } from 'react'
import type { SvgProps } from 'react-native-svg'
import Svg, { Path, Rect } from 'react-native-svg'

const AvatarPlaceholder = (props: SvgProps, ref: Ref<SVGSVGElement>) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={88}
    height={88}
    fill="none"
    viewBox="0 0 88 88"
    ref={ref}
    {...props}
  >
    <Rect width={88} height={88} fill="#FBFBFB" rx={44} />
    <Path
      fill="#C1C1C1"
      stroke="#C1C1C1"
      strokeWidth={2}
      d="M38.75 23v5.513A14.72 14.72 0 0 1 50.25 23C58.396 23 65 29.604 65 37.75v1h-5.514A14.72 14.72 0 0 1 65 50.25C65 58.396 58.396 65 50.25 65h-1v-5.514A14.72 14.72 0 0 1 37.75 65C29.604 65 23 58.396 23 50.25v-1h5.514A14.72 14.72 0 0 1 23 37.75C23 29.604 29.604 23 37.75 23z"
    />
  </Svg>
)
const ForwardRef = forwardRef(AvatarPlaceholder)
export { ForwardRef as AvatarPlaceholder }
