import React from 'react'
import { useNavigate } from 'react-router-dom'
const Error = () => {
  const navigate=useNavigate()
  return (
    <div className="mainpage-1  flex flex-col items-center justify-center">
      <div>Error</div>
      <img 
        src="\assests\img\error.png" 
        alt="" 
        
      />
      <p className='py'>
        sorry, page not find
      </p>
      <button
        onClick={()=>{navigate("/")}}
      >
        <img src="\assests\img\icon\icon_home.svg" alt="" />
      </button>
    </div>
    
  )
}

export default Error