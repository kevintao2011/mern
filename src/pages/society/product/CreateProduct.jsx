import React,{useState,useEffect} from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { auth } from '../../../utils/firebasefunction'
import { useAuth } from '../../../components/session'
const CreateProduct = () => {
  
    const [Submit, setSubmit] = useState(true)
    const [error, seterror] = useState(null)
    const [productCount, setproductCount] = useState(1)

    const [noVariant, setnoVariant] = useState(false)
    const navigate = useNavigate()
    const {setuserDBInfo,userDBInfo,Soc} = useAuth()
    const {code} = useParams()
    console.log("code",code)
    const inputBlocks = [];
    const inputblock = (
        <div className="">
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
                
            </div>
    )
    useEffect(() => {
        console.log(inputBlocks)
    
        return () => {
        
        }
    }, [inputBlocks])
    
    const handleSubmit = async (e) => {
        setSubmit(false)
        console.log("Submitting signup form");
        e.preventDefault();
        // Read the form data
        const form = e.target;
        const formData = new FormData(form);
        console.log("formData.noVariant",formData.noVariant)
        
        
        const data = {};
        data.code = code // set Society Name
        
        formData.forEach((value, key) => (data[key] = value));
        if (!data.no_variants){
            data.no_variants = noVariant
        }
        

        console.log(data)
        
        const reqbody = {
            user:{
                token:await auth.currentUser.getIdToken()
            },
            data
        }
        console.log(reqbody)
      //  register in server side
        try{
          // await createUserWithEmailAndPassword(auth,data.email,data.password)
          await fetch('/api/createacticvity', { 
              method: "POST",
              body: JSON.stringify(reqbody),
              headers: {
              "Content-Type": "application/json",
              // 'Content-Type': 'application/x-www-form-urlencoded',
              },
              mode:'cors'
              
          }).then(async response => {
              
              if (response.ok){
                  // registered
                  
                  console.log("added")
                 
                  navigate(`/society/${code}/manage`)
                  
                  
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
    <div className="mainpage-1 flex flex-col items-center justify-center">
        <form action="" onSubmit={(e)=>{handleSubmit(e)}}>
            
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
                
                <label htmlFor="no_variants" className="w-full block mb-2 text-lg font-medium greentxt justify-self-start">
                    Multiple option?
                </label>
                <span className='px-5'></span>

                <label className="relative inline-flex w-full items-center cursor-pointer">
                    <input type="checkbox" id="no_variants" name='no_variants' value={noVariant} className="sr-only peer" onClick={()=>{setnoVariant(prev=>!prev);console.log("use Effect:",noVariant)}} />
                    <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-2 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                   
                </label>


            </div>
            <button 
                onClick={()=>{
                    setproductCount(productCount+1)
                    console.log(productCount,inputBlocks)
                    inputBlocks.push(
                        inputblock
                    )
                }}>
                new 
            </button>
            {
                inputBlocks
            }
            
        
        
            
            
           
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
                    <option value="Later">Later</option>
                    <option value="Now">Now</option>
                    
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
}

export default CreateProduct