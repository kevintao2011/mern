import React, { useEffect, useState } from 'react'
import { useAuth } from '../../components/Contexts/session'
import { useNavigate } from 'react-router-dom'
import { useStaticInfo } from '../../components/Contexts/InfoContexts'

const Cart = () => {
  const {currentUser,userDBInfo,loading,setuserDBInfo,Cart,setCart} = useAuth()
  const {SocMap} = useStaticInfo()
  // Cart is ungrouped 
  // productsByBrand is dictionary
  // modification done in this page is modifying productByBrand  
  const [productsByBrand, setproductsByBrand] = useState([])
  const [Brands, setBrands] = useState([])
  const navigate = useNavigate()
  const [Chaning, setChaning] = useState()
  const [Error, setError] = useState()
  const SocCart = () => {
    return (
      <div>Cart</div>
    )
  }
  
  /**
   * 
   * @param {Array} arrOfProducts 
   */
  function mapCart(arrOfProducts){
    arrOfProducts.forEach(product=>{

    })
  }

  function reverseMapCart(){
    
  }
  /**
   * 
   * @param {*} arrOfProducts Array of Products in state Cart
   */
  function getBrands(arrOfProducts){
    console.log("arr",arrOfProducts)
    let brands = [] 
    arrOfProducts.forEach(product=>{
      console.log(product)
      if(!brands.includes(product.prod_id.code)){
        console.log("push")
        brands.push(product.prod_id.code)
      }
    })
    // brands = brands.map(brand=>{
    //   console.log(brand)
    //   return SocMap[brand].society_chinese||SocMap[brand].society_eng
    // })
    console.log(brands)
    setBrands(brands)
  }


  
  function sortProductByGroups (arrOfProducts,arrOfBrands){
    let temparr = arrOfProducts
    let Groups={}
    arrOfBrands.forEach(brand=>{
      Groups[brand]=[]
      temparr.forEach((product,i)=>{
        if(product.prod_id.code === brand){
          Groups[brand].push()
        }
      })
    })
  }

  useEffect(() => {
    
    getBrands(Cart)
    return () => {
      
    }
  }, [])
  useEffect(() => {
    sortProductByGroups(Cart,Brands)
  }, [Brands])
  
  
  useEffect(() => {
    console.log("trigggered")
  
    return () => {
      setChaning(false)
    }
  }, [Chaning])
  
  

  return (
    
    
    <div className="w-full flex flex-col md:p-20 p-5">
      
      <div className="">
        <p
          className='selectlink text-2xl'
        >購物車 Cart</p>
      </div>
      
      <div className="">
        {
          Brands?.map((b)=>{
            return(
              <div className="flex flex-col w-full bg-su-green rounded-3xl p-5 my-10">
                <div className="w-full flex flex-row ">
                  <p className='selectlink text-white w-8/12'>{SocMap[b].society_chinese||SocMap[b].society_eng}</p>
                  {/* <p className='selectlink text-white'>Payment Method</p> */}
                </div>
              <div className="flex md:flex-row flex-col w-full ">
                  <div className="items md:w-8/12 w-ful">
                    {
                      productsByBrand[b]?.map((product,i)=>{
                        return(
                          <div className="flex md:flex-row flex-col justify-between">
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
                              <p className='selectlink text-white px-10'>{`$ ${parseInt(product.quantity)*parseInt(product.price)}`}</p>
                            </div>
                            
                            
                          </div>
                        )
                      })
                    }
                  </div>
                  
                  <div className="payment method spaceline md:w-4/12 md:border-l-2 md:border-t-0 border-l-white w-full border-t-2 flex flex-col justify-between ">
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
                        //   var isSocMember = false
                        //   var isSUmember = false

                        //   if(productsByBrand["EXCO"]){
                        //     if(productsByBrand["EXCO"].filter(o=>o.type==='membership').length>0){ //Cart hv SU member 
                        //       isSUmember = true
                        //     }
                        //     userDBInfo.societies.forEach(o=>{ // confirmed membership list  have SU member
                        //       console.log("Check:",Object.keys(o),"==","SU")
                        //       if(Object.keys(o).includes("SU")){
                        //         isSocMember=true
                        //       }
                        //     })
                        // if(userDBInfo.societies.filter(s=>s[Object.keys(s)[0]]==="pending")!==[]){ //bought order hv member                         
                        //       isSocMember=true
                        //     }
                        //   }
                        //   console.log(productsByBrand[b].filter(o=>(o.type==='membership')&&o.code===b))
                        //   if ((productsByBrand[b].filter(o=>(o.type==='membership')&&o.code===b)).length>0){ //have membership in cart
                        //     isSocMember=true
                        //   }
                        //   userDBInfo.societies.forEach(o=>{
                        //     console.log("Check:",Object.keys(o),"==",[b])
                        //     if(Object.keys(o).includes(b)){
                        //       isSocMember=true
                        //     }
                        //   })
                        //   if((userDBInfo.order.filter(o=>o.type==='membership')).length>0){ //order hv member                         
                        //     isSocMember=true
                        //   }

                        //   console.log("isSUmember",isSUmember)
                        //   console.log("isSocMember",isSocMember)
                          

                        //   if (isSocMember && isSUmember){
                            navigate("../checkout",{state:{code:b,products:productsByBrand[b],payment:"Cash"}})
                        //   }else{
                        //     setError(`No Membership item in cart or You are not member of SU or society!`)
                        //   }
                        }}
                      >
                       cash 
                      </button>
                    </div>

                    
                  </div>
                  
              </div>
                
              </div>
            )
          })   
        }

      </div>
      {
        Error&&(
          <p className='text-red-600'>{Error}</p>
        )
      }
      <div className="">
        <div className="">
          <p
            className='selectlink text-2xl'
          >注意事項</p>
        </div>
        <div className="p-5 bg-slate-100 rounded-2xl">
          <ol>
            <li className='selectlink '>
              <p>1. 此購物系統將以學會為付款單位。</p>
              <p>2. 參加任何活動或購買任何物品前必須成為學生會之會員以及該學會之成員,因此請先購買會籍或連同會籍付款,否則將不能進行結算。如未購買學生會會籍,請先購買學生會會籍。</p>
              <p>3. 如果會員被取消物品之購買資格，例如瞞稱為該學系的學生以購買該學系之迎新營,那麼該會員在該學會所購買的之任何訂單將會被取消。</p>
              <p>4. 如選擇網上付款，請在結算時將交易截圖上載到系統。</p>
            
            </li>
          </ol>
        </div>
      </div>
    </div>
  )
}

export default Cart


// import React, { useEffect, useState } from 'react'
// import { useAuth } from '../../components/Contexts/session'
// import { useNavigate } from 'react-router-dom'

// const Cart = () => {
//   const {currentUser,userDBInfo,loading,setuserDBInfo,Cart,setCart} = useAuth()
//   // Cart is ungrouped 
//   // productsByBrand is dictionary
//   // modification done in this page is modifying productByBrand  
//   const [productsByBrand, setproductsByBrand] = useState([])
//   const [Brands, setBrands] = useState([])
//   const navigate = useNavigate()
//   const [Chaning, setChaning] = useState()
//   const [Error, setError] = useState()
//   const SocCart = () => {
//     return (
//       <div>Cart</div>
//     )
//   }
//   useEffect(() => {
//     // const a = []
//     // a.sort()
//     // const obj = [JSON.parse(sessionStorage.getItem("Cart"))][currentUser.email]
//     const obj = JSON.parse(sessionStorage.getItem("Cart"))
//     console.log("obj",obj,obj[currentUser.email],currentUser.email)
//     setCart(obj[currentUser.email])
//     var tempProducts={}
//     obj[currentUser.email].forEach(p=>{
//       if(Object.keys(tempProducts).includes(p.code)){
//         tempProducts[p.code].push(p)
//       }else{
//         console.log("added new")
//         tempProducts[p.code]=[p]
//       }
//     })
//     console.log("tempProducts",tempProducts)
//     setBrands(Object.keys(tempProducts))
//     setproductsByBrand(tempProducts)

//     console.log("Cart",Cart)
    
//     return () => {
      
//     }
//   }, [])

//   useEffect(() => {
//     console.log("trigggered")
  
//     return () => {
//       setChaning(false)
//     }
//   }, [Chaning])
  
  

//   return (
    
    
//     <div className="w-full flex flex-col md:p-20 p-5">
      
//       <div className="">
//         <p
//           className='selectlink text-4xl'
//         >Cart</p>
//       </div>
      
//       <div className="">
//         {
//           Brands?.map((b)=>{
//             return(
//               <div className="flex flex-col w-full bg-su-green rounded-3xl p-5 my-10">
//                 <div className="w-full flex flex-row ">
//                   <p className='selectlink text-white w-8/12'>{b}</p>
//                   {/* <p className='selectlink text-white'>Payment Method</p> */}
//                 </div>
//               <div className="flex md:flex-row flex-col w-full ">
//                   <div className="items md:w-8/12 w-ful">
//                     {
//                       productsByBrand[b]?.map((product,i)=>{
//                         return(
//                           <div className="flex md:flex-row flex-col justify-between">
//                             <p className='selectlink text-white'>{product.product_name} {product.option}</p>
//                             <div className="flex flex-row">
//                               <button
//                                 onClick={()=>{
//                                   setChaning(true)
//                                   const tempPs = productsByBrand
//                                   console.log("tempS [b][i]",tempPs[b][i])
//                                   const x = Cart.findIndex(p=>
//                                     p.option === tempPs[b][i].option
//                                   )
//                                   var temp = Cart

//                                   if(tempPs[b][i].quantity<2){
//                                     tempPs[b].splice(i,1)
//                                     temp.splice(x,1)
//                                     console.log(tempPs[b].length)
//                                     if(tempPs[b].length===0){
//                                       delete tempPs[b]
//                                     }
//                                   }else{
//                                     tempPs[b][i].quantity--
//                                     console.log("tempS",tempPs)
//                                     temp[x].option = tempPs[b][i].option
//                                   }
//                                   setproductsByBrand(tempPs)
//                                   setCart(temp)
//                                   sessionStorage.setItem("Cart",JSON.stringify({[currentUser.email]:temp}))
                                  
//                                 }}
//                               >
//                                 <p className='selectlink text-white '>{"<"}</p>
//                               </button>
                              
//                               <p className='selectlink text-white px-10'>{product.quantity}</p>
                              
//                               <button
//                                 onClick={()=>{
//                                   setChaning(true)
//                                   const tempPs = productsByBrand
//                                   const x = Cart.findIndex(p=>
//                                     p.option === tempPs[b][i].option
//                                   )

//                                   tempPs[b][i].quantity++
//                                   console.log("tempS",tempPs)
//                                   setproductsByBrand(tempPs)
                                  
//                                   const temp = Cart
//                                   temp[x].option = tempPs[b][i].option
//                                   setCart(temp)

//                                   // put into array
//                                   sessionStorage.setItem("Cart",JSON.stringify({[currentUser.email]:temp}))
                                  
//                                 }}

                                
//                               >
//                                 <p className='selectlink text-white '>{">"}</p>
//                               </button>
//                               <p className='selectlink text-white px-10'>{`$ ${parseInt(product.quantity)*parseInt(product.price)}`}</p>
//                             </div>
                            
                            
//                           </div>
//                         )
//                       })
//                     }
//                   </div>
                  
//                   <div className="payment method spaceline md:w-4/12 md:border-l-2 md:border-t-0 border-l-white w-full border-t-2 flex flex-col justify-between ">
//                     <p className=' selectlink text-white px-5 text-lg'> Please choose a payment method to check out</p>
//                     <p className=' selectlink text-white px-5 text-lg'>請按下以下一種付款方式以付款</p>
//                     <div className="">
//                       {
//                         true&&(
//                           <div className="">
//                             <button className='selectlink text-white px-5 ' 
//                               onClick={()=>{navigate("../checkout",{state:{code:b,products:productsByBrand[b],payment:"Payme"}})}}
                            
//                             > 
//                               Payme 
//                             </button>
                            
//                           </div>
//                         )
//                       }
//                       <button 
//                         className='selectlink text-white px-5'
//                         onClick={()=>{
//                         //   var isSocMember = false
//                         //   var isSUmember = false

//                         //   if(productsByBrand["EXCO"]){
//                         //     if(productsByBrand["EXCO"].filter(o=>o.type==='membership').length>0){ //Cart hv SU member 
//                         //       isSUmember = true
//                         //     }
//                         //     userDBInfo.societies.forEach(o=>{ // confirmed membership list  have SU member
//                         //       console.log("Check:",Object.keys(o),"==","SU")
//                         //       if(Object.keys(o).includes("SU")){
//                         //         isSocMember=true
//                         //       }
//                         //     })
//                         // if(userDBInfo.societies.filter(s=>s[Object.keys(s)[0]]==="pending")!==[]){ //bought order hv member                         
//                         //       isSocMember=true
//                         //     }
//                         //   }
//                         //   console.log(productsByBrand[b].filter(o=>(o.type==='membership')&&o.code===b))
//                         //   if ((productsByBrand[b].filter(o=>(o.type==='membership')&&o.code===b)).length>0){ //have membership in cart
//                         //     isSocMember=true
//                         //   }
//                         //   userDBInfo.societies.forEach(o=>{
//                         //     console.log("Check:",Object.keys(o),"==",[b])
//                         //     if(Object.keys(o).includes(b)){
//                         //       isSocMember=true
//                         //     }
//                         //   })
//                         //   if((userDBInfo.order.filter(o=>o.type==='membership')).length>0){ //order hv member                         
//                         //     isSocMember=true
//                         //   }

//                         //   console.log("isSUmember",isSUmember)
//                         //   console.log("isSocMember",isSocMember)
                          

//                         //   if (isSocMember && isSUmember){
//                             navigate("../checkout",{state:{code:b,products:productsByBrand[b],payment:"Cash"}})
//                         //   }else{
//                         //     setError(`No Membership item in cart or You are not member of SU or society!`)
//                         //   }
//                         }}
//                       >
//                        cash 
//                       </button>
//                     </div>

                    
//                   </div>
                  
//               </div>
                
//               </div>
//             )
//           })   
//         }

//       </div>
//       {
//         Error&&(
//           <p className='text-red-600'>{Error}</p>
//         )
//       }
//       <div className="">
//         <div className="">
//           <p
//             className='selectlink text-4xl'
//           >注意事項</p>
//         </div>
//         <div className="p-5 bg-slate-100 rounded-2xl">
//           <ol>
//             <li className='selectlink '>
//               <p>1. 此購物系統將以學會為付款單位。</p>
//               <p>2. 參加任何活動或購買任何物品前必須成為學生會之會員以及該學會之成員,因此請先購買會籍或連同會籍付款,否則將不能進行結算。如未購買學生會會籍,請先購買學生會會籍。</p>
//               <p>3. 如果會員被取消物品之購買資格，例如瞞稱為該學系的學生以購買該學系之迎新營,那麼該會員在該學會所購買的之任何訂單將會被取消。</p>
//               <p>4. 如選擇網上付款，請在結算時將交易截圖上載到系統。</p>
            
//             </li>
//           </ol>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default Cart