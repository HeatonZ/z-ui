import React from 'react'
import { Button as _Button } from 'antd'
import './button.less'
export interface ButtonProps{

}

const Button: React.FC<ButtonProps> = () => {
    return <_Button type="primary" className={'test'}>test</_Button>
}

export default Button