import React, { useState,useEffect, Component } from 'react'
import FunctionalChildComponent from './FunctionalChildComponent'
const FuntionalParentComponent = () => {
    
    const [parNum, setparNum] = useState(0)
    const [Content, setContent] = useState([])
    const [Clicked, setClicked] = useState(false)


    useEffect(() => {
        function updateForm(){
            let data = []
            Content.forEach(c=>{
                c = parNum
                data.push(c)
            })
            return data
        }

        console.log('Triggered by click')
        const d = updateForm()
        setContent(d)
    }, [parNum])

    useEffect(() => {
        console.log("Content array",Content)
        console.log('Triggered by contentchange')
    }, [Content])

    
    function handleRemove(b,index){
        Content.splice(index,1)
        const temp = [...Content]
        setContent(temp)
    }
    
    return (
        <div className="">
            <div>FuntionalParentComponent</div>
            <button onClick={()=>{
                    setparNum(parNum-1);
                    console.log(parNum);
                }}
            >
                -
            </button>
            <button onClick={()=>{
                    setparNum(parNum+1);
                    console.log(parNum); 
                }}
            >
                +
            </button>
            <button onClick={()=>{setContent([...Content,parNum])}}>
                Add
            </button>
            <p>Not in array</p>
            {parNum}
                
            <FunctionalChildComponent number={parNum} />
            
            <p> in array</p>
            {
                Content.map((c,i)=>{
                   return (<FunctionalChildComponent number={c} index={i} deleteFunction={handleRemove} />)
                })
            }
        </div>
    )
}

export default FuntionalParentComponent
