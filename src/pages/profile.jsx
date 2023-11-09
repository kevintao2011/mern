
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
import moment from 'moment';
import { useStaticInfo } from '../components/Contexts/InfoContexts';
import { Calendar, Loader, Placeholder } from 'rsuite';
import ActivityCalendar from '../components/ActivityCalendar';

const iconsize = 20;
const Profile = () => {
  const [ProfileInfo, setProfileInfo] = useState(new Info.ProfileInfo())
  const [init, setinit] = useState(false)
  const {SocMap} = useStaticInfo()
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
                // setSocieties(data.societies)
            }
          })
        })
        
      
        
  }

  async function getMembership(){
    
    await postURL("/api/getusermembership",true).then(v=>{
      console.log("membershipdata:",v)
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
      // await fetchOrder()
      await fetchProfileInfo()
      await getMembership()
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
    
    <div className="mainpage-i my-5">
        {
          userDBInfo&&currentUser&&(//Societies&&
            <div className="flex flex-col md:flex-row font-mincho ">
              
              
              {/* <div className="flex flex-col md:px-5 md:w-3/12 w-full  items-center hidden">
                
                <div className="w-full border-gray-200 border-t-su-green border-t-4 rounded-md div-2 ">

                  <div className="border-b-2 border-gray-500">
                    <div className="text-black text-xl">
                      個人資料 
                    </div>
                    <div className="text-black text-xl">
                      Profile Information
                    </div>
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
                      {SocMap[userDBInfo.major].society_chinese?SocMap[userDBInfo.major].society_chinese:SocMap[userDBInfo.major].society_eng}
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
                      {moment(userDBInfo.created).format("DD-MM-YYYY")}
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
                
              </div>  */}
              <div className="RHS w-full  md:px-5 px-2 flex flex-col ">{/*md:w-9/12*/}
                  {/* <img src="./assests/img/BelongSociety.svg" alt="" /> */}
                  <div className="Upper flex flex-col gap-4 md:flex-row">
                    <div className="card aspect-auto p-2 border-t-red-600">
                      <div className="flex flex-row gap-2">
                        <div className="flex flex-row items-center">
                            <img src="/assests\img\icon\profileplacehodler.svg" alt=""  className='rounded-full' width={200}/>
                        </div>
                        <div className="flex flex-col w-full">
                            <div className="text-black text-xl border-b-2 border-b-gray-200">
                              個人資料 Information
                            </div>
                            <div className="flex flex-row justify-between">
                              <div className="">Name: </div>
                              {userDBInfo.username}
                            </div>
                            <div className="flex flex-row justify-between">
                              <div className="">Gender: </div>
                              {userDBInfo.gender}
                            </div>
                            <div className="flex flex-row justify-between">
                              <div className="">Major: </div>
                              {userDBInfo.major.jupas_code}
                            </div>
                            <div className="flex flex-row justify-between">
                              <div className="">SID: </div>
                              {userDBInfo.sid}
                            </div>
                            <div className="flex flex-row justify-between">
                              <div className="">Cohort: </div>
                              {userDBInfo.cohort}
                            </div>
                            <div className="w-full flex flex-row justify-end items-center gap-2">
                              <div className="">
                                Edit Information
                              </div>
                              <button>
                                <img src="\assests\img\signUp\NextButton.png" alt="" width={30}/>
                              </button>
                            </div>
                        </div>
                      </div>
                      
                    </div>
                    <div className="flex flex-col">
                        {Memberships?.length!==0?(
                          <div className="flex flex-col w-full ">
                            <div className="text-xl text-su-green font-bold">
                              會籍 Memebership
                            </div>
                            <div className="w-full flex flex-auto gap-5 "> 
                            {

                              Memberships.map((soc)=>{
                                console.log("card",soc)
                                
                                return(
                                  
                                  <SocietyCard 
                                    title={soc.society.society_chinese?soc.society.society_chinese:soc.society.society_eng} 
                                    type={soc.role} 
                                    college={soc.society.college}
                                    session={soc.society.session}
                                    expiry_date={moment(soc.expiry_date).format("DD-MM-YYYY")}
                                    managebutton={soc.role!=="basic member"&&soc.role!=="pending"} 
                                    code={soc.society.code}
                                    color={pickRadomColor(2)}
                                  />
                                    
                                  // </li>
                                  )
                              })
                              
                              }
                              
                            </div>
                                

                          </div>
                        ):(
                          <div className=" flex flex-col  items-center rounded-3xl m-2  w-full">
                            {/* <div
                            className='div-10 text-white'
                            >You have not join any society yet!</div>
                            <button className='bg-slate-200 div-3 rounded-full m-5' onClick={()=>{navigate("../shop/product")}}>
                              join now
                            </button> */}
                            <div>
                              <Placeholder.Paragraph rows={8} />
                              <Loader center content="loading" />
                            </div>
                          </div>
                        )}
                      </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2 my-5">
                    <div className="grid grid-cols-1 gap-2">
                      <div className="Noti  flex flex-col card aspect-auto border-orange-700 text-orange-700">
                        <div className="font-extrabold bg-orange-100 rounded-t-lg">
                          <div className="px-5 py-2">
                            <div className="text-xl">通知 </div>
                            <div className="text-xl">Notification</div>
                          </div>
                        </div>
                        <div className="text-gray-600 p-5">
                          The Website is in development Mode, Profile Picture is not availible at this moment
                        </div>
                      </div>
                      <div className="Orders">
                      {/* <img src="./assests/img/MsgBoard.svg" alt="" className='' /> */}
                      <div className="text-su-green flex flex-col card aspect-auto  ">
                        <div className="font-extrabold bg-green-100 rounded-t-lg">
                          <div className="p-5 pb-2">
                            <div className="text-xl">訂單紀錄 </div>
                            <div className="text-xl">Purchase Record</div>
                          </div>
                        </div>
                        
                        <div className="w-full   flex flex-col  p-5">
                          {/* {
                            Orders?.map(order=>{
                              return(
                                <div className=" bg-gray-200 bg-opacity-20 div-1 rounded-md my-2 text-black flex flex-row">
                                  <div className="flex  flex-col">
                                    <div className="flex  flex-row">
                                      <div className='overflow-x-auto'>訂單編號 {order._id}</div>
                                      <div className='mx-10'>付款方式 {order.payment_method}</div>
                                    </div>

                                    <div className="flex flex-row">
                                      {
                                        Soc[order.code]['society_chinese']?(
                                          <div className='overflow-x-auto'>學會 {Soc[order.code]['society_chinese']}</div>
                                        ):(
                                          <div className='overflow-x-auto'>學會 {Soc[order.code]['society_eng']}</div>
                                        )
                                      }
                                      <div className='md:mx-10'>狀態 {order.status}</div>
                                    </div>
                                  
                                    
                                    
                                    <div className='py-2'>訂單物品</div>
                                    {
                                      order.products.map((item,i)=>{
                                        return(
                                          <div>{i+1}.{item.product_name}-{item.option} x {item.quantity}</div>
                                        )
                                      })
                                    }
                                  </div>
                                  
                                </div>
                                  
                              )
                            })
                          } */}
                        </div>
                        </div>
                        
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 gap-2">
                      {/* <img src="./assests/img/MsgBoard.svg" alt="" className='' /> */}
                      <div className="border-2 rounded-md border-t-sky-900">
                    <div className="px-5 text-lg font-bold bg-sky-200 py-2 text-sky-900 ">My Calendar</div>
                        <Calendar compact={true}  />
                      </div>
                      <div className="text-su-green flex flex-col  card  aspect-auto">
                        <div className="rounded-t-md bg-gray-300 ">
                          <div className="p-5 pb-2">
                            <div className="font-bold text-gray-700">
                              <div className="text-xl">活動紀錄 </div>
                              <div className="text-xl">Purchase Record</div>
                            </div>
                          </div>
                          
                        </div>
                        
                        
                        <div className="w-full flex flex-col p-5">
                        {
                          
                        }
                      </div>
                      </div>
                      
                    </div>
                  </div>
              </div>
            </div>
          )
        }   
      
    </div>
  )
}

export default Profile