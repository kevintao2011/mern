import React, { useState } from 'react'
import FileField from './FileField'
import { List } from 'rsuite';
function ProductCombination({headings,rowValues=[],update}) {
    const defaultData = [
        { text: 'Size',option:["Yellow","Green"] },
        { text: 'Color' },
    ];
    const [Data, setData] = useState([])
    const [optionInput, setoptionInput] = useState("")
    const handleSortEnd = ({ oldIndex, newIndex }) =>
    setData(prvData => {
      const moveData = prvData.splice(oldIndex, 1);
      const newData = [...prvData];
      newData.splice(newIndex, 0, moveData[0]);
      return newData;
    }, []);


    
    function Variants({data}) {
        const nOfType = data.length
        var variantOptions = []
        for (let index = 0; index < data.length; index++) {
            variantOptions.push(data[index].option.map(text=>{
                return text
            }))
        }
        
        function findCombinations(arrays) {
        function backtrack(currCombination, remainingArrays) {
            if (remainingArrays.length === 0) {
            combinations.push(currCombination.join(' '));//join('_')
            return;
            }
        
            const currentArray = remainingArrays[0];
            for (let i = 0; i < currentArray.length; i++) {
            const element = currentArray[i];
            backtrack(currCombination.concat(element), remainingArrays.slice(1));
            }
        }
        
        const combinations = [];
        backtrack([], arrays);
        return combinations;
        }
        variantOptions = findCombinations(variantOptions)
        return(
            variantOptions.map(options=>{
                return <div className="">{options}</div>
            })
        )
        
    }
    
  
   
    
    function OptionInput({option,index}) {
        const [Input, setInput] = useState("")
        console.log("optionInput",option)
        return (
                <>
                    <div className="">{option["text"]}</div>
                    <input 
                        type="text" 
                        placeholder='e.g blue, xl , s'
                        value={Input}
                        onChange={(e)=>{
                            // console.log("input in option",e.target.value)
                            setInput(e.target.value)
                        }}
                        onKeyDown={(e)=>{ 
                            if(e.key=== 'Enter'){
                                console.log("added sub option")
                                Data[index]["option"].push(Input)
                                console.log("Updated subdata:",Data)
                                setData([...Data])
                                setInput("")
                            }
                            
                        }}
                    />
                    <div className="flex flex-row gap-2">
                    {
                        Data[index]["option"].map((opt,i)=>{
                            return <div className="flex flex-row gap-1 ">
                                {opt}
                                <button className='text-red-600' 
                                    onClick={()=>{
                                        Data[index]["option"].splice(i,1)
                                        setData([...Data])
                                    }}
                                >
                                    x
                                </button>
                            </div>
                        })
                    }
                    </div>
                    
                    
                </>
        )
    }
    
    return (
        <div className="flex flex-col">
            <div className="w-full grid grid-flow-row grid-cols-3 gap-2 text-sm border rounded-lg">
                <div className="">
                    <div className="">Input</div>
                    <input 
                        type="text" 
                        placeholder='e.g size, color'
                        value={optionInput}
                        onChange={(e)=>{
                            console.log("input",e.target.value)
                            setoptionInput(e.target.value)
                        }}
                        onKeyDown={(e)=>{ 
                            if(e.key=== 'Enter'){
                                console.log("added option")
                                Data.push({text:optionInput,option:[]})
                                console.log("Data",Data)
                                setData([...Data])
                                setoptionInput("")
                            }
                            
                        }}
                    />
                    <div className="">
                        <div className="">Combine</div>
                        <List sortable onSort={handleSortEnd}>
                            {Data.map(({ text, disabled }, index) => (
                                <List.Item 
                                    key={index} 
                                    index={index}
                                    className='border rounded-lg'
                                    size='xs'
                                >
                                    <div className="w-full flex flex-row justify-between">
                                        <div className="">
                                            {text}
                                        </div>
                                        <button
                                            onClick={()=>{
                                                Data.splice(index,1);
                                                setData([...Data])
                                            }}
                                            className='text-red-600'
                                        >
                                            x
                                        </button>
                                    </div>
                                </List.Item>
                            ))}
                        </List>
                    </div>
                </div>
                
                <div className="">
                    <div className="">Options</div>
                    {
                        Data.map((option,index)=>{ //{ text, disabled } => key in object
                            console.log("passed option",option)
                            return(
                                <OptionInput option={option} index={index}/>
                            )
                        })
                    }
                    
                </div>
                
            </div>
            <div className="">
                
                <div className="">Quantity and Price</div>
                
                <Variants data={Data}/>
                
            </div>
        </div>
        
    )
}


  

export default ProductCombination