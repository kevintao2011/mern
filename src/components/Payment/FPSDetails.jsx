import React from 'react'
// const FPSSchema = {
//     qr_code_url:'#',
//     phone_number:Number,
//     bank_account:{
//         index:String,
//         number:Number,   
//     },
//     shown_name:String,
//     activated:{type:String,default:false}
// }
const FPSSchema = [
  {field_name:"qr code",type:"",value:""},
]
  


function FPSDetails({details}) {
  return (
    <div className='flex flex-col'>
        <div className="">FPS</div>
        <div className=""></div>
    </div>
  )
}

export default FPSDetails