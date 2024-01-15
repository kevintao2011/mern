import React, { useEffect, useMemo, useState } from 'react'
import { postURL } from '../../utils/fetch'
import { Checkbox, CheckboxGroup } from 'rsuite';
import FPSDetails from './FPSDetails';
import Dictionary from '../../Dictionary';
import PaymeDetails from './PaymeDetails';

function PaymentOption({code}) {
  const data = ['Payme', 'FPS', 'Cash'];
  const [PaymentMethod, setPaymentMethod] = useState()
  const [UpdatedDetails, setUpdatedDetails] = useState({})
  const [SelectedPayments, setSelectedPayments] = useState([])
  async function getPaymentMethod(){
      await postURL('/api/getpaymentmethod',true,{code:code}).then(result=>{
          if(result.success){
              console.log(result.data)
              setPaymentMethod(result.data)
          }
      })
  }
  function update(paymentMethod,detail){
    UpdatedDetails[paymentMethod]=detail
    console.log("paymentOptionComponent:",UpdatedDetails)
    setUpdatedDetails({...UpdatedDetails})
  }

  useEffect(() => {
    getPaymentMethod()

  }, [])
  
  return (
    
    PaymentMethod&&(
      <div className="flex flex-col p-5">
        <div className="flex flex-row  items-center">
            <div className="font-bold">付款資訊 Payment Method</div>
            {/* <Checkbox
                indeterminate={SelectedPayments.length > 0 && SelectedPayments.length < data.length}
                checked={SelectedPayments.length === data.length}
                onChange={(value, checked) => setSelectedPayments(checked ? data : [])}
            >
                Check all
            </Checkbox> */}
        </div>
        {/* <div className='flex '>
            <CheckboxGroup inline name="checkboxList" value={SelectedPayments} onChange={values => setSelectedPayments(values)}>
                {data.map(item => (
                <Checkbox key={item} value={item}>
                    {item}
                </Checkbox>
                ))}
            </CheckboxGroup>
        </div> */}
        <div className="grid grid-cols-2 gap-5">
          {
            Object.values(Dictionary.PaymentMethods).map(method=>{
              if(PaymentMethod[method]){
                switch (method) {
                  case "FPS":
                    return(<FPSDetails details={PaymentMethod[method]} onChange={(Fields=>{update("FPS",Fields)})}/>)
                  case "Payme":
                    return (<PaymeDetails details={PaymentMethod[method]} onChange={(Fields=>{update("Payme",Fields)})}/>)
                  default:
                    return(
                      <></>
                    )
                    
                }
                
              }else{
                return(<></>)
              }
              
            })
          }
        </div>
        <div className="">
          <button className='rounded-md p-1 bg-green-600 text-white' onClick={()=>{}}>Save</button>
        </div>
    </div>
    )
    
    
  )
}

export default PaymentOption