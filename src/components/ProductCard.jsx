import React from 'react'
import { auth } from '../utils/firebasefunction'
const ProductCard = (props) => {
  const title = props.title
  const type = props.type
  const managebutton = props.managebutton
  console.log(managebutton)
  return (
<div className="w-full bg-su-green  rounded-xl m-5 w-max-12 ">
        
        <div className="flex flex-row justify-center">
            <div className="">
                <p className=' rounded-full m-2 px-5 bg-slate-300 '> 
                    {title}-{type}
                </p>
                {/* <p className=' rounded-full m-2 px-5 bg-slate-300 w-3/12'> 
                    
                </p> */}
            </div>
        </div>
        
        {/* <div className="flex-row-reverse flex p-2">
            {managebutton?(
                <button className=' rounded-xl p-2 bg-slate-300 w-3/12'> manage </button>)
                :
                (<></>)
            }
        </div> */}

    </div>
    
  )
}

export default ProductCard