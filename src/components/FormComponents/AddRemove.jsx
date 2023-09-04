import React, { useState } from 'react'
import Field from './Field'
export default function AddRemoveField({fieldType,uploadData,className=""}) {
    const [CSS, setCSS] = useState("")
    const [dataSet, setdataSet] = useState([{fieldType:"text",content:""}])
    function handleAddField(data){
        setdataSet([...dataSet,data])
    }
    function handleDelete(data){
        
    }

    return (
        <div className={className}>
            <p>Fields</p>
            <div className="flex flex-row">
                <select name="" id="" className='bg-gray-50 border w-full p-1 block rounded-lg shadow shadow-gray-400'>
                    <option 
                        value="text" 
                        className='bg-gray-50 border w-full p-1 block rounded-lg shadow shadow-gray-400'
                    >
                        text
                    </option>
                    <option 
                        value="text" 
                        className='bg-gray-50 border w-full p-1 block rounded-lg shadow shadow-gray-400'
                    >
                        text
                    </option>
                </select>
                <button
                    className='px-2 bg-blue-600 rounded-md'
                    onClick={()=>{handleAddField()}}
                >
                    Add 
                </button>
            </div>
            {/* <Field fieldType={fieldType} index={0}/> */}
            {
                dataSet.map((v,i)=>{
                    return(
                        <Field fieldType={v.fieldType} index={i}/>
                    )
                })   
            }
             
        </div>
        
    )
}

