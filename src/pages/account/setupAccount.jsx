import React,{useState,useEffect} from 'react'
import { auth } from '../../utils/firebasefunction'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../components/Contexts/session'
const SetupAccount = () => {
    
    const [Submit, setSubmit] = useState(true)
    const [error, seterror] = useState(null)
    const [jupas, setjupas] = useState(null)
    const navigate = useNavigate()
    const {setuserDBInfo,userDBInfo} = useAuth()
    const [CohortYears, setCohortYears] = useState([])
    const [PhoneNumberError, setPhoneNumberError] = useState("")
    const [SID, setSID] = useState("")
    const [SIDError, setSIDError] = useState("")
    const [PhoneNumber, setPhoneNumber] = useState("")
    
    
    function checkSameSID(e){
        const val = e.target.value
        if (val === SID){
            setSIDError("")
            console.log("same")
        }else{
            setSIDError("password is not consistent")
        }
    }

    function checkSamePhoneNumber(e){
        const val = e.target.value
        if (val === PhoneNumber){
            setPhoneNumberError("")
            console.log("same")
        }else{
            setPhoneNumberError("Phone Number is not consistent")
        }
    }
    
    useEffect(() => {
        console.log(userDBInfo)
        let currentYear = new Date()
        let dateList = []
        for (let index = currentYear.getFullYear(); index > currentYear.getFullYear()-8; index--) {
            dateList.push(index)
            
        }
        setCohortYears(dateList)
        console.log(dateList)

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

    }
    return (
        <div className="flex flex-col  items-center justify-center h-screen" >
            <div className="w-6/12 py-10">
                <img 
                    src="/assests/img/signUp/PersonalInfo.png" 
                    alt="" 
                    className='self-start'
                />
            </div>
            
            <form className="w-6/12" action="" onSubmit={(e)=>{handleSubmit(e)}}>
                <div className="grid grid-cols-2 gap-10">
                    <div className="flex flex-col py-2 justify-between">
                        <label htmlFor="chi_name" className="w-full block mb-2 text-lg font-medium greentxt justify-self-start">
                            中文姓名
                        </label>
                        <span className='px-5'></span>
                        <input 
                            type="text"
                            name="chi_name" 
                            id="chi_name"  
                            required="required" 
                            placeholder='與學生證一致'
                            className='bg-gray-50 border w-full p-2.5 block rounded-lg shadow shadow-gray-400 '
                        />
                        
                    
                    </div>
                    <div className="flex flex-col py-2 justify-between">
                        <label htmlFor="eng_name" className="w-full block mb-2 text-lg font-medium greentxt justify-self-start">
                            English Name
                        </label>
                        <span className='px-5'></span>
                        <input 
                            type="text"
                            name="eng_name" 
                            id="eng_name"  
                            required="required" 
                            placeholder='Same as Student ID'
                            className='bg-gray-50 border w-full p-2.5 block rounded-lg shadow shadow-gray-400 '
                        />
                        
                    
                    </div>
                    <div className="flex flex-col py-2 justify-between">
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
                            className='bg-gray-50 border w-full p-2.5 block rounded-lg shadow shadow-gray-400 '
                        >
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Other">Other</option>
                        </select>
                    </div>
                    <div className="flex flex-col py-2 justify-between">
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
                            className='bg-gray-50 border w-full p-2.5 block rounded-lg shadow shadow-gray-400 '
                        />
                        
                    
                    </div>
                    <div className="flex flex-col py-2 justify-between">
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
                            className='bg-gray-50 border w-full p-2.5 block rounded-lg shadow shadow-gray-400 '
                            onChange={e=>setSID(e.target.value)}
                        />
                        
                    
                    </div>
                    <div className="flex flex-col py-2 justify-between">
                        <label htmlFor="sid" className="w-full block mb-2 text-lg font-medium greentxt justify-self-start">
                            Confirm Student ID
                        </label>
                        
                        <input 
                            type="text"
                            name="confirmsid" 
                            id="confirmsid"  
                            required="required" 
                            placeholder='Student Number on Your Card'
                            className='bg-gray-50 border w-full p-2.5 block rounded-lg shadow shadow-gray-400 '
                            onChange={(e)=>checkSameSID(e)}
                        />
                        <p>
                            {SIDError}
                        </p>
                        
                    
                    </div>
                    <div className="flex flex-col py-2 justify-between">
                    
                        <label htmlFor="major" className="w-full block mb-2 text-lg font-medium greentxt justify-self-start">
                            Major
                        </label>
                        
                        <select 
                            name="major" 
                            id="major"  
                            defaultValue={'Please Select your Major'} 
                            required="required" 
                            className='bg-gray-50 border w-full p-2.5 block rounded-lg shadow shadow-gray-400 '
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
                    <div className="flex flex-col py-2 justify-between">
                        <label htmlFor="cohort" className="w-full block mb-2 text-lg font-medium greentxt justify-self-start">
                            Cohort
                        </label>
                        {/* <span className='px-5'></span>
                        <input 
                            type="date"
                            name="cohort" 
                            id="cohort"  
                            required="required" 
                            className='bg-gray-50 border w-full p-2.5 block rounded-lg shadow shadow-gray-400 '
                        /> */}
                        <select name="cohort" id="cohort" className='bg-gray-50 border w-full p-2.5 block rounded-lg shadow shadow-gray-400'>
                            {
                                CohortYears.map(year=>{
                                    return(
                                        <option value={year} className=''>
                                            {year}
                                        </option>
                                    )
                                })
                            }
                            
                        </select>
                        
                    
                    </div>
                    <div className="flex flex-col py-2 justify-between">
                        <label htmlFor="contact" className="w-full block mb-2 text-lg font-medium greentxt justify-self-start">
                            電話 phone number
                        </label>
                        <span className='px-5'></span>
                        <input 
                            type="tel"
                            name="contact" 
                            id="contact"  
                            required="required" 
                            placeholder='Please Enter Your Phone Number'
                            className='bg-gray-50 border w-full p-2.5 block rounded-lg shadow shadow-gray-400 '
                            onChange={e=>setPhoneNumber(e.target.value)}
                        />
                        
                    
                    </div>
                    <div className="flex flex-col py-2 justify-between">
                        <label htmlFor="confirmcontact" className="w-full block mb-2 text-lg font-medium greentxt justify-self-start">
                            確認電話 Confirm phone number
                        </label>
                        <span className='px-5'></span>
                        <input 
                            type="tel"
                            name="confirmcontact" 
                            id="confirmcontact"  
                            required="required" 
                            placeholder='Please Enter Your Phone Number'
                            className='bg-gray-50 border w-full p-2.5 block rounded-lg shadow shadow-gray-400 '
                            onChange={e=>checkSamePhoneNumber(e)}
                        />
                        <p> {PhoneNumberError} </p>
                        
                    
                    </div>
                    
                    
                    
                    
                    
                </div>
                <div className="w-full flex flex-row justify-end py-10">
                    <button 
                        className="flex flex-row  " 
                        type="submit"
                        disabled={!Submit}
                    >
                        <img 
                            src="/assests/img/signUp/NextButton.png" 
                            alt="" 
                            className='self-start'
                        />
                    </button>   
                </div>
                
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