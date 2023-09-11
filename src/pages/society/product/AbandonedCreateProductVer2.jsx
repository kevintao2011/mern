import React, { useEffect, useState,useRef } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useAuth } from '../../../components/session'
import ProtoTypes from "prop-types";

function NewCreateProduct ({
    isRoot = true,
    parentCategory, //parent selected cat
    parentSKU,
    action="create",
    inheritedCategories,
    childIndex,
    handleDelete,

    //given info
    givenData,
    handleData,


    defaultProductNameChi,
    defaultProductNameEng,
    defaultProductDescriptionChi,
    defaultProductDescriptionEng,
    defaulthasVariant,


})
    {
    
    //action can be create or edit
    const {code} = useParams()
    const {currentUser} = useAuth()
    // const first = useRef(second)
    const [SubProductDatas, setSubProductDatas] = useState([])
    // Product Category Option
    const [CategoriesObject, setCategoriesObject] = useState()
    const [Categories, setCategories] = useState([])
    //form data 
    const [serialNumber, setserialNumber] = useState()
    
    const [SelectedCategory, setSelectedCategory] = useState()// Parent Selected Category
    const [ProductNameChi, setProductNameChi] = useState()
    const [ProductNameEng, setProductNameEng] = useState()
    const [ProductDescriptionChi, setProductDescriptionChi] = useState()
    const [ProductDescriptionEng, setProductDescriptionEng] = useState()
    const [tags, settags] = useState([])
    const [Coupons, setCoupons] = useState([])
    const [Parent, setParent] = useState()
    const [Inventory, setInventory] = useState(0)
    // if the component is various option 
    const [hasVariant, sethasVariant] = useState(false)

    //for root product
    const [unitPrice, setunitPrice] = useState()
    const [isLimited, setisLimited] = useState(true)//unlimited? have quantity if limited
    const [ProductFormData, setProductFormData] = useState()

    const [Rearranging, setRearranging] = useState(false)

    
    useEffect(() => {
        console.log("updating local and parent data")
        const data = {
            ref_society:code, //soc-code
            product_name_chi:ProductNameChi,
            product_name_eng:ProductNameEng,
            product_description_chi:ProductDescriptionChi,
            product_description_eng:ProductDescriptionEng,
            product_type: SelectedCategory,
            product_img_url:[],
            product_link:[],
            product_status:"", //selling//endeds
            has_variant:hasVariant,
            is_limited:isLimited,
            sku:serialNumber,
            tags:tags,
            allowed_coupon:[],
            subProducts:SubProductDatas
        }
        setProductFormData(data)// set local states
        
        if(!isRoot){
            handleData(childIndex,data) // set parent states
        }else 
        if(isRoot){
            console.log("Root data",data)
        }
        // return()=>{
        //     if(parentSKU){
        //         setCategories(inheritedCategories)
        //         setParent(parentSKU)
        //         setSelectedCategory(parentCategory)
        //     }
            
        // }
    }, [
        isLimited,
        unitPrice,
        // hasVariant,
        Parent,
        Coupons,
        tags,
        ProductDescriptionEng,
        ProductDescriptionChi,
        ProductNameEng,
        ProductNameChi,
        serialNumber,
        Categories,
        SubProductDatas
    ])
    function organiseData(index,data){
        console.log("Updating Parents' Data....",serialNumber)
        SubProductDatas[index]=data
        setSubProductDatas([...SubProductDatas])
    }
    
    //check SelectedCategory
    useEffect(() => {
        console.log("SelectedCategory",SelectedCategory)
        function recursiveChange(subProductsArray){
            console.log("recursive")
            console.log("SubProductDatas",subProductsArray)
            return subProductsArray.map((subProduct,i) => {
                subProduct.product_type=SelectedCategory
                if (!subProduct.subProducts.length){ //endConcdition
                    return subProduct
                }else{
                    return recursiveChange(subProduct.subProducts)
                }
            });
        }
        if(SubProductDatas.length){
            setSubProductDatas(
                recursiveChange(SubProductDatas)
            )
        }
    }, [SelectedCategory])
    
    useEffect(() => {
      setProductNameChi(defaultProductNameChi)
    }, [defaultProductNameChi])
    useEffect(() => {
        setProductNameEng(defaultProductNameEng)
    }, [defaultProductNameEng])
    useEffect(() => {
        setProductDescriptionChi(defaultProductNameChi)
    }, [defaultProductDescriptionChi])
    useEffect(() => {
        setProductDescriptionEng(defaultProductDescriptionEng)
    }, [defaultProductDescriptionEng])
    useEffect(() => {
        sethasVariant(defaulthasVariant)
    }, [defaulthasVariant])
 
    
    useEffect(() => {
        console.log("Updated Parents' Data of:",serialNumber,SubProductDatas)
    }, [SubProductDatas])
    
    const [CSS, setCSS] = useState(
        "grid lg:grid-cols-2 md:grid-cols-1 gap-5"
    )
    
    //Init for parent exclusively
    useEffect(() => {
        // Generate Product ID
        const serial = `${code}-${crypto.randomUUID().split('-')[4]}`
        setserialNumber(serial)
        // fetch Product Type Options from database 
        async function getCategories(){
            if(!parentCategory){
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
                     
                        var data = await response.json()
                        const cats = data.map(d=>{
                            return d["catergory_name"]
                        })
                        
                        setCategoriesObject(data)
                        setCategories(cats)
                        setSelectedCategory(cats[0])
                        //if have hasVariant type  
                    }
                    // else{
                    //     console.log("response.body",await response.json())
                    //     const data = await response.json()
                    //     console.log("data.error",data)
                        
                    // }  
                })
            }
        }
        getCategories()
        return () => { 
        }
    }, [])

    // init for child exclusively
    useEffect(() => {
      // Set child product default activity
        if (parentSKU) {
            setParent(parentSKU);
            setCSS("grid grid-cols-1 gap-5")
            setCategories(inheritedCategories)
        }
    }, [parentSKU])
    useEffect(() => {
        setSelectedCategory(parentCategory)
    }, [parentCategory])
    
    async function handleParentFormSubmit(e){
        e.preventDefault()
    }
    function handleTags(e){
        var fieldValue=e.target.value
        fieldValue = fieldValue.split("#")
        fieldValue.splice(0,1)
        fieldValue = fieldValue.map(element => {
            return element.trim()
        });
        settags([...tags,fieldValue])
        console.log("set tags")
        e.target.value=""
    }

    function handleChildDelete(index){
        console.log(`Deleting the ${index} product in SubProductDatas${SubProductDatas}`)
        SubProductDatas.splice(index,1)
        if(!SubProductDatas){
            console.log(`Empty`)
            setSubProductDatas([])
        }else{
            console.log("setSubProductDatas")
            setSubProductDatas([...SubProductDatas])
        }
        setRearranging(true)
        
    }

    
    return (
        <div className="border border-gray-500 border-1 m-10 p-1" key={serialNumber}>
            
            <div className={CSS}>
                <div className="flex flex-col ">
                    <label htmlFor="product_id" className='w-full'>
                        產品編號
                    </label>
                    <input 
                        value={serialNumber}
                        className='bg-gray-50 border w-full p-2.5 block rounded-lg shadow shadow-gray-400'
                        type="text" 
                        id="product_id" 
                        disabled={true}
                    />
                </div>
                
                {
                    (
                        <div className="flex flex-col ">
                            <label htmlFor="product_type" className='w-full'>
                                產品類型 Product Type 
                            </label>
                            {/* {
                                !isRoot?(
                                    <p className='bg-gray-50 border w-full p-2.5 block rounded-lg shadow shadow-gray-400'>
                                        {SelectedCategory}
                                    </p>
                                ):( */}
                                    <select 
                                        name="" 
                                        id="product_type" 
                                        className='bg-gray-50 border w-full p-2.5 block rounded-lg shadow shadow-gray-400' 
                                        disabled={Parent||false}
                                        value={SelectedCategory}
                                        onChange={(e)=>{
                                            setSelectedCategory(e.currentTarget.value); 
                                            
                                        }}
                                            
                                    >
                                        {
                                            Categories.map((type,i)=>{
                                                
                                                return(
                                                
                                                    <option  
                                                        key={`${serialNumber}-type-${i}`}
                                                        id={`product_type-${i}`}
                                                        value={type}
                                                        className='bg-gray-50 border w-full p-2.5 block rounded-lg shadow shadow-gray-400'>
                                                        {type}
                                                        
                                                        
                                                    </option>
                                                
                                                    
                                                )
                                            })
                                        }
                                    </select>
                                {/* )
                            } */}
                            
                            
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
                        onChange={(e=>{setProductNameChi(e.target.value);})}
                        value={ProductNameChi}
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
                        onChange={(e=>{setProductNameEng(e.target.value)})}
                        value={ProductNameEng}
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
                        onChange={(e=>{setProductDescriptionChi(e.target.value)})}
                        value={ProductDescriptionChi}
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
                        onChange={(e=>{setProductDescriptionEng(e.target.value)})}
                        value={ProductDescriptionEng}
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
                        onChange={(e=>{if(e.target.value[e.target.value.length-1]===" "){
                            handleTags(e)
                        }})}
                    />
                    <div className="flex flex-row">
                    {
                        tags.map((tag,i)=>{
                            return(
                                <div className="flex flex-row" key={`${serialNumber}-tag-${i}`}>
                                    <p>#{tag}</p>
                                    <button 
                                        className='bg-red-500 text-white'
                                        onClick={
                                            ()=>{
                                                tags.splice(i,1)
                                                settags([...tags])
                                            }
                                        }
                                    >
                                        
                                        x
                                    </button>
                                </div>
                            )
                        }
                            
                        )
                    }
                    </div>
                    
                </div>

                <div className="flex flex-col ">
                    <label htmlFor="product_name_chi" className='w-full'>
                        可使用優惠 Allowed Discount
                    </label>
                    
                    <select name="" id="" className='bg-gray-50 border w-full p-2.5 block rounded-lg shadow shadow-gray-400'>
                        <option 
                            
                            className='bg-gray-50 border w-full p-2.5 block rounded-lg shadow shadow-gray-400'>
                            Not Availible now

                        </option>

                        
                    </select>
                </div>

                <div className="flex flex-col ">
                    <label htmlFor="product_name_chi" className='w-full'>
                        附屬於產品 Parent product
                    </label>
                    <select name="" id="" className='bg-gray-50 border w-full p-2.5 block rounded-lg shadow shadow-gray-400' value={Parent} disabled={true} >

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
                        {
                            <input 
                            type="checkbox" 
                            name="" 
                            id="has_options" 
                            checked={hasVariant}
                            onChange={()=>{
                                sethasVariant(!hasVariant);
                            }}
                            
                        />
                        }
                        
                        
                    </div>
                    {/* <input 
                        type="number" 
                        name="" 
                        id="options" 
                        className='bg-gray-50 border w-full p-2.5 block rounded-lg shadow shadow-gray-400' defaultValue={ProductOptions.length}
                        
                        disabled={!hasVariant}
                    /> */}
                    <div className="flex flex-row bg-gray-50 border w-full p-2.5  rounded-lg shadow shadow-gray-400  justify-between">
                        <p className='text-base'>{SubProductDatas.length} </p>
                        <button
                            onClick={(e)=>{
                                e.preventDefault()
                                // setProductOptions([...ProductOptions,<NewCreateProduct parentSKU={serialNumber} parentCategory={SelectedCategory} />])
                                setSubProductDatas([...SubProductDatas,
                                    {
                                        parentCategory:SelectedCategory,
                                        parentSKU:serialNumber,
                                        inheritedCategories:Categories,
                                        
                                    }
                                ])
                                
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
                                        onClick={()=>{setisLimited(prev=>!prev);}} 
                                    
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
                
                    <button 
                        className='bg-red-600 p-2 rounded-md'
                        onClick={()=>{
                            
                            handleDelete(childIndex)
                        }}
                    
                    >
                        delete
                    </button>
                
            }
                
                
                
            {
                <div className="w-full flex flex-row justify-center">
                    <button 
                        className='bg-su-green p-2 rounded-md m-2 text-white'
                    >
                        創建 Create
                    </button>
                </div>
            }
            
            
            {
                hasVariant && (
                    <div className={`grid grid-cols-2`}>
                        {
                            SubProductDatas.map((subProduct,i)=>{
                                return(
                                    <NewCreateProduct 
                                        key={`${serialNumber}-${"subProduct"}-${i}`}
                                        parentCategory={SelectedCategory}
                                        parentSKU={serialNumber}
                                        inheritedCategories={Categories}
                                        childIndex={i}
                                        handleDelete={handleChildDelete}
                                        
                                        defaultProductNameChi={subProduct.product_name_chi}
                                        defaultProductNameEng={subProduct.product_name_eng}
                                        defaultProductDescriptionChi={subProduct.product_description_chi}
                                        defaultProductDescriptionEng={subProduct.product_description_eng}
                                        defaulthasVariant={subProduct.has_variant}

                                        
                                        handleData={organiseData}
                                        isRoot={false}
                                        
                                    />
                                )
                            })
                        }
                    </div>
                    
                    
                )
            }
           
            
        </div>
        
    )
}
NewCreateProduct.propTypes = {
    parentCategory:ProtoTypes.string,
    parentSKU:ProtoTypes.string,
    action:ProtoTypes.string,
    inheritedCategories:ProtoTypes.arrayOf(ProtoTypes.string),
    childIndex:ProtoTypes.number,
    handleDelete:ProtoTypes.func,
    handleData:ProtoTypes.func,
    givenData:ProtoTypes.shape({
        ProductNameChi:ProtoTypes.string,
        ProductNameEng:ProtoTypes.string,
        ProductDescriptionChi:ProtoTypes.string,
        ProductDescriptionEng:ProtoTypes.string,
        tags:ProtoTypes.arrayOf(ProtoTypes.string)
    }),
    
};
// shape({
//     index:ProtoTypes.number,
//     data:ProtoTypes.func({
//         ProductNameChi:ProtoTypes.string,
//         ProductNameEng:ProtoTypes.string,
//         ProductDescriptionChi:ProtoTypes.string,
//         ProductDescriptionEng:ProtoTypes.string,
//         tags:ProtoTypes.arrayOf(ProtoTypes.string)
//     })
// }
    
// )
export default NewCreateProduct