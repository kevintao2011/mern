import React, {useState,useEffect, useRef} from 'react'
import { useAuth } from '../../components/session';
import { useParams,useNavigate,Link } from 'react-router-dom';
import { auth,deleteFile,storage } from '../../utils/firebasefunction';
import ListTable from '../../components/table/ListTable';
import CreateSingleProductContainer from './product/CreateSingleProductContainer';
import SearchTool from '../../components/table/SearchTool';

const Manage = () => {
    const {code} = useParams()
    const [tab, settab] = useState('Activity')
    const [Activity, setActivity] = useState()
    const [Product, setProduct] = useState()
    const [Member, setMember] = useState()
    const [Order, setOrder] = useState()
    const iconsize = 20;
    const {Soc,currentUser} = useAuth()
    const [showDrawer, setshowDrawer] = useState(false)
    const navigate = useNavigate()
    console.log(code)
    let sideBarRef = useRef()
    
    useEffect(() => {
        let handler = (e)=>{
            if(!sideBarRef?.current.contains(e.target)){
                setshowDrawer(false)
            }
        }
        document.addEventListener("mousedown",handler)
        return()=>{
            document.removeEventListener("mousedown",handler)
        }
    }, [])
    
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
    async function updateOrderStatus(order,val){
        order.status=val
        await fetch('/api/updateorderstatus', { 
            method: "POST",
            body: JSON.stringify({
                user:{
                    token:await auth.currentUser.getIdToken()
                },
                order:order
            }),
            headers: {
            "Content-Type": "application/json",
            // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            mode:'cors'
            
        }).then(async response => {
            
            if (response.ok){
                // registered
                
                console.log("updated")
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
    
    
    

    return (
    <div className={` w-full flex flex-row px-20 mainpage-i ${showDrawer&&'blur-md'} `}>
            <div className={`LHS flex flex-col w-3/12 items-center justify-center `}>
                
                {
                    <div 
                        className={`absolute top-0 right-0 bg-transparent drawer ${showDrawer?'active':'inactive'}` }
                        ref={sideBarRef}>
                        <CreateSingleProductContainer/>
                    </div>
                }
                <div className="py-10">
                    <img 
                        src     ="/assests/img/cow.png" 
                        alt     = "promptation logo"
                        width   = {300}
                        height  = {300}
                        className = "object-contain rounded-full "
                    />
                </div>
                {/* <div className='flex pb-5'>
                    <button className="bg-su-green text-white rounded-md px-4 py-2" >
                        
                    </button>
                    
                </div> */}
                
                <div className=" flex flex-row py-5 w-full">
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
                    {Soc[code].society_eng}
                    </div>
                </div>

                <div className=" flex flex-row py-5 w-full">
                    <div className=" w-2/12 ">
                    <button>
                        <img 
                        src     ="/assests/img/icon/icon_user.svg" 
                        alt     = "gender"
                        width   = {iconsize}
                        height  = {iconsize}
                        className = "object-contain "
                        />
                    </button>
                    </div>
                    
                    <div className=" w-10/12 flex justify-center">
                    {Soc[code].society_chinese}
                    </div>
                </div>

                <div className=" flex flex-row py-5 w-full justify-center items-center">
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
                    <div className="flex flex-col w-full items-center justify-center">
                        <div className=" ">
                            {Soc[code].exco_name_chinese}
                        </div>
                        <div className="">
                            {Soc[code].exco_name_eng}
                        </div>
                        
                    
                    </div>
                    
                    
                </div>
                

                <div className=" flex flex-row py-5 w-full">
                    <div className=" w-2/12 ">
                    <button>
                        <img 
                        src     ="/assests/img/icon/icon_calendar.svg" 
                        alt     = "session "
                        width   = {iconsize}
                        height  = {iconsize}
                        className = "object-contain "
                        />
                    </button>
                    </div>
                    
                    <div className=" w-10/12 flex justify-center">
                    {Soc[code].session}
                    </div>
                </div>
                <div className=" flex flex-col py-5 w-full">
                    <div className=" w-full ">
                        <p>payme link</p>
                    </div>
                    
                    <div className=" w-10/12 justify-center">
                    
                        
                            <form action="" className='flex flex-row '>
                            {   Soc[code].payme?(
                                    <input type="text" name="payme" id="payme" defaultValue={Soc[code].payme}/>
                                    
                                ):(
                                    <input type="text" name="payme" id="payme" />
                                )
                            }
                                <button type='submit'>update</button>
                            </form>
                            
                        
                        
                    
                    
                    </div>
                </div>
                
                

                
                


        
                
                <span className='py-5'></span>
                
                
                
                
            </div>
            <div className="RHS flex flex-col w-9/12 p-20 pr-0">
                <div className="tab flex flex-row">
                    
                    <button onClick={()=>{settab("Activity")}} className='rounded-t-md  text-2xl bg-slate-200 px-5'>
                        Activity 
                    </button>
                    <button onClick={()=>{settab("Product")}} className='rounded-t-md  text-2xl bg-slate-200 px-5 mx-1'>
                        Product 
                    </button>
                    <button onClick={()=>{settab("Member")}} className='rounded-t-md  text-2xl bg-slate-200 px-5 mr-1'>
                        Member 
                    </button>
                    <button onClick={()=>{settab("Order")}} className='rounded-t-md  text-2xl bg-slate-200 px-5 mr-1'>
                        Order 
                    </button>
                </div>
                <div className="h-full w-full bg-slate-100 rounded-b-3xl rounded-tr-3xl">
                    <div className="p-5 ">
                        {tab==="Member"&&(
                            <div className="flex flex-col">
                                <button className="bg-su-green w-2/3 text-white rounded-md p-3 m-3" onClick={()=>{console.log(`/society/${code}/editmembership`); navigate(`/society/${code}/editmembership`)}}>
                                        Add member
                                </button>
                                {
                                    Member&&(
                                        <div className="flex flex-col">
                                            <div className="flex flex-row justify-between ">
                                                <p className='w-1/3 justify-center'>SID</p>
                                                <p className='w-1/3 flex justify-center'>role </p>
                                                <p className='w-1/3 flex justify-center'> </p>
                                            </div>
                                            {
                                                Member.map(member=>{
                                                    console.log(member.sid)
                                                    return(
                                                        
                                                        <div className="flex flex-row w-full">
                                                            <p className='w-1/3'>{member.sid}</p>
                                                            <p className='w-1/3'>{member.role}</p>
                                                        </div>
                                                        
                                                    )
                                                })
                                            }
                                        </div>
                                        
                                        
                                    )
                                }
                            </div>
                            
                        )}
                        {tab==="Activity"&&(
                            <div className="flex flex-col ">
                                <div className="flex justify-center">
                                    <button className="bg-su-green w-2/3 text-white rounded-md p-3 m-3" onClick={()=>{console.log(`/society/${code}/creatactivity`); navigate(`/society/${code}/createactivity`)}}>
                                        Create Activity
                                    </button>
                                   
                                </div>  
                                {Activity&&(
                                    <div className="flex flex-col ">
                                        <div className="flex flex-row justify-between ">
                                            <p className='w-1/6 justify-center'>Date</p>
                                            <p className='w-1/6 justify-center'>Single Date</p>
                                            <p className='w-1/3 flex justify-center'>Activity </p>
                                            <p className='w-1/3 flex justify-center'> Action </p>
                                        </div>
                                        <ul className='list-none'>             
                                            {Activity.map(activity => {
                                                activity.start_date = new Date(activity.start_date);
                                                
                                                console.log("activity",activity)
                                                return(
                                                    <li key={activity._id}>
                                                        <div className="flex flex-row justify-between" >
                                                        <p className='w-1/6 justify-center'>{(activity.start_date.toISOString().substring(0, 10))}</p>
                                                        {
                                                            activity.single_date?(
                                                                <p className='w-1/6 justify-center'>Yes</p>
                                                            ):(
                                                                <p className='w-1/6 justify-center'>No</p>
                                                            )
                                                        }
                                                        
                                                        
                                                        <p className='w-1/3 flex justify-center'>{activity.activity_name} </p>
                                                        <div className="w-1/3 flex justify-center">
                                                            {/* <button className='w-1/3 flex justify-center items-center bg-blue-600 rounded-full m-2 text-white'> View </button> */}
                                                            <button className='w-1/3 flex justify-center items-center bg-su-green rounded-full m-2 text-white ' value={activity._id}  onClick={(e)=>{navigate(`/society/${code}/manage/${e.target.value}/editactivity`,{state:{Product:Product}})}}> Manage </button>
                                                            <button className='w-1/3 flex justify-center items-center bg-red-700 rounded-full m-2 text-white'
                                                                onClick={()=>{removeActivity(activity._id)}}
                                                            > 
                                                                Delete 
                                                            </button>
                                                            
                                                        </div>
                                                        
                                                    </div>
                                                    </li>
                                                    
                                                    
                                                    
                                                )
                                            })}
                                        </ul>
                                    </div>
                                )}
                            </div>
                            
                            
                            
                        )}

                        {tab==="Product"&&(
                            <div className="w-full flex-col ">
                                <div className="w-full flex flex-row justify-center">
                                    <div className="w-1/2 flex flex-row">
                                        
                                        <div className="">
                                            <div className="text-3xl">Product</div>
                                        </div>
                                    </div>
                                    <div className="w-1/2 py-1">
                                        <div className="w-full flex flex-row gap-2 justify-end">
                                            {/* <button className="bg-su-green  text-white rounded-md p-1 " onClick={()=>{navigate(`/society/${code}/createproduct`)}}> */}
                                            <button className="bg-su-green  text-white rounded-md p-1 " onClick={()=>{setshowDrawer(prev=>!prev)}}>
                                                Create Product
                                            </button>
                                            <button className="bg-su-green  text-white rounded-md p-1 " onClick={()=>{navigate(`/society/${code}/createproduct`)}}>
                                                Virtual Stocks
                                            </button>
                                        </div>
                                        
                                    </div>
                                    
                                    
                                </div>
                                {Array.isArray(Product)&&(
                                        <ListTable 
                                            dataEntries={Product}
                                            TitleMap={{
                                                // _id:"_ID",
                                                
                                                product_name_chi:"Product Name",
                                                product_type:"Category",
                                                inventory:"stock",
                                                total_sales:"sold",
                                                unit_price:"UNIT Price",
                                                published:"published",
                                                session:"session"

                                            }}
                                        />
                                    )}
                                
                                {/* {Product&&(
                                    <div className="flex flex-col ">
                                        <div className="flex flex-row justify-start  text-base">
                                            <div className="w-2/12 justify-center">Type</div>
                                            <div className="w-2/12 justify-center">Product</div>
                                            <div className="w-2/12 justify-center">Options</div>
                                            <div className="w-2/12 justify-center">Manage</div>
                                        </div>
                                        <ul className='list-none'>             
                                            {Product.map(product => {
                                                console.log("activity",product)
                                                return(
                                                    <li key={product._id}>
                                                        <div className="flex flex-row justify-between " >
                                                        <p className='w-2/12 justify-center text-base'>{(product.product_type
)}</p>
                                                        <p className='w-1/4 flex justify-center  text-base'>{product.product_name_chi} </p>
                                
                                                        
                                                        <div className="w-1/4 flex justify-center">
                                                            <button className='w-1/3 h-10 flex justify-center items-center bg-blue-600 rounded-full m-2 text-white'> View </button>
                                                            <button className='w-1/3  h-10  flex justify-center items-center bg-su-green rounded-full m-2 text-white ' value={product._id}  onClick={(e)=>{navigate(`/society/${code}/manage/${e.target.value}/editproduct`,{state:{Product:Product}})}}> Manage</button>
                                                            <button className='w-1/3   h-10 flex justify-center items-center bg-red-700 rounded-full m-2 text-white'> Delete </button>
                                                            
                                                        </div>
                                                        
                                                    </div>
                                                    </li>
                                                    
                                                    
                                                    
                                                )
                                            })}
                                        </ul>
                                    </div>
                                )} */}
                            </div>
                        )}

                        {
                            Order&&tab==="Order"&&(
                                Order?.map(order=>{
                                    return(
                                      <div className=" bg-white p-1 rounded-md my-2">
                                        <div className="flex flex-col md:flex-row">
                                          <p className='overflow-x-auto'>訂單編號 {order._id}</p>
                                          <p className='md:mx-10'>付款方式 {order.payment_method}</p>
                                        </div>
            
                                        <div className="flex flex-col md:flex-row">
                                          
                                          <p className='md:mx-10'>狀態 </p>
                                          <select name="" id="" defaultValue={order.status} onChange={(e)=>{updateOrderStatus(order,e.target.value)}}>
                                            <option value="Confirmed">已確認付款</option>
                                            <option value="To be confirmed">等待確認付款</option>
                                            <option value="Processing">處理中</option>
                                            <option value="Delivering">運送中</option>
                                            <option value="Delivered">已運送</option>
                                            <option value="Cancelled">已取消</option>
                                          </select>
                                        </div>
                                        <p className='md:mx-10'>學生編號 {order.sid}</p>
                                        <p className='md:mx-10'>學生姓名 {order.chi_name}</p>
                                        <p className='md:mx-10'>聯絡電話 {order.contact}</p>
                                        <p className='md:mx-10'>建立日期 {Date(order.create_at).substring(0,24)}</p>
                                        
                                        
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
                            )
                        }
                    </div>
                    
                </div>

                
            </div>

            
            
        </div>
    )
}

export default Manage