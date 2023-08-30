import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useAuth } from '../../../components/session'
const NewCreateProduct = (props) => {
    const {code} = useParams()
    const {currentUser} = useAuth()
    
    const [productType, setproductType] = useState([])
    const [isLimited, setisLimited] = useState(true)
    const [hasVariant, sethasVariant] = useState(false)
    const [HideContent, setHideContent] = useState()
    const [serialNumber, setserialNumber] = useState()
    useEffect(() => {
        setserialNumber(`${code}-${crypto.randomUUID()}`)
        async function getproductType(){
            await fetch('/api/getcatoption', { 
                method: "POST",
                body: JSON.stringify({
                    user:{
                        token:await currentUser.getIdToken()
                    },
                    id:code
                }),
                headers: {
                "Content-Type": "application/json",
                // 'Content-Type': 'application/x-www-form-urlencoded',
                },
                mode:'cors'
                
            }).then(async response => {
                
                if (response.ok){
                    // registered
                    
                    console.log("added")
                    var data = await response.json()
                    data = data[0]
                    console.log("CatOptions",data)
                    setproductType(data.categories)
                   
                    
                }else{
                    console.log("response.body",await response.json())
                    const data = await response.json()
                    console.log("data.error",data)
                    
                }  
            })
        }

        getproductType()
     
        return () => {
        
        }
    }, [])
    useEffect(() => {
      if( hasVariant) {
        setHideContent(true)
      }else{
        setHideContent(false)
      }
    }, [hasVariant])
    
    
    
    return (
        <div className="">
            <div>{code}newCreateProduct</div>
            <form action="" className='' id='createActivity'>
                <div className="grid lg:grid-cols-2 md:grid-cols-1 gap-5">
                    <div className="flex flex-col ">
                        <label htmlFor="text" className='w-full'>
                            學會名稱 Society Name
                        </label>
                        <input 
                            value={code}
                            placeholder={code}
                            className='bg-gray-50 border w-full p-2.5 block rounded-lg shadow shadow-gray-400'
                            type="text" 
                            id="ref_society" 
                            form=''
                           
                        />
                    </div>
                    <div className="flex flex-col ">
                        <label htmlFor="product_type" className='w-full'>
                            產品類型 Product Type {serialNumber}
                        </label>
                        <select name="" id="" className='bg-gray-50 border w-full p-2.5 block rounded-lg shadow shadow-gray-400'>
                            {
                                productType.map(type=>{
                                    return(
                                        <option 
                                            value={type}
                                            className='bg-gray-50 border w-full p-2.5 block rounded-lg shadow shadow-gray-400'>
                                            {type}

                                        </option>
                                    )
                                })
                            }
                        </select>
                        
                    </div>
                    <div className="flex flex-col ">
                        <label htmlFor="product_name_chi" className='w-full'>
                            產品名稱
                        </label>
                        <input 
                            
                            placeholder={"產品名稱"}
                            className='bg-gray-50 border w-full p-2.5 block rounded-lg shadow shadow-gray-400'
                            type="text" 
                            id="product_name_chi" 
                           
                        />
                    </div>
                    <div className="flex flex-col ">
                        <label htmlFor="product_name_eng" className='w-full'>
                            Product Name
                        </label>
                        <input 
                            
                            placeholder={"Product Name"}
                            className='bg-gray-50 border w-full p-2.5 block rounded-lg shadow shadow-gray-400'
                            type="text" 
                            id="product_name_eng" 
                            
                        />
                    </div>
                    <div className="flex flex-col ">
                        <label htmlFor="description_chi" className='w-full'>
                            產品介紹
                        </label>
                        <textarea 
                            id="description_chi" 
                            name='description_chi'   
                            className="w-full bg-gray-50 border p-2.5 block rounded-lg shadow shadow-gray-400" 
                            rows="6" 
                            cols="50"
                        />
                           
                     
                    </div>
                    <div className="flex flex-col ">
                        <label htmlFor="description_eng" className='w-full'>
                            Product Description
                        </label>
                        <textarea 
                            id="description_eng" 
                            name='description_eng'   
                            className="w-full bg-gray-50 border p-2.5 block rounded-lg shadow shadow-gray-400" 
                            rows="6" 
                            cols="50"
                        />
                    </div>

                    <div className="flex flex-col ">
                        <label htmlFor="product_name_chi" className='w-full'>
                            標籤 tag
                        </label>
                        <input 
                            placeholder={"#xxxx #xxxx"}
                            className='bg-gray-50 border w-full p-2.5 block rounded-lg shadow shadow-gray-400'
                            type="text" 
                            id="product_name_chi" 
                           
                        />
                    </div>

                    <div className="flex flex-col ">
                        <label htmlFor="product_name_chi" className='w-full'>
                            可使用優惠 Allowed Discount
                        </label>
                       
                        <select name="" id="" className='bg-gray-50 border w-full p-2.5 block rounded-lg shadow shadow-gray-400'>
                            <option 
                                
                                className='bg-gray-50 border w-full p-2.5 block rounded-lg shadow shadow-gray-400'>
                                buy 1  get 1 Free

                            </option>

                            <option 
                                
                                className='bg-gray-50 border w-full p-2.5 block rounded-lg shadow shadow-gray-400'>
                                送會籍

                            </option>
                        </select>
                    </div>

                    <div className="flex flex-col ">
                        <label htmlFor="product_name_chi" className='w-full'>
                            附屬於產品 Parent product
                        </label>
                        <select name="" id="" className='bg-gray-50 border w-full p-2.5 block rounded-lg shadow shadow-gray-400' defaultValue={"None"} onChange={(e)=>{}}>

                            <option 
                                
                                value={"None"}
                                className='bg-gray-50 border w-full p-2.5 block rounded-lg shadow shadow-gray-400'>
                                None

                            </option>
                            <option 
                                
                                className='bg-gray-50 border w-full p-2.5 block rounded-lg shadow shadow-gray-400'>
                                ISS_23_P_01 ISS Soc Tee

                            </option>

                            <option 
                                
                                className='bg-gray-50 border w-full p-2.5 block rounded-lg shadow shadow-gray-400'>
                                ISS_23_P_02 Bottle

                            </option>
                        </select>
                    </div>

                    <div className="flex flex-col ">
                        <label htmlFor="product_name_chi" className='w-full'>
                            設有不同選項? Has various Options?
                        </label>
                        <select name="" id="" className='bg-gray-50 border w-full p-2.5 block rounded-lg shadow shadow-gray-400' defaultValue={"None"} onChange={(e)=>{sethasVariant(e.target.value);console.log("sethasVariant"+e.target.value)}}>

                            <option 
                               
                                value={true}
                                className='bg-gray-50 border w-full p-2.5 block rounded-lg shadow shadow-gray-400'>
                                是 Yes

                            </option>
                            <option 
                                value={false}
                                className='bg-gray-50 border w-full p-2.5 block rounded-lg shadow shadow-gray-400'>
                                否 No

                            </option>

                            
                        </select>
                    </div>

                    

                </div>
                {
                    (hasVariant==="false")&&(
                        <div className="grid grid-cols-2 gap-4">
                            
                            <div className="flex flex-col ">
                                <div className="flex flex-row ">
                                    <label htmlFor="inventory" className='w-full'>
                                        數量 Quantity
                                    </label>
                                    <label htmlFor="is_limited" className='w-full'>
                                        限量 Limited
                                    </label>
                                  

                                    <label className="relative inline-flex w-full items-center cursor-pointer flex-row">
                                        <input 
                                            type="checkbox" 
                                            id="is_limited" 
                                            name='is_limited' 
                                            value={isLimited} 
                                            className="sr-only peer" 
                                            onClick={()=>{setisLimited(prev=>!prev);console.log("use Effect:",isLimited)}} 
                                        
                                        />
                                        <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600">

                                        </div>
                                    </label>
                                </div>
                               
                                <div className="flex flex-col ">
                                    
                                    <input 
                                        placeholder={0}
                                        className='bg-gray-50 border w-full p-2.5 block rounded-lg shadow shadow-gray-400'
                                        type="Number" 
                                        id="inventory" 
                                        disabled={isLimited}
                                    />
                                </div>
                            </div>

                            <div className="flex flex-col ">
                                
                                <div className="flex flex-col ">
                                    <label htmlFor="unit_price" className='w-full'>
                                        單價 Unit Price
                                    </label>
                                    <input 
                                        placeholder={0}
                                        className='bg-gray-50 border w-full p-2.5 block rounded-lg shadow shadow-gray-400'
                                        type="Number" 
                                        id="unit_price" 
                                        disabled={isLimited}
                                    />
                                </div>
                            </div>

                            <div className="hidden lg:block">

                            </div>
                        
                        </div>
                    )
                }
                
                
            </form> 
            
        </div>
        
    )
}

export default NewCreateProduct