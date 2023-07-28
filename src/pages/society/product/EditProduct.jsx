import React,{useEffect, useState} from 'react'
import { useParams , useNavigate, useLocation} from 'react-router-dom'
import { storage,uploadFormImageFiles,uploadFile } from '../../../utils/firebasefunction'
import { auth } from '../../../utils/firebasefunction'
const EditProduct = () => {
    
    const {code,id} = useParams()
    const location = useLocation();
    const [Product, setProduct] = useState()
    const [CatOption, setCatOption] = useState()
    const [addingBlock, setaddingBlock] = useState(false)

    const [productVariantsCount, setproductVariantsCount] = useState(0)
    const [productVariants, setproductVariants] = useState([])
    const [Category, setCategory] = useState()
    const [error, seterror] = useState()
    const [Submit, setSubmit] = useState()
    const [IconMap, setIconMap] = useState({})
    const [Edit, setEdit] = useState()
    const [ProductIconURL, setProductIconURL] = useState()
    

    async function changeProductMainIcon(e){ //upload option icon
        e.preventDefault()
        console.log("Uploading to",`${code}/product/${id}/ProductIcon`)
        const file = e.target.files[0];
        await uploadFile(`${code}/product/${id}/`,`ProductIcon`,file,storage)
            .then(async ResultURL=>{
                console.log("PosterURL",ResultURL)
                await fetch("/api/changeproductmainicon",{
                    method: "POST",
                    body: JSON.stringify({
                        user:{
                            token:await auth.currentUser.getIdToken()
                        },
                        data:{
                            product_icon:ResultURL,
                            product_id:id,
                        }
                    }),
                    headers: {
                    "Content-Type": "application/json",
                    // 'Content-Type': 'application/x-www-form-urlencoded',
                    },
                    mode:'cors'
                    
                })
                .then(response=>{
                    if( response.ok){
                        setProductIconURL(ResultURL)
                        
                    }
                })
            }
        )
    }
    
    const Inputblock = (props) => {
        const index = props.index
        // const info = props.info
        
        console.log("changeOption",typeof modifyHandler)
        const [Status, setStatus] = useState()
        const [defaultValue, setdefaultValue] = useState()
        const [NewIndex, setNewIndex] = useState()
        const [NewImgURL, setNewImgURL] = useState()
        const [NewOptionName, setNewOptionName] = useState()
        useEffect(() => {
            if (props.info){
                setdefaultValue(props.info)
            }
            console.log("info inside card",props.info)
        }, [])
        var i 
        if(defaultValue){
            i = defaultValue.index
        }else{
            i = NewIndex
        }
        async function UploadSingle(e){ //upload option icon
            e.preventDefault()
            setStatus("Uploading to",`${code}/product/${id}/${i}_Icon`)
            const file = e.target.files[0];
            await uploadFile(`${code}/product/${id}/`,`${i}_Icon`,file,storage)
                .then(async ResultURL=>{
                    console.log("PosterURL",ResultURL)
                    await fetch("/api/changeproducticon",{
                        method: "POST",
                        body: JSON.stringify({
                            user:{
                                token:await auth.currentUser.getIdToken()
                            },
                            data:{
                                iconURL:ResultURL,
                                product_id:id,
                                option_name:e.target.id
                            }
                        }),
                        headers: {
                        "Content-Type": "application/json",
                        // 'Content-Type': 'application/x-www-form-urlencoded',
                        },
                        mode:'cors'
                        
                    })
                    .then(response=>{
                        if( response.ok){
                            if(defaultValue){
                                defaultValue.icon_url = ResultURL
                            }else{
                                setNewImgURL(ResultURL)
                            }
                            
                            setStatus("Uploaded")
                        }
                    })
                }
            )
        }

       

        // handle single option
        async function handleEdit(e){
            e.preventDefault()
            setEdit(false)
            // // Read the form data
            const form = e.target;
            const formData = new FormData(form);
            console.log("optioninfo formData",formData)
            const data = {};
            data._id = id
            data.index = defaultValue.index
            formData.forEach((value, key) => {
                data[key] = value
            });
            console.log(data)
            try{
        
                await fetch('/api/updateoptioninfo', { 
                    method: "POST",
                    body: JSON.stringify({
                        user:{
                            token:await auth.currentUser.getIdToken()
                        },
                        data
                    }),
                    headers: {
                    "Content-Type": "application/json",
                    // 'Content-Type': 'application/x-www-form-urlencoded',
                    },
                    mode:'cors'
                }
                
            ).then(async response => {
                
                if (response.ok){
                    console.log("added")
                }else{
                    const data = await response.json()
                    console.log("data.error",data)
                    seterror(data.code)
                    setSubmit(true)
                }  
            })
            }catch(e){
                setSubmit(false)
                console.log(e)
            }
        }
        async function addOption(e){
            e.preventDefault()
            setEdit(false)
            // // Read the form data
            const form = e.target;
            const formData = new FormData(form);
            console.log("optioninfo formData",formData)
            const data = {};
            data._id = id
            formData.forEach((value, key) => {
                data[key] = value
            });
            console.log(data)
            try{
        
                await fetch('/api/addproductoption', { 
                    method: "POST",
                    body: JSON.stringify({
                        user:{
                            token:await auth.currentUser.getIdToken()
                        },
                        data
                    }),
                    headers: {
                    "Content-Type": "application/json",
                    // 'Content-Type': 'application/x-www-form-urlencoded',
                    },
                    mode:'cors'
                }
                
            ).then(async response => {
                
                if (response.ok){
                    console.log("added")
                    const data = await response.json()
                    setNewIndex(data.index)
                    setNewOptionName(data.name)
                }else{
                    const data = await response.json()
                    console.log("data.error",data)
                    
                    seterror(data.code)
                    setSubmit(true)
                }  
            })
            }catch(e){
                setSubmit(false)
                console.log(e)
            }
        }
        async function removeOption(index,id){
            try{
                await fetch('/api/removeproductoption', { 
                    method: "POST",
                    body: JSON.stringify({
                        "user":{
                            token:await auth.currentUser.getIdToken()
                        },
                        "data":{
                            index:index,
                            _id : id
                        }
                    }),
                    headers: {
                    "Content-Type": "application/json",
                    // 'Content-Type': 'application/x-www-form-urlencoded',
                    },
                    mode:'cors'
                }
                
            ).then(async response => {
                
                if (response.ok){
                    console.log("added")
                    seterror("removed")
                    productVariants.splice(index,1)
                    setproductVariants([...productVariants])
                    
                }else{
                    const data = await response.json()
                    console.log("data.error",data)
                    seterror("data.code")
                    setSubmit(true)
                }  
            })
            }catch(e){
                setSubmit(false)
                console.log(e)
            }
        }
        return(
            defaultValue?(
                    <div className="flex flex-col border-su-green border-dashed border-b-2 my-5">
                            <div className=" flex flex-row" key={index}>
                                <div className="LHS w-9/12">
                                    <form action="" onSubmit={(e)=>{handleEdit(e)}}>
                                        <div className="flex flex-row py-2 justify-between">
                                            <label htmlFor="variant" className="w-full block mb-2 text-lg font-medium greentxt justify-self-start">
                                                option
                                            </label>
                                            <span className='px-5'></span>
                                            {
                                                defaultValue?(
                                                    <input 
                                                        type="text"
                                                        name="variant" 
                                                        id="variant"  
                                                        required="required" 
                                                        defaultValue={defaultValue?.name}
                                                        className='rounded-md px-5 w-full justify-self-center'
                                                    />
                                                ):
                                                (
                                                    <input 
                                                        type="text"
                                                        name="variant" 
                                                        id="variant"  
                                                        required="required" 
                                                        className='rounded-md px-5 w-full justify-self-center'
                                                    />
                                                )
                                            }
                                        
                                            
                                        </div>
                                        <div className="flex flex-row py-2 justify-between">
                                            <label htmlFor="price" className="w-full block mb-2 text-lg font-medium greentxt justify-self-start">
                                                price
                                            </label>
                                            <span className='px-5'></span>
                                            <input 
                                                type="number"
                                                name="price" 
                                                id="price"  
                                                required="required" 
                                                className='rounded-md px-5 w-full justify-self-center'
                                                defaultValue={defaultValue?.price}
                                            />
                                        </div>
                                        <div className="flex flex-row py-2 justify-between">
                                            <label htmlFor="inventory" className="w-full block mb-2 text-lg font-medium greentxt justify-self-start">
                                                Inventory
                                            </label>
                                            <span className='px-5'></span>
                                            <input 
                                                type="number"
                                                name="inventory" 
                                                id="inventory"  
                                                required="required" 
                                                className='rounded-md px-5 w-full justify-self-center'
                                                defaultValue={defaultValue?.inventory}
                                            />
                                            
                                        </div>
                                        <div className="w-full flex flex-row justify-end my-5">
                                            <button 
                                                type='submit'
                                                className='p-3 rounded-md text-white bg-su-green mx-2'
                                            >
                                                modify 
                                            </button>
                                            <button 
                                                onClick={()=>{
                                                    removeOption(defaultValue.index,id)
                                                }}
                                                className='p-3 rounded-md text-white bg-red-700 '
                                                type='button'
                                            >
                                                remove 
                                            </button>
                                        
                                        </div>
                                    </form>
                                </div>
                                <div className="RHS w-3/12 ml-5">
                                    {
                                        defaultValue.icon_url?(
                                            <img 
                                                src     ={defaultValue.icon_url}
                                                alt     = {`IconMap_${defaultValue.icon_url}`}
                                                width   = {200}
                                                height  = {200}
                                                className = "object-contain rounded-3xl "
                                                
                                            />
                                        ):(
                                            <img 
                                                src     ={"/assests/img/cow.png"}
                                                alt     = {`IconMap_${defaultValue.icon_url}`}
                                                width   = {200}
                                                height  = {200}
                                                className = "object-contain rounded-3xl "
                                            />
                                        )
                                    }
                                    
                                    <input type="file" id={defaultValue.index} name="image" onChange={(e)=>{UploadSingle(e);}}/>
                                    <p>Option Image</p>
                                    <p className='text-red-600'>
                                        {Status}
                                    </p>
                                </div>
                                
                                
                            
                                
                                
                            </div> 
                            
                    </div>
                
            ):(
                <div className="flex flex-col border-su-green border-dashed border-b-2 my-5">
                        <div className=" flex flex-row" key={index}>
                            <div className="LHS w-9/12">
                                <form action="" onSubmit={(e)=>{addOption(e)}}>
                                    <div className="flex flex-row py-2 justify-between">
                                        <label htmlFor="variant" className="w-full block mb-2 text-lg font-medium greentxt justify-self-start">
                                            option
                                        </label>
                                        <span className='px-5'></span>
                                        
                                        <input 
                                            type="text"
                                            name="variant" 
                                            id="variant"  
                                            required="required" 
                                            className='rounded-md px-5 w-full justify-self-center'
                                        />
                                       
                                    
                                        
                                    </div>
                                    <div className="flex flex-row py-2 justify-between">
                                        <label htmlFor="price" className="w-full block mb-2 text-lg font-medium greentxt justify-self-start">
                                            price
                                        </label>
                                        <span className='px-5'></span>
                                        <input 
                                            type="number"
                                            name="price" 
                                            id="price"  
                                            required="required" 
                                            className='rounded-md px-5 w-full justify-self-center'
                                            
                                        />
                                    </div>
                                    <div className="flex flex-row py-2 justify-between">
                                        <label htmlFor="inventory" className="w-full block mb-2 text-lg font-medium greentxt justify-self-start">
                                            Inventory
                                        </label>
                                        <span className='px-5'></span>
                                        <input 
                                            type="number"
                                            name="inventory" 
                                            id="inventory"  
                                            required="required" 
                                            className='rounded-md px-5 w-full justify-self-center'
                                            
                                        />
                                        
                                    </div>
                                    {
                                        !NewIndex&&(
                                            <div className="w-full flex flex-row justify-end my-5">
                                            <button 
                                                type='submit'
                                                className='p-3 rounded-md text-white bg-su-green mx-2'
                                            >
                                                upload 
                                            </button>
                                        
                                    </div>
                                        )
                                    }
                                    
                                    
                                </form>
                            </div>
                            {
                                NewIndex&&(
                                    <div className="RHS w-3/12 ml-5">
                                        {
                                            NewImgURL&&(
                                                <img 
                                                    src     ={NewImgURL}
                                                    alt     = {"Product_Image"}
                                                    width   = {200}
                                                    height  = {200}
                                                    className = "object-contain rounded-3xl "
                                                />
                                            )
                                        }
                                        
                                        <input type="file" id={NewOptionName} name="image" onChange={async (e)=>{await UploadSingle(e);}}/>
                                        {
                                            NewOptionName&&(
                                                <p>Option {NewOptionName}</p>
                                            )
                                        }
                                        
                                        <p className='text-red-600'>
                                            {Status}
                                        </p>
                                    </div>
                                )
                            }
                            
                            
                            
                        </div> 
                        
                </div>
            )
        )
    }


    // handle basic info of product
    async function handleSubmit (e){
        e.preventDefault();
        setSubmit(true)
        console.log("Submitting signup form",e.target);
        
        // // Read the form data
        const form = e.target;
        const formData = new FormData(form);
        console.log("formData",formData)
        
        const data = {};
        data.code = code // set Society Name
        data._id = id
        formData.forEach((value, key) => {
            console.log(value)
            data[key] = value

        });
        console.log("form data",data)

        const reqbody = {
            user:{
                token:await auth.currentUser.getIdToken()
            },
            data
        }
        console.log("reqbody",reqbody)
        try{
        
            await fetch('/api/updateproductinfo', { 
                method: "POST",
                body: JSON.stringify(reqbody),
                headers: {
                "Content-Type": "application/json",
                // 'Content-Type': 'application/x-www-form-urlencoded',
                },
                mode:'cors'
            }
            
        ).then(async response => {
            
            if (response.ok){
                // registered
                var p = Product
                p.product_name = data.product_name
                setProduct(p)
                console.log("added")
                
                //   navigate(`/society/${code}/manage`)
                
                
            }else{
                
                const data = await response.json()
                console.log("data.error",data)
                seterror(data.code)
                setSubmit(true)
                
            }  
        })
        }catch(e){
            setSubmit(false)
            console.log(e)
        }
        
        
        
    }
    

    //Load Product
    useEffect(() => {
        // console.log("Product",location.state.Product)
        // location.state.Product.forEach(i=>{
        //     console.log(i._id===id)
        // })
        // const product = location.state.Product.filter(item=>
        //     item._id===id
        // )[0]

        async function getCatOption(){
            await fetch('/api/getcatoption', { 
                method: "POST",
                body: JSON.stringify({
                    user:{
                        token:await auth.currentUser.getIdToken()
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
                    
                    console.log("fetched CatOptions")
                    var data = await response.json()
                    data = data[0]
                    console.log("CatOptions",data)
                    setCatOption(data.categories)
                   
                    
                }else{
                    console.log("response.body",await response.json())
                    const data = await response.json()
                    console.log("data.error",data)
                    setCatOption(data)
                    
                }  
            })
        }
          

        // setProduct(product)
        async function fetchProductInfo(){
            console.log("fetching activity: ", id)
            await fetch('/api/getproduct', { 
            method: "POST",
            body: JSON.stringify({
                user:{
                    token:await auth.currentUser.getIdToken()
                },
                id:id
            }),
            headers: {
            "Content-Type": "application/json",
            // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            mode:'cors'
            
        }).then(async response => {
            
            if (response.ok){
                // registered
                
                console.log("product")
                var data = await response.json()
                data = data.product
                console.log("Product",data)
                setProduct(data);
                const varaintList = data.variants.map((variant,i)=>{
                    console.log("Product.variants",data.variants)
                    return(<Inputblock index={i} info={variant} />);
                })
                setProductIconURL(data.product_icon)
                
                console.log("varaintList",varaintList)
                setproductVariants(varaintList)
                setproductVariantsCount(varaintList.length)
                // fetch Category option
                console.log(id)
                
            }else{
                console.log("response.body",await response.json())
 
            }  
        })
        }
        async function runAllfunction(){
            await getCatOption()
            await fetchProductInfo()
        }
        runAllfunction()
        //create variant blocks
        

    }, [])
  
    return (
        Product&&CatOption&&(
            
            <div className=" mainpage-i flex flex-col items-center justify-center ">
                <h1 className='selectlink'>Edit Product</h1>
                
                <div className="flex flex-row bg-gray-100 p-10 rounded-lg w-10/12">
                    <form action="" onSubmit={(e)=>{handleSubmit(e)}} className='w-3/4'>
                        
                        <div className="flex flex-row py-2 justify-between"> 
                            <div className="">
                                
                            </div>
                            <label htmlFor="society" className="w-full block mb-2 text-lg font-medium greentxt justify-self-start">
                                Society
                            </label>
                            <span className='px-5'></span>

                            <input 
                                type="text"
                                name="code" 
                                id="code"  
                                required="required" 
                                value={code}
                                placeholder={code}
                                className='rounded-md px-5 w-full justify-self-center'
                                disabled={true}
                            />

                        </div>

                        <div className="flex flex-row py-2 justify-between">
                            <label htmlFor="product_name" className="w-full block mb-2 text-lg font-medium greentxt justify-self-start">
                                Product Name
                            </label>
                            <span className='px-5'></span>
                            <input 
                                type="text"
                                name="product_name" 
                                id="product_name"  
                                required="required" 
                                className='rounded-md px-5 w-full justify-self-center'
                                defaultValue={Product.product_name}
                            />
                            
                        
                        </div>

                        <div className="flex flex-row py-2 justify-between">
                            <label htmlFor="type" className="w-full block mb-2 text-lg font-medium greentxt justify-self-start" >
                                Product Category
                            </label>
                            <span className='px-5'></span>
                            {/*<input 
                                type="text"
                                name="type" 
                                id="type"  
                                required="required" 
                                className='rounded-md px-5 w-full justify-self-center'
                            /> */}
                            <select 
                                name="type" 
                                id="type"
                                required="required" 
                                className='rounded-md px-5 w-full justify-self-center'
                                defaultValue={Product.type}
                                onChange={(e)=>{setCategory(e.target.value);/*console.log(productVariants[0].type)*/}}
                            >
                                {CatOption.map(option=>{
                                    return(
                                        <option value={option}>{option}</option>
                                    )
                                })}
                                
                                {/* <option value="clothes">clothes</option>
                                <option value="souvernirs">souvernirs</option>
                                <option value="membership">membership</option> */}
                            </select>
                        
                        </div>
                        <div className="flex flex-row py-2 justify-between">
                            <div className="">
                                
                            </div>
                            <label htmlFor="status" className="w-full block mb-2 text-lg font-medium greentxt justify-self-start">
                                Release Now? 
                            </label>
                            <span className='px-5'></span>
                            <select 
                                name="status" 
                                id="status"  
                                defaultValue={Product.status} 
                                required="required" 
                                className='rounded-md px-5 w-full justify-self-center'
                            >
                                <option value="inactive">Later</option>
                                <option value="active">Now</option>
                                
                            </select>
                        </div>
                
                        <div className="flex flex-row py-2 w-full justify-end">
                            <button  
                                className="p-3  bg-su-green text-lg text-white rounded-md" 
                                type="submit"
                                // disabled={!Submit}
                                
                            >
                                update 
                            </button>
                        </div>
                    </form>
                    <div className="flex flex-col w-1/4 px-5">
                        <p className='selectlink '>Product Icon</p>
                        {
                            ProductIconURL&&(
                                <img 
                                    src     ={ProductIconURL}
                                    alt     = {`Product Icon`}
                                    width   = {200}
                                    height  = {200}
                                    className = "object-contain rounded-3xl "
                                />
                            )
                        }
                        <input 
                            type="file" 
                            name="" 
                            id="" 
                            onChange={(e)=>{
                                changeProductMainIcon(e)
                            }}
                        />
                    </div>
                </div>
                    
                

                {/* {
                    addingBlock&&(
                        <div className="flex flex-col bg-gray-100 p-10 rounded-lg w-10/12">
                            {productVariants}
                        </div>
                    )
                } */}
                <div className="flex flex-col bg-gray-100 p-10 rounded-lg w-10/12">
                    {productVariants}
                </div>
                    
                
                <div className="flex flex-col bg-gray-100 p-10 rounded-lg w-10/12">
                    <div className="w-full flex flex-row justify-end ">
                        <button 
                            onClick={(e)=>{
                                e.preventDefault()
                                setaddingBlock(true)

                                setproductVariants([...productVariants, <Inputblock index={productVariantsCount}/>]);
                                console.log("productVariants",productVariants)
                                setaddingBlock(false)
                            }}
                            className='p-3 rounded-md text-white bg-su-green my-5'
                        >
                            Add new options 
                        </button>
                    
                    </div>
                    <p
                        className="flex flex-row py-2 w-full justify-center text-red-600" 
                    >
                        {error}
                    </p>
                </div>    
                
                    
                    
                    
                
                
                
               
                
            </div>
        )

        


    )
}

export default EditProduct