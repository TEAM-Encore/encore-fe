import Svg, { Path } from 'react-native-svg'
import type { SvgProps } from 'react-native-svg'
import { Ref, forwardRef } from 'react'
const Feather = (props: SvgProps, ref: Ref<SVGSVGElement>) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={28}
    fill="none"
    viewBox="0 0 24 28"
    ref={ref}
    {...props}
  >
    <Path
      fill="currentColor"
      d="M24 .519c-.196.673-.492 1.266-.817 1.883l-.168.32c-1.3 2.44-2.813 4.487-4.795 6.406.42.346.85.67 1.296.982l.336.235.253.176c-.588 1.874-1.532 3.435-2.765 4.938l-.227.287c-.592.725-1.298 1.295-2.034 1.865l-.307.238a11.8 11.8 0 0 1-5.348 2.224c-1.796.273-3.483 1.025-4.65 2.476-.913 1.329-1.46 2.636-1.846 4.19-.152.61-.152.61-.29.748a10 10 0 0 1-.589.013l-.36-.002-.377-.003-.38-.001L0 27.487c.373-5.03 1.839-10.286 4.02-14.813l.137-.284C6.61 7.33 10.76 3.45 16.042 1.572 18.626.702 21.288.42 24 .519"
    />
  </Svg>
)
const ForwardRef = forwardRef(Feather)
export { ForwardRef as Feather }
