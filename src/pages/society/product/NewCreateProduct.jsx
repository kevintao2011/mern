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
    
    defaultUnitPrice,
    defaultInventory,
    defaultLimited,
    defaultCoupons,

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
    const [ErrorMsg, setErrorMsg] = useState([])
    const [Submitting, setSubmitting] = useState(false)
    
    
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

    useEffect(() => {
      if(product_type){
        setSelectedCategory(product_type)
      }
    }, [product_type])
    

    
    
    
////////////////////////////////////////recursive////////////////////////////////////////
    
    
    //check SelectedCategory
    useEffect(() => { //update Category
        //console.log("Detected SelectedCategory",SelectedCategory)
        function recursiveChange(subProductsArray,cat){
            //console.log("recursive")
            console.log("SubProductDatas",subProductsArray)
            return subProductsArray.map((subProduct,i) => {
                subProduct.product_type=cat
                console.log("SubProductData",subProduct)
                if (!subProduct.subProducts.length){ //endConcdition
                    console.log("Returning",subProduct)
                    return subProduct
                }else{
                    console.log("subProduct.subProducts",subProduct.subProducts)
                    subProduct.subProducts = recursiveChange(subProduct.subProducts,cat)             
                    return subProduct   
                }
            });
        }
        if(isRoot){
            if(SubProductDatas.length){
                // console.log(recursiveChange(SubProductDatas,SelectedCategory))
                setSubProductDatas(
                   [...recursiveChange(SubProductDatas,SelectedCategory)]
                )
            }else{
                setSubProductDatas([])
            }
        }
        
    }, [SelectedCategory])
    
/////////////////////////////////////////////recursive////////////////////////////////////////
    function fineUpdate(index,id,value){
        

        if(isRoot){
            SubProductDatas[index][id]=value
            setSubProductDatas([...SubProductDatas])
        }else{
            defaultSubProducts[index][id]=value
            updateParentSubProduct(childIndex,defaultSubProducts)
        }
       
    }

    function subProductUpdate(index,subproductdata){
        if(isRoot){
            SubProductDatas[index]["subProducts"]=subproductdata
            setSubProductDatas([...SubProductDatas])
        }else{
            defaultSubProducts[index]["subProducts"]=subproductdata
            updateParentSubProduct(childIndex,defaultSubProducts)
        }
        
        
    }
    useEffect(() => {
      console.log(ErrorMsg)
    }, [ErrorMsg])
    
    async function handleSubmit(){
        const rootData = {
            code:code,
            //ref_soc
            product_type:SelectedCategory,
            product_name_chi:ProductNameChi,
            product_name_eng:ProductNameEng,
            product_description_chi:ProductDescriptionChi,
            product_description_eng:ProductDescriptionEng,
            //CreateAt
            has_variant:hasVariant,
            is_limited:isLimited,
            inventory:Inventory,
            //totalsales
            unit_price:unitPrice,
            tags:tags,
            Coupons:Coupons,
            subProducts:SubProductDatas
            
            
        }
        
        let productlist = []
        let msgs =[]
        function IterateTree (topNode){
            
            console.log("Iterate Tree",topNode.has_variant)
            //console.log(topNode.subProducts.length)
            if (!topNode.has_variant){ // end condtion, no subProduct 
                //shld have price , limited then hv quantity
                productlist.push(topNode)
                if(!topNode.product_name_chi){
                    msgs.push("A Product Missing Chinese Name")
                    // setErrorMsg([...ErrorMsg,"A Product Missing Chinese Name"])
                }
                if(topNode.is_limited){
                    if(!topNode.inventory){
                        msgs.push("A Limited Product Missing Quantity")
                        // setErrorMsg([...ErrorMsg,"A Limited Product Missing Quantity"])
                    }
                }
            }else{
                productlist.push(topNode)
                topNode.subProducts.forEach(childNode=>{
                    IterateTree(childNode)
                })
            }
           
        }
        IterateTree(rootData)
        setErrorMsg([...msgs])

        if (msgs.length>0) {
            setSubmitting(false)
            return
        }else{
            await fetch(
                "/api/newcreateproduct",
                {
                    
                    method:"POST",
                    body:JSON.stringify({
                        user:{
                            token:await currentUser.getIdToken()
                        },
                        data:{
                            code:code,
                            productList:productlist,
                            productTree:rootData
                        }
                    }),
                    headers: {
                        "Content-Type": "application/json",
                        // 'Content-Type': 'application/x-www-form-urlencoded',
                    },
                    mode:'cors'
                }
            ).then(async res=>{
                await res.json().then(data=>{
                    setErrorMsg([data.msg])
                })
                setSubmitting(false)
              })
            
        }
        console.log("productlist",productlist)

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
        if(isRoot){
            SubProductDatas.splice(index,1)
            setSubProductDatas([...SubProductDatas])
        }else{
            defaultSubProducts.splice(index,1)
            updateParentSubProduct(childIndex,defaultSubProducts)
        }
        console.log(`Deleted the ${index} product in SubProductDatas${SubProductDatas}`)
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
            <div className={isRoot?CSS:"grid-cols-1 gap-5"}>
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
                                        required="required"
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
                           
                             
                                if(isRoot){
                                    console.log(`set ${e.target.id} state since is root`)
                                    sethasVariant(e.target.checked);
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
                                const newData = {
                                    product_type:SelectedCategory,
                                    parent_product:serialNumber,
                                    is_limited:false,
                                    has_variant:false,
                                    
                                }
                                if(!isRoot){
                                    defaultSubProducts.push(newData)
                                    updateParentSubProduct(childIndex,defaultSubProducts)
                                    console.log("pressed add new, new sub",defaultSubProducts)
                                }else{
                                    SubProductDatas.push(newData)
                                    setSubProductDatas([...SubProductDatas])
                                    console.log("pressed add new, new sub",SubProductDatas)
                                }
                                
                                
                                
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
                                        checked={isRoot?isLimited:defaultLimited} 
                                        className="" //sr-only peer
                                        onChange={(e)=>{
                                            if(isRoot){
                                                console.log(`set ${e.target.id} state since is root`)
                                                setisLimited(e.target.checked);
                                            }else{
                                                console.log("set parent subdata since is child")
                                                updateSingle(childIndex,e.target.id,e.target.checked)
                                            }
                                        }} 
                                    
                                    />
                                    {/* <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600">

                                    </div> */}
                                </label>
                            </div>
                            
                            <div className="flex flex-col ">
                                
                                <input 
                                    placeholder={0}
                                    className='bg-gray-50 border w-full p-2.5 block rounded-lg shadow shadow-gray-400'
                                    type="Number" 
                                    id="inventory" 
                                    disabled={isRoot?!isLimited:!defaultLimited}
                                    value={isRoot?Inventory:defaultInventory}
                                    min={1}
                                    onChange={(e=>{
                                        if(isRoot){
                                            console.log(`set ${e.target.id} state since is root`)
                                            setInventory(e.target.value);
                                        }else{
                                            console.log("set parent subdata since is child")
                                            updateSingle(childIndex,e.target.id,e.target.value)
                                        }
                                    })} 
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
                                    min={0}
                                    type="Number" 
                                    id="unit_price" 
                                    // disabled={isLimited}
                                    value={isRoot?unitPrice:defaultUnitPrice}
                                    onChange={(e=>{
                                        if(isRoot){
                                            console.log(`set ${e.target.id} state since is root`)
                                            setunitPrice(e.target.value);
                                        }else{
                                            console.log("set parent subdata since is child")
                                            updateSingle(childIndex,e.target.id,e.target.value)
                                        }
                                    })} 
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
                                        product_type={subProduct?.product_type}
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

                                        defaultInventory={subProduct?.inventory}
                                        defaultLimited={subProduct?.is_limited}
                                        defaultUnitPrice={subProduct?.unit_price}
                                        
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
                <div className="w-full flex flex-col justify-center">
                    <div className="w-full text-start text-sm">
                        <p className='text-red-600 '>
                            注意事項 Reminders
                        </p>
                        <ol className=''>
                            <li>
                                全部商品必填上中文名稱 All products must have Chinese Name.
                            </li>
                            <li>
                                所有限量產品必須填上數量 Quantity field must be filled if its quanity is limited.
                            </li>
                        </ol>
                    </div>
                    <button 
                        className='bg-su-green p-2 rounded-md m-2 text-white'
                        // disabled={Submitting}
                        onClick={async ()=>{await handleSubmit();setSubmitting(true)}}
                    >
                        創建 Create
                    </button>
                    {
                        ErrorMsg.map(msg=>{
                            return <p className='text-sm text-red-600'>{msg}</p>
                        })
                    }
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
    

    defaultProductNameChi:ProtoTypes.string,
    defaultProductNameEng:ProtoTypes.string,
    defaultProductDescriptionChi:ProtoTypes.string,
    defaultProductDescriptionEng:ProtoTypes.string,
    defaulthasVariant:ProtoTypes.bool,
    defaultTags:ProtoTypes.array,
    defaultSubProducts:ProtoTypes.array,
    defaultUnitPrice:ProtoTypes.number,
    defaultInventory:ProtoTypes.number,
    defaultLimited:ProtoTypes.bool,
    defaultCoupons:ProtoTypes.array
    
};

export default NewCreateProduct