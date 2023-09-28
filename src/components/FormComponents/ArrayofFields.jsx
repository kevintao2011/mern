import React from 'react'

function ArrayofFields({index,fieldValues,returnFunction}) {
    console.log(fieldValues)

    return (
        
        <div className="w-full">
            {
                fieldValues.map((field,i)=>{
                    return (
                        <div className="w-full flex flex-row gap-2 my-1">
                            <input type="text" className='field w-full overflow-hidden' value={field} onChange={(e)=>{fieldValues[i]=e.target.value;returnFunction(index,[...fieldValues])}}/>
                        <button className=' p-1 btn bg-red-500 rounded-md' onClick={()=>{fieldValues.splice(i,1);returnFunction(index,[...fieldValues])}}>Remove</button>
                        </div>
                    )
                    
                })
            }
            <button className='p-1 btn bg-blue-500 rounded-md' onClick={()=>{returnFunction(index,[...fieldValues,""])}}>add</button>
        </div>
    )
}

export default ArrayofFields