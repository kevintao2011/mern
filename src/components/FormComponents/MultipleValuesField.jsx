import React, { useEffect, useState } from 'react'
import FieldForArray from './FieldForArray'
import ArrayofFields from './ArrayofFields';
import ArrayofKVFields from './ArrayofKVFields';
function MultipleValuesField({values=[],uploadValues,index, splitSymbol=' ',isKV=false}) {
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
            {
                splitSymbol==="field"?(
                    <div className="" key={`edit-components`}>
                        {
                            <ArrayofFields 
                                index={index}
                                fieldValues={values}
                                returnFunction={uploadValues}
                                isKV={isKV}
                            />
                            // isKV?(
                            //     < ArrayofKVFields
                            //         index={index}
                            //         fieldValues={values}
                            //         returnFunction={uploadValues}
                                
                            //     />
                            // ):(
                            //     <ArrayofFields 
                            //         index={index}
                            //         fieldValues={values}
                            //         returnFunction={uploadValues}
                            //         isKV={isKV}
                            //     />
                            // )
                        }
                        
                    
                    </div>
                ):(
                    <>
                    <input 
                        placeholder={`use ${splitMap[splitSymbol]} to seperate input`}
                        className=' field w-full bg-white'
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
                    </>
                )
            }
            
            
        </div>
  )
}

export default MultipleValuesField