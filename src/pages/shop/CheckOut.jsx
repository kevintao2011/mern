import React, { useEffect, useState } from 'react'
import { useLocation,useNavigate } from 'react-router-dom'
import { useAuth } from '../../components/Contexts/session'
import { uploadFile } from '../../utils/firebasefunction';
import { storage } from '../../utils/firebasefunction';

const CheckOut = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [Product, setProduct] = useState()
  const [Payment, setPayment] = useState()
  const [Code, setCode] = useState()
  const [TotalPrice, setTotalPrice] = useState()
  const {userDBInfo,Soc,currentUser,Cart,setCart} = useAuth()
  const [File, setFile] = useState()
  const [Error, setError] = useState()
  const [CheckingOut, setCheckingOut] = useState(false)
  

  async function handleSubmit(){
 
    setCheckingOut(true)
    if(!File && Payment==="Payme"){
      setError("You havn't upload the payment proof!")
      setCheckingOut(false)
    }else{
      console.log(File)
      setError(false)
      
      const idList = Product.map(p=>{
        return p._id
      })
      const reqbody = {
        user:{
          token:await currentUser.getIdToken()
        },
        data:{
          payment_proof:"",
          payment_method:Payment,
          productIds:idList,
          products:Product,
          sid:userDBInfo.sid,
          email:userDBInfo.email,
          chi_name:userDBInfo.chi_name,
          eng_name:userDBInfo.eng_name,
          contact:userDBInfo.contact,
          code:Code,
        }
      }
      await fetch(
        "/api/placeorder",
        {
          method: "POST",
          body: JSON.stringify(reqbody),
          headers: {
          "Content-Type": "application/json",
          // 'Content-Type': 'application/x-www-form-urlencoded',
          },
          mode:'cors'
          
      }).then(async response => {
          
          if (response.ok){
              // registered   
              console.log("placed")
              const data = await response.json()
              if(Payment === "Payme"){
                const url = await uploadFile(`Transactions/`,`payment_proof_${data._id}`,File,storage)
                await fetch(
                  "/api/uploadpaymentproof",
                  {
                    method: "POST",
                    body: JSON.stringify({
                      user:{
                        token:await currentUser.getIdToken()
                      },
                      data:{
                        _id:data._id,
                        url:url
                      }
                    }),
                    headers: {
                    "Content-Type": "application/json",
                    // 'Content-Type': 'application/x-www-form-urlencoded',
                    },
                    mode:'cors'
                    
                })
              }
              
              var a = Cart
              a=a.filter(i=>
                i.code!==Code
              )
              console.log(a)
              setCart(a)
              sessionStorage.setItem("Cart",JSON.stringify({[currentUser.email]:a}))
              setCheckingOut(false)
              navigate("/profile")
              
              
          }else{
              console.log("response.body",await response.json())
              
          }  
      })
      
        
    }
   
    
  }

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
    <div className="md:p-10 p-5">
      {
        Product&&Code&&Payment&&(
          <div className=" flex flex-col  w-full items-center">
            <div className="max-w-screen-lg w-full md:py-10">
              <p className='selectlink'>CheckOut 結算</p>
            </div>
            <div className="billbg  rounded-lg md:p-10 p-2 max-w-screen-lg  w-full  my-10">
              <p className='w-full flex flex-row justify-center p-5 font-bold underline'>Order Details 訂單資料</p>
              <div className="">
                <div className="w-full flex flex-row justify-start py-5">
                  <p className='font-bold'>Purchase Item 購買物品</p>
                </div>
                <div className="md:p-5 p-2">
                  <div className="w-full flex flex-row justify-start">
                    <p className=''>{Soc[Code]['exco_name_chinese']}{Soc[Code]['exco_name_eng']}</p>
                  </div>
                  {
                    Product?.map((p,i)=>{
                      return(
                        <div className="flex flex-col p-3">
                          <div className="flex flex-row justify-between">
                            <p>{i+1}.{p.product_name}</p>
                            
                          </div>
                          <div className="flex flex-row justify-between">
                            <div className="flex flex-row">
                              <p className='p-1  '>{p.option}</p>
                              <p className='p-1'>x{p.quantity}</p>
                              <p className='p-1'>${p.price}/pcs</p>
                            </div>
                            
                            
                            <p className='p-1'>${p.price*p.quantity}</p>
                          </div>
                        
                          
                        </div>
                        
                        
                      )
                    })
                  }
                </div>
                
                <div className="w-full border-gray-500 border-b-2"></div>
                <div className="w-full flex flex-row justify-end">
                  <p className='p-3'> ${TotalPrice} HKD</p>
                </div>
                </div>
                
                <div className="py-5">
                  <p className='w-full flex flex-row justify-start font-bold '>Detail Information 詳細資料</p>
                </div>
                <div className="w-full grid grid-cols-1 md:grid-cols-2 row-auto  ">
                  <div className="flex flex-col">
                    <p className='underline'> Payment Method </p>
                    <div className="flex flex-row">
                      <p> {Payment}</p>
                      <a href="https://payme.hsbc/kevintaoch" target='_blank' rel="noreferrer" className=''>
                        {
                          Payment==="Payme"&&(
                            <p className='px-3'>(payme link)</p>
                          )
                        }
                        
                      </a>
                    </div>
                    
                  </div>
                  
                    
                    
                    {
                      Payment==="Payme"&&(
                        <div className="flex flex-col">
                          <div className="flex flex-row">
                            <p className='underline'> Payment Proof</p>
                            
                          </div>
                          <input type="file" accept=".jpg, .jpeg, .png" name="image" id="image-upload" onChange={(e)=>{
                            if((e.target.files[0].size)/1024 < 2048){
                              setFile(e.target.files[0])
                              setError(false)
                            }else{
                              
                              setError("File Size is too large! (>2mb)")
                            }
                            
                          }}/>
                        </div>
                      )
                    }
                    
              
                  
                  <div className="flex flex-col">
                    <p className='underline'> SID </p>
                    <p>{userDBInfo.sid}</p>
                  </div>
                  <div className="flex flex-col">
                    <p className='underline'> Contact </p>
                    <p>{userDBInfo.contact}</p>
                  </div>
                  
                  
                  
                </div>
                <div className="p-10"></div>
                <div className="">
                  <p>*確認以上無誤後即可提交訂單</p>
                  <p>*You may submit the order after details are confirmed</p>
                  
                  <div className="flex flex-row">
                    
                    <button 
                      className='py-2'
                      onClick={(e)=>{handleSubmit(e)}}
                      disabled={(CheckingOut||Error)}
                    >
                      <p className='p-1 bg-slate-50 rounded-lg'>Submit</p>
                    </button>
                    {
                      Error&&(
                        <p className=' text-red-500'>{Error}</p>
                      )
                    }
                  </div>
                  
                </div>
              
            </div>

          </div>
        )
      }
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