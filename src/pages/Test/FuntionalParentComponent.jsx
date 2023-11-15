import React, { useState,useEffect, Component } from 'react'
import FunctionalChildComponent from './FunctionalChildComponent'
import { RGBHex2Dec, getRGBPerceivedBrightness } from '../../utils/colorFunction'
const FuntionalParentComponent = () => {
    
    const [parNum, setparNum] = useState(0)
    const [Content, setContent] = useState([])
    const [Clicked, setClicked] = useState(false)
    const [ColorArray, setColorArray] = useState(["#29C7AC","#28BCA3","#27B09A","#26A591","#259A88","#248E7F","#238376","#22786D","#216C64","#20615B"])
    const backgroundColor = 'bg-#FF0000'; 
    useEffect(() => {
        const colors = ["#29C7AC","#28BCA3","#27B09A","#26A591","#259A88","#248E7F","#238376","#22786D","#216C64","#20615B"]
        colors.forEach(color=>{
            console.log(color)
            console.log(RGBHex2Dec(color))
            console.log(getRGBPerceivedBrightness(color))
        })
        console.log(getRGBPerceivedBrightness("#E49393"))
        
    }, [])
    
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
            {/* <div>FuntionalParentComponent</div>
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
            } */}
            <div className="">Test Page</div>
            <div className={`w-full grid grid-cols-${ColorArray.length}`}>
                {
                    ColorArray.map(color=>{
                        return(
                            <div className={`bg-${color} bg-red-100  h-2 w-full`}>
                                
                            </div>
                            
                        )
                    })
                }
            </div>
            <div className={`${backgroundColor} bg-#FF0000 h-2 w-full`}>
                This div will have the specified background color using the hex code.
            </div>
        </div>
    )
}

export default FuntionalParentComponent
