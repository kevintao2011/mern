import React from 'react'
import { auth } from '../utils/firebasefunction'
import { useNavigate } from 'react-router-dom'

const SocietyCard = (props) => {
  console.log("createing soc card")
  const title = props.title

  const type = props.type
  const code = props.code
  const managebutton = props.managebutton
  const navigate = useNavigate();
  console.log("title",props.title,"type,",props.type,"code",code)

  
  return (
    <div className="w-1/2 h-full bg-su-green  rounded-3xl m-5   ">
        
        <div className="flex flex-row p-5">
            <p className=' rounded-3xl text-white px-5 text-base '> 
                {title}-{type}
            </p>
            {/* <p className=' rounded-full m-2 px-5 bg-slate-300 w-3/12'> 
                
            </p> */}
        </div>
        
        <div className="flex-row-reverse flex p-2 justify-center">
            {managebutton?(
                <button onClick={()=>{navigate(`/society/${code}/manage`)}} className=' rounded-xl p-1 text-white'> manage society </button>)
                :
                (<></>)
            }
        </div>

    </div>
    
  )
}

export default SocietyCard