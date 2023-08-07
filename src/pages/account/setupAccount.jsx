import React,{useState,useEffect} from 'react'
import { auth } from '../../utils/firebasefunction'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../components/session'
const SetupAccount = () => {
    
    const [Submit, setSubmit] = useState(true)
    const [error, seterror] = useState(null)
    const [jupas, setjupas] = useState(null)
    const navigate = useNavigate()
    const {setuserDBInfo,userDBInfo} = useAuth()
    console.log(userDBInfo)
    
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
        if (userDBInfo.first_login===false){
            navigate("/")
        }else{
            
            getJupas()
        
        }
    
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
          await fetch('/api/editUser', { 
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
                  
                  console.log("registered")
                  const data = await response.json()
                  setuserDBInfo(data.user)
                  navigate("/")
              }else{
                  console.log("response.body",response.body)
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
                <label htmlFor="major" className="w-full block mb-2 text-lg font-medium greentxt justify-self-start">
                    Major
                </label>
                <span className='px-5'></span>
                <select 
                    name="major" 
                    id="major"  
                    defaultValue={'Please Select your Major'} 
                    required="required" 
                    className='rounded-md px-5 w-full justify-self-center'
                >
                    {/* <option value="default" disabled="disabled">Please Select your Major</option> */}
                    {/* <option value="BA (Hons) Chinese">BA (Hons) Chinese</option> */}
                    {
                        jupas&&jupas.map(info=>{
                            return(<option value={info.code}> {info.jupas_code}-{info.short_name} </option>)
                        })
                        // jupas&&jupas.forEach(major=>{
                        //     console.log("major",major)
                        //     major.map(info=>{
                        //     return(<option> {info.jupas_code}{info.short_name} </option>)
                        //     })
                        // })
                    }
                </select>
            </div>
            <div className="flex flex-row py-2 justify-between">
                <label htmlFor="contact" className="w-full block mb-2 text-lg font-medium greentxt justify-self-start">
                    Contact
                </label>
                <span className='px-5'></span>
                <input 
                    type="tel"
                    name="contact" 
                    id="contact"  
                    required="required" 
                    placeholder='Please Enter Your Phone Number'
                    className='rounded-md px-5 w-full justify-self-center'
                />
                
               
            </div>
            <div className="flex flex-row py-2 justify-between">
                <label htmlFor="cohort" className="w-full block mb-2 text-lg font-medium greentxt justify-self-start">
                    Cohort
                </label>
                <span className='px-5'></span>
                <input 
                    type="date"
                    name="cohort" 
                    id="cohort"  
                    required="required" 
                    className='rounded-md px-5 w-full justify-self-center'
                />
                
               
            </div>
            <div className="flex flex-row py-2 justify-between">
                <label htmlFor="username" className="w-full block mb-2 text-lg font-medium greentxt justify-self-start">
                    Username
                </label>
                <span className='px-5'></span>
                <input 
                    type="text"
                    name="username" 
                    id="username"  
                    required="required" 
                    placeholder='Will be display in website'
                    className='rounded-md px-5 w-full justify-self-center'
                />
                
               
            </div>
            <div className="flex flex-row py-2 justify-between">
                <label htmlFor="chi_name" className="w-full block mb-2 text-lg font-medium greentxt justify-self-start">
                    中文姓名
                </label>
                <span className='px-5'></span>
                <input 
                    type="text"
                    name="chi_name" 
                    id="chi_name"  
                    required="required" 
                    placeholder='Will be display in website'
                    className='rounded-md px-5 w-full justify-self-center'
                />
                
               
            </div>
            <div className="flex flex-row py-2 justify-between">
                <label htmlFor="eng_name" className="w-full block mb-2 text-lg font-medium greentxt justify-self-start">
                    English Name
                </label>
                <span className='px-5'></span>
                <input 
                    type="text"
                    name="eng_name" 
                    id="eng_name"  
                    required="required" 
                    placeholder='Will be display in website'
                    className='rounded-md px-5 w-full justify-self-center'
                />
                
               
            </div>
            <div className="flex flex-row py-2 justify-between">
                <label htmlFor="sid" className="w-full block mb-2 text-lg font-medium greentxt justify-self-start">
                    Student ID
                </label>
                <span className='px-5'></span>
                <input 
                    type="text"
                    name="sid" 
                    id="sid"  
                    required="required" 
                    placeholder='Student Number on Your Card'
                    className='rounded-md px-5 w-full justify-self-center'
                />
                
               
            </div>
            <div className="flex flex-row py-2 justify-between">
                <div className="">
                    
                </div>
                <label htmlFor="gender" className="w-full block mb-2 text-lg font-medium greentxt justify-self-start">
                    Gender
                </label>
                <span className='px-5'></span>
                <select 
                    name="gender" 
                    id="gender"  
                    defaultValue={'O'} 
                    required="required" 
                    className='rounded-md px-5 w-full justify-self-center'
                >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
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

export default SetupAccount