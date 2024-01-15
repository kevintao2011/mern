import React, { useEffect, useState } from 'react'
import { Toggle } from 'rsuite'
import Dictionary, {FormParams} from '../../Dictionary'
import FillForm from '../FormComponents/FillForm'

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
const FPSSchema = {
  [Dictionary.FPSParams.ACTIVATED]:false,
  [Dictionary.FPSParams.QR_CODE_URL]:"http://payme",
  [Dictionary.FPSParams.SHOWN_NAME]:"Chan Tai Man",
  [Dictionary.FPSParams.PHONE_NUMBER]:12345678,
  [Dictionary.FPSParams.BANK_ACCOUNT]:"3102124141"
}
  
function mapData(details){
  return [
    {
      field_name:Dictionary.FPSParams.ACTIVATED,
      field_type:FormParams.Form.field_type.boolean,
      required:FormParams.Form.field_type.required.NOT_REQUIRED,
      single:FormParams.Form.field_type.single.SINGLE,
      field_value:details[Dictionary.FPSParams.ACTIVATED]?details[Dictionary.FPSParams.ACTIVATED]:false,
    },
    {
      field_name:Dictionary.FPSParams.QR_CODE_URL,
      field_type:FormParams.Form.field_type.text,
      required:FormParams.Form.field_type.required.NOT_REQUIRED,
      single:FormParams.Form.field_type.single.SINGLE,
      field_value:details[Dictionary.FPSParams.QR_CODE_URL]?details[Dictionary.FPSParams.QR_CODE_URL]:"",
    },
    {
      field_name:Dictionary.FPSParams.SHOWN_NAME,
      field_type:FormParams.Form.field_type.text,
      required:FormParams.Form.field_type.required.NOT_REQUIRED,
      single:FormParams.Form.field_type.single.SINGLE,
      field_value:details.shown_name?details.shown_name:"",
    },
    {
      field_name:Dictionary.FPSParams.PHONE_NUMBER,
      field_type:FormParams.Form.field_type.number,
      required:FormParams.Form.field_type.required.NOT_REQUIRED,
      single:FormParams.Form.field_type.single.SINGLE,
      field_value:details.phone_number?details.phone_number:null,
    },
    {
      field_name:Dictionary.FPSParams.BANK_ACCOUNT,
      field_type:FormParams.Form.field_type.text,
      required:FormParams.Form.field_type.required.NOT_REQUIRED,
      single:FormParams.Form.field_type.single.SINGLE,
      field_value:details[Dictionary.FPSParams.BANK_ACCOUNT],
    },
  ]
}


function FPSDetails({details,onSave}) {
  const [mappedData, setmappedData] = useState()
  const [Editable, setEditable] = useState(false)
  useEffect(() => {
    setmappedData(mapData(FPSSchema))
    
  }, [])
  
  return (
    
    mappedData&&(
      <div className='flex flex-col w-full'>
        <FillForm fields={mappedData} title={"FPS"} TitleMap={Dictionary.FPSMapTitle.chi} allowDisable={true}/>
    </div>
    )
    
    
  )
}

export default FPSDetails