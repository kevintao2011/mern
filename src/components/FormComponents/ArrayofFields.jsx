import React from 'react'

function ArrayofFields({index,fieldValues,returnFunction,isKV=false,disabled=false}) {
    console.log(fieldValues)

    return (
        isKV?(
            <div className="w-full">
            {
                fieldValues.map((field,i)=>{
                    
                    return (
                        <div className="w-full flex flex-row gap-2 my-1">
                            <input 
                                type="text" 
                                className='field w-full overflow-hidden' 
                                placeholder='title'
                                value={Object.keys(field)[0]} 
                                onChange={(e)=>{
                                    console.log(Object.keys(field)[0],":",Object.values(field)[0])
                                    fieldValues[i]={[e.target.value]:Object.values(field)[0]};
                                    returnFunction(index,[...fieldValues])}}
                                disabled={disabled}
                            />
                            <input 
                                type="text" 
                                placeholder='value'
                                className='field w-full overflow-hidden' 
                                value={Object.values(field)[0]} 
                                onChange={(e)=>{
                                    fieldValues[i]={[Object.keys(field)[0]]:e.target.value};
                                    returnFunction(index,[...fieldValues])}}
                                disabled={disabled}
                            />
                        <button 
                            className=' p-1 btn bg-red-500 rounded-md' 
                            onClick={()=>{
                                fieldValues.splice(i,1);
                                returnFunction(index,[...fieldValues])
                                }}
                            disabled={disabled}
                        >
                            Remove
                        </button>
                        </div>
                    )
                    
                })
            }
                <button className='p-1 btn bg-blue-500 rounded-md' onClick={()=>{returnFunction(index,[...fieldValues,{"":""}])}} disabled={disabled}>add</button>
            </div>
        ):(
            <div className="w-full">
                {
                    fieldValues.map((field,i)=>{
                        return (
                            <div className="w-full flex flex-row gap-2 my-1">
                                <input type="text" className='field w-full overflow-hidden' value={field} onChange={(e)=>{fieldValues[i]=e.target.value;returnFunction(index,[...fieldValues])}} disabled={disabled}/>
                            <button className=' p-1 btn bg-red-500 rounded-md' onClick={()=>{fieldValues.splice(i,1);returnFunction(index,[...fieldValues])}} disabled={disabled}>Remove</button>
                            </div>
                        )
                        
                    })
                }
                <button className='p-1 btn bg-blue-500 rounded-md' onClick={()=>{returnFunction(index,[...fieldValues,""])}} disabled={disabled}>add</button>
            </div>
        )
        
    )
}

export default ArrayofFields