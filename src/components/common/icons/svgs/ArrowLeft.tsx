import { forwardRef, type Ref } from 'react'
import type { SvgProps } from 'react-native-svg'
import Svg, { Path } from 'react-native-svg'

const ArrowLeft = (props: SvgProps, ref: Ref<SVGSVGElement>) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={25}
    height={24}
    fill="none"
    viewBox="0 0 25 24"
    ref={ref}
    {...props}
  >
    <Path
      fill="currentColor"
      d="M16.53 4.47a.75.75 0 0 1 .073.976l-.073.084L10.061 12l6.47 6.47a.75.75 0 0 1 .072.976l-.073.084a.75.75 0 0 1-.976.073l-.084-.073-7-7a.75.75 0 0 1-.073-.976l.073-.084 7-7a.75.75 0 0 1 1.06 0"
    />
  </Svg>
)
const ForwardRef = forwardRef(ArrowLeft)
export { ForwardRef as ArrowLeft }
