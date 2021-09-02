import React, { useState } from 'react';
import { render } from 'react-dom';
import { Button, Layout } from '../../components'
import { Button as _Button } from 'antd'
import DigitalNumber from '../../components/number/digitalNumber';
import SlotMachine from '../../components/animation/slotMachine/slotMachine';

const App = () =>{
    const [start, setStart] = useState(false)
    const toggleStart = () =>{
        setStart(start => !start)
    }
    return <Layout>
        <Button onClick={console.log} >test1是</Button>
        <_Button type="primary" onClick={toggleStart}>test</_Button>
        
        <Layout><div>1</div>2<DigitalNumber value={1234567890}></DigitalNumber>
        <SlotMachine start={start} style={{height: '32px'}}>
            {new Array(10).fill("").map((_, i) => <DigitalNumber value={i}></DigitalNumber>)}
        </SlotMachine>
        </Layout>
    </Layout>
}

render(<App />, document.querySelector('#app'));