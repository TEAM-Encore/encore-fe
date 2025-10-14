import type React from 'react'
import Svg, { Path } from 'react-native-svg'

interface LogoProps {
  size?: number
  color?: string
}

export const Logo: React.FC<LogoProps> = ({ size = 44, color = '#C1C1C1' }) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 44 44" fill="none">
      <Path
        d="M16.75 1V6.5127C19.4528 3.15206 23.5995 1 28.25 1C36.3962 1 43 7.6038 43 15.75V16.75H37.4863C40.8473 19.4528 43 23.5992 43 28.25C43 36.3962 36.3962 43 28.25 43H27.25V37.4863C24.5472 40.8473 20.4008 43 15.75 43C7.6038 43 1 36.3962 1 28.25V27.25H6.51367C3.1527 24.5472 1 20.4008 1 15.75C1 7.6038 7.6038 1 15.75 1H16.75Z"
        fill={color}
        stroke={color}
        strokeWidth={2}
      />
    </Svg>
  )
}
