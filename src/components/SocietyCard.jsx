import React from 'react'
import { auth } from '../utils/firebasefunction'
import { useNavigate } from 'react-router-dom'
import { pickRadomColor } from '../utils/tailwindcss'
const SocietyCard = ({title,color,type,code,managebutton,college,session,expiry_date}) => {
  console.log("createing soc card")
  const navigate = useNavigate();
  
  console.log("title",title,"type,",type,"code",code)

  console.log(`${color}`)
  return (
    <button disabled={type==="basic member"} onClick={()=>{navigate(`/society/${code}/manage`)}} className='' >
        <div className={`card`}>
            
                <div className="flex flex-col p-2   text-base text-start">
                    <div className='   text-lg font-b border-b-2 text-su-green'> 
                        {`${title}`}
                    </div>
                    {/* <div className='w-full h-full text-white  text-base text-start'> 
                        
                    </div> */}
                    <div className="">{`Session: ${session}`}</div>
                    <div className="">{`Role: ${type}`}</div>
                    <div className="">{`Expiry date: ${expiry_date}`}</div>
                    {/* <div className="flex flex-row justify-end">
                        <button className='rounded-full bg-slate-400 px-2'>Extend </button>
                        <button className='rounded-full bg-slate-400 px-2'>Extend </button>
                    </div> */}
                </div> 
        
            
            
            {/* <div className="flex-row-reverse flex p-2 justify-center">
                {managebutton?(
                    <button onClick={()=>{navigate(`/society/${code}/manage`)}} className=' rounded-xl p-1 text-white'> manage society </button>)
                    :
                    (<></>)
                }
            </div> */}

        </div>
    </button>
    
  )
}

export default SocietyCard