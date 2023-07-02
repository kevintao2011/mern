import React from 'react'
import { auth } from '../utils/firebasefunction'
import { useNavigate } from 'react-router-dom'

const SocietyCard = (props) => {
  const title = props.title
  const type = props.type
  const managebutton = props.managebutton
  const navigate = useNavigate();
  console.log(managebutton)

  
  return (
    <div className="w-full h-full bg-su-green  rounded-full m-5   ">
        
    <div className="flex flex-row p-5">
            <p className=' rounded-full text-white px-5 text-base '> 
                {title}-{type}
            </p>
            {/* <p className=' rounded-full m-2 px-5 bg-slate-300 w-3/12'> 
                
            </p> */}
        </div>
        
        <div className="flex-row-reverse flex p-2 justify-center">
            {managebutton?(
                <button onClick={()=>{navigate("/society/manage")}} className=' rounded-full p-2  bg-slate-300 w-3/12 text-base'> manage </button>)
                :
                (<></>)
            }
        </div>

    </div>
    
  )
}

export default SocietyCard