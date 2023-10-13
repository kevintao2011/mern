import React, {useState,useEffect, useRef} from 'react'
import { useAuth } from '../../components/session';
import { useParams,useNavigate,Link } from 'react-router-dom';
import { auth,deleteFile,storage } from '../../utils/firebasefunction';
import AdminProductContainer from './product/AdminProductContainer';
import FieldForArray from '../../components/FormComponents/FieldForArray';
import AdminActivityContainer from './Activity/AdminActivityContainer';
import AdminMemberContainer from './member/AdminMemberContainer';
import AdminOrderContainer from '../admin/order/AdminOrderContainer';
import AdminSocietyInfoPage from './SocietyInfo/AdminSocietyInfoPage';
import { Sidenav, Nav } from 'rsuite';
import DashboardIcon from '@rsuite/icons/legacy/Dashboard';
import GroupIcon from '@rsuite/icons/legacy/Group';
import MagicIcon from '@rsuite/icons/legacy/Magic';
import GearCircleIcon from '@rsuite/icons/legacy/GearCircle';
import ToggleList from '../admin/ToggleList';
import AdminQuestionairContainer from './questionaire/AdminQuestionairContainer';

const Manage = () => {
    const {code} = useParams()
    const [tab, settab] = useState('Activity')
    const [Activity, setActivity] = useState()
    const [Product, setProduct] = useState()
    const [Member, setMember] = useState()
    const [Order, setOrder] = useState()
    const iconsize = 20;
    const {Soc,currentUser,userDBInfo} = useAuth()
    
    const navigate = useNavigate()
    console.log(code)
    
    
    async function removeActivity(id){
        const reqbody = {
            "user":{
                token:await auth.currentUser.getIdToken()
            },
            "data":{
                _id:id
            }
        }
        await fetch('/api/removeactivity', { 
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
                deleteFile(`${code}/Activity/${id}/`,"Poster",storage)
                console.log("recieved")
                setActivity(Activity.filter(a=>a._id!==id))
                const data = await response.json()
                console.log("Activity",data)
                
                
                
            }else{
                console.log("response.body",await response.json())
                const data = await response.json()
                console.log("data.error",data)
                
            }  
        })
    }
    async function fetchMemberList(){
        console.log("calling fetch member")
        await fetch("/api/getmemberlist", { 
            method: "POST",
            body: JSON.stringify({
                user:{
                    token:await auth.currentUser.getIdToken(),
                    _id:userDBInfo._id
                },
                data:{
                    code:code
                }
            }),
            headers: {
            "Content-Type": "application/json",
            // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            mode:'cors'
        }).then(async res=>{
            await res.json().then(v=>{
                console.log("MemberList:",v)
            })
        })
    }
    // async function updateOrderStatus(order,val){
    //     order.status=val
    //     await fetch('/api/updateorderstatus', { 
    //         method: "POST",
    //         body: JSON.stringify({
    //             user:{
    //                 token:await auth.currentUser.getIdToken()
    //             },
    //             order:order
    //         }),
    //         headers: {
    //         "Content-Type": "application/json",
    //         // 'Content-Type': 'application/x-www-form-urlencoded',
    //         },
    //         mode:'cors'
            
    //     }).then(async response => {
            
    //         if (response.ok){
    //             // registered
                
    //             console.log("updated")
    //             const data = await response.json()
    //             console.log("Activity",data)
    //             setActivity(data)
                
                
    //         }else{
    //             console.log("response.body",await response.json())
    //             const data = await response.json()
    //             console.log("data.error",data)
    //             setActivity(data)
                
    //         }  
    //     })
        
    // }
    useEffect(() => {
        
        async function getSocActivity(){
            await fetch('/api/getsocactivity', { 
                method: "POST",
                body: JSON.stringify({
                    user:{
                        token:await auth.currentUser.getIdToken()
                    },
                    id:code
                }),
                headers: {
                "Content-Type": "application/json",
                // 'Content-Type': 'application/x-www-form-urlencoded',
                },
                mode:'cors'
                
            }).then(async response => {
                
                if (response.ok){
                    // registered
                    
                    console.log("added")
                    const data = await response.json()
                    console.log("Activity",data)
                    setActivity(data)
                    
                    
                }else{
                    console.log("response.body",await response.json())
                    const data = await response.json()
                    console.log("data.error",data)
                    setActivity(data)
                    
                }  
            })
            
            
        }
        async function getSocProduct(){
            await fetch('/api/getsocproduct', { 
                method: "POST",
                body: JSON.stringify({
                    user:{
                        token:await auth.currentUser.getIdToken()
                    },
                    id:code
                }),
                headers: {
                "Content-Type": "application/json",
                // 'Content-Type': 'application/x-www-form-urlencoded',
                },
                mode:'cors'
                
            }).then(async response => {
                
                if (response.ok){
                    // registered
                    
                    console.log("recieved")
                    await response.json().then(data=>{
                        console.log("product in fetch",data.data)
                        setProduct(data.data)
                    })
                    
                    
                    
                }else{
                    console.log("response.body",await response.json())
                    const data = await response.json()
                    console.log("data.error",data.data)
                    setProduct([])
                    
                }  
            })
            
            
        }
        async function getSocUser(){
            await fetch('/api/getsocuser', { 
                method: "POST",
                body: JSON.stringify({
                    user:{
                        token:await auth.currentUser.getIdToken()
                    },
                    id:code
                }),
                headers: {
                "Content-Type": "application/json",
                // 'Content-Type': 'application/x-www-form-urlencoded',
                },
                mode:'cors'
                
            }).then(async response => {
                
                if (response.ok){
                    // registered
                    
                    console.log("recieved")
                    const data = await response.json()
                    console.log("Member",data)
                    setMember(data)
                    
                    
                }else{
                    console.log("response.body",await response.json())
                    const data = await response.json()
                    console.log("data.error",data)
                    setMember(data)
                    
                }  
            })
            
            
            
        }
        async function getSocOrder(){
            await fetch('/api/getordersbysoc', { 
                method: "POST",
                body: JSON.stringify({
                    user:{
                        token:await auth.currentUser.getIdToken()
                    },
                    code:code
                }),
                headers: {
                "Content-Type": "application/json",
                // 'Content-Type': 'application/x-www-form-urlencoded',
                },
                mode:'cors'
                
            }).then(async response => {
                
                if (response.ok){
                    // registered
                    
                    console.log("recieved")
                    const data = await response.json()
                    console.log("order",data)
                    setOrder(data)
                    
                    
                }else{
                    console.log("response.body",await response.json())
                    const data = await response.json()
                    console.log("order",data)
                    setOrder(data)
                    
                }  
            })
        }
        if(tab==="Activity"){
            getSocActivity()
        }else if(tab==="Product"){
            getSocProduct()
        }else if(tab==="User"){
            getSocUser()
        }else if(tab==="Order"){
            getSocOrder()
        }
        // async function fetchAllInfo(){
        //     await getSocActivity()
        //     await getSocProduct()
        //     await getSocUser()
        //     await getSocOrder()
        // }
        // fetchAllInfo()
        return () => {
            
        }
    }, [tab])

    useEffect(() => {
        console.log("Product",Product)

    }, [Product])
    
    const panelStyles = {
        padding: '15px 20px',
        color: '#aaa'
        };
        
        const headerStyles = {
        padding: 20,
        fontSize: 16,
        background: '#fff',
        color: ' #aaa'
    };

    const [Indexs, setIndexs] = useState(
        {
          "學會資料 Society Information":{ 
            expanded:true,
            value:"general",
            subIndex:{
            
            }
              
          },
          "學會事務  Society Affair":{ 
            expanded:true,
            value:"session",
            subIndex:{
              
              
            }
              
          },
          "會員事務 Member Affair":{ 
            expanded:true,
            value:"Member",
            subIndex:{
              
              
              
            }
              
          },
          "學會訂單 Orders":{ 
            expanded:true,
            value:"Order",
            subIndex:{
              
              
            }
              
          },
          "虛擬貨倉 Virtual Inventory":{ 
            expanded:true,
            value:"Inventory",
            subIndex:{
              
              
            }
              
          },
          "學會問卷 Questionaires":{ 
            expanded:true,
            value:"Questionaires",
            subIndex:{
             
              
            }
              
          },
          
          
          "商品列表 Product List":{
            expanded:true,
            value:"Product",
            subIndex:{
             
            }
          },
          "活動列表 Activity List":{ 
            expanded:true,
            value:"Activity",
            subIndex:{
             
            },
    
              
          },
          "商店設定 Shop Setting":{ 
            expanded:true,
            value:"setting",
            subIndex:{
             
            },
    
              
          },
          
        })
    

    return (
        // <div className={` w-full flex flex-row px-20 mainpage-i font-mincho `}>
        //     <div className={`LHS flex flex-col w-3/12 items-center pr-5 `}>
               
                
        //         <div className="py-10">
        //             <img 
        //                 src     = "/assests/img/cow.png" //{"https://scontent-hkg4-2.cdninstagram.com/v/t51.2885-19/347563459_208001788751385_6605325373386775824_n.jpg?stp=dst-jpg_s320x320&_nc_ht=scontent-hkg4-2.cdninstagram.com&_nc_cat=109&_nc_ohc=PREBQqPlMS8AX-Qvx_g&edm=AOQ1c0wBAAAA&ccb=7-5&oh=00_AfD8-XC42ekIzinnx-BC2oz5x0xx4jomh5lc0udljnhXbA&oe=652B1884&_nc_sid=8b3546"}//
        //                 alt     = "ig logo"
        //                 width   = {300}
        //                 height  = {300}
        //                 className = "object-contain rounded-full "
        //             />
        //         </div>
        //         {/* <div className='flex pb-5'>
        //             <button className="bg-su-green text-white rounded-md px-4 py-2" >
                        
        //             </button>
                    
        //         </div> */}
                
        //         <div className=" flex flex-row py-5 w-full">
        //             <div className=" w-2/12 ">
        //             <button>
        //                 <img 
        //                 src     ="/assests/img/icon/icon_user.svg" 
        //                 alt     = "SID "
        //                 width   = {iconsize}
        //                 height  = {iconsize}
        //                 className = "object-contain "
        //                 />
        //             </button>
        //             </div>
                    
        //             <div className=" w-10/12 flex justify-center">
        //             {Soc[code].society_eng}
        //             </div>
        //         </div>

        //         <div className=" flex flex-row py-5 w-full">
        //             <div className=" w-2/12 ">
        //             <button>
        //                 <img 
        //                 src     ="/assests/img/icon/icon_user.svg" 
        //                 alt     = "gender"
        //                 width   = {iconsize}
        //                 height  = {iconsize}
        //                 className = "object-contain "
        //                 />
        //             </button>
        //             </div>
                    
        //             <div className=" w-10/12 flex justify-center">
        //             {Soc[code].society_chinese}
        //             </div>
        //         </div>

        //         <div className=" flex flex-row py-5 w-full justify-center items-center">
        //             <div className=" w-2/12 ">
        //             <button>
        //                 <img 
        //                 src     ="/assests/img/icon/gender.svg" 
        //                 alt     = "gender"
        //                 width   = {iconsize}
        //                 height  = {iconsize}
        //                 className = "object-contain "
        //                 />
        //             </button>
        //             </div>
        //             <div className="flex flex-col w-full items-center justify-center">
        //                 <div className=" ">
        //                     {Soc[code].exco_name_chinese}
        //                 </div>
        //                 <div className="">
        //                     {Soc[code].exco_name_eng}
        //                 </div>
                        
                    
        //             </div>
                    
                    
        //         </div>
                

        //         <div className=" flex flex-row py-5 w-full">
        //             <div className=" w-2/12 ">
        //             <button>
        //                 <img 
        //                 src     ="/assests/img/icon/icon_calendar.svg" 
        //                 alt     = "session "
        //                 width   = {iconsize}
        //                 height  = {iconsize}
        //                 className = "object-contain "
        //                 />
        //             </button>
        //             </div>
                    
        //             <div className=" w-10/12 flex justify-center">
        //             {Soc[code].session}
        //             </div>
        //         </div>
        //         <div className=" flex flex-col w-full">
        //             <div className=" w-full ">
        //                 payme link
        //                 <FieldForArray
        //                     key={`payme`}
        //                     fieldName={`payme`} 
        //                     fieldType={"text"} 
        //                     className={""} 
        //                     fieldValues={[""]} 
        //                     multipleValue={false}
        //                     // handleUpdate={SaveFieldValues}
        //                     postAPI={"/api/postpayme"}
        //                 />
        //             </div>
        //             <div className=" w-full ">
        //                 FPS link
        //                 <FieldForArray
        //                     key={`FPS`}
        //                     fieldName={`fps`} 
        //                     fieldType={"text"} 
        //                     className={""} 
        //                     fieldValues={[""]} 
        //                     multipleValue={false}
        //                     // handleUpdate={SaveFieldValues}
        //                     postAPI={"/api/postfps"}
        //                 />
        //             </div>
                    
                    
        //             {/* <div className=" w-10/12 justify-center">
                    
                        
        //                     <form action="" className='flex flex-row '>
        //                     {   Soc[code].payme?(
        //                             <input type="text" name="payme" id="payme" defaultValue={Soc[code].payme}/>
                                    
        //                         ):(
        //                             <input type="text" name="payme" id="payme" />
        //                         )
        //                     }
        //                         <button type='submit'>update</button>
        //                     </form>
                            
                        
                        
                    
                    
        //             </div> */}
                    
                    
        //         </div>
                
                

                
                


        
                
        //         <span className='py-5'></span>
                
                
                
                
        //     </div>
        //     <div className="RHS flex flex-col w-9/12 ">
        //         <div className="tab flex flex-row">
                    
        //             <button onClick={()=>{settab("Activity")}} className='rounded-t-md  text-2xl bg-slate-200 px-5'>
        //                 Activity 
        //             </button>
        //             <button onClick={()=>{settab("Product")}} className='rounded-t-md  text-2xl bg-slate-200 px-5 mx-1'>
        //                 Product 
        //             </button>
        //             <button onClick={()=>{settab("Member")}} className='rounded-t-md  text-2xl bg-slate-200 px-5 mr-1'>
        //                 Member 
        //             </button>
        //             <button onClick={()=>{settab("Order")}} className='rounded-t-md  text-2xl bg-slate-200 px-5 mr-1'>
        //                 Order 
        //             </button>
        //         </div>
        //         <div className="w-full bg-slate-100 rounded-b-3xl rounded-tr-3xl">
        //             <div className="p-5 ">
        //                 {tab==="Member"&&(
        //                     (<AdminMemberContainer 
        //                         code={code}
        //                         Member={Member}
        //                     />)
        //                 )}
        //                 {tab==="Activity"&&(
        //                     Activity&&(
        //                         <AdminActivityContainer 
        //                             code={code}
        //                             Activities={Activity}
        //                         />
        //                     )
        //                 )}

        //                 {tab==="Product"&&(
        //                     <AdminProductContainer
        //                         code={code}
        //                         Product={Product}
        //                     />
        //                 )}

                        // {
                        //     Order&&tab==="Order"&&(
                        //         <div className="grid grid-cols-1 gap-4 font-mincho">
                        //             {
                        //                 Order?.map(order=>{
                        //                     return(
                        //                       <div className="field">
                        //                         <div className="flex flex-col md:flex-row">
                        //                           <p className='overflow-x-auto'>訂單編號 {order._id}</p>
                        //                           <p className='md:mx-10'>付款方式 {order.payment_method}</p>
                        //                         </div>
                    
                        //                         <div className="flex flex-col md:flex-row">
                                                  
                        //                           <p className='md:mx-10'>狀態 </p>
                        //                           <select name="" id="" defaultValue={order.status} onChange={(e)=>{updateOrderStatus(order,e.target.value)}}>
                        //                             <option value="Confirmed">已確認付款</option>
                        //                             <option value="To be confirmed">等待確認付款</option>
                        //                             <option value="Processing">處理中</option>
                        //                             <option value="Delivering">運送中</option>
                        //                             <option value="Delivered">已運送</option>
                        //                             <option value="Cancelled">已取消</option>
                        //                           </select>
                        //                         </div>
                        //                         <p className='md:mx-10'>學生編號 {order.sid}</p>
                        //                         <p className='md:mx-10'>學生姓名 {order.chi_name}</p>
                        //                         <p className='md:mx-10'>聯絡電話 {order.contact}</p>
                        //                         <p className='md:mx-10'>建立日期 {Date(order.create_at).substring(0,24)}</p>
                                                
                                                
                        //                         <p className='py-2'>訂單物品</p>
                        //                         {
                        //                           order.products.map((item,i)=>{
                        //                             return(
                        //                               <p>{i+1}.{item.product_name}-{item.option} x {item.quantity}</p>
                        //                             )
                        //                           })
                        //                         }
                        //                       </div>
                        //                     )
                        //                   })
                        //             }
                        //         </div>
                                
                        //     )
                        // }
        //             </div>
                    
        //         </div>

                
        //     </div>

            
            
        // </div>
        <div className="flex flex-col p-5 pt-0 font-mincho h-screen">
            <div className="flex flex-col rounded-md  p-2 my-5 shadow border-b-2 border-su-green">
                <div className="">
                    <div className="text-xl text-su-green font-semibold ">
                        管理頁面 Pages
                    </div>
                </div>
                
                <div className='bg-white  grid grid-cols-5 text-sm ' >
                    {
                        Object.keys(Indexs).map(index=>{
                            return (
                                <button
                                    onClick={()=>{settab(Indexs[index].value)}}
                                    className='text-start mx-2'
                                >
                                    {index}
                                </button>
                                
                            )  
                        })
                    }
                    
                </div>
            </div>
            <div className="flex flex-col  shadow  rounded-xl p-5 text-base border-2">
                <div className="profile   flex flex-row ">
                    <div className="min-w-min">
                        <img src="/assests/img/cow.png" alt="" className='rounded-full ' width={100} />
                    </div>
                    
                    <div className="flex flex-col px-5">
                        <div className="border-b-2 border-b-su-green ">
                            {Soc[code].society_chinese}
                            {Soc[code].society_eng}
                        </div>
                        <div className="w-full grid grid-cols-3">
                            <div className="flex flex-row">
                                <a href={Soc[code].ig} className='text-gray-600'>{`${Soc[code].exco_name_eng}${Soc[code].exco_name_chinese
    }`}</a>
                            </div>
                            <div className="flex flex-row">
                                <div className="">{`Session 屆數: ${Soc[code].session}`}</div>
                            </div>
                            <div className="flex flex-row">
                                <div className="">{`類型:${Soc[code].type}`}</div>
                            </div>
                        </div>
                        {/* <div className="w-full grid grid-cols-3">
                            <div className="flex flex-row">
                                <div className="">{`會員人數: ${Soc[code].session}`}</div>
                                
                            </div>
                            
                            <div className="flex flex-row">
                                <a href={Soc[code].ig} className='text-gray-600'>{`${Soc[code].exco_name_eng}${Soc[code].exco_name_chinese
    }`}</a>
                            </div>
                            <div className="flex flex-row">
                                <div className="">{`${Soc[code].type}`}</div>
                            </div>
                        </div> */}
                        
                    </div>
                    
                </div>
                <div className="w-full  rounded-b-3xl rounded-xl ">
                    <div className="  ">
                        {tab==="Member"&&(
                            (<AdminMemberContainer 
                                code={code}
                                Member={Member}
                            />)
                        )}
                        {tab==="Activity"&&(
                            Activity&&(
                                <AdminActivityContainer 
                                    code={code}
                                    Activities={Activity}
                                />
                            )
                        )}

                        {tab==="Product"&&(
                            <AdminProductContainer
                                code={code}
                                Product={Product}
                            />
                        )}
                        {tab==="Order"&&(
                            <AdminOrderContainer
                                code={code}
                            />
                        )}
                        {tab==="general"&&(
                            <AdminSocietyInfoPage
                                code={code}
                            />
                        )}
                        {tab==="Questionaires"&&(
                            <AdminQuestionairContainer
                                code={code}
                            />
                        )}
                    </div>
                </div>
           </div>
            
           
            <div className="flex flex-row py-5 h-full ">
                {/* <div className='bg-white flex flex-col rounded-md border-2 p-2 mr-5 w-3/12 h-full' >
                    
                    {
                      Object.keys(Indexs).map(index=>{
                        return (
                            <button
                                onClick={()=>{settab(Indexs[index].value)}}
                                className='text-start'
                            >
                                {index}
                            </button>
                            
                        )  
                        })
                    }
                   
                </div> */}
            
                
                
            </div>
        </div>
    )
}

export default Manage