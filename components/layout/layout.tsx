import React from 'react'
import { Button as _Button } from 'antd'
import './layout.less'
export interface LayoutProps{

}

const Layout: React.FC<LayoutProps> = () => {
    return <_Button type="primary" className={'test'}>test</_Button>
}

export default Layout