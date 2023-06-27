import React from 'react'
import { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../utils/firebasefunction';
import { Link } from 'react-router-dom';


const SignUp = () => {
      const [email, setEmail] = useState('');
      const [emailAlert, setemailAlert] = useState(false);
      const [passwordAlert, setpasswordAlert] = useState(false);
      const [error, seterror] = useState("");
      const [submit, setsubmit] = useState(false);
      
      const [success, setsuccess] = useState(false);
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

          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          const domainRegex = /@(ln)\.hk$/;
          const isValidEmail = emailRegex.test(inputValue);
          const hasValidDomain = domainRegex.test(inputValue);
          if (isValidEmail && hasValidDomain) {
              setemailAlert(false);
              // console.log('correct');
              
          }else{
              setemailAlert(true);
              
          }
          // console.log('checked',inputValue);
          
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
                      <Link to="home" className='text-white p-5  bg-su-green rounded-md' >
                          back to Home page
                      </Link>
                  </div>
                  
              </div>
          ):(
              <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                  <p>Log in page</p>
                  {/* <Image 
                      src     ="/assests/img/LingULogoGreen.svg"
                      alt     = "profile"
                      width   = {300}
                      height  = {300}
                      className = "rounded-full"
                      
                  /> */}
                  
                  <form className="space-y-4 md:space-y-6" onSubmit={(e)=>{handleSubmit(e)}} method="post">
                      <div>
                      <label htmlFor="email" className="block mb-2 text-lg font-medium greentxt">
                              Your email
                          </label>
                          <input type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-lg rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@ln.hk" required="required"    onChange={(e)=>{/*checkEmail(e)*/}}>

                          </input>
                          
                          
                          {emailAlert?(
                              <ul className="text-red-600 text-sm">
                                  your email must be ended with ln.hk
                          </ul>):(<></>)
                          }

                          
                          
                      </div>

                      <div>
                          <label htmlFor="password" className="block mb-2 text-lg font-medium greentxt">Password</label>
                          <input type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-lg rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="required" onChange={(e)=>{/*checkPassword(e)*/}} >
                          </input>
                      </div>
                      
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

                      <div>
                          <label htmlFor="confirmpassword" className="block mb-2 text-lg font-medium greentxt">Confirm Password</label>
                          <input type="password" name="confirmpassword" id="confirmpassword" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-lg rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" >
                          </input>
                      </div>
                      
                      
                      
                  <button type="submit"  className="w-full underline underline-offset-1 greentxt boarder border-su-green bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-lg px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800" disabled={emailAlert || passwordAlert}>Sign Up</button>
                      {error!==""?(
                          <ul className="text-red-600 text-sm">
                              {error}
                          </ul>):(<></>)
                      }
                  </form>
              </div>
              
          )
          
      )
    
  }



export default SignUp