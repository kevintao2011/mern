import React,{useState,useEffect} from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { auth } from '../utils/firebasefunction'
import { useAuth } from './session'

const ActivityForm = () => {
  
    const [Submit, setSubmit] = useState(true)
    const [error, seterror] = useState(null)

    const [singleDay, setsingleDay] = useState(false)
    const navigate = useNavigate()
    const {setuserDBInfo,userDBInfo,Soc} = useAuth()
    const {code} = useParams()
    console.log("code",code)
    
    useEffect(() => {
        
        
        // if (userDBInfo.first_login===false){
        //     navigate("/")
        // }else{
            
        //     getJupas()
        
        // }
    
        return () => {
        
        }
    }, [])
    
    const handleSubmit = async (e) => {
        setSubmit(false)
        console.log("Submitting signup form");
        e.preventDefault();
        // Read the form data
        const form = e.target;
        const formData = new FormData(form);
        console.log("formData.singleDay",formData.singleDay)
        
        
        const data = {};
        data.code = code // set Society Name
        
        formData.forEach((value, key) => (data[key] = value));
        if (!data.single_date){
            data.single_date = singleDay
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
                <label htmlFor="activity_name" className="w-full block mb-2 text-lg font-medium greentxt justify-self-start">
                    Activity name
                </label>
                <span className='px-5'></span>
                <input 
                    type="text"
                    name="activity_name" 
                    id="activity_name"  
                    required="required" 
                    className='rounded-md px-5 w-full justify-self-center'
                />
                
               
            </div>

            <div className="flex flex-row py-2 justify-between">
                
                <label htmlFor="single_date" className="w-full block mb-2 text-lg font-medium greentxt justify-self-start">
                    Single Date?
                </label>
                <span className='px-5'></span>

                <label className="relative inline-flex w-full items-center cursor-pointer">
                    <input type="checkbox" id="single_date" name='single_date' value={singleDay} className="sr-only peer" onClick={()=>{setsingleDay(prev=>!prev);console.log("use Effect:",singleDay)}} />
                    <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-2 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                   
                </label>


            </div>
            
            
            {singleDay?(
                <div className="">
                    <div className="flex flex-row py-2 justify-between">
                        <label htmlFor="start_date" className="w-full block mb-2 text-lg font-medium greentxt justify-self-start">
                            Activity Date
                        </label>
                        <span className='px-5'></span>
                        <input 
                            type="date"
                            name="start_date" 
                            id="start_date"  
                            required="required" 
                            className='rounded-md px-5 w-full justify-self-center'
                        />
                    </div>
                    <div className="flex flex-row py-2 justify-between">
                        <label htmlFor="start_time" className="w-full block mb-2 text-lg font-medium greentxt justify-self-start">
                            Start Time
                        </label>
                        <span className='px-5'></span>
                        <input 
                            type="time"
                            name="start_time" 
                            id="start_time"  
                            required="required" 
                            className='rounded-md px-5 w-full justify-self-center'
                        />
                    </div>
                    <div className="flex flex-row py-2 justify-between">
                        <label htmlFor="end_time" className="w-full block mb-2 text-lg font-medium greentxt justify-self-start">
                            End Time
                        </label>
                        <span className='px-5'></span>
                        <input 
                            type="time"
                            name="end_time" 
                            id="end_time"  
                            required="required" 
                            className='rounded-md px-5 w-full justify-self-center'
                        />
                    </div>
                </div>
                

                
            ):(
                <div className="">
                    <div className="flex flex-row py-2 justify-between">
                        <label htmlFor="start_date" className="w-full block mb-2 text-lg font-medium greentxt justify-self-start">
                            Start Date
                        </label>
                        <span className='px-5'></span>
                        <input 
                            type="date"
                            name="start_date" 
                            id="start_date"  
                            required="required" 
                            className='rounded-md px-5 w-full justify-self-center'
                        />
                        
                    
                    </div>

                    <div className="flex flex-row py-2 justify-between">
                        <label htmlFor="end_date" className="w-full block mb-2 text-lg font-medium greentxt justify-self-start">
                        End Date
                        </label>
                        <span className='px-5'></span>
                        <input 
                            type="date"
                            name="end_date" 
                            id="end_date"  
                            required="required" 
                            className='rounded-md px-5 w-full justify-self-center'
                        />
                        
                    
                    </div>
                </div>
            )}
            
            
            
            
            <div className="flex flex-row py-2 justify-between">
                <label htmlFor="payment_method" className="w-full block mb-2 text-lg font-medium greentxt justify-self-start">   
                    payment method
                </label>
                <span className='px-5'></span>
                {/* <select 
                    
                    type="text"
                    name="payment_method" 
                    id="payment_method"  
                    required="required" 
                    className='rounded-md px-5 w-full justify-self-center'
                >
                    <option value="cash" >cash</option>
                    <option value="FPS" >FPS</option>
                    
                </select> */}
                <div className="rounded-md px-5 w-full justify-self-center">
                    <input type="checkbox" name="payment_method" id="payment_method" value={"Cash"} /> Cash
                </div>
                
                
                
               
            </div>
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
                    defaultValue={'O'} 
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

export default ActivityForm