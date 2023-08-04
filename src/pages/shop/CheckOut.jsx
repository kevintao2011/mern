import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
const CheckOut = () => {
  const location = useLocation();
  const [Product, setProduct] = useState()
  const [Payment, setPayment] = useState()
  const [Code, setCode] = useState()
  const [TotalPrice, setTotalPrice] = useState()
  useEffect(() => {
    setProduct(location.state.products)
    console.log(location.state.products)
    setPayment(location.state.payment)
    console.log(location.state.payment)
    setCode(location.state.code)
    console.log(location.state.code)

    
    return () => {
      
    }
  }, [])

  useEffect(() => {
    var tmpPrice = 0
    Product?.forEach(p=>{
      tmpPrice+=parseInt(p.price*p.quantity)      
    })
    setTotalPrice(tmpPrice)
  
    return () => {
      
    }
  }, [Product])
  
  
  return (
    <div className="p-20 flex lg:flex-row md: flex-col">
  
      <div className="bg-slate-100 rounded-2xl p-10 lg:w-1/2  md:w-full  ">
        <div className="w-full flex flex-row justify-center p-5">
          Summary
        </div>
        <div className="w-full flex flex-row justify-start">
          <p>{Code}</p>
        </div>
        {
          Product?.map(p=>{
            return(
              <div className="flex flex-col p-3">
                <div className="flex flex-row justify-between">
                  <p>{p.product_name}</p>
                  
                </div>
                <div className="flex flex-row justify-between">
                  <div className="flex flex-row">
                    <p className='p-1 bg-slate-200 rounded-xl '>{p.option}</p>
                    <p className='p-1'>x{p.quantity}</p>
                    <p className='p-1'>${p.price}/pcs</p>
                  </div>
                  
                  
                  <p >${p.price*p.quantity}</p>
                </div>
                
              </div>
              
              
            )
          })
        }
        <div className="w-full border-gray-500 border-b-2"></div>
        <div className="w-full flex flex-row justify-end">
          <p className='p-3'> ${TotalPrice} HKD</p>
        </div>
        
        
      </div>
      <div className="bg-slate-100 rounded-2xl p-10 lg:w-1/2 lg:mx-10 md:w-full md:my-10">
        {Payment}
        {
          Payment==="Payme"&&(
            <div className="">
              <a href="https://payme.hsbc/kevintaoch" target='_blank' rel="noreferrer" className=''>Click me to get payme link</a>
              <input type="file" />
            </div>
            
          )
        }
      </div>
      
      
    </div>
    

    // <a href="https://payme.hsbc/kevintaoch" target='_blank' className='px-5'>paymelink</a>


    // <form action="" className='selectlink text-white px-5 w-full '>
    //   <input type="file" required="required" />
    //   <button className='selectlink text-white '>
    //     confirm
    //   </button>
    // </form>
  )
}

export default CheckOut