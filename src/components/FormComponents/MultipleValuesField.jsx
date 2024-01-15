import React, { useEffect, useState } from 'react'
import FieldForArray from './FieldForArray'
import ArrayofFields from './ArrayofFields';
import ArrayofKVFields from './ArrayofKVFields';
function MultipleValuesField({values=[],uploadValues,index, splitSymbol=' ',isKV=false,disabled=false}) {
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
        fieldValue = fieldValue.split(splitSymbol)[0].trim()
        console.log("split",fieldValue)
        // fieldValue.splice(0,1)
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
                        disabled={disabled}
                    />
                    <div className="flex flex-row gap-2">
                    {
                        
                        values.map((tag,i)=>{
                            return(
                                <div className="flex flex-row my-1" key={crypto.randomUUID()}>
                            
                                    <button 
                                        className='bg-gray-400 text-white rounded-md'
                                        onClick={
                                            ()=>{
                                                values.splice(i,1)
                                                uploadValues(i,values)
                                            }
                                        }
                                        disabled={disabled}
                                    >
                                        <div className="flex flex-row">
                                            <div className="p-1">{tag}</div>
                                        </div>
                                        
                                        
                                      
                                        
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