import React, { useEffect, useState,useRef } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useAuth } from '../../../components/session'
import ProtoTypes from "prop-types";



function NewCreateProduct ({
    isRoot = true,
    product_type, //parent selected cat
    parent_product,
    action="create",
    inheritedCategories,
    childIndex,
    handleParentDelete,

    //given info
    givenData,
    defaultProductNameChi,
    defaultProductNameEng,
    defaultProductDescriptionChi,
    defaultProductDescriptionEng,
    defaulthasVariant,
    defaultTags,
    defaultSubProducts,
    triggerSubmit=false,
    uploadData,

    // update
    updateSingle,
    updateParentSubProduct

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

    const [Update, setUpdate] = useState(false)
    
    
//////////////////////////////////////////////////////////////////////////////////////////////////////
   
    
    //Init for parent exclusively
    /*
        1. Generate ID for the component
        2. setCategories for select fields if root
    */
    useEffect(() => {
        console.log("detected Init")
        // Generate Product ID
        const serial = `${code}-${crypto.randomUUID().split('-')[4]}`
        setserialNumber(serial)
        // fetch Product Type Options from database 
        async function getCategories(){
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
            })
        }
        if(isRoot){
            getCategories()
        }else{
            // console.log("Init setSerial Number only")
            // console.log("Parent sku",parent_product)
            // console.log("product type",product_type)
            setSelectedCategory(product_type)
            setCategories(inheritedCategories)
            setParent(parent_product)
            
        }
        
    }, [])
    

    useEffect(() => {//update if value changed
        if(!isRoot){
            updateParentSubProduct(childIndex,SubProductDatas)
        }
    }, [SubProductDatas] )//datas of parent's subproduct]

    

    function organiseData(index,data){ 
        //console.log("Updating Parents' Data....",serialNumber)
        SubProductDatas[index]=data
        setSubProductDatas([...SubProductDatas])
    }

    useEffect(() => {
        //console.log("detected defaultTags")
        if(defaultTags){
            settags(defaultTags)
        }else{}
    }, [defaultTags])

    useEffect(() => {
      sethasVariant(defaulthasVariant)
    }, [defaulthasVariant])
    
    
////////////////////////////////////////recursive////////////////////////////////////////
    
    
    //check SelectedCategory
    useEffect(() => { //update Category
        //console.log("Detected SelectedCategory",SelectedCategory)
        function recursiveChange(subProductsArray,cat){
            //console.log("recursive")
            //console.log("SubProductDatas",subProductsArray)
            return subProductsArray.map((subProduct,i) => {
                subProduct.product_type=cat
                if (!subProduct.subProducts?.length){ //endConcdition
                    return subProduct
                }else{
                    return recursiveChange(subProduct.subProducts,cat)                }
            });
        }
        if(SubProductDatas.length){
            setSubProductDatas(
                recursiveChange(SubProductDatas,SelectedCategory)
            )
        }
    }, [SelectedCategory])
    
/////////////////////////////////////////////recursive////////////////////////////////////////
    function fineUpdate(index,id,value){
        console.log(`subproduct ${index} of ${serialNumber} calling update props ${id} to ${value}`)
        console.log(`item change from ${SubProductDatas[index][id]} to ${value}`)
        SubProductDatas[index][id]=value
        setSubProductDatas([...SubProductDatas])
    }

    function subProductUpdate(index,subproductdata){
        if(subproductdata.length){
            console.log(`subproduct ${index} of ${serialNumber}  calling update subProduct list of parent ${serialNumber}`)
            console.log(`subproduct change from ${SubProductDatas[index]} to ${subproductdata}`)
            SubProductDatas[index]["subProducts"]=subproductdata
            setSubProductDatas([...SubProductDatas])
        }
        
    }

    function handleSubmit(){
        let productlist = []
        function InterateTree (topNode){
            //console.log("Interate Tree")
            //console.log(topNode.subProducts.length)
            if (!topNode.subProducts.length){
                productlist.push(topNode)
                //console.log("Pushed")
            }else{
                productlist.push(topNode)
                topNode.subProducts.forEach(childNode=>{
                    
                    InterateTree(childNode)
                })
            }
        }
        InterateTree(ProductFormData)
        //console.log("productlist",productlist)
    }
    
    const [CSS, setCSS] = useState(
        "grid lg:grid-cols-2 md:grid-cols-1 gap-5"
    )
    
    

    
    async function handleParentFormSubmit(e){
        e.preventDefault()
    }
    function handleTags(e){
        console.log("fieldValue b4 handle",e.target.value,"default tags",defaultTags)
        var fieldValue=e.target.value
        fieldValue = fieldValue.split("#")
        fieldValue.splice(0,1)
        fieldValue = fieldValue.map(element => {
            return element.trim()
        });
        if(isRoot){
            settags([...tags,fieldValue])
        }else{
            fieldValue=[...defaultTags,...fieldValue]
            updateSingle(childIndex,e.target.id,fieldValue)
        }
        
        console.log("set tags",[...tags,fieldValue])
        e.target.value=""
    }

    function handleChildDelete(index){
        console.log(`Deleting the ${index} product in SubProductDatas${SubProductDatas}`)
        SubProductDatas.splice(index,1)
        console.log(`Deleted the ${index} product in SubProductDatas${SubProductDatas}`)
        setSubProductDatas([...SubProductDatas])
        
       
    }

    
    return (
        <div className="border border-gray-500 border-1 m-10 p-1" key={serialNumber}>
            <button
                onClick={()=>{
                    console.log(SubProductDatas)
                }}
            >
                Details
            </button>
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
                                        disabled={!isRoot||false}
                                        value={isRoot?SelectedCategory:product_type}
                                        onChange={(e=>{
                                        if(isRoot){
                                            console.log(`set ${e.target.id} state since is root`)
                                            setSelectedCategory(e.target.value);
                                        }else{
                                            console.log("set parent subdata since is child")
                                            updateSingle(childIndex,e.target.id,e.target.value)
                                        }
                                        })} 
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
                        
                        // value={ProductNameChi}
                        value={isRoot?ProductNameChi:defaultProductNameChi}
                        onChange={(e=>{
                            if(isRoot){
                                console.log(`set ${e.target.id} state since is root`)
                                setProductNameChi(e.target.value);
                            }else{
                                console.log("set parent subdata since is child")
                                updateSingle(childIndex,e.target.id,e.target.value)
                            }
                        })} 
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
                       

                        value={isRoot?ProductNameEng:defaultProductNameEng}
                        onChange={(e=>{
                            if(isRoot){
                                console.log(`set ${e.target.id} state since is root`)
                                setProductNameEng(e.target.value);
                            }else{
                                console.log("set parent subdata since is child")
                                updateSingle(childIndex,e.target.id,e.target.value)
                            }
                        })} 
                    />
                </div>
                <div className="flex flex-col ">
                    <label htmlFor="product_description_chi" className='w-full'>
                        產品介紹
                    </label>
                    <textarea 
                        id="product_description_chi" 
                        name='product_description_chi'   
                        className="w-full bg-gray-50 border p-2.5 block rounded-lg shadow shadow-gray-400" 
                        rows="6" 
                        cols="50"

                        value={isRoot?ProductDescriptionChi:defaultProductDescriptionChi}
                        onChange={(e=>{
                            if(isRoot){
                                console.log(`set ${e.target.id} state since is root`)
                                setProductDescriptionChi(e.target.value);
                            }else{
                                console.log("set parent subdata since is child")
                                updateSingle(childIndex,e.target.id,e.target.value)
                            }
                        })} 
                    />
                        
                    
                </div>
                <div className="flex flex-col ">
                    <label htmlFor="product_description_eng" className='w-full'>
                        Product Description
                    </label>
                    <textarea 
                        id="product_description_eng" 
                        name='product_description_eng'   
                        className="w-full bg-gray-50 border p-2.5 block rounded-lg shadow shadow-gray-400" 
                        rows="6" 
                        cols="50"
                        value={isRoot?ProductDescriptionEng:defaultProductDescriptionEng}
                        onChange={(e=>{
                            if(isRoot){
                                console.log(`set ${e.target.id} state since is root`)
                                setProductDescriptionEng(e.target.value);
                            }else{
                                console.log("set parent subdata since is child")
                                updateSingle(childIndex,e.target.id,e.target.value)
                            }
                        })} 
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
                        id="tags" 
                        onChange={(e=>{if(e.target.value[e.target.value.length-1]===" "){
                            handleTags(e)
                        }})}
                    />
                    <div className="flex flex-row">
                    {
                        !isRoot&&defaultTags?.map((tag,i)=>{
                            return(
                                <div className="flex flex-row" key={`${serialNumber}-tag-${i}`}>
                                    <p>#{tag}</p>
                                    <button 
                                        className='bg-red-500 text-white'
                                        onClick={
                                            ()=>{
                                                defaultTags.splice(i,1)
                                                updateSingle(childIndex,"tags",defaultTags)
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
                    {
                        isRoot&&tags.map((tag,i)=>{
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
                    <label htmlFor="allowed_coupon" className='w-full'>
                        可使用優惠 Allowed Discount
                    </label>
                    
                    <select name="" id="allowed_coupon" className='bg-gray-50 border w-full p-2.5 block rounded-lg shadow shadow-gray-400'>
                        <option 
                            
                            className='bg-gray-50 border w-full p-2.5 block rounded-lg shadow shadow-gray-400'>
                            Not Availible now

                        </option>

                        
                    </select>
                </div>

                <div className="flex flex-col ">
                    <label htmlFor="parent_product" className='w-full'>
                        附屬於產品 Parent product
                    </label>
                    <select name="" id="parent_product" className='bg-gray-50 border w-full p-2.5 block rounded-lg shadow shadow-gray-400' value={Parent} disabled={true} >

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
                        <label htmlFor="has_variant" className=''>
                            設有不同選項? Has various Options?
                        </label>
                        {
                            <input 
                            type="checkbox" 
                            name="" 
                            id="has_variant" 
                            checked={isRoot?hasVariant:defaulthasVariant}
                            onChange={(e)=>{
                           
                                sethasVariant(e.target.checked)
                                if(isRoot){
                                    console.log(`set ${e.target.id} state since is root`)
                                    setSelectedCategory(e.target.checked);
                                }else{
                                    console.log("set parent subdata since is child")
                                    updateSingle(childIndex,e.target.id,e.target.checked)
                                }
                            }}
                            
                            
                        />
                        }
                        
                        
                    </div>
                    
                    <div className="flex flex-row bg-gray-50 border w-full p-2.5  rounded-lg shadow shadow-gray-400  justify-between">
                        <p className='text-base'>{defaultSubProducts?.length?defaultSubProducts.length:SubProductDatas.length} </p>
                        <button
                            onClick={(e)=>{
                                e.preventDefault()
                                console.log("b4 add subproduct data")
                                SubProductDatas.push({
                                    product_type:SelectedCategory,
                                    parent_product:serialNumber,
                                })
                                if(!isRoot){
                                    updateParentSubProduct(childIndex,SubProductDatas)
                                }else{
                                    setSubProductDatas([...SubProductDatas])
                                }
                                console.log("pressed add new, new sub",SubProductDatas)
                                
                                
                                //console.log("SubProductDatas After add",[...SubProductDatas])
                            }}
                            disabled={!hasVariant}
                        >
                            增加選項 Add New Options
                        </button>
                        
                    </div>
                </div>

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
                    !isRoot&&(
                    <button 
                        className='bg-red-600 p-2 rounded-md'
                        onClick={()=>{
                            
                            handleParentDelete(childIndex)
                         
                        }}
                    
                    >
                        delete
                    </button>
                    )
            }
            {
                <div className={`grid grid-cols-2`}>
                    {
                        hasVariant&&
                            (defaultSubProducts?defaultSubProducts:SubProductDatas).map((subProduct,i)=>{
                                // console.log("before render Parent Data: ",ProductFormData)
                                console.log(`${serialNumber}SubProductDatas ${i} to be render, is array?${Array.isArray(defaultSubProducts?defaultSubProducts:SubProductDatas)}`)
                                console.log("Render subProduct",i,"with data",subProduct)
                                return(
                                    <NewCreateProduct 
                                        key={`${serialNumber}-${"subProduct"}-${i}`}
                                        product_type={SelectedCategory?SelectedCategory:subProduct.ref_society}
                                        parent_product={serialNumber}
                                        inheritedCategories={Categories}
                                       
                                        childIndex={i}
                                        handleParentDelete={handleChildDelete}
                                        //product content
                                        defaultProductNameChi={subProduct?.product_name_chi}
                                        defaultProductNameEng={subProduct?.product_name_eng}
                                        defaultProductDescriptionChi={subProduct?.product_description_chi}
                                        defaultProductDescriptionEng={subProduct?.product_description_eng}
                                        defaulthasVariant={subProduct?.has_variant}
                                        defaultTags={subProduct.tags?subProduct.tags:[]}
                                        
                                        defaultSubProducts={subProduct.subProducts?subProduct.subProducts:[]}
                                        // update={Update}
                                        isRoot={false}
                                        updateSingle={fineUpdate}
                                        updateParentSubProduct={subProductUpdate}
                                        
                                        
                                    />
                                )
                            })
                        
                        
                    }

                    
                </div>
            }
            {
                isRoot&&(
                <div className="w-full flex flex-row justify-center">
                    <button 
                        className='bg-su-green p-2 rounded-md m-2 text-white'
                        onClick={()=>{handleSubmit()}}
                    >
                        創建 Create
                    </button>
                </div>
                )
            }
           
            
        </div>
        
    )
}
NewCreateProduct.propTypes = {
    product_type:ProtoTypes.string,
    parent_product:ProtoTypes.string,
    action:ProtoTypes.string,
    inheritedCategories:ProtoTypes.arrayOf(ProtoTypes.string),
    childIndex:ProtoTypes.number,
    handleParentDelete:ProtoTypes.func,
    uploadData:ProtoTypes.func,
    givenData:ProtoTypes.shape({
        ProductNameChi:ProtoTypes.string,
        ProductNameEng:ProtoTypes.string,
        ProductDescriptionChi:ProtoTypes.string,
        ProductDescriptionEng:ProtoTypes.string,
        tags:ProtoTypes.arrayOf(ProtoTypes.string)
    }),
    
};

export default NewCreateProduct