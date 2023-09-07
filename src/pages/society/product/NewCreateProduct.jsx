import React, { useEffect, useState,useRef } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useAuth } from '../../../components/session'
import ProtoTypes from "prop-types";

function NewCreateProduct ({
    parentCategory,
    parentSKU,
    action="create",
    inheritedCategories,
    childIndex,
    handleDelete,

    //given info
    givenData,
    handleData
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
    const [SelectedCategory, setSelectedCategory] = useState()
    
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
    useEffect(() => {
        setProductFormData({
            ref_society:code, //soc-code
            product_name_chi:ProductNameChi,
            product_name_eng:ProductNameEng,
            product_description_chi:ProductDescriptionChi,
            product_description_eng:ProductDescriptionEng,
            product_type: SelectedCategory,
            product_img_url:[],
            product_link:[],
            product_status:"", //selling//ended
            is_limited:isLimited,
            sku:serialNumber,
            tags:tags,
            allowed_coupon:[],
            subProducts:SubProductDatas
        })
        
    }, [
        isLimited,
        unitPrice,
        hasVariant,
        Parent,
        Coupons,
        tags,
        ProductDescriptionEng,
        ProductDescriptionChi,
        ProductNameEng,
        ProductNameChi,
        SelectedCategory,
        serialNumber,
        Categories,
        SubProductDatas,
        
    ])
    useEffect(() => {
      if(handleData){
        handleData(childIndex,ProductFormData)
      }
    }, [ProductFormData])
    
    

    //Childeren's state
    // const [DeleteButton, setDeleteButton] = useState(false)
    // const [ProductOptions, setProductOptions] = useState([])
    // const [childrenCount, setchildrenCount] = useState(0)
    // const [childrenData, setchildrenData] = useState([])
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
                        console.log("added")
                        var data = await response.json()
                        const cats = data.map(d=>{
                            return d["catergory_name"]
                        })
                        console.log("CatOptions",cats)
                        setCategoriesObject(data)
                        setCategories(cats)
                        setSelectedCategory(cats[0])
                        //if have hasVariant type  
                    }else{
                        console.log("response.body",await response.json())
                        const data = await response.json()
                        console.log("data.error",data)
                        
                    }  
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
            console.log("set parent to ",parentSKU);
            setCSS("grid grid-cols-1 gap-5")
            setCategories(inheritedCategories)
            setSelectedCategory(parentCategory)
        }
    }, [])
    
    
    async function handleParentFormSubmit(e){
        e.preventDefault()
        console.log("Triggered Submission!")
        
    }
    function handleTags(e){
        var fieldValue=e.target.value
        fieldValue = fieldValue.split("#")
        fieldValue.splice(0,1)
        fieldValue = fieldValue.map(element => {
            return element.trim()
        });
        settags([...tags,fieldValue])
        console.log("fieldValue",fieldValue)
        e.target.value=""
    }

    function handleChildDelete(index){
        console.log(`Deleting the ${index} product in SubProductDatas${SubProductDatas}`)
        SubProductDatas.splice(index,1)
        if(!SubProductDatas){
            console.log(`Empty`)
            setSubProductDatas([])
        }else{
            setSubProductDatas([...SubProductDatas])
        }
        
    }

    function organiseData(index,data){
        console.log("calling organiseData from",serialNumber)
        
        SubProductDatas[index]=data
        setSubProductDatas([...SubProductDatas])
    }
    useEffect(() => {
      console.log("subproducts Data changed",SubProductDatas)
    }, [SubProductDatas])
    
    
    
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
                            
                            <select 
                                name="" 
                                id="product_type" 
                                className='bg-gray-50 border w-full p-2.5 block rounded-lg shadow shadow-gray-400' 
                                disabled={Parent||false}
                                value={SelectedCategory}
                                onChange={(e)=>{
                                    setSelectedCategory(e.currentTarget.value);
                                    console.log("Chosen Type: "+e.currentTarget.value)}}
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
                        onChange={(e=>{setProductNameChi(e.target.value)})}
                        value={givenData?.ProductNameChi}
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
                        value={givenData?.ProductNameEng}
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
                        value={givenData?.ProductProductDescriptionChi}
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
                        value={givenData?.ProductProductDescriptionEng}
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
                        
                        <input 
                            type="checkbox" 
                            name="" 
                            id="has_options" 
                            defaultChecked={false} 
                            onClick={()=>{
                                sethasVariant(!hasVariant);
                                
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
                                        givenData:{
                                            ProductNameChi:ProductNameChi,
                                            ProductNameEng:ProductNameEng,
                                            ProductDescriptionChi:ProductDescriptionChi,
                                            ProductDescriptionEng:ProductDescriptionEng,
                                            tags:tags
                                        }
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
                
                    <button 
                        className='bg-red-600 p-2 rounded-md'
                        onClick={()=>{
                            // let q = confirm("Are You Sure to Delete? All subproduct will be lost");
                            // if(q){
                            //   console.log("hi")  
                            // )else{
                            //     console.log("bye")  
                            // }
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
            
            {/* for Variants */}
            {/* {
                hasVariant && (
                    <div className="grid grid-cols-2">
                        {ProductOptions}
                    </div>
                    
                )
            } */}
            {
                hasVariant && (
                    <div className={`grid grid-cols-2`}>
                        {
                            SubProductDatas.map((subProduct,i)=>{
                                return(
                                    <NewCreateProduct 
                                        key={`${serialNumber}-${"subProduct"}-${i}`}
                                        parentCategory={subProduct?.parentCategory}
                                        parentSKU={subProduct?.parentSKU}
                                        inheritedCategories={subProduct?.inheritedCategories}
                                        childIndex={i}
                                        handleDelete={handleChildDelete}
                                        givenData={
                                            {
                                                ProductNameChi:subProduct?.givenData?.ProductNameChi,
                                                ProductNameProductNameEng:subProduct?.givenData?.ProductNameEng,
        ProductDescriptionChi:subProduct?.givenData?.ProductDescriptionChi,
        ProductDescriptionEng:subProduct?.givenData?.ProductDescriptionEng,
                                            }

                                        }
                                        handleData={organiseData}
                                        
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