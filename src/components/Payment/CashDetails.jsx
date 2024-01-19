
import React, { useEffect, useState } from 'react'
import Dictionary, {FormParams} from '../../Dictionary'
import FillForm from '../FormComponents/FillForm'
function CashDetails({details,onChange}) {
  
  function mapData(details){
    return [
      {
        field_name:Dictionary.CashParams.ACTIVATED,
        field_type:FormParams.Form.field_type.boolean,
        required:FormParams.Form.field_type.required.NOT_REQUIRED,
        single:FormParams.Form.field_type.single.SINGLE,
        field_value:details[Dictionary.CashParams.ACTIVATED]?details[Dictionary.CashParams.ACTIVATED]:false,
      },
      
    ]
  }
  
  function reverseMap(FormFields){
    console.log("Reverse Map",FormFields)
    if(FormFields){
      const CashParams = Object.values(Dictionary.CashParams)
      let CashField = {}
      // CashParams.forEach(param=>{
        
      // })
      FormFields.forEach(field=>{
        if(CashParams.includes(field.field_name)){
          CashField[field.field_name]=field.field_value
        }
      })
      if(onChange){
        console.log("Detials pass to Option",CashField)
        onChange(CashField)
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
        <FillForm fields={mappedData} title={"Cash"} TitleMap={Dictionary.CashMapTitle.chi} allowDisable={true} onChange={(Fields=>{reverseMap(Fields)})}/>
    </div>
    )
    
    
  )

}

export default CashDetails








