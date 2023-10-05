import React from 'react'
import { auth } from '../utils/firebasefunction'
import { useNavigate } from 'react-router-dom'
import { pickRadomColor } from '../utils/tailwindcss'
const SocietyCard = ({title,color,type,code,managebutton}) => {
  console.log("createing soc card")
  const navigate = useNavigate();
  console.log("title",title,"type,",type,"code",code)

  console.log(`${color}`)
  return (
    <div className={`bg-su-green h-full  rounded-md `}>
        
        <div className="flex flex-col p-2 ">
            <div className=' text-white  text-base border-b-2 border-white'> 
                {title}
            </div>
            <div className='w-full h-full text-white  text-base text-center'> 
                <div className="">{type}</div>
            </div>
        </div>
        
        {/* <div className="flex-row-reverse flex p-2 justify-center">
            {managebutton?(
                <button onClick={()=>{navigate(`/society/${code}/manage`)}} className=' rounded-xl p-1 text-white'> manage society </button>)
                :
                (<></>)
            }
        </div> */}

    </div>
    
  )
}

export default SocietyCard