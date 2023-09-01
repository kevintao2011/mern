import React, { useEffect, useState,useRef } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useAuth } from '../../../components/session'

const NewCreateProduct = (props) => {
    
    const {code} = useParams()
    const {currentUser} = useAuth()
    // const first = useRef(second)
    const [productType, setproductType] = useState([])
    const [isLimited, setisLimited] = useState(true)
    const [hasVariant, sethasVariant] = useState(false)
    const [HideContent, setHideContent] = useState()
    const [serialNumber, setserialNumber] = useState()
    const [Inherited, setInherited] = useState(false)
    const [ProductOptions, setProductOptions] = useState([])
    const [Category, setCategory] = useState()
    const [Parent, setParent] = useState()
    const [DeleteButton, setDeleteButton] = useState(false)
    const FormRef = useRef()
    const [CSS, setCSS] = useState(
        "grid lg:grid-cols-2 md:grid-cols-1 gap-5"
    )
    
    
    useEffect(() => {
        if(props.Category){
            console.log("Triggered by props",props.Category)
            setCategory(props.Category)
        }
    }, [props.Category])

    // useEffect(() => {
    //     console.log(ProductOptions)
    // }, [ProductOptions])

    
    
    
    useEffect(() => {
        // Generate Product ID
        const serial = `${code}-${crypto.randomUUID()}`

        // Set Parent for child product
        if (props.parant) {
            setParent(props.parant);
            console.log("set parent to ",props.parant);
            setCSS("grid grid-cols-1 gap-5")
        }
        setserialNumber(serial)
        
        // fetch Product Type Options from database 
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
                    //if have inherited type
                    if(props.Category){
                        setCategory(props.Category)
                        console.log("has default Type",props.Category)
                    }else{//else set to default first
                        setCategory(data.categories[0])
                    }
                    
                    
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


    // useEffect(() => {
    //   if( hasVariant) {
    //     setHideContent(true)
    //   }else{
    //     setHideContent(false)
    //   }
    // }, [hasVariant])
    
    
    
    async function handleParentFormSubmit(e){
        e.preventDefault()
        console.log("Triggered Submission!")
        
    }
    
    return (
        <div className="border border-gray-500 border-1 m-10 p-1">
            {/* <div>{code}newCreateProduct</div> */}
            <form action="" className='' id='createActivity' ref={FormRef} onSubmit={handleParentFormSubmit}>
                <p>產品編號{serialNumber}</p>
                <div className={CSS}>
                    {/* <div className="flex flex-col ">
                        
                        <input 
                            value={code}
                            placeholder={code}
                            className='bg-gray-50 border w-full p-2.5 block rounded-lg shadow shadow-gray-400'
                            type="text" 
                            id="ref_society" 
                            form=''
                           
                        />
                    </div> */}
                    <div className=""></div>
                    {
                        (
                            <div className="flex flex-col ">
                                <label htmlFor="product_type" className='w-full'>
                                    產品類型 Product Type 
                                </label>
                                <p>{Category}</p>
                                <select 
                                    name="" 
                                    id="product_type" 
                                    className='bg-gray-50 border w-full p-2.5 block rounded-lg shadow shadow-gray-400' 
                                    disabled={Parent}
                                    value={Category}
                                    onChange={(e)=>{setCategory(e.currentTarget.value);console.log("Chosen Type: "+e.currentTarget.value)}}
                                >
                                    {
                                        productType.map((type,i)=>{
                                            
                                            return(
                                            
                                                <option  
                                                    id={`product_type-${i}`}
                                                    value={type}
                                                    className='bg-gray-50 border w-full p-2.5 block rounded-lg shadow shadow-gray-400'>
                                                    {type}
                                                    
                                                    
                                                </option>
                                            
                                                
                                            )
                                        })
                                    }
                                </select>
                                
                            </div>
                        )
                    }
                    
                    
                    
                    

                    

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
                        <select name="" id="" className='bg-gray-50 border w-full p-2.5 block rounded-lg shadow shadow-gray-400' defaultValue={Parent} disabled={!Inherited} >

                            <option 
                                
                                value={Parent}
                                className='bg-gray-50 border w-full p-2.5 block rounded-lg shadow shadow-gray-400'>
                                {Parent}

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

                    <div className="flex flex-col">
                        <div className="flex flex-row ">
                            <label htmlFor="has_options" className=''>
                                設有不同選項? Has various Options?
                            </label>
                            
                            <input 
                                type="checkbox" 
                                name="" 
                                id="has_options" 
                                defaultChecked={false} 
                                onClick={()=>{
                                    sethasVariant(!hasVariant);
                                    setInherited(!Inherited);
                                    console.log(hasVariant);
                                }}
                            />
                        </div>
                        {/* <input 
                            type="number" 
                            name="" 
                            id="options" 
                            className='bg-gray-50 border w-full p-2.5 block rounded-lg shadow shadow-gray-400' defaultValue={ProductOptions.length}
                            
                            disabled={!hasVariant}
                        /> */}
                        <div className="flex flex-row bg-gray-50 border w-full p-2.5  rounded-lg shadow shadow-gray-400  justify-between">
                            <p className='text-base'>{ProductOptions.length} </p>
                            <button
                                onClick={(e)=>{
                                    e.preventDefault()
                                    setProductOptions([...ProductOptions,<NewCreateProduct parant={serialNumber} Category={Category} setCategory={setCategory} />])
                                    
                                }}
                                disabled={!hasVariant}
                            >
                                增加選項 Add New Options
                            </button>
                            
                        </div>
                    </div>

                    
                    
                    {/* <div className="">
                        <label htmlFor="Number of Variants"></label>
                        <input type="number" name="" id="" />
                    </div> */}
                    
                    

                </div>
                {
                    (!hasVariant)&&(
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
                {
                    Parent &&(
                        <button 
                            className='bg-red-600 p-2 rounded-md'
                            onClick={()=>{
                                // let q = confirm("Are You Sure to Delete? All subproduct will be lost");
                                // if(q){
                                //   console.log("hi")  
                                // )else{
                                //     console.log("bye")  
                                // }
                            }}
                        
                        >
                            delete
                        </button>
                    )
                }
                
                
                
            </form> 
            <div className="w-full flex flex-row justify-center">
                    <button 
                        className='bg-su-green p-2 rounded-md m-2 text-white'
                        onClick={()=>{FormRef.current.requestSubmit()}}
                    >
                        創建 Create
                    </button>
                </div>
            {/* for Variants */}
            {
                hasVariant && (
                    <div className="grid grid-cols-2">
                        {ProductOptions}
                    </div>
                    
                )
            }
            
        </div>
        
    )
}

export default NewCreateProduct