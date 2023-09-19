import React, {useState,useEffect} from 'react'
import { useAuth } from '../../components/session';
import { useParams,useNavigate,Link } from 'react-router-dom';
import { auth,deleteFile,storage } from '../../utils/firebasefunction';


const Manage = () => {
    const {code} = useParams()
    const [tab, settab] = useState('Activity')
    const [Activity, setActivity] = useState()
    const [Product, setProduct] = useState()
    const [Member, setMember] = useState()
    const [Order, setOrder] = useState()
    const iconsize = 20;
    const {Soc,currentUser} = useAuth()
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
                const data = await response.json()
                
                var productList = [...data]
                productList.sort((a,b)=>a.parent>b.parent)
                
                
                

                console.log("Product",data)
                setProduct(productList)
                
                
            }else{
                console.log("response.body",await response.json())
                const data = await response.json()
                console.log("data.error",data)
                setProduct(data)
                
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

      async function fetchAllInfo(){
        await getSocActivity()
        await getSocProduct()
        await getSocUser()
        await getSocOrder()
      }
      fetchAllInfo()
      return () => {
        
      }
    }, [])
    
    

    return (
    <div className=" w-full flex flex-row px-20 mainpage-i ">
            <div className="LHS flex flex-col w-3/12 items-center justify-center">
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
                                <button className="bg-su-green w-2/3 text-white rounded-md p-3 m-3" onClick={()=>{console.log(`/society/${code}/creatactivity`); navigate(`/society/${code}/createactivity`)}}>
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
                                    <button className="bg-su-green w-2/3 text-white rounded-md p-3 " onClick={()=>{navigate(`/society/${code}/createproduct`)}}>
                                        Create Product
                                    </button>
                                </div>
                                
                                {Product&&(
                                    <div className="flex flex-col ">
                                        <div className="flex flex-row justify-start ">
                                            <p className='w-2/12 justify-center'>Type</p>
                                            <p className='w-2/12 flex justify-center'>Product </p>
                                            <p className='w-2/4 flex justify-center'> Options </p>
                                            <p className='w-1/4 flex justify-center'> Manage </p>
                                        </div>
                                        <ul className='list-none'>             
                                            {Product.map(product => {
                                                console.log("activity",product)
                                                return(
                                                    <li key={product._id}>
                                                        <div className="flex flex-row justify-between " >
                                                        <p className='w-2/12 justify-center '>{(product.product_type
)}</p>
                                                        <p className='w-1/4 flex justify-center'>{product.product_name_chi} </p>
                                                        <div className="w-2/4 flex flex-col">
                                                            {
                                                                // product.sub.map((productObj,i)=>{
                                                                //     console.log(i,"productObj",productObj)
                                                                //     return(
                                                                //         <div className="w-full flex flex-col">
                                                                //             <div className="flex flex-row w-full px-2">
                                                                //                 {/* <p className='  rounded-md bg-cyan-500'>{productObj.name}</p> */}
                                                                //                 <p className='  rounded-md'>{productObj.name}</p>
                                                                //             </div>
                                                                            
                                                                //             <div className="flex flex-row w-full">
                                                                //                 <div className="px-2 w-1/2 ">
                                                                //                     {/* <p className='rounded-md bg-orange-600'>${productObj.price}</p> */}
                                                                //                     <p className='rounded-md'>${productObj.price}</p>
                                                                //                 </div>
                                                                //                 <div className="px-2 w-1/2">
                                                                //                     {/* <p className='px-2 w-1/2 rounded-md bg-blue-700'>{productObj.inventory}pcs</p> */}
                                                                //                     <p className='px-2 w-1/2 rounded-md '>{productObj.inventory}pcs</p>
                                                                //                 </div>
                                                                                
                                                                                
                                                                //             </div>
                                                                            
                                                                //         </div>
                                                                        
                                                                        
                                                                //     )
                                                                // })
                                                            }
                                                        </div>
                                                        
                                                        <div className="w-1/4 flex justify-center">
                                                            <button className='w-1/3 h-10 flex justify-center items-center bg-blue-600 rounded-full m-2 text-white'> View </button>

                                                            {/* <Link 
                                                                className='w-1/3  h-10  flex justify-center items-center bg-su-green rounded-full m-2 text-white '
                                                                to={`/society/${code}/manage/${e.target.value}/editsociety`}
                                                                
                                                                state={{product:product}}

                                                            >
                                                                Manage
                                                            </Link> */}
                                                            <button className='w-1/3  h-10  flex justify-center items-center bg-su-green rounded-full m-2 text-white ' value={product._id}  onClick={(e)=>{navigate(`/society/${code}/manage/${e.target.value}/editproduct`,{state:{Product:Product}})}}> Manage</button>
                                                            <button className='w-1/3   h-10 flex justify-center items-center bg-red-700 rounded-full m-2 text-white'> Delete </button>
                                                            
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