import React, { useEffect, useState } from 'react'

export default function ToggleList({title,subIndexs,toggleState,onPressed,className="",expanded=false}) {
  
  const [Expanded, setExpanded] = useState(expanded)
  
  return (
    <div className={`w-full ${className}`}>
      <div className='flex flex-row p-1  rounded-lg justify-between '>
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
            className=''
          />  
        })
      }
      
    </div>
    
  )
}
