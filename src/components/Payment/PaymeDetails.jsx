import React, { useEffect, useState } from 'react'
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
const PaymeSchema = {
  [Dictionary.PaymentParams.Payme.ACTIVATED]:false,
  [Dictionary.PaymentParams.Payme.PAYME_URL]:"http://payme",
  [Dictionary.PaymentParams.Payme.SHOWN_NAME]:"Chan Tai Man",
  [Dictionary.PaymentParams.Payme.PHONE_NUMBER]:12345678,
}

  



function PaymeDetails({details,onChange}) {

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
        field_value:details[Dictionary.FPSParams.QR_CODE_URL]?details[Dictionary.FPSParams.QR_CODE_URL]:undefined,
      },
      {
        field_name:Dictionary.FPSParams.SHOWN_NAME,
        field_type:FormParams.Form.field_type.text,
        required:FormParams.Form.field_type.required.NOT_REQUIRED,
        single:FormParams.Form.field_type.single.SINGLE,
        field_value:details.shown_name?details.shown_name:undefined,
      },
      {
        field_name:Dictionary.FPSParams.PHONE_NUMBER,
        field_type:FormParams.Form.field_type.number,
        required:FormParams.Form.field_type.required.NOT_REQUIRED,
        single:FormParams.Form.field_type.single.SINGLE,
        field_value:details[Dictionary.FPSParams.PHONE_NUMBER]?details.phone_number:undefined,
      },
      {
        field_name:Dictionary.FPSParams.BANK_ACCOUNT,
        field_type:FormParams.Form.field_type.text,
        required:FormParams.Form.field_type.required.NOT_REQUIRED,
        single:FormParams.Form.field_type.single.SINGLE,
        field_value:details[Dictionary.FPSParams.BANK_ACCOUNT]?details[Dictionary.FPSParams.BANK_ACCOUNT]:undefined
      },
    ]
  }
  
  function reverseMap(FormFields){
    console.log("Reverse Map",FormFields)
    if(FormFields){
      const FPSParams = Object.values(Dictionary.FPSParams)
      var FPSField = {}
      // FPSParams.forEach(param=>{
        
      // })
      FormFields.forEach(field=>{
        if(FPSParams.includes(field.field_name)){
          FPSField[field.field_name]=field.field_value
        }
      })
      if(onChange){
        console.log("Detials pass to Option",FPSField)
        onChange(FPSField)
      }
    }
    
  }

  const [mappedData, setmappedData] = useState()
  useEffect(() => {
    setmappedData(mapData(details))
    
  }, [])
  
  return (
    //onChange={()=>{updateDetails()}}
    mappedData&&(
      <div className='flex flex-col w-full'>
        <FillForm fields={mappedData} title={"Payme"} TitleMap={Dictionary.FPSMapTitle.chi} allowDisable={true} onChange={(Fields=>{reverseMap(Fields)})}/>
    </div>
    )
    
    
  )
}

export default PaymeDetails