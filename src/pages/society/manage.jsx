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
import { Sidenav, Nav, InputPicker } from 'rsuite';
import DashboardIcon from '@rsuite/icons/legacy/Dashboard';
import GroupIcon from '@rsuite/icons/legacy/Group';
import MagicIcon from '@rsuite/icons/legacy/Magic';
import GearCircleIcon from '@rsuite/icons/legacy/GearCircle';
import ToggleList from '../admin/ToggleList';
import AdminQuestionairContainer from './questionaire/AdminQuestionairContainer';
import AdminStockContainer from './stock/AdminStockContainer';
// import { useNoti } from '../../components/Contexts/notificationContext';
import { toast } from 'sonner';
const Manage = () => {
    const {code} = useParams()
    const [tab, settab] = useState('Activity')
    const [Activity, setActivity] = useState()
    const [Product, setProduct] = useState()
    const [Member, setMember] = useState()
    const [Order, setOrder] = useState()
    const iconsize = 20;
    const {Soc,currentUser,userDBInfo} = useAuth()
    // const {popMessage} = useNoti()
    
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
            await fetch('/api/getsocproducts', { 
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
                        const prods = data.data.map(bigproduct=>{
                            bigproduct.totalSales = 0
                            bigproduct.product_list.forEach(product=>{
                                bigproduct.totalSales +=product.total_sales
                            })
                            console.log("sales: ",bigproduct.totalSales)
                            return bigproduct
                        })
                        setProduct(prods)
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
    
    useEffect(() => {
        // toast.info('You are now in Society Page',{
        //     position:"top-right",
        
        // });
        // popMessage("warning","tl","Hiwae awewaeawe aw")
    }, [])
    
    
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
            value:"Stock",
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

        <div className="flex flex-col p-5 pt-0 font-mincho h-screen">
            <div className="flex flex-col rounded-md  p-2 my-5 shadow border-b-2 border-su-green">
                <div className="">
                    <div className="text-xl text-su-green font-semibold ">
                        管理頁面 Pages
                    </div>
                </div>
                { 
                    window.innerWidth<720?(
                        <div>
                             <InputPicker 
                                data={Object.keys(Indexs).map(index=>{
                                    return (
                                        {label:index ,value:Indexs[index].value}
                                    )  
                                })}
                                className={'text-black font-base'}
                                onChange={(e)=>settab(e)}
                                
                            />
                        </div>
                    ):(
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
                    )
                }
               
                
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
                                    session={Soc[code].session}
                                />
                            )
                        )}

                        {tab==="Product"&&(
                            <AdminProductContainer
                                code={code}
                                session={Soc[code].session}
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
                        {tab==="Stock"&&(
                            <AdminStockContainer
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