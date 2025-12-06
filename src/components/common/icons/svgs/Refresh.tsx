import Svg, { Path } from 'react-native-svg'
import type { SvgProps } from 'react-native-svg'
import { forwardRef } from 'react'
const Refresh = (props: SvgProps, ref: React.Ref<Svg>) => (
  <Svg
    width={24}
    height={24}
    fill="none"
    viewBox="0 0 24 24"
    ref={ref}
    {...props}
  >
    <Path
      fill="currentColor"
      d="M12 4V1L8 5l4 4V6c3.31 0 6 2.69 6 6 0 1.01-.25 1.97-.7 2.8l1.46 1.46A7.93 7.93 0 0 0 20 12c0-4.42-3.58-8-8-8m0 14c-3.31 0-6-2.69-6-6 0-1.01.25-1.97.7-2.8L5.24 7.74A7.93 7.93 0 0 0 4 12c0 4.42 3.58 8 8 8v3l4-4-4-4z"
    />
  </Svg>
)
const ForwardRef = forwardRef<Svg, SvgProps>(Refresh)
export { ForwardRef as Refresh }
