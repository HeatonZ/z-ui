import React from 'react'
import { Button as _Button } from 'antd'
import './layout.less'
export interface LayoutProps{

}

const Layout: React.FC<LayoutProps & React.HTMLAttributes<HTMLDivElement>> = (props) => {
    return <div {...props} className="z-ui-layout" ></div>
}

export default Layout