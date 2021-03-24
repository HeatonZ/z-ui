import React from 'react';
import { render } from 'react-dom';
import { Button } from '../../components'
import { Button as _Button } from 'antd'

const App = () =>{
    return <div style={{padding:'2rem'}}>
        <Button onClick={console.log} preset="pulse"  type="button">test1</Button>
        <_Button type="primary">test</_Button>
    </div>
}

render(<App />, document.querySelector('#app'));