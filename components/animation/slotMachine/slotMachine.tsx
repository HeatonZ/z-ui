import React, { useEffect, useRef, useState } from 'react'
import './slotMachine.less'

export interface SlotMachineProps{
    start: Boolean,
    onFinish?: Function
}
const SlotMachine: React.FC<SlotMachineProps & React.HtmlHTMLAttributes<HTMLUListElement>> = (props) => {
    const { start,children,onFinish, ...rest } = props
    const ref = useRef(null)
    const [observer, setObserver] = useState(null);
    const length = React.Children.count(children)
    useEffect(() => {
        if(start){
            ref.current.style.scrollBehavior = 'auto'
            ref.current.scrollTop = 0;
            intiateScrollObserver();
        }else if(observer){
            resetObservation([ref.current.firstChild,ref.current.children[length * 2 -1]])
            ref.current.scrollTop = ref.current.children[0].scrollHeight * (length * 2 )
            const random = Math.floor(Math.random() * length)
            bonusObserver(ref.current.children[length * 2 + random])
            ref.current.scrollTop = ref.current.children[length * 2 + random].scrollHeight * (length * 2 + random + 1)
        }
    },[start])
    const intiateScrollObserver = () => {
        const observer1 = new IntersectionObserver((entries)=>{
            entries.forEach((entry)=>{
                if(entry.isIntersecting && entry.target.id === '0'){
                    ref.current.style.scrollBehavior = 'smooth'
                    ref.current.scrollTop = ref.current.children[0].scrollHeight * (length * 2)
                }
                else if(entry.isIntersecting && entry.target.id === `${length*2-1}`){
                    ref.current.style.scrollBehavior = 'auto'
                    ref.current.scrollTop = 0;
                }
            })
        })
        observer1.observe(ref.current.firstChild)
        observer1.observe(ref.current.children[length * 2 -1])
        setObserver(observer1) 
    }
    const bonusObserver = (child: any) => {
        const observer2 = new IntersectionObserver((entries)=>{
            entries.forEach((entry)=>{
                if(entry.isIntersecting){
                    console.log('!!!!!!!!',entry)
                    onFinish?.(+entry.target.id % 10 + 1)
                    resetObservation([child])
                }
            })
        },{threshold: 1})
        observer2.observe(child)
        setObserver(observer2) 
    }
    const resetObservation = (childs:any[]) =>{
        childs.forEach((child)=>{
            observer && observer.unobserve(child)
        })
    }
    
    return <ul {...rest} className={`animation-slotMachine-container`} ref={ref}>
        {React.Children.map(children, (node, index)=> {
            return <li id={index.toString()}>{node}</li>
        })}
        {React.Children.map(children, (node, index)=> {
            return <li id={(index + length).toString()}>{node}</li>
        })}
        {React.Children.map(children, (node, index)=> {
            return <li id={(index + length*2).toString()}>{node}</li>
        })}
    </ul>
}

export default SlotMachine