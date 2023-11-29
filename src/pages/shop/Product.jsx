import React, { useEffect,useState } from 'react'
import { useParams } from 'react-router-dom'
import { useAuth } from '../../components/session'
import { postURL } from '../../utils/fetch'
import { toast } from 'sonner'
import { useStaticInfo } from '../../components/Contexts/InfoContexts'

const Product = () => {
    const{sku}= useParams()
    const{currentUser,Soc,Cart,setCart}= useAuth()
    const [ProductInfo, setProductInfo] = useState() // product info
    const [SubProducts, setSubProducts] = useState() //array of vars
    const [SelectedOption, setSelectedOption] = useState(0) //chosen index inside SubProducts List not product index
    const [NumberOfVariant, setNumberOfVariant] = useState() //NumberOfVariant
    const [BuyMessage, setBuyMessage] = useState()
    const [Quantity, setQuantity] = useState(0)
    const [CurrentImageURL, setCurrentImageURL] = useState()
    const {SocMap} = useStaticInfo()

    async function addToCart (product){
        // {
        //     _id:ProductInfo._id,
        //     option:SubProducts[SelectedOption].name,
        //     quantity:Quantity
        // }
        var TempCart
        
        console.log(Cart)
        var duplicate = false
        if(product.quantity===0){
            product.quantity=1
        }
        Cart.forEach((i,index) => {
            if (i._id === product._id && (i.option === product.option)){
                Cart[index]["quantity"]=parseInt(i.quantity)+parseInt(product.quantity)
                duplicate = true
                setCart(Cart)
                TempCart = Cart
                
                return
            }
            
        });

        
        if (!duplicate){
            
            setCart([...Cart,product])
            TempCart = [...Cart,product]
            
        }
        console.log(Cart)
        
        sessionStorage.setItem("Cart",JSON.stringify({[currentUser.email]:TempCart}))
        console.log("session",JSON.parse(sessionStorage.getItem("Cart")))
        
    }
    useEffect(() => {
        async function fetchProductInfo (){
            
            await postURL ("/api/getproduct",true,{sku:sku}).then(result=>{
                if(result.success){
                    console.log("fetched product")
                    // const product = result.data
                    // console.log("product Info",product)
                    
                    setProductInfo (result.data)
                    setCurrentImageURL(result.data.product_img_url[0])
                    // const a = product.product_list
                    // console.log("a")
                    // setNumberOfVariant(a.length)
                    // setSubProducts(product.product_list)
                }else{
                    toast.error(result.data)
                }
            })
                
            
        }
        fetchProductInfo()
        
    }, [])
    
    return (
        <div className="w-full flex flex-col p-5 font-mincho">
            {
                ProductInfo&&(
                    <div className="flex flex-row w-full gap-5 bg-apple-gray p-5 rounded-md">
                        <div className="w-1/2 gallary flex flex-col gap-5 ">
                            <div className="flex flex-row justify-center">
                                <img 
                                    src={CurrentImageURL||"/assests/img/imgplaceholder.jpg"} 
                                    alt="" 
                                    className='rounded-md max-w-md'
                                />
                            </div>
                            <div className="flex flex-row justify-between">
                                <div className=""></div>
                                <div className="flex flex-row gap-2">
                                {ProductInfo.product_img_url.map(url=>{
                                    return(
                                        <img 
                                            src={url||"/assests/img/imgplaceholder.jpg"} 
                                            alt="" 
                                            className='rounded-md'
                                            width={100}
                                        />
                                    )
                                })}
                                </div>
                                <div className=""></div>
                            </div>
                        </div>
                        <div className="w-1/2 product-description  p-2 rounded-md">
                            <div className=" flex flex-col gap-2">
                                {/* <div className="">
                                    {SocMap[ProductInfo]}
                                </div> */}
                                
                                <div className="text-lg font-bold ">
                                    {`${ProductInfo.sku} ${ProductInfo.product_name_chi}`}
                                </div>
                                <div className="">
                                    <div className="text-lg font-bold">產品介紹</div>
                                    <pre className="pl-2">{ProductInfo.product_description_chi}</pre>
                                </div>
                                <div className="text-lg font-bold">
                                    Options 選項
                                </div>
                                <div className="grid grid-cols-2 gap-2">
                                    {ProductInfo.options.map(opt=>{
                                        return(
                                            <div className="">
                                                <div className="font-bold">{opt.text}</div>
                                                <div className="flex flex-row gap-2">
                                                    {
                                                        opt.option.map(op=>{
                                                            console.log("op",op)
                                                            return (
                                                                <button className=' bg-gray-200 p-1 rounded-md w-fit '>
                                                                    {op}
                                                                </button>
                                                            )
                                                        })
                                                    }
                                                </div>
                                                
                                            </div>
                                            
                                        )
                                        
                                        // return(
                                            
                                        // )
                                    })}
                                </div>
                                <div className="">
                                    <div className="text-lg font-bold">產品 Product</div>
                                    <div className="grid grid-cols-3 gap-2">
                                    {
                                        ProductInfo.product_list.map((subproduct,i)=>{
                                            return(
                                                // <div className="">{subproduct.name}</div>
                                                <button className='bg-web-green p-1 rounded-md text-white'>{subproduct.name}</button>
                                            )
                                        })
                                    }
                                    </div>
                                    
                                </div>
                            </div>
                        </div>
                    </div>
                )
            }
            <div className="text-lg font-bold">
                類似產品
            </div>
        </div>
        // <div className="w-full">
           
        //     {
        //         ProductInfo&&SubProducts&&(
                    
        //             <div className="flex md:flex-row flex-col md:justify-between items-center">
        //                 <div className="L md:w-2/4  flex flex-col h-auto md:h-full md:justify-between w-full p-5">
        //                 {
        //                     Soc[ProductInfo.code]&&(
        //                             <div className="flex flex-col h-full ">
        //                                 <p
        //                                 className='text-lg font-bold'
        //                                 >
        //                                 {Soc[ProductInfo.code]["exco_name_chinese"]}  
        //                                 </p>
        //                                 <p
        //                                     className='text-lg font-bold'
        //                                 >
        //                                     {Soc[ProductInfo.code]["exco_name_eng"]}
                                        
        //                                 </p>
        //                                 <p
        //                                     className='text-lg font-bold'
        //                                 >
        //                                     {SubProducts[SelectedOption]["name"]}
                                        
        //                                 </p>
        //                                 <p className="text-6xl font-bold">
        //                                     {`$${SubProducts[SelectedOption]["price"]}`}
        //                                 </p>
        //                             </div>
        //                     )
                            
        //                 }
        //                 </div>
                    
        //                 <div className="M md:px-10 px-5 flex flex-row md:w-4/8  ">
        //                     {/* <div className="flex flex-row items-center h-full">
                                
        //                     </div> */}

        //                     <button>
        //                             <img 
        //                                 src     ="\assests\img\shop\product\cheveronLeft.png"
        //                                 alt     = "promptation logo"
        //                                 width   = {50}
        //                                 height  = {50}
        //                                 className = "object-contain rounded-lg "
        //                                 onClick={()=>{
        //                                     setSelectedOption(prev=>{
                                                
        //                                         prev = Math.abs((prev-1)) %(SubProducts.length)
        //                                         while(SubProducts[prev]["inventory"]<1){
        //                                             prev = Math.abs((prev-1)) %(SubProducts.length)
        //                                         }
        //                                         console.log("prev",prev)  
        //                                         console.log("prev",SubProducts[prev])  
        //                                         return prev
        //                                     })
                                            
        //                                 }}
        //                             /> 
        //                         </button>
                          
        //                     <div >
        //                         {
        //                            <div className="">
        //                                 <img 
        //                                     src     ={SubProducts}
        //                                     alt     = "promptation logo"
        //                                     width   = {1000}
        //                                     height  = {1000}
        //                                     className = "object-contain rounded-xl "   
                                           
        //                                 /> 
        //                             </div>  
        //                         } 
        //                     </div>
        //                     <button>

        //                         <img 
        //                             src     ="\assests\img\shop\product\cheveronRight.png"
        //                             alt     = "Right"
        //                             width   = {50}
        //                             height  = {50}
        //                             className = "object-contain rounded-lg "
        //                             onClick={()=>{
        //                                 setSelectedOption(prev=>{
                                            
        //                                     prev = (prev+1) %(SubProducts.length)
        //                                     while(SubProducts[prev]["inventory"]<1){
        //                                         prev = (prev+1) %(SubProducts.length)
        //                                     }
        //                                     console.log("prev",prev)  
        //                                     console.log("prev",SubProducts[prev])  
        //                                     return prev
        //                                 })
                                        
        //                             }}
        //                         /> 
        //                     </button>
        //                 </div>
        //             <div className="R md:w-2/4 w-full px-5 md:p-0 flex flex-col md:justify-between md:h-full">
                            
        //                     <div className="py-10 flex-flex-col">
        //                         <div className="max-w-screen-sm">
        //                             <div className="flex flex-row justify-start max-w-screen-sm">
        //                                 <p className='flex text-3xl font-bold'>{ProductInfo.product_name}</p>
                                        
        //                             </div>
        //                         </div>
        //                         {ProductInfo.description_chi&&(
        //                             <>
        //                                 <div className="py-10 max-w-screen-sm hidden md:block">
        //                                     <textarea name="" id="" cols="80" rows="20" disabled={true} readonly={true}>
        //                                         {ProductInfo.description_chi}
        //                                     </textarea>
                                        
        //                                 </div>
                                                
        //                                 <div className="py-10 max-w-screen-sm md:hidden">
        //                                     <textarea name="" id="" cols="35" rows="20" disabled={true} readonly={true}>
        //                                         {ProductInfo.description_chi}
        //                                     </textarea>
                                        
        //                                 </div>
        //                             </>
        //                         )}

        //                         {ProductInfo.description_eng&&(
        //                             <>
        //                                 <div className="py-10 max-w-screen-sm hidden md:block">
        //                                     <textarea name="" id="" cols="80" rows="20" disabled={true} readonly={true}>
        //                                         {ProductInfo.description_eng}
        //                                     </textarea>
                                        
        //                                 </div>
                                                
        //                                 <div className="py-10 max-w-screen-sm md:hidden">
        //                                     <textarea name="" id="" cols="35" rows="20" disabled={true} readonly={true}>
        //                                         {ProductInfo.description_eng}
        //                                     </textarea>
                                        
        //                                 </div>
        //                             </>
        //                         )}

                                
                                
        //                         <div className="flex flex-row">
        //                             {
        //                                 SubProducts.map((v,i)=>{
        //                                     if(v.index === SubProducts[SelectedOption]["index"]){
        //                                         return(
        //                                             <div className="">
        //                                                 <button
        //                                                     className={`p-5 m-2 bg-yellow-600 rounded-lg border-black border-2 disabled:bg-gray-100 `}
        //                                                     onClick={(e)=>{
        //                                                         console.log("No i>")
        //                                                         console.log("i",i)
        //                                                         setSelectedOption(i)
        //                                                     }}
        //                                                     disabled={(v.inventory<1)}
                                                            
        //                                                 >
        //                                                     {v.name}
        //                                                 </button>
        //                                             </div>
        //                                         )   
        //                                     }
        //                                     return(
        //                                         <div className="">
        //                                             <button
        //                                                 className={`p-5 m-2 bg-green-500 rounded-lg disabled:bg-gray-100 `}
        //                                                 onClick={(e)=>{
        //                                                     console.log("No i>")
        //                                                     console.log("i",i)
        //                                                     setSelectedOption(i)
        //                                                 }}
        //                                                 disabled={(v.inventory<1)}
                                                        
        //                                             >
        //                                                 {v.name}
        //                                             </button>
        //                                         </div>
        //                                     )
        //                                 })
        //                             }
        //                         </div>

        //                         {/* <img 
        //                             src     ="\assests\img\shop\product\clickToSelectQuantity.png"
        //                             alt     = "promptation logo"
        //                             width   = {300}
        //                             height  = {300}
        //                             className = "object-contain  py-10 "
        //                         />  */}
        //                         <p className='selectlink text-2xl'>Please select your quantity</p>
        //                         <div className="flex flex-col">
        //                             <input type="number" name="" id="" 
        //                                 min={0}
        //                                 max={SubProducts[SelectedOption]["inventory"]}
        //                                 className='border-su-green border-2 w-1/2'
        //                                 onChange={(e)=>{setQuantity(e.target.value);console.log(e.target.value)}}
        //                             />

        //                             <button
        //                                 onClick={async ()=>{
        //                                     await addToCart({
        //                                         _id:ProductInfo._id,
        //                                         product_name:ProductInfo.product_name,
        //                                         code:ProductInfo.code,
        //                                         type:ProductInfo.type,
        //                                         option:SubProducts[SelectedOption].name,
        //                                         price:SubProducts[SelectedOption].price,
        //                                         quantity:Quantity
        //                                     })
        //                                 }}
        //                             >
        //                                 <img 
        //                                     src     ="\assests\img\shop\product\Buy.png"
        //                                     alt     = "promptation logo"
        //                                     width   = {100}
        //                                     height  = {100}
        //                                     className = "object-contain  py-10 "
        //                                 /> 
        //                             </button>
        //                         </div>
                                

        //                     </div>
                            
                            
        //                 </div>
        //             </div>
        //         )
        //     }
        // </div>
        

        
    )
}

export default Product