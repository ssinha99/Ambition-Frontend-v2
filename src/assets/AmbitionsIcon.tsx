import React from 'react'
import SvgIcon, {SvgIconProps}  from '@mui/material/SvgIcon'

const AmbitionsIcon: React.FC<SvgIconProps> = (props) => {
    const {sx, viewBox = '0 0 60.062263 55.981598', ...rest} = props
  return (
    <SvgIcon sx={{fill: '#6B9080', stroke: '#6B9080', ...sx}} {...rest} viewBox={viewBox}>
        <path
         d="M 8.4411325,55.981591 H 51.621132 a 8.43,8.43 0 0 0 7.41,-12.47 l -21.23,-38.8999995 a 8.86,8.86 0 0 0 -15.55,0 L 1.0311325,43.511591 a 8.43,8.43 0 0 0 7.41,12.47 z m -2.14,-9.6 L 27.521132,7.4915915 a 2.86,2.86 0 0 1 5,0 l 21.23,38.8899995 a 2.43,2.43 0 0 1 -2.13,3.6 H 8.4411325 a 2.43,2.43 0 0 1 -2.14,-3.6 z"
         strokeWidth={0.4}
        ></path>
    </SvgIcon>
  )
}

export default AmbitionsIcon
