import React from 'react'
import './number.less'

export interface DigitalNumberProps{
    value: number;
}
const DigitalNumber: React.FC<DigitalNumberProps & React.HtmlHTMLAttributes<HTMLDivElement>> = (props) => {
    const { value } = props
    const number = value % 10
    if(value>=10){
        return <><DigitalNumber {...props} value={Math.floor(value / 10)}/><DigitalNumber  {...props}  value={number}/></>
    }
    const prefix = 'z-number-digital'
    return <div {...props} className={`${prefix}-container ${props.className || ''}`} >
        <span className={`${prefix} ${prefix}-top ${prefix}-top-${number}`}></span>
        <span className={`${prefix} ${prefix}-top-left ${prefix}-top-left-${number}`}></span>
        <span className={`${prefix} ${prefix}-top-right ${prefix}-top-right-${number}`}></span>
        <span className={`${prefix} ${prefix}-middle ${prefix}-middle-${number}`}></span>
        <span className={`${prefix} ${prefix}-bottom-left ${prefix}-bottom-left-${number}`}></span>
        <span className={`${prefix} ${prefix}-bottom-right ${prefix}-bottom-right-${number}`}></span>
        <span className={`${prefix} ${prefix}-bottom ${prefix}-bottom-${number}`}></span>
    </div>
}

export default DigitalNumber