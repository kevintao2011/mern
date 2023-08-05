import React, { useEffect,useState } from 'react'
import { useParams } from 'react-router-dom'
import { useAuth } from '../../components/session'

const Product = () => {
    const{id}= useParams()
    const{currentUser,Soc,Cart,setCart}= useAuth()
    const [ProductInfo, setProductInfo] = useState() // product info
    const [Variants, setVariants] = useState() //array of vars
    const [SelectedOption, setSelectedOption] = useState(0) //chosen index inside Variants List not product index
    const [NumberOfVariant, setNumberOfVariant] = useState() //NumberOfVariant
    const [BuyMessage, setBuyMessage] = useState()
    const [Quantity, setQuantity] = useState(0)


    async function addToCart (product){
        // {
        //     _id:ProductInfo._id,
        //     option:Variants[SelectedOption].name,
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
            await fetch(
                "/api/getproduct",
                {
                    method:"POST",
                    body:JSON.stringify({
                        user:{
                            token:await currentUser.getIdToken()
                        },
                        id:id
                    }),
                    headers: {
                        "Content-Type": "application/json",
                        // 'Content-Type': 'application/x-www-form-urlencoded',
                        },
                        mode:'cors'
                    
                }).then(async response =>{
                    if(response.ok){
                        console.log("fetched product")
                        const data = await response.json()
                        console.log("product Info",data)
                        setProductInfo (data.product)
                        const a = data.product.variants
                        console.log("a")
                        const l = a.length
                        setNumberOfVariant(a.length)
                        setVariants(data.product.variants)
                        // data.variants.map(variant=>{
                        //     return [variant]
                        // })
                    }else{
                    console.log("failed fetch user")
                    }
                }
            )
                
            
        }
        fetchProductInfo()
        
    }, [])
    
    return (
        <div className="m-20">
           
            {
                ProductInfo&&Variants&&(
                    
                    <div className="flex flex-row justify-between items-center">
                        <div className="L w-2/4  flex flex-col h-full justify-between">
                        {
                            Soc[ProductInfo.code]&&(
                                    <div className="flex flex-col h-full ">
                                        <p
                                        className='text-lg font-bold'
                                        >
                                        {Soc[ProductInfo.code]["exco_name_chinese"]}  
                                        </p>
                                        <p
                                            className='text-lg font-bold'
                                        >
                                            {Soc[ProductInfo.code]["exco_name_eng"]}
                                        
                                        </p>
                                        <p
                                            className='text-lg font-bold'
                                        >
                                            {Variants[SelectedOption]["name"]}
                                        
                                        </p>
                                        <p className="text-6xl font-bold">
                                            {`$${Variants[SelectedOption]["price"]}`}
                                        </p>
                                    </div>
                            )
                            
                        }
                        </div>
                    
                        <div className="M px-10 flex flex-row w-4/8 h-full">
                            <div className="flex flex-row items-center">
                                <button>
                                    <img 
                                        src     ="\assests\img\shop\product\cheveronLeft.png"
                                        alt     = "promptation logo"
                                        width   = {50}
                                        height  = {50}
                                        className = "object-contain rounded-full  h-full"
                                        onClick={()=>{
                                            setSelectedOption(prev=>{
                                                
                                                prev = Math.abs((prev-1)) %(Variants.length)
                                                while(Variants[prev]["inventory"]<1){
                                                    prev = Math.abs((prev-1)) %(Variants.length)
                                                }
                                                console.log("prev",prev)  
                                                console.log("prev",Variants[prev])  
                                                return prev
                                            })
                                            
                                        }}
                                    /> 
                                </button>
                            </div>
                          
                            <div >
                                {
                                   <div className="">
                                        <img 
                                            src     ={Variants[SelectedOption].icon_url}
                                            alt     = "promptation logo"
                                            width   = {1000}
                                            height  = {1000}
                                            className = "object-contain rounded-xl "   
                                           
                                        /> 
                                    </div>  
                                } 
                            </div>
                            <button>

                                <img 
                                    src     ="\assests\img\shop\product\cheveronRight.png"
                                    alt     = "Right"
                                    width   = {50}
                                    height  = {50}
                                    className = "object-contain rounded-lg "
                                    onClick={()=>{
                                        setSelectedOption(prev=>{
                                            
                                            prev = (prev+1) %(Variants.length)
                                            while(Variants[prev]["inventory"]<1){
                                                prev = (prev+1) %(Variants.length)
                                            }
                                            console.log("prev",prev)  
                                            console.log("prev",Variants[prev])  
                                            return prev
                                        })
                                        
                                    }}
                                /> 
                            </button>
                        </div>
                        <div className="R w-2/4 flex flex-col justify-between h-full">
                            
                            <div className="py-10 flex-flex-col">
                                <div className="max-w-screen-sm">
                                    <div className="flex flex-row justify-end max-w-screen-sm">
                                        <p className='flex text-3xl font-bold'>{ProductInfo.product_name}</p>
                                        
                                    </div>
                                </div>
                                <div className="py-10 max-w-screen-sm">
                                    {ProductInfo.description_chi}
                                </div>
                                <div className="py-10 max-w-screen-sm">
                                    {ProductInfo.description_eng}
                                </div>
                               
                                <div className="flex flex-row">
                                    {
                                        Variants.map((v,i)=>{
                                            if(v.index === Variants[SelectedOption]["index"]){
                                                return(
                                                    <div className="">
                                                        <button
                                                            className={`p-5 m-2 bg-yellow-600 rounded-lg border-black border-2 disabled:bg-gray-100 `}
                                                            onClick={(e)=>{
                                                                console.log("No i>")
                                                                console.log("i",i)
                                                                setSelectedOption(i)
                                                            }}
                                                            disabled={(v.inventory<1)}
                                                            
                                                        >
                                                            {v.name}
                                                        </button>
                                                    </div>
                                                )   
                                            }
                                            return(
                                                <div className="">
                                                    <button
                                                        className={`p-5 m-2 bg-green-500 rounded-lg disabled:bg-gray-100 `}
                                                        onClick={(e)=>{
                                                            console.log("No i>")
                                                            console.log("i",i)
                                                            setSelectedOption(i)
                                                        }}
                                                        disabled={(v.inventory<1)}
                                                        
                                                    >
                                                        {v.name}
                                                    </button>
                                                </div>
                                            )
                                        })
                                    }
                                </div>

                                <img 
                                    src     ="\assests\img\shop\product\clickToSelectQuantity.png"
                                    alt     = "promptation logo"
                                    width   = {300}
                                    height  = {300}
                                    className = "object-contain  py-10 "
                                /> 
                                
                                <input type="number" name="" id="" 
                                    min={0}
                                    max={Variants[SelectedOption]["inventory"]}
                                    className='border-su-green border-2'
                                    onChange={(e)=>{setQuantity(e.target.value);console.log(e.target.value)}}
                                />

                                <button
                                    onClick={async ()=>{
                                        await addToCart({
                                            _id:ProductInfo._id,
                                            product_name:ProductInfo.product_name,
                                            code:ProductInfo.code,
                                            type:ProductInfo.type,
                                            option:Variants[SelectedOption].name,
                                            price:Variants[SelectedOption].price,
                                            quantity:Quantity
                                        })
                                    }}
                                >
                                    <img 
                                        src     ="\assests\img\shop\product\Buy.png"
                                        alt     = "promptation logo"
                                        width   = {100}
                                        height  = {100}
                                        className = "object-contain  py-10 "
                                    /> 
                                </button>

                            </div>
                            
                            
                        </div>
                    </div>
                )
            }
        </div>
        

        
    )
}

export default Product