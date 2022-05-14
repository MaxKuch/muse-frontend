import classNames from 'classnames';
import React from 'react'
import style from './Logo.module.scss'


interface LogoProps {
    size?: number;
    animated?: boolean;
}

const Logo:React.FC<LogoProps> = ({size = 30, animated = false}) => {
  return (
    <div className={classNames([style.logo, animated && style.logoAnimated])} style={{'--height': `${size}px`} as React.CSSProperties}>
        <div></div>
        <div></div>
        <div></div>
    </div>
  )
}

export default Logo