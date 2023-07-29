import React, { useEffect,useState } from 'react'
import { useParams } from 'react-router-dom'
import { useAuth } from '../../components/session'

const Product = () => {
    const{id}= useParams()
    const{currentUser}= useAuth()
    const [ProductInfo, setProductInfo] = useState()
    const [Variants, setVariants] = useState()
    const [SelectedOption, setSelectedOption] = useState()
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
                        setProductInfo (data)
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
    
        return () => {
        
        }
    }, [])
    
    return (
        <div className="">
            <div>Product {id}</div>
            {
                ProductInfo&&(
                    
                    <div className="flex flex-row">
                        
                        <div className="L">
                            <p>hi</p>
                            <p>{ProductInfo.product.product_name}</p>
                        </div>
                        <div className="M">
                            {
                                SelectedOption?(
                                    <></>
                                ):(
                                    
                                    <div className="py-10">
                                        <img 
                                            ref={"assests/img/imgplaceholder"}
                                            src     ={ProductInfo.product.product_icon}
                                            alt     = "promptation logo"
                                            width   = {300}
                                            height  = {300}
                                            className = "object-contain rounded-full "
                                        />
                                    </div>
                                )
                            }
                        </div>
                        <div className="R">

                        </div>
                    </div>
                )
            }
        </div>
        

        
    )
}

export default Product