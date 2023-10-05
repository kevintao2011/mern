
import React, { useEffect,useState } from 'react'
// import * as userjs from "../model/user.js" 
import { auth } from '../utils/firebasefunction'
import SocietyCard from '../components/SocietyCard';
import ProductCard from '../components/ProductCard';
import { useAuth } from '../components/session';
import * as Info from '../model/info.js'
import { onAuthStateChanged } from 'firebase/auth';
import { Navigate, useNavigate } from 'react-router-dom';
import { pickRadomColor } from '../utils/tailwindcss';
import { postURL } from '../utils/fetch';
const iconsize = 20;
const Profile = () => {
  const [ProfileInfo, setProfileInfo] = useState(new Info.ProfileInfo())
  
  
  const [init, setinit] = useState(false)
  const {currentUser,userDBInfo,setuserDBInfo,Soc} = useAuth()
  const [Societies, setSocieties] = useState([])
  const navigate = useNavigate()
  const [Orders, setOrders] = useState([])
  const [Memberships, setMemberships] = useState([])
  
  console.log("societies",Soc)
  
  
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
                setuserDBInfo(userDBInfo)
                setSocieties(data.societies)
            }
          })
        })
        
      
        
  }

  async function getMembership(){
    await postURL("/api/getusermembership",true).then(v=>{
      setMemberships(v)
    })
    
  }
  

  useEffect(() => {
    
    async function fetchOrder(){
      await fetch(
        "/api/getorders",
        {
          method: "POST",
          body: JSON.stringify({
            user:{
              token:await currentUser.getIdToken()
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
    async function doALL(){
      await fetchOrder()
      await fetchProfileInfo()
    }
    
    // .then(l=>{
    //   console.log(l)
    //   setOrders(l)
    // })
    doALL()
    return () => {
      
    }
  }, [])
  
  
  
  
  return (
    
    <div className="mainpage-1">
        {
          Societies&&userDBInfo&&currentUser&&(
            <div className="flex flex-col md:flex-row">
              
              <div className="flex flex-col md:px-10 md:w-3/12 w-full  items-center p-5 ">
                
                <div className="w-full border-gray-200 border-t-su-green border-t-4 rounded-md p-2 ">
                  <div className="text-black text-3xl">
                    個人資料 
                  </div>
                  <div className="text-black text-3xl">
                    Profile Information
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
                      {/* Major */}
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
                      {userDBInfo.cohort}
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
              <div className="RHS w-full md:w-9/12 md:px-10 px-2">
                  <img src="./assests/img/BelongSociety.svg" alt="" />
                  {Societies?.length!==0?(
                    <div className="flex flex-row w-full ">
                      {/* <div className="flex md:flex-row flex-col w-full md:w-full gap-2">  */}
                      <div className="w-full grid grid-cols-8 gap-5 my-5"> 
                      {

                        Societies.map((soc)=>{
                          console.log("card",soc)
                          
                          return(
                            // <li key={Object.keys(soc)[0] }>
                            // <div className="w-full my-5 md:my-0">
                            
                            <SocietyCard 
                              title={Soc[Object.keys(soc)[0]].society_chinese} 
                              type={Object.values(soc)[0]} 
                              managebutton={Object.values(soc)[0]!=="member"&&Object.values(soc)[0]!=="pending"} 
                              code={Soc[Object.keys(soc)[0]].code}
                              color={pickRadomColor(2)}
                            />
                          
                              
                            // </li>
                            )
                        })
                        
                        }
                        
                      </div>
                          

                    </div>
                  ):(
                    <div className=" flex flex-col bg-su-green items-center rounded-3xl m-2  w-full">
                      <p
                      className='p-10 text-white'
                      >You have not join any society yet!</p>
                      <button className='bg-slate-200 p-3 rounded-full m-5' onClick={()=>{navigate("../shop/product")}}>
                        join now
                      </button>
                    </div>
                  )}
                  
                  <img src="./assests/img/MsgBoard.svg" alt="" className='my-10' />
                  
                  <div className="w-full  bg-su-green rounded-3xl flex flex-col p-5">
                    {
                      Orders?.map(order=>{
                        return(
                          <div className=" bg-slate-100 p-1 rounded-md my-2">
                            <div className="flex flex-col md:flex-row">
                              <p className='overflow-x-auto'>訂單編號 {order._id}</p>
                              <p className='md:mx-10'>付款方式 {order.payment_method}</p>
                            </div>

                            <div className="flex flex-col md:flex-row">
                              {
                                Soc[order.code]['society_chinese']?(
                                  <p className='overflow-x-auto'>學會 {Soc[order.code]['society_chinese']}</p>
                                ):(
                                  <p className='overflow-x-auto'>學會 {Soc[order.code]['society_eng']}</p>
                                )
                              }
                              <p className='md:mx-10'>狀態 {order.status}</p>
                            </div>
                          
                            
                            
                            <p className='py-2'>訂單物品</p>
                            {
                              order.products.map((item,i)=>{
                                return(
                                  <p>{i+1}.{item.product_name}-{item.option} x {item.quantity}</p>
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