
import React, { useEffect, useState } from 'react'
import Dictionary, {FormParams} from '../../Dictionary'
import FillForm from '../FormComponents/FillForm'

const DepositSchema = {
  [Dictionary.DepositParams.ACTIVATED]:false,
  [Dictionary.DepositParams.QR_CODE_URL]:"http://payme",
  [Dictionary.DepositParams.SHOWN_NAME]:"Chan Tai Man",
  [Dictionary.DepositParams.PHONE_NUMBER]:12345678,
  [Dictionary.DepositParams.BANK_ACCOUNT]:"3102124141"
}



function DepositDetails({details,onChange}) {
  function mapData(details){
    return [
      {
        field_name:Dictionary.DepositParams.ACTIVATED,
        field_type:FormParams.Form.field_type.boolean,
        required:FormParams.Form.field_type.required.NOT_REQUIRED,
        single:FormParams.Form.field_type.single.SINGLE,
        field_value:details[Dictionary.DepositParams.ACTIVATED]?details[Dictionary.DepositParams.ACTIVATED]:false,
      },
      {
        field_name:Dictionary.DepositParams.BANK_INDEX,
        field_type:FormParams.Form.field_type.text,
        required:FormParams.Form.field_type.required.NOT_REQUIRED,
        single:FormParams.Form.field_type.single.SINGLE,
        field_value:details[Dictionary.DepositParams.BANK_INDEX]?details[Dictionary.DepositParams.BANK_INDEX]:undefined,
      },
      {
        field_name:Dictionary.DepositParams.SHOWN_NAME,
        field_type:FormParams.Form.field_type.text,
        required:FormParams.Form.field_type.required.NOT_REQUIRED,
        single:FormParams.Form.field_type.single.SINGLE,
        field_value:details[Dictionary.DepositParams.SHOWN_NAME]?details[Dictionary.DepositParams.SHOWN_NAME]:undefined,
      },
      {
        field_name:Dictionary.DepositParams.BANK_ACCOUNT,
        field_type:FormParams.Form.field_type.text,
        required:FormParams.Form.field_type.required.NOT_REQUIRED,
        single:FormParams.Form.field_type.single.SINGLE,
        field_value:details[Dictionary.DepositParams.BANK_ACCOUNT]?details[Dictionary.DepositParams.BANK_ACCOUNT]:undefined
      },
    ]
  }
  
  function reverseMap(FormFields){
    console.log("Reverse Map",FormFields)
    if(FormFields){
      const DepositParams = Object.values(Dictionary.DepositParams)
      let DepositField = {}
      // DepositParams.forEach(param=>{
        
      // })
      FormFields.forEach(field=>{
        if(DepositParams.includes(field.field_name)){
          DepositField[field.field_name]=field.field_value
        }
      })
      if(onChange){
        console.log("Detials pass to Option",DepositField)
        onChange(DepositField)
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
        <FillForm fields={mappedData} title={"Deposit"} TitleMap={Dictionary.DepositMapTitle.chi} allowDisable={true} onChange={(Fields=>{reverseMap(Fields)})}/>
    </div>
    )
    
    
  )
}

export default DepositDetails







