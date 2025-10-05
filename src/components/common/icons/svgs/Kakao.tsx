import Svg, { Path } from 'react-native-svg'
import type { SvgProps } from 'react-native-svg'
import { Ref, forwardRef } from 'react'
const Kakao = (props: SvgProps, ref: Ref<SVGSVGElement>) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={18}
    height={17}
    fill="none"
    viewBox="0 0 18 17"
    ref={ref}
    {...props}
  >
    <Path
      fill="#000"
      fillRule="evenodd"
      d="M9 0C4.29 0 0 3.786 0 6.989c0 2.4 1.558 4.517 3.931 5.775l-.998 3.666c-.089.325.28.583.563.396l4.377-2.905A12 12 0 0 0 9 13.978c4.97 0 9-3.129 9-6.989C18 3.786 13.97 0 9 0"
      clipRule="evenodd"
      opacity={0.902}
    />
  </Svg>
)
const ForwardRef = forwardRef(Kakao)
export { ForwardRef as Kakao }
