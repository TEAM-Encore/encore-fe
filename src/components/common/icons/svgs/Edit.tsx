import Svg, { Path, Mask, G } from 'react-native-svg'
import type { SvgProps } from 'react-native-svg'
import { Ref, forwardRef } from 'react'
const Edit = (props: SvgProps, ref: Ref<SVGSVGElement>) => (
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
      d="M26.75 27.94h-7.253a.75.75 0 0 1 0-1.5h7.253a.75.75 0 0 1 0 1.5"
      clipRule="evenodd"
    />
    <Mask
      id="a"
      width={18}
      height={19}
      x={8}
      y={9}
      maskUnits="userSpaceOnUse"
      style={{
        maskType: 'luminance',
      }}
    >
      <Path
        fill="currentColor"
        fillRule="evenodd"
        d="M8 9h17.18v18.94H8z"
        clipRule="evenodd"
      />
    </Mask>
    <G mask="url(#a)">
      <Path
        fill="currentColor"
        fillRule="evenodd"
        d="M19.11 11.017 9.695 22.792c-.17.214-.234.49-.17.755l.68 2.885 3.04-.038a.95.95 0 0 0 .732-.352c3.217-4.025 9.35-11.7 9.524-11.924a1.36 1.36 0 0 0 .142-1.004 1.4 1.4 0 0 0-.652-.887 329 329 0 0 1-1.808-1.398 1.497 1.497 0 0 0-2.073.188M9.613 27.94a.75.75 0 0 1-.73-.577l-.819-3.471a2.37 2.37 0 0 1 .46-2.037l9.42-11.782.011-.013c1.033-1.235 2.901-1.417 4.161-.406l1.723 1.339c.608.362 1.083 1.009 1.263 1.775.18.758.05 1.54-.368 2.2-.03.05-.058.092-9.586 12.012a2.45 2.45 0 0 1-1.886.914l-3.639.046z"
        clipRule="evenodd"
      />
    </G>
    <Path
      fill="currentColor"
      fillRule="evenodd"
      d="M22.223 17.685a.75.75 0 0 1-.457-.155l-5.452-4.188a.75.75 0 0 1 .914-1.19l5.453 4.188a.75.75 0 0 1-.458 1.345"
      clipRule="evenodd"
    />
  </Svg>
)
const ForwardRef = forwardRef(Edit)
export { ForwardRef as Edit }
