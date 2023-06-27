"use client"
import React from 'react'
// import Layout from './layout'

import { useEffect , useState } from 'react';

import { UserInfo } from '../model/user';


const Profile = () => {
 
  
  const iconsize = 20;
  const [userInfo, setuserInfo] = useState(new UserInfo());
  
  useEffect(() => {
    //   const fetchData = async () => {
    //     await fetch('/api/info').
    //       then(async (response) => await response.json()).
    //         then((data) => {
    //             console.log("data",data);
    //             setuserInfo(data);
    //           }
    //         );
    //   };
    async function fetchdata(){
        await fetch('/api/info').then(response=>{
            if (response.ok){

            }
        }).then(data =>{
            setuserInfo(data);
        })
    }
    fetchdata();

       
       
  }, []);

  async function handleEdit(){
    
  }

  return (
    <div className="">
        <div className="flex flex-row ">
          <div className="flex flex-col px-10 ">
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
              <button className="bg-su-green text-white rounded-md px-4 py-2" onClick={handleEdit()}>
                Edit Profile
              </button>
            </div>
            <div className="flex flex-row justify-between py-5">
              <button>
                <img 
                  src     ="/assests/img/icon/icon_notifications.png" 
                  alt     = "promptation logo"
                  width   = {iconsize}
                  height  = {iconsize}
                  className = "object-contain "
                />
              </button>
              <button>
                <img 
                  src     ="/assests/img/icon/icon_date_add.png" 
                  alt     = "promptation logo"
                  width   = {iconsize}
                  height  = {iconsize}
                  className = "object-contain "
                />
              </button>
              <button>
                  <img 
                  src     ="/assests/img/icon/icon_compose.png" 
                  alt     = "promptation logo"
                  width   = {iconsize}
                  height  = {iconsize}
                  className = "object-contain "
                />
              </button>
              <button>
                <img 
                  src     ="/assests/img/icon/icon_cog.png" 
                  alt     = "promptation logo"
                  width   = {iconsize}
                  height  = {iconsize}
                  className = "object-contain rounded-full"
                />
              </button>
            </div>
            <div className=" flex flex-row py-5">
              <div className=" w-2/12 ">
                <button>
                  <img 
                    src     ="/assests/img/icon/icon_education.png" 
                    alt     = "major"
                    width   = {iconsize}
                    height  = {iconsize}
                    className = "object-contain "
                  />
                </button>
              </div>
                
              <div className=" w-10/12 flex justify-center major">
                {userInfo.major}
              </div>
            </div>

            <div className=" flex flex-row py-5">
              <div className=" w-2/12 ">
                <button>
                  <img 
                    src     ="/assests/img/icon/icon_time.png" 
                    alt     = "cohort"
                    width   = {iconsize}
                    height  = {iconsize}
                    className = "object-contain "
                  />
                </button>
              </div>
                
              <div className=" w-10/12 flex justify-center ">
                {userInfo.cohort}
              </div>
            </div>

            
            <div className=" flex flex-row py-5">
              <div className=" w-2/12 ">
                <button>
                  <img 
                    src     ="/assests/img/icon/icon_user.png" 
                    alt     = "SID "
                    width   = {iconsize}
                    height  = {iconsize}
                    className = "object-contain "
                  />
                </button>
              </div>
                
              <div className=" w-10/12 flex justify-center">
                {userInfo.sid}
              </div>
            </div>

            
            <div className=" flex flex-row py-5">
              <div className=" w-2/12 ">
                <button>
                  <img 
                    src     ="/assests/img/icon/icon_calendar.png" 
                    alt     = "registerDay"
                    width   = {iconsize}
                    height  = {iconsize}
                    className = "object-contain "
                  />
                </button>
              </div>
                
              <div className=" w-10/12 flex justify-center">
                {userInfo.registerDay}
              </div>
            </div>

            <div className=" flex flex-row py-5">
              <div className=" w-2/12 ">
                <button>
                  <img 
                    src     ="/assests/img/icon/icon_location restroom.png" 
                    alt     = "gender"
                    width   = {iconsize}
                    height  = {iconsize}
                    className = "object-contain "
                  />
                </button>
              </div>
                
              <div className=" w-10/12 flex justify-center">
                {userInfo.gender}
              </div>
            </div>

            <div className=" flex flex-row py-5">
              <div className=" w-2/12 ">
                <button>
                  <img 
                    src     ="/assests/img/icon/icon_phone.png" 
                    alt     = "contact"
                    width   = {iconsize}
                    height  = {iconsize}
                    className = "object-contain "
                  />
                </button>
              </div>
                
              <div className=" w-10/12 flex justify-center">
                {userInfo.contact}
              </div>
            </div>

            <div className=" flex flex-row py-5">
              <div className=" w-2/12 ">
                <button>
                  <img 
                    src     ="/assests/img/icon/icon_envelope.png" 
                    alt     = "email"
                    width   = {iconsize}
                    height  = {iconsize}
                    className = "object-contain "
                  />
                </button>
              </div>
                
              <div className=" w-10/12 flex justify-center">
                {userInfo.email}
              </div>
            </div>
          </div> 
          <div className="RHS">
              
          </div>
        </div>
        
    </div>
          
    
      
  )
}

export default Profile;