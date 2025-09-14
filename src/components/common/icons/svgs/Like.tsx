import { Ref, forwardRef } from 'react'
import type { SvgProps } from 'react-native-svg'
import Svg, { Path } from 'react-native-svg'

const Like = (props: SvgProps, ref: Ref<SVGSVGElement>) => (
    <Svg
        xmlns="http://www.w3.org/2000/svg"
        width={12}
        height={12}
        viewBox="0 0 12 12"
        fill="none"
        ref={ref}
        {...props}
    >
        <Path
            d="M1.59775 6.0535C2.35108 8.29029 5.3273 10.0989 6.11824 10.5466C6.91186 10.0943 9.90958 8.26568 10.6387 6.05555C11.1175 4.62691 10.6731 2.81727 8.90748 2.27423C8.05206 2.01219 7.05425 2.17167 6.36541 2.68036C6.2214 2.78599 6.02152 2.78804 5.87644 2.68343C5.14676 2.15988 4.19355 2.00655 3.3247 2.27423C1.56175 2.81676 1.119 4.6264 1.59775 6.0535Z"
            fill="currentColor"
        />
    </Svg>
)

const ForwardRef = forwardRef(Like)
export { ForwardRef as Like }
