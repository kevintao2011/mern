import React, { useEffect, useState } from 'react'

function MultipleValuesField({values,uploadValues,index, splitSymbol=`\s`}) {
    const splitMap = {
        '\\' : "single backslash",
        '\a' : "bell/alert",
        '\b' : "backspace",
        '\r' : "carriage return",
        '\n' : "newline",
        '\s' : "space",
        '\t' : "tab",
    }
    const [Values, setValues] = useState([])
    
    function handleTags(e){
        console.log("fieldValue b4 handle",e.target.value,"default tags",values)
        var fieldValue=e.target.value
        fieldValue = fieldValue.split(splitSymbol)
        fieldValue.splice(0,1)
        fieldValue = fieldValue.map(element => {
            return element.trim()
        });
        console.log("set tags",[...Values,fieldValue])
        uploadValues(index,)
        e.target.value=""
    }

    return (
        <div className="flex flex-col ">
            <input 
                placeholder={`use ${splitMap[splitSymbol]} to seperate input`}
                className='bg-gray-50 border w-full p-2.5 block rounded-lg shadow shadow-gray-400'
                type="text" 
                id="tags" 
                onChange={(e=>{if(e.target.value[e.target.value.length-1]===" "){
                    handleTags(e)
                }})}
            />
            <div className="flex flex-row">
            {
                Values.map((tag,i)=>{
                    return(
                        <div className="flex flex-row" key={crypto.randomUUID()}>
                       
                            <button 
                                className='bg-red-500 text-white'
                                onClick={
                                    ()=>{
                                        Values.splice(i,1)
                                        uploadValues(i,values)
                                    }
                                }
                            >
                                
                                x
                            </button>
                        </div>
                    )
                }
                    
                )
            }
            {
                values.map((tag,i)=>{
                    return(
                        <div className="flex flex-row" key={crypto.randomUUID()}>
                            <p>#{tag}</p>
                            <button 
                                className='bg-red-500 text-white'
                                onClick={
                                    ()=>{
                                        Values.splice(i,1)
                                        setValues([...Values])
                                    }
                                }
                            >
                                
                                x
                            </button>
                        </div>
                    )
                }
                    
                )
            }
            </div>
            
        </div>
  )
}

export default MultipleValuesField