import React, { useEffect, useState } from 'react'

function MultipleValuesField({values,uploadValues,index, splitSymbol=' '}) {
    const splitMap = {
        '\\' : "single backslash",
        '\b' : "backspace",
        '\r' : "carriage return",
        '\n' : "newline",
        ' ' : "space",
        '\t' : "tab",
    }
    
    function handleTags(e){
        console.log("fieldValue b4 handle",e.target.value,"default tags",values)
        var fieldValue=e.target.value
        fieldValue = fieldValue.split(splitSymbol)
        // fieldValue.splice(0,1)
        fieldValue = fieldValue.map(element => {
            return element.trim()
        });
        console.log("fieldValue",fieldValue)
        uploadValues(index,[...values,fieldValue])
        e.target.value=""
    }

    return (
        <div className="flex flex-col ">
            <input 
                placeholder={`use ${splitMap[splitSymbol]} to seperate input`}
                className='border w-full  p-1 rounded-md shadow  focus:border-blue-400'
                type="text" 
                id="tags" 
                onChange={(e=>{
                    if(e.target.value[e.target.value.length-1]===splitSymbol){
                        handleTags(e)
                    }
                })}
            />
            <div className="flex flex-row gap-2">
            {
                values.map((tag,i)=>{
                    return(
                        <div className="flex flex-row" key={crypto.randomUUID()}>
                       
                            <button 
                                className='bg-red-500 text-white'
                                onClick={
                                    ()=>{
                                        values.splice(i,1)
                                        uploadValues(i,values)
                                    }
                                }
                            >
                                
                                {tag}x
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