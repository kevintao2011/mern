import React, { useEffect, useMemo, useState } from 'react'
import { postURL } from '../../utils/fetch'
import { Checkbox, CheckboxGroup } from 'rsuite';
import FPSDetails from './FPSDetails';

function PaymentOption({code,onUpdate}) {
  const data = ['Payme', 'FPS', 'Cash'];
  const [PaymentMethod, setPaymentMethod] = useState()
  const [SelectedPayments, setSelectedPayments] = useState([])
  async function getPaymentMethod(){
      await postURL('/api/getpaymentmethod',true,{code:code}).then(result=>{
          if(result.success){
              console.log(result.data)
              setPaymentMethod(result.data)
          }
      })
  }
  useEffect(() => {
    getPaymentMethod()

  }, [])
  
  return (
    
    PaymentMethod&&(
      <div className="flex flex-col">
        <div className="flex flex-row border border-black items-center">
            <div className="">付款資訊 Payment Method</div>
            <Checkbox
                indeterminate={SelectedPayments.length > 0 && SelectedPayments.length < data.length}
                checked={SelectedPayments.length === data.length}
                onChange={(value, checked) => setSelectedPayments(checked ? data : [])}
            >
                Check all
            </Checkbox>
        </div>
        <div className='flex '>
            <CheckboxGroup inline name="checkboxList" value={SelectedPayments} onChange={values => setSelectedPayments(values)}>
                {data.map(item => (
                <Checkbox key={item} value={item}>
                    {item}
                </Checkbox>
                ))}
            </CheckboxGroup>
        </div>
        <div className="">
          {
            data.map(method=>{
              if(PaymentMethod[method]){
                if(PaymentMethod[method].activated){
                  return(
                    method==="FPS"&&(
                      <FPSDetails details={PaymentMethod[method]}/>
                    )
                  )
                }else{
                  return(<></>)
                }
              }else{
                return(<></>)
              }
              
            })
          }
        </div>
        <div className="">
          <button className='rounded-md p-1 bg-green-600 text-white'>Save</button>
        </div>
    </div>
    )
    
    
  )
}

export default PaymentOption