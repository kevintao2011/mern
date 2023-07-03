
import React, { useEffect,useState } from 'react'
// import * as userjs from "../model/user.js" 
import { auth } from '../utils/firebasefunction'
import SocietyCard from '../components/SocietyCard';
import ProductCard from '../components/ProductCard';
import { useAuth } from '../components/session';
import * as Info from '../model/info.js'
import { onAuthStateChanged } from 'firebase/auth';
import { Navigate } from 'react-router-dom';

const iconsize = 20;
const Profile = () => {
  const [ProfileInfo, setProfileInfo] = useState(new Info.ProfileInfo())
  if (auth.currentUser)(
    
    console.log(auth.currentUser.accessToken)
    
  )
  
  const [init, setinit] = useState(false)
  const {currentUser,userDBInfo} = useAuth()
  const societies = userDBInfo.societies
  async function fetchProfileInfo(){
        
        await currentUser.getIdToken().then(async token=>{
          console.log("function fetchProfileInfo",token)
          await fetch('/api/getuser'
          ,{
            method:"POST",
            body:JSON.stringify({
              user:{
                token:token
              }}),
              headers: {
                "Content-Type": "application/json",
                // 'Content-Type': 'application/x-www-form-urlencoded',
                },
              mode:'cors'
          }).then(async response =>{
            if(response.ok){
                const data = await response.json()
                console.log(data)
                setProfileInfo(data)
            }
          })
        })
        
      
        
  }
  // useEffect(() => {
  //   // window.onbeforeunload = function() {
  //   //     setinit((prev)=>!prev);
  //   //     console.log("use-effect fetchProfileInfo")
  //   //     fetchProfileInfo()
  //   // };
  //   if(auth.currentUser){fetchProfileInfo()}
    
  //   return () => {
  //     // window.onbeforeunload = null;
  //   }
    
  // }, [])
  
  
  return (
    <div className="mainpage-1">
        
        <div className="flex flex-row ">
          <div className="flex flex-col px-10 w-3/12 items-center">
            <div className="py-10">
              <img 
                src     ="/assests/img/cow.png" 
                alt     = "promptation logo"
                width   = {300}
                height  = {300}
                className = "object-contain rounded-full "
              />
            </div>
            <div className='flex justify-center pb-5'>
              <button className="bg-su-green text-white rounded-md px-4 py-2" >
                Edit Profile
              </button>
            </div>
            <div className="flex flex-row w-full justify-between py-5">
              <button>
                <img 
                  src     ="/assests/img/icon/icon_notifications.svg" 
                  alt     = "promptation logo"
                  width   = {iconsize}
                  height  = {iconsize}
                  className = "object-contain "
                />
              </button>
              <button>
                <img 
                  src     ="/assests/img/icon/icon_date_add.svg" 
                  alt     = "promptation logo"
                  width   = {iconsize}
                  height  = {iconsize}
                  className = "object-contain "
                />
              </button>
              <button>
                  <img 
                  src     ="/assests/img/icon/icon_compose.svg" 
                  alt     = "promptation logo"
                  width   = {iconsize}
                  height  = {iconsize}
                  className = "object-contain "
                />
              </button>
              <button>
                <img 
                  src     ="/assests/img/icon/icon_cog.svg" 
                  alt     = "promptation logo"
                  width   = {iconsize}
                  height  = {iconsize}
                  className = "object-contain rounded-full"
                />
              </button>
            </div>
            <div className="w-full">
              <div className=" flex flex-row py-5">
                <div className=" w-2/12 ">
                  <button>
                    <img 
                      src     ="/assests/img/icon/icon_education.svg" 
                      alt     = "major"
                      width   = {iconsize}
                      height  = {iconsize}
                      className = "object-contain "
                    />
                  </button>
                </div>
                
              <div className=" w-10/12 flex justify-center major">
                  {userDBInfo.major}
                </div>
              </div>

              <div className=" flex flex-row py-5">
                <div className=" w-2/12 ">
                  <button>
                    <img 
                      src     ="/assests/img/icon/icon_time.svg" 
                      alt     = "cohort"
                      width   = {iconsize}
                      height  = {iconsize}
                      className = "object-contain "
                    />
                  </button>
                </div>
                  
                <div className=" w-10/12 flex justify-center ">
                  {"Cohort - "}
                  {Date(userDBInfo.cohort)}
                </div>
              </div>

              
              <div className=" flex flex-row py-5">
                <div className=" w-2/12 ">
                  <button>
                    <img 
                      src     ="/assests/img/icon/icon_user.svg" 
                      alt     = "SID "
                      width   = {iconsize}
                      height  = {iconsize}
                      className = "object-contain "
                    />
                  </button>
                </div>
                  
                <div className=" w-10/12 flex justify-center">
                  {userDBInfo.sid}
                </div>
              </div>

              
              <div className=" flex flex-row py-5">
                <div className=" w-2/12 ">
                  <button>
                    <img 
                      src     ="/assests/img/icon/icon_calendar.svg" 
                      alt     = "registerDay"
                      width   = {iconsize}
                      height  = {iconsize}
                      className = "object-contain "
                    />
                  </button>
                </div>
                  
                <div className=" w-10/12 flex justify-center">
                  {"Join Date - "}
                  {Date(userDBInfo.created).toString()}
                </div>
              </div>

              <div className=" flex flex-row py-5">
                <div className=" w-2/12 ">
                  <button>
                    <img 
                      src     ="/assests/img/icon/gender.svg" 
                      alt     = "gender"
                      width   = {iconsize}
                      height  = {iconsize}
                      className = "object-contain "
                    />
                  </button>
                </div>
                  
                <div className=" w-10/12 flex justify-center">
                  {userDBInfo.gender}
                </div>
              </div>

              <div className=" flex flex-row py-5">
                <div className=" w-2/12 ">
                  <button>
                    <img 
                      src     ="/assests/img/icon/icon_phone.svg" 
                      alt     = "contact"
                      width   = {iconsize}
                      height  = {iconsize}
                      className = "object-contain "
                    />
                  </button>
                </div>
                  
                <div className=" w-10/12 flex justify-center">
                  {userDBInfo.contact}
                </div>
              </div>

              <div className=" flex flex-row py-5">
                <div className=" w-2/12 ">
                  <button>
                    <img 
                      src     ="/assests/img/icon/icon_envelope.svg" 
                      alt     = "email"
                      width   = {iconsize}
                      height  = {iconsize}
                      className = "object-contain "
                    />
                  </button>
                </div>
                  
                <div className=" w-10/12 flex justify-center">
                  {userDBInfo.email}
                </div>
              </div>
            </div>
            
          </div> 
          <div className="RHS w-9/12 px-10">
              <img src="./assests/img/BelongSociety.svg" alt="" />
              {userDBInfo.societies?(
                <div className="flex flex-row ">
                  
                    {
                      Object.entries(userDBInfo.societies).map((key, v)=>{
                        
                        return(<SocietyCard title={key[0]} type={key[1]} managebutton={key[1]!=="member"}/>)
                      })
                        
                      
                      // userDBInfo.societies.map(soc=>{
                      //   return(<SocietyCard title={soc}/>)
                      // })
                      
                    }
                    {/* <SocietyCard title={"電影學會"} type={"basic member"} managebutton={true}/>
                    <SocietyCard title={"電影學會"} type={"basic member"} managebutton={true}/> */}

                </div>
              ):(
                <div className=" flex flex-col bg-su-green items-center rounded-3xl m-10">
                  <p
                  className='p-10 text-white'
                  >You have not join any society yet!</p>
                  <button className='bg-slate-200 p-3 rounded-full m-5' onClick={()=>{Navigate("/shop")}}>
                    join now
                  </button>
                </div>
              )}
              
              <img src="./assests/img/MsgBoard.svg" alt="" />
              <ProductCard />
          </div>
        </div>
        
        
    </div>
          
    
  )
}

export default Profile