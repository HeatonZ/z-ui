import React from 'react'
import { Button as _Button } from 'antd'
import './button.less'

const preset = ['primary','mark','pulse'] as const
export interface ButtonProps{
    preset?:typeof preset[number]
}
const prefix = 'z-btn'
const Button: React.FC<ButtonProps & React.ButtonHTMLAttributes<HTMLButtonElement>> = (props) => {
    const { className = "", preset = "",children } = props
    const defaultProps:ButtonProps & React.ButtonHTMLAttributes<HTMLButtonElement> = {
        type:"button"
    }
    return <>
        <button {...defaultProps} {...props} className={`${prefix} ${preset?`${prefix}-${preset}`:''} ${className}`} />
    </>
}

export default Button