import React,{useState,useEffect,useMemo} from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { auth } from '../../../utils/firebasefunction'
import { useAuth } from '../../../components/session'
import { Inputblock } from './productInputBlock'


const CreateProduct = () => {
  
    const [Submit, setSubmit] = useState(true)
    const [error, seterror] = useState(null)
    const [productCount, setproductCount] = useState(2)
    const [Category, setCategory] = useState()
    const [CatOption, setCatOption] = useState()

    // const Inputblock = (props) => {
    //     const index = props.index
    //     const value = props.value
    //     const [defaultValue, setdefaultValue] = useState()
    //     if (props.value){
    //         setdefaultValue(value)
    //     }
    //     console.log("index",index)

    //     return(
           
    //         <div className="" key={index}>
    //             <div className="flex flex-row py-2 justify-between">
    //                 <label htmlFor="variant" className="w-full block mb-2 text-lg font-medium greentxt justify-self-start">
    //                     option
    //                 </label>
    //                 <span className='px-5'></span>
    //                 {
    //                     defaultValue?(
    //                         <input 
    //                             type="text"
    //                             name="variant" 
    //                             id="variant"  
    //                             required="required" 
    //                             defaultValue={defaultValue}
    //                             className='rounded-md px-5 w-full justify-self-center'
    //                         />
    //                     ):
    //                     (
    //                         <input 
    //                             type="text"
    //                             name="variant" 
    //                             id="variant"  
    //                             required="required" 
    //                             className='rounded-md px-5 w-full justify-self-center'
    //                         />
    //                     )
    //                 }
                    
    //             </div>
    //         <div className="flex flex-row py-2 justify-between">
    //             <label htmlFor="price" className="w-full block mb-2 text-lg font-medium greentxt justify-self-start">
    //                 price
    //             </label>
    //             <span className='px-5'></span>
    //             <input 
    //                 type="number"
    //                 name="price" 
    //                 id="price"  
    //                 required="required" 
    //                 className='rounded-md px-5 w-full justify-self-center'
    //             />
    //         </div>
    //         <div className="flex flex-row py-2 justify-between">
    //             <label htmlFor="inventory" className="w-full block mb-2 text-lg font-medium greentxt justify-self-start">
    //                 Inventory
    //             </label>
    //             <span className='px-5'></span>
    //             <input 
    //                 type="number"
    //                 name="inventory" 
    //                 id="inventory"  
    //                 required="required" 
    //                 className='rounded-md px-5 w-full justify-self-center'
    //             />
    //         </div>
                
    //         </div>
            
            
    //     )
    // }
    const [productEntries, setproductEntries] = useState([<Inputblock index={productCount} />])

    const [noVariant, setnoVariant] = useState(false)
    const navigate = useNavigate()
    const {setuserDBInfo,userDBInfo,Soc} = useAuth()
    const {code} = useParams()
    console.log("code",code)

    useEffect(() => {
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
                    
                    console.log("added")
                    var data = await response.json()
                    data = data[0]
                    console.log("CatOptions",data)
                    setCatOption(data.categories)
                    console.log("CatOptions",CatOption)
                    
                }else{
                    console.log("response.body",await response.json())
                    const data = await response.json()
                    console.log("data.error",data)
                    setCatOption(data)
                    
                }  
            })
        }

        getCatOption()
        console.log("productCount",productCount)
        console.log("productEntries",productEntries)
       
        return () => {
        
        }
    }, [productCount])
    
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
                [v]:{
                    name:v,price:data.price[i],inventory:data.inventory[i]
                }
            })
            
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
         
            await fetch('/api/createproduct', { 
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
        
        
      //   try{
      //       //FirebaseError: Firebase: Error (auth/admin-restricted-operation).
      //       await createUserWithEmailAndPassword(auth,data.email,data.password);
      //   }catch(e){
      //       console.log("Error:",e);
      //   }
      //   You can pass formData as a fetch body directly:
        
  
        
    }
    return (

    CatOption&&(
        
        <div className="mainpage-1 flex flex-col items-center justify-center">
            <h1 className='selectlink'>Create Product</h1>
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
                        onChange={(e)=>{setCategory(e.target.value);/*console.log(productEntries[0].type)*/}}
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

                {/* <div className="flex flex-row py-2 justify-between">
                    
                    <label htmlFor="no_variants" className="w-full block mb-2 text-lg font-medium greentxt justify-self-start">
                        Multiple option?
                    </label>
                    <span className='px-5'></span>

                    <label className="relative inline-flex w-full items-center cursor-pointer">
                        <input type="checkbox" id="no_variants" name='no_variants' value={noVariant} className="sr-only peer" onClick={()=>{setnoVariant(prev=>!prev);console.log("use Effect:",noVariant)}} />
                        <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-2 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                    
                    </label>


                </div> */}
                <div className="w-full flex flex-row justify-end">
                    <button 
                        onClick={(e)=>{
                            e.preventDefault()
                            setproductCount(productCount+1);
                            setproductEntries([...productEntries, <Inputblock index={productCount}/>]);
                            
                        }}
                        className='p-3 rounded-md text-white bg-su-green '
                    >
                        Add new options 
                    </button>
                </div>
                
                {/* <ul> */}
                {productEntries}
                {/* </ul> */}
                
                
            
            
                
                
            
                {/* <div className="flex flex-row py-2 justify-between">
                    <label htmlFor="description" className="w-full block mb-2 text-lg font-medium greentxt justify-self-start">
                        description
                    </label>
                    <span className='px-5'></span>
                    <input 
                        type="text"
                        name="description" 
                        id="description"  
                        required="required" 
                        placeholder='Student Number on Your Card'
                        className='rounded-md px-5 w-full justify-self-center'
                    />
                    
                
                </div> */}
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
                        defaultValue={'Later'} 
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
            
        </div>
        )
    )
    
    
    
    
}

export default CreateProduct
