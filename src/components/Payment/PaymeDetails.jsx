import React, { useEffect, useState } from 'react'
import Dictionary, {FormParams} from '../../Dictionary'
import FillForm from '../FormComponents/FillForm'

// const PaymeSchema = {
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
        field_name:Dictionary.PaymeParams.ACTIVATED,
        field_type:FormParams.Form.field_type.boolean,
        required:FormParams.Form.field_type.required.NOT_REQUIRED,
        single:FormParams.Form.field_type.single.SINGLE,
        field_value:details[Dictionary.PaymeParams.ACTIVATED]||false?details[Dictionary.PaymeParams.ACTIVATED]:false,
      },
      {
        field_name:Dictionary.PaymeParams.PAYME_URL,
        field_type:FormParams.Form.field_type.text,
        required:FormParams.Form.field_type.required.NOT_REQUIRED,
        single:FormParams.Form.field_type.single.SINGLE,
        field_value:details[Dictionary.PaymeParams.PAYME_URL]?details[Dictionary.PaymeParams.PAYME_URL]:undefined,
      },
      {
        field_name:Dictionary.PaymeParams.SHOWN_NAME,
        field_type:FormParams.Form.field_type.text,
        required:FormParams.Form.field_type.required.NOT_REQUIRED,
        single:FormParams.Form.field_type.single.SINGLE,
        field_value:details[Dictionary.PaymeParams.SHOWN_NAME]?details[Dictionary.PaymeParams.SHOWN_NAME]:undefined,
      },
      {
        field_name:Dictionary.PaymeParams.PHONE_NUMBER,
        field_type:FormParams.Form.field_type.number,
        required:FormParams.Form.field_type.required.NOT_REQUIRED,
        single:FormParams.Form.field_type.single.SINGLE,
        field_value:details[Dictionary.PaymeParams.PHONE_NUMBER]?details[Dictionary.PaymeParams.PHONE_NUMBER]:undefined,
      },
      
    ]
  }
  
  /**
   * Map FillForm data back to 
   * @param {Array} FormFields 
   */
  function reverseMap(FormFields){
    console.log("Reverse Map",FormFields)
    if(FormFields){
      const PaymeParams = Object.values(Dictionary.PaymeParams)
      let PaymeField = {}
      FormFields.forEach(field=>{
        if(PaymeParams.includes(field.field_name)){
          PaymeField[field.field_name]=field.field_value
        }
      })
      if(onChange){
        console.log("Detials pass to Option",PaymeField)
        onChange(PaymeField)
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
        <FillForm fields={mappedData} title={"Payme"} TitleMap={Dictionary.PaymeMapTitle.chi} allowDisable={true} onChange={(Fields=>{reverseMap(Fields)})}/>
    </div>
    )
    
    
  )
}

export default PaymeDetails