import React from 'react'
import { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../utils/firebasefunction';
import { Link, useNavigate } from 'react-router-dom';
import { useStaticInfo } from '../../components/Contexts/InfoContexts';

const SignUp = () => {
      const [email, setEmail] = useState('');
      const [emailAlert, setemailAlert] = useState(false);
      const [passwordAlert, setpasswordAlert] = useState(false);
      const [error, seterror] = useState("");
      const [submit, setsubmit] = useState(false);
      const [AgreePage, setAgreePage] = useState(true)
      const [SameEmail, setSameEmail] = useState("")
      const navigate = useNavigate()
      const [success, setsuccess] = useState(false);
      const {PrivacyPage} = useStaticInfo()
      
      const handleSubmit = async (e) => {
          console.log("Submitting signup form");
          e.preventDefault();
          // Read the form data
          const form = e.target;
          const formData = new FormData(form);
          const data = formData.entries();
          
          // Or you can work with it as a plain object:
          const formJson = JSON.stringify(Object.fromEntries(formData.entries())) ;
        //  register in server side
          try{
            // await createUserWithEmailAndPassword(auth,data.email,data.password)
            const res = await fetch('/api/signup', { 
                method: "POST",
                body: formJson,
                headers: {
                "Content-Type": "application/json",
                // 'Content-Type': 'application/x-www-form-urlencoded',
                },
                mode:'cors'
                
            }).then(async response => {
                
                if (response.ok){
                    // registered
                    
                    console.log("registered")
                    setsubmit(true)
                    return true
                }else{
                    console.log("response.body",response.body)
                    const data = await response.json()
                    console.log("data.error",data)
                    if (data.code === "auth/email-already-in-use"){
                        console.log("Email already in use")
                        seterror("Email already in use");
                    }
                    else if (data.code === "auth/weak-password"){
                        seterror("Password is too weak");
                    }
                    else{
                        seterror("Password is too weak");
                        
                    }
                    setsubmit(false)
                }
                
                
            })
        
            
          }catch(e){
            setsubmit(false)
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

      function checkEmail(event){
          console.log('Event triggered');
          const inputValue = event.target.value;
          setEmail(inputValue);

        //   const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        //   const domainRegex = /@(ln)\.hk$/;
        //   const isValidEmail = emailRegex.test(inputValue);
        //   const hasValidDomain = domainRegex.test(inputValue);
          
        //   if (isValidEmail && hasValidDomain) {
        //       setemailAlert(false);
        //       // console.log('correct');
              
        //   }else{
        //       setemailAlert(true);
              
        //   }
          
          
      }
      function checkSame(e){
        const inputValue = e.target.value;
        console.log(inputValue,email)
        if (inputValue === email){
            setSameEmail("")
        }else{
            setSameEmail("The email is not same")
        }
        
      }

      function checkPassword(event){
          console.log('Event triggered');
          const inputValue = event.target.value;
          setpasswordAlert(inputValue);

          const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z]).+$/;
          const isValidpassword = passwordRegex.test(inputValue);
          
          if (isValidpassword && inputValue.length>=8) {
              setpasswordAlert(false);
          }else{
              setpasswordAlert(true);
          }
          console.log('checked');
          
      }



      return(
        AgreePage?(
            <div className="p-20 grid grid-cols-1 gap-10">
                <div className="">
                    <img 
                        src="/assests/img/TermsnRegulations/TermsNRegulations.svg" 
                        alt="" 
                    />
                </div>
                <pre className='font-mincho'>
                    {PrivacyPage}
                </pre>
                <div className="w-full flex flex-row justify-end">
                    <button onClick={()=>{navigate("/")}}>
                        <img 
                            src="/assests/img/TermsnRegulations/disagree.svg" 
                            alt="" 
                            
                        />
                        
                    </button>
                    <button onClick={()=>{setAgreePage(false)}}>
                        <img 
                            src="/assests/img/TermsnRegulations/agree.svg" 
                            alt="" 
                        
                        />
                        
                        
                    </button>
                </div>
                
                
            </div>
        ):(
            submit?(
                <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                
                    {/* <Image 
                        src     ="/assests/img/LingULogoGreen.svg"
                        alt     = "profile"
                        width   = {300}
                        height  = {300}
                        className = "rounded-full"
                        
                    /> */}
                    <h3 className='text-su-green'>
                        Verification has been sent to your email, please check it.
                    </h3>
                    <div className="py-10">
                        <Link to="/" className='text-white p-5  bg-su-green rounded-md' >
                            back to Home page
                        </Link>
                    </div>
                    
                </div>
            ):(
                <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                    
                    {/* <Image 
                        src     ="/assests/img/LingULogoGreen.svg"
                        alt     = "profile"
                        width   = {300}
                        height  = {300}
                        className = "rounded-full"
                        
                    /> */}
                    <div className="w-8/12 py-10 ">
                        <img 
                            src     ="/assests/img/signUp/PersonalInfo.png"
                            alt     = "profile"
                            width   = {300}
                            height  = {300}
                            className = " self-start "
                            
                        />
                    </div>
                    <div className="w-8/12">
                        <form className="space-y-4 md:space-y-6 text-xs" onSubmit={(e)=>{handleSubmit(e)}} method="post">
                            <div className="grid grid-cols-2 gap-10">
                                <div className="">
                                        <label htmlFor="email" className="block mb-2 text-lg font-medium greentxt text-black ">
                                            電子郵件 E-mail
                                        </label>
                                        <input type="email" name="email" id="email" className="bg-gray-50 border w-full p-2.5 block rounded-lg shadow shadow-gray-400 " placeholder="name@ln.hk" required="required"    onChange={(e)=>{checkEmail(e)}}>
                                        
                
                                        </input>
                                        
                                        {emailAlert?(
                                            <p className="text-red-600 text-sm">
                                                your email must be ended with ln.hk
                                        </p>):(<></>)
                                        }
                                </div>
                                
                                <div className="">
                                    <label htmlFor="email" className="block mb-2 text-lg font-medium greentxt text-black">
                                        確認電子郵件 Confirm E-mail
                                    </label>
                                    <input type="email" name="email" id="email" className="bg-gray-50 border w-full p-2.5 block rounded-lg shadow shadow-gray-400" placeholder="name@ln.hk" required="required" onChange={(e)=>{checkSame(e)}}>
            
                                    </input>
                                    <p className='text-red-600'>{SameEmail}</p>
                                    
                                </div>

                                <div className="">
                                    <label htmlFor="password" className="block mb-2 text-lg font-medium greentxt">Password</label>
                                    <input type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border w-full p-2.5 block rounded-lg shadow shadow-gray-400" required="required" onChange={(e)=>{checkPassword(e)}} >
                                    </input>
                                    {passwordAlert?(
                                        <div className="text-red-600 text-sm">
                                            your password must contains at least 
                                            <ul className="text-red-600 text-sm">
                                                <li>
                                                    one lowercase.
                                                </li>
                                                <li>
                                                    one uppercase letter.
                                                </li>
                                                <li>
                                                    more than 8 character.
                                                </li>
                                            </ul>
                                        </div>
                                            
                                        ):(<></>)
                                    }
                                </div>

                                <div>
                                    <label htmlFor="confirmpassword" className="block mb-2 text-lg font-medium greentxt">Confirm Password</label>
                                    <input type="password" name="confirmpassword" id="confirmpassword" placeholder="••••••••" className="bg-gray-50 border w-full p-2.5 block rounded-lg shadow shadow-gray-400" >
                                    </input>
                                </div>
                            </div>
                            
                            <div className="w-full flex flex-row justify-between">
                                <div className="h-full ">
                                    <p className='text-xs '>
                                        請輸入你的學生電郵 
                                    </p>
                                    <p className='text-xs '>
                                        Please Enter your student email 
                                    </p>
                                </div>
                                
                                {/* <button type="submit"  disabled={emailAlert || passwordAlert}> */}
                                <button type="submit">
                                    <img 
                                        src     ="/assests/img/signUp/NextButton.png"
                                        alt     = "profile"
                                        width   = {50}
                                        height  = {50}
                                        className = "rounded-full"
                                        
                                    />
                                </button>
                            </div>
                            {error!==""?(
                                <ul className="text-red-600 text-sm">
                                    {error}
                                </ul>):(<></>)
                            }
                        </form>
                    </div>
                    
                </div>
                
            )
        )
        
          
      )
    
  }



export default SignUp