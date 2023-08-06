
import React, { useEffect,useState } from 'react'
// import * as userjs from "../model/user.js" 
import { auth } from '../utils/firebasefunction'
import SocietyCard from '../components/SocietyCard';
import ProductCard from '../components/ProductCard';
import { useAuth } from '../components/session';
import * as Info from '../model/info.js'
import { onAuthStateChanged } from 'firebase/auth';
import { Navigate, useNavigate } from 'react-router-dom';

const iconsize = 20;
const Profile = () => {
  const [ProfileInfo, setProfileInfo] = useState(new Info.ProfileInfo())
  if (auth.currentUser)(
    
    console.log("accessToken",auth.currentUser.accessToken)
    
  )
  
  const [init, setinit] = useState(false)
  const {currentUser,userDBInfo,Soc} = useAuth()
  const [Societies, setSocieties] = useState([])
  const navigate = useNavigate()
  const [Orders, setOrders] = useState([])
  console.log("societies",Soc)
  useEffect(() => {
    
    async function fetchOrder(){
      await fetch(
        "/api/getorders",
        {
          method: "POST",
          body: JSON.stringify({
            user:{
              token:await auth.currentUser.getIdToken()
            },
            sid:userDBInfo.sid
          }),
          headers: {
          "Content-Type": "application/json",
          // 'Content-Type': 'application/x-www-form-urlencoded',
          },
          mode:'cors'
        }
      ).then(async response =>{
        
        if (response.ok){     
          const data = await response.json()
          setOrders(data)
          
        }else {
          
        }
      })
    }
    
    fetchOrder()
    // .then(l=>{
    //   console.log(l)
    //   setOrders(l)
    // })

    return () => {
      
    }
  }, [])
  
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
                console.log("data",data)
                setProfileInfo(data)
            }
          })
        })
        
      
        
  }
  
  useEffect(() => {
    console.log("userDBInfo.societies",typeof(userDBInfo))
    if(userDBInfo.societies!==""){
      setSocieties(userDBInfo.societies)
    }
    return () => {
      
    }
  }, [])
  
  
  
  return (
    
    <div className="mainpage-1">
        {
          currentUser&&(
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
              {/* <div className='flex justify-center pb-5'>
                <button className="bg-su-green text-white rounded-md px-4 py-2" >
                  Edit Profile
                </button>
              </div> */}
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
                {Societies.length!==0?(
                  <div className="flex flex-row ">
                      {/* <ul className='list-none flex flex-row w-full'> */}
                        {
                          // userDBInfo.societies.forEach(soc=>{
                          //   console.log("soc",soc)
                          //   Object.entries(soc).map((key, i)=>{
                          //     console.log(key[0],key[1])
                          //     // return(<SocietyCard title={key[0]} type={key[1]} managebutton={key[1]!=="member"}/>)
                          //     return(<SocietyCard title={"key[0]"} type={"key[1]"} managebutton={"key[1]"!=="member"}/>)
                          //   })
                          // })

                          
                          Societies.map((soc)=>{
                            console.log("card",soc)
                            
                            return(
                              // <li key={Object.keys(soc)[0] }>
                                <SocietyCard title={Soc[Object.keys(soc)[0]].society_chinese} type={Object.values(soc)[0]} managebutton={Object.values(soc)[0]!=="member"} code={Soc[Object.keys(soc)[0]].code} />
                              // </li>
                              )
                          })
                          // Object.entries(userDBInfo.societies).map((key, v)=>{
                            
                          //   return(<SocietyCard title={key[0]} type={key[1]} managebutton={key[1]!=="member"}/>)
                          // })

                        }
                      {/* </ul> */}

                  </div>
                ):(
                  <div className=" flex flex-col bg-su-green items-center rounded-3xl m-10">
                    <p
                    className='p-10 text-white'
                    >You have not join any society yet!</p>
                    <button className='bg-slate-200 p-3 rounded-full m-5' onClick={()=>{navigate("../shop/product")}}>
                      join now
                    </button>
                  </div>
                )}
                
                <img src="./assests/img/MsgBoard.svg" alt="" />
                <div className="w-full bg-su-green rounded-3xl flex flex-col p-5">
                  {
                    Orders?.map(order=>{
                      return(
                        <div className=" bg-slate-100 p-1 rounded-md my-2">
                          <div className="flex flex-row">
                            <p>訂單編號 {order._id}</p>
                            <p className='mx-10'>付款方式 {order.payment_method}</p>
                          </div>

                          <div className="flex flex-row">
                            {
                              Soc[order.code]['society_chinese']?(
                                <p>學會 {Soc[order.code]['society_chinese']}</p>
                              ):(
                                <p>學會 {Soc[order.code]['society_eng']}</p>
                              )
                            }
                            <p className='mx-10'>狀態 {order.status}</p>
                          </div>
                        
                          
                          
                          <p>訂單物品</p>
                          {
                            order.products.map(item=>{
                              return(
                                <p>{item.product_name}-{item.option} x {item.quantity}</p>
                              )
                            })
                          }
                        </div>
                      )
                    })
                  }
                </div>
            </div>
          </div>
          )
        }
        
        
        
    </div>
          
    
  )
}

export default Profile