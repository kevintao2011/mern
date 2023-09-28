import React, { useEffect, useState } from 'react'

export default function ToggleList({title,subIndexs,toggleState,onPressed,className=""}) {
  
  const [Expanded, setExpanded] = useState(false)
  
  return (
    <div className={`w-full ${className}`}>
      <div className='flex flex-row p-1  rounded-lg bg-gray-100 justify-between '>
        <p>
          <button onClick={()=>onPressed(title)} className='text-base'>
            {title}
          </button>
          
        </p>
        {
          Object.keys(subIndexs).length>0 && <button
            onClick={()=>{setExpanded(prev=>!prev);}}
          > 
          - 
          </button>
        }
        
      </div>
      {
        Expanded && Object.keys(subIndexs).map(index=>{
          return <ToggleList
            title={index}
            subIndexs={subIndexs[index]["subIndex"]}
            onPressed={onPressed}
            className='pl-2'
          />  
        })
      }
      
    </div>
    
  )
}
