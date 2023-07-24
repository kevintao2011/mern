import React,{useEffect, useState} from 'react'
import { useParams , useNavigate, useLocation} from 'react-router-dom'
import { storage,uploadFormImageFiles,uploadFile } from '../../../utils/firebasefunction'
import { auth } from '../../../utils/firebasefunction'
const EditProduct = () => {
    
    const {code,id} = useParams()
    const location = useLocation();
    const [Product, setProduct] = useState()
    const [CatOption, setCatOption] = useState()

    const [productVariantsCount, setproductVariantsCount] = useState(0)
    const [productVariants, setproductVariants] = useState([])
    const [Category, setCategory] = useState()
    const [error, seterror] = useState()
    const [Submit, setSubmit] = useState()
    const [iconArray, setIconArray] = useState()
    
    async function handleUpload(e){
        e.preventDefault()
       
      
        const file = e.target.files[0];
        // const formData = new FormData(form);
        // const filename = "test"
        // const files = Object.entries(Object.fromEntries(formData.entries())) 
        console.log("file type",file.type)
        console.log("e.target",e.target.id)
        await uploadFile(`${code}/${Product._id}/`,`${e.target.id}_Icon`,file,storage).then(
           async ResultURL=>{
            console.log("PosterURL",ResultURL)
            await fetch("/api/changeproducticon",{
                method: "POST",
                body: JSON.stringify({
                    user:{
                        token:await auth.currentUser.getIdToken()
                    },
                    data:{
                        iconURL:ResultURL,
                        product_id:Product._id,
                        option_name:e.target.id
                    }
                }),
                headers: {
                "Content-Type": "application/json",
                // 'Content-Type': 'application/x-www-form-urlencoded',
                },
                mode:'cors'
                
            }).then(response=>{
                if( response.ok) {
                    setIconArray(ResultURL)
                    
                }
            })
            
           }
        )
        
    }
    const Inputblock = (props) => {
        const index = props.index
        // const info = props.info
        
        console.log("changeOption",typeof modifyHandler)

        const [defaultValue, setdefaultValue] = useState()
        useEffect(() => {

            
            if (props.info){
                setdefaultValue(props.info)
            }
            console.log("info inside card",props.info)
        
        }, [])
        
        return(
            defaultValue?(
                <div className="border-su-green border-dashed border-b-2" key={index}>
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
                <button
                    className='p-3 rounded-md text-white bg-su-green '
                    onClick={(e)=>{
                        e.preventDefault()
                        // modifyHandler(true)
                    }}
                >
                    add
                </button>
                    
                </div>
            ):(
                <div className="border-su-green border-dashed border-b-2" key={index}>
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
                <button
                    className='p-3 rounded-md text-white bg-su-green '
                    onClick={(e)=>{
                        e.preventDefault()
                        // modifyHandler(true)
                    }}
                >
                    add
                </button>
                    
                </div>
            )
            
            
            
        )
    }
    function changeOption(add,index){
        if(add){
            setproductVariantsCount(productVariantsCount+1);
            setproductVariants([...productVariants, <Inputblock index={productVariantsCount} modifyHandler={changeOption}/>]);
        }
    }
    const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmit(false)
    console.log("Submitting signup form",e.target);
    
    // // Read the form data
    const form = e.target;
    const formData = new FormData(form);
    console.log("formData",formData)
    
    
    
    const data = {};
    data.code = code // set Society Name
    
    formData.forEach((value, key) => {

        if (data[key]){
            
            data[key] = [...data[key],value]
        }else{
            data[key] = [value]
            
        }
        
        /* Output
        inventory: Array(3) [ "3", "3", "1" ]
​
        no_variants: Array [ "true" ]
        ​
        price: Array(3) [ "33", "22", "11" ]
        ​
        product_name: Array [ "Tee" ]
        ​
        status: Array [ "Later" ]
        ​
        type: Array [ "Clothes" ]
        ​
        variants: Array(3) [ "Brown", "Blue", "Red" ]
        */



        
    });
    console.log("form data",data)
    data.variants=[]
    data.variant.forEach((v,i)=>{
        
        console.log(v,i,data.price[i]);
        data.variants.push({
            
            name:v,price:data.price[i],inventory:data.inventory[i]
            
        })
        data._id=Product._id
        delete data.variant[i]

    })
    
    
    console.log("data",data)
    
    
    const reqbody = {
        user:{
            token:await auth.currentUser.getIdToken()
        },
        data
    }
    console.log("reqbody",reqbody)
    try{
     
        await fetch('/api/updateproduct', { 
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
              
              console.log("added")
             
            //   navigate(`/society/${code}/manage`)
              
              
          }else{
              console.log("response.body",await response.json())
              const data = await response.json()
              console.log("data.error",data)
              seterror(data.code)
              setSubmit(true)
              
          }  
      })
    }catch(e){
      setSubmit(true)
      console.log(e)
    }
    
    
    
}


  useEffect(() => {
    console.log("Product",location.state.Product)
    location.state.Product.forEach(i=>{
        console.log(i._id===id)
    })
    const product = location.state.Product.filter(item=>
        item._id===id
    )[0]
    
    setProduct(product);
    
    const varaintList = product.variants.map((variant,i)=>{
        console.log("product.variants",product.variants)
        return(<Inputblock index={productVariantsCount} info={variant} />);
    })

    console.log("varaintList",varaintList)
    setproductVariants(varaintList)
    setproductVariantsCount(varaintList.length)

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

    getCatOption()
    console.log(id)
    
  
    
  }, [])
  
  return (
    Product&&CatOption&&(
        
    <div className="mainpage-1 flex flex-col items-center justify-center">
        <h1 className='selectlink'>Edit Product</h1>
        <form action="" onSubmit={(e)=>{handleSubmit(e)}} className='bg-gray-100 p-10 rounded-lg w-10/12'>
            
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

         
            <div className="w-full flex flex-row justify-end">
                <button 
                    onClick={(e)=>{
                        e.preventDefault()
                        setproductVariantsCount(productVariantsCount+1);
                        setproductVariants([...productVariants, <Inputblock index={productVariantsCount}/>]);
                    }}
                    className='p-3 rounded-md text-white bg-su-green '
                >
                    Add new options 
                </button>
            </div>
    
            {productVariants}
         
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
            <button  
                className="flex flex-row py-2 w-full justify-center" 
                type="submit"
                // disabled={!Submit}
                
            >
                Submit
            </button>
            <p
                className="flex flex-row py-2 w-full justify-center text-red-600" 
            >
                {error}
            </p>
        </form>
        
        <div className="flex flex-row">
            {
                    Product.variants.map(variant=>{
                    return(
                        
                        <form action="">
                            {
                                iconArray[variant.name]&&(
                                    <img 
                                        src     ={iconArray[variant.name]}
                                        alt     = "promptation logo"
                                        width   = {300}
                                        height  = {300}
                                        className = "object-contain "
                                    />
                                )
                            }
                            
                            
                            <input type="file" id={variant.name} name="image" onChange={(e)=>{handleUpload(e);}}/>
                            <p>Logo for Option {variant.name}</p>
                        </form>
                    )
                })
            }
        </div>
    </div>
    )

    


  )
}

export default EditProduct