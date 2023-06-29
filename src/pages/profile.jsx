
import React, { useEffect,useState } from 'react'
// import * as userjs from "../model/user.js" 
import { auth } from '../utils/firebasefunction'
import SocietyCard from '../components/SocietyCard';
import ProductCard from '../components/ProductCard';

const iconsize = 20;
const Profile = () => {
  const [first, setfirst] = useState(false)
  const user = auth.currentUser.accessToken
  
  console.log(user)
  return (
    <div className="mainpage-i">
        
        <div className="flex flex-row ">
          <div className="flex flex-col px-10 w-3/12">
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
            <div className="flex flex-row justify-between py-5">
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
                8
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
                7
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
                5
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
                4
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
                3
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
                2
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
                1
              </div>
            </div>
          </div> 
          <div className="RHS w-9/12 px-10">
              <img src="./assests/img/BelongSociety.svg" alt="" />
              <div className="flex flex-row ">
                 
                  <SocietyCard title={"電影學會"} type={"basic member"} managebutton={true}/>
                  <SocietyCard title={"電影學會"} type={"basic member"} managebutton={true}/>

              </div>
              <img src="./assests/img/MsgBoard.svg" alt="" />
              <ProductCard />
          </div>
        </div>
        
        
    </div>
          
    
  )
}

export default Profile