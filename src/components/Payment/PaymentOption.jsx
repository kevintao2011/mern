import React, { useEffect, useMemo, useState } from 'react'
import { postURL } from '../../utils/fetch'
import { Checkbox, CheckboxGroup } from 'rsuite';
import FPSDetails from './FPSDetails';
import Dictionary from '../../Dictionary';
import PaymeDetails from './PaymeDetails';
import DepositDetails from './DepositDetails';
import { toast } from 'sonner';
import CashDetails from './CashDetails';

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
            <div className="font-bold underline">付款資訊 Payment Method</div>
        </div>
        <div className="grid grid-cols-2 gap-5">
          {
            Object.values(Dictionary.PaymentMethods).map(method=>{
              if(PaymentMethod[method]){
                switch (method) {
                  case "FPS":
                    return(
                      <div className="">
                        <FPSDetails details={PaymentMethod[method]} onChange={(Fields=>{update("FPS",Fields)})}/>
                      </div>
                    )
                  case "Payme":
                    return (<PaymeDetails details={PaymentMethod[method]} onChange={(Fields=>{update("Payme",Fields)})}/>)
                  case "Deposit":
                    return (<DepositDetails details={PaymentMethod[method]} onChange={(Fields=>{update("Deposit",Fields)})}/>)
                  case "Cash":
                    return (<CashDetails details={PaymentMethod[method]} onChange={(Fields=>{update("Cash",Fields)})}/>)
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
          <button className='rounded-md p-1 bg-su-green text-white' onClick={()=>{postURL('/api/updatepaymentmethod',true,{code:code,info:UpdatedDetails}).then(result=>{
            if(result.success){
              toast.success("Saved Payment Information")
            }
          })}}>Save</button>
        </div>
        {/* <img src="https://payme.hsbc/kevintaoch" alt="" />
        <a href="https://payme.hsbc/kevintaoch"> HI</a> */}
    </div>
    )
    
    
  )
}

export default PaymentOption