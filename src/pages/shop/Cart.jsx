import React, { useEffect, useState } from 'react'
import { useAuth } from '../../components/session'
import { useNavigate } from 'react-router-dom'

const Cart = () => {
  const {currentUser,userDBInfo,loading,setuserDBInfo,Cart,setCart} = useAuth()
  // Cart is ungrouped 
  // productsByBrand is dictionary
  // modification done in this page is modifying productByBrand  
  const [productsByBrand, setproductsByBrand] = useState([])
  const [Brands, setBrands] = useState([])
  const navigate = useNavigate()
  const [Chaning, setChaning] = useState()
  const SocCart = () => {
    return (
      <div>Cart</div>
    )
  }
  useEffect(() => {
    // const a = []
    // a.sort()
    // const obj = [JSON.parse(sessionStorage.getItem("Cart"))][currentUser.email]
    const obj = JSON.parse(sessionStorage.getItem("Cart"))
    console.log("obj",obj,obj[currentUser.email],currentUser.email)
    setCart(obj[currentUser.email])
    var tempProducts={}
    obj[currentUser.email].forEach(p=>{
      if(Object.keys(tempProducts).includes(p.code)){
        tempProducts[p.code].push(p)
      }else{
        console.log("added new")
        tempProducts[p.code]=[p]
      }
    })
    console.log("tempProducts",tempProducts)
    setBrands(Object.keys(tempProducts))
    setproductsByBrand(tempProducts)

    
    
    return () => {
      
    }
  }, [])

  useEffect(() => {
    console.log("trigggered")
  
    return () => {
      setChaning(false)
    }
  }, [Chaning])
  
  

  return (
    
    
    <div className="w-full flex flex-col p-20">
      
      <div className="">
        <p
          className='selectlink text-4xl'
        >Cart</p>
      </div>
      
      <div className="">
        {
          Brands?.map((b)=>{
            return(
              <div className="flex flex-col w-full bg-su-green rounded-3xl p-5 my-10">
                <div className="w-full flex flex-row ">
                  <p className='selectlink text-white w-8/12'>{b}</p>
                  <p className='selectlink text-white'>Payment Method</p>
                </div>
                <div className="flex flex-row w-full">
                  <div className="items w-8/12">
                    {
                      productsByBrand[b]?.map((product,i)=>{
                        return(
                          <div className="flex flex-row justify-between">
                            <p className='selectlink text-white'>{product.product_name} {product.option}</p>
                            <div className="flex flex-row">
                              <button
                                onClick={()=>{
                                  setChaning(true)
                                  const tempPs = productsByBrand
                                  console.log("tempS [b][i]",tempPs[b][i])
                                  const x = Cart.findIndex(p=>
                                    p.option === tempPs[b][i].option
                                  )
                                  var temp = Cart

                                  if(tempPs[b][i].quantity<2){
                                    tempPs[b].splice(i,1)
                                    temp.splice(x,1)
                                    console.log(tempPs[b].length)
                                    if(tempPs[b].length===0){
                                      delete tempPs[b]
                                    }
                                  }else{
                                    tempPs[b][i].quantity--
                                    console.log("tempS",tempPs)
                                    temp[x].option = tempPs[b][i].option
                                  }
                                  setproductsByBrand(tempPs)
                                  setCart(temp)
                                  sessionStorage.setItem("Cart",JSON.stringify({[currentUser.email]:temp}))
                                  
                                }}
                              >
                                <p className='selectlink text-white '>{"<"}</p>
                              </button>
                              
                              <p className='selectlink text-white px-10'>{product.quantity}</p>
                              
                              <button
                                onClick={()=>{
                                  setChaning(true)
                                  const tempPs = productsByBrand
                                  const x = Cart.findIndex(p=>
                                    p.option === tempPs[b][i].option
                                  )

                                  tempPs[b][i].quantity++
                                  console.log("tempS",tempPs)
                                  setproductsByBrand(tempPs)
                                  
                                  const temp = Cart
                                  temp[x].option = tempPs[b][i].option
                                  setCart(temp)

                                  // put into array
                                  sessionStorage.setItem("Cart",JSON.stringify({[currentUser.email]:temp}))
                                  
                                }}
                              >
                                <p className='selectlink text-white '>{">"}</p>
                              </button>
                              
                            </div>
                            <p className='selectlink text-white px-10'>{`$ ${parseInt(product.quantity)*parseInt(product.price)}`}</p>
                            
                          </div>
                        )
                      })
                    }
                  </div>
                  
                  <div className="payment method spaceline w-4/12 border-l-2 border-l-white flex flex-col justify-between ">
                    <p className=' selectlink text-white px-5 text-lg'> Please choose a payment method to check out</p>
                    <p className=' selectlink text-white px-5 text-lg'>請按下以下一種付款方式以付款</p>
                    <div className="">
                      {
                        true&&(
                          <div className="">
                            <button className='selectlink text-white px-5 ' 
                              onClick={()=>{navigate("../checkout",{state:{code:b,products:productsByBrand[b],payment:"Payme"}})}}
                            
                            > 
                              Payme 
                            </button>
                            
                          </div>
                        )
                      }
                      <button 
                        className='selectlink text-white px-5'
                        onClick={()=>{
                          if (!(userDBInfo.includes(b)||productsByBrand[b].filter(o=>o.type==='membership'))){
                            // need to be member first 
                          }
                          navigate("../checkout",{state:{code:b,products:productsByBrand[b],payment:"Cash"}}
                          )
                        }}
                      
                      > cash </button>
                    </div>

                    
                  </div>
                  
                </div>
                
              </div>
            )
          })   
        }
      
      </div>
      {/* <div className="">
        <div className="">
          <p
            className='selectlink text-4xl'
          >Reminder</p>
        </div>
        <div className="p-5 bg-slate-100 rounded-2xl">
          <ol>
            <li className='selectlink '>
              This
            </li>
          </ol>
        </div>
      </div> */}
    </div>
  )
}

export default Cart