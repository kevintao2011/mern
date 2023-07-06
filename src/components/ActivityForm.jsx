import React,{useState,useEffect} from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { auth } from '../utils/firebasefunction'
import { useAuth } from './session'

const ActivityForm = () => {
  
    const [Submit, setSubmit] = useState(true)
    const [error, seterror] = useState(null)
    const [jupas, setjupas] = useState(null)
    const navigate = useNavigate()
    const {setuserDBInfo,userDBInfo,Soc} = useAuth()
    const {id} = useParams()
    console.log("id",id)
    
    useEffect(() => {
        async function getJupas(){
            console.log("get jupas")
            await fetch("/api/getjupas"
            ).then(async res=>{
                await res.json().then(data=>{
                    console.log("data",data)
                    setjupas(data)
                })
            })
        }
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
        
        
        const data = {};
        
        formData.forEach((value, key) => (data[key] = value));
        const soc = new Map();
        soc.set(data.major,"member")
        console.log("societies", Object.fromEntries(soc))
        data.societies = Object.fromEntries(soc)

        console.log(data)
        
        const reqbody = {
            user:{
                token:await auth.currentUser.getIdToken()
            },
            data
        }
        console.log(reqbody)
      //  register in server side
        // try{
        //   // await createUserWithEmailAndPassword(auth,data.email,data.password)
        //   await fetch('/api/editUser', { 
        //       method: "POST",
        //       body: JSON.stringify(reqbody),
        //       headers: {
        //       "Content-Type": "application/json",
        //       // 'Content-Type': 'application/x-www-form-urlencoded',
        //       },
        //       mode:'cors'
              
        //   }).then(async response => {
              
        //       if (response.ok){
        //           // registered
                  
        //           console.log("registered")
        //           const data = await response.json()
        //           setuserDBInfo(data.user)
        //           navigate("/")
        //       }else{
        //           console.log("response.body",response.body)
        //           const data = await response.json()
        //           console.log("data.error",data)
        //           seterror(data.code)
        //           setSubmit(true)
        //       }  
        //   })
        // }catch(e){
        //   setSubmit(true)
        //   console.log(e)
        // }
        
        
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
                    value={id}
                    placeholder={id}
                    className='rounded-md px-5 w-full justify-self-center'
                    disabled={true}
                />
            </div>
            <div className="flex flex-row py-2 justify-between">
                <label htmlFor="end_date" className="w-full block mb-2 text-lg font-medium greentxt justify-self-start">
                    Start Date
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
                    <input type="checkbox" name="" id="" /> Cash
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
                <label htmlFor="gender" className="w-full block mb-2 text-lg font-medium greentxt justify-self-start">
                    Start Now? 
                </label>
                <span className='px-5'></span>
                <select 
                    name="gender" 
                    id="gender"  
                    defaultValue={'O'} 
                    required="required" 
                    className='rounded-md px-5 w-full justify-self-center'
                >
                    <option value="Male">Later</option>
                    <option value="Female">Now</option>
                    
                </select>
            </div>
            <button 
                className="flex flex-row py-2 w-full justify-center" 
                type="submit"
                disabled={!Submit}
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