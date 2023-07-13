import React, {useState,useEffect} from 'react'
import { useAuth } from '../../components/session';
import { useParams,useNavigate } from 'react-router-dom';
import { auth } from '../../utils/firebasefunction';
const Manage = () => {
    const {code} = useParams()
    const [tab, settab] = useState('Member')
    const [Activity, setActivity] = useState()
    const [Product, setProduct] = useState()
    const iconsize = 20;
    const {Soc,currentUser} = useAuth()
    const navigate = useNavigate()
    console.log(code)
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
                
                console.log("added")
                const data = await response.json()
                console.log("Product",data)
                setProduct(data)
                
                
            }else{
                console.log("response.body",await response.json())
                const data = await response.json()
                console.log("data.error",data)
                setProduct(data)
                
            }  
        })
        
        
      }
      getSocActivity()
      getSocProduct()
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
                </div>
                <div className="h-full w-full bg-slate-100 rounded-b-3xl rounded-tr-3xl">
                    <div className="p-5 ">
                        {tab==="Member"&&(
                            <div className="flex flex-col">
                                <button className="bg-su-green w-2/3 text-white rounded-md p-3 m-3" onClick={()=>{console.log(`/society/${code}/creatactivity`); navigate(`/society/${code}/createactivity`)}}>
                                        Add member
                                    </button>
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
                                            <p className='w-1/3 justify-center'>Date</p>
                                            <p className='w-1/3 flex justify-center'>Activity </p>
                                            <p className='w-1/3 flex justify-center'> </p>
                                        </div>
                                        <ul className='list-none'>             
                                            {Activity.map(activity => {
                                                console.log("activity",activity)
                                                return(
                                                    <li key={activity._id}>
                                                        <div className="flex flex-row justify-between" >
                                                        <p className='w-1/3 justify-center'>{(Date(activity.start_date)).substring(0,15)}</p>
                                                        <p className='w-1/3 flex justify-center'>{activity.activity_name} </p>
                                                        <div className="w-1/3 flex justify-center">
                                                            <button className='w-1/3 flex justify-center items-center bg-blue-600 rounded-full m-2 text-white'> View </button>
                                                            <button className='w-1/3 flex justify-center items-center bg-su-green rounded-full m-2 text-white ' value={activity._id}  onClick={(e)=>{navigate(`/society/${code}/manage/${e.target.value}/editactivity`)}}> Manage </button>
                                                            <button className='w-1/3 flex justify-center items-center bg-red-700 rounded-full m-2 text-white'> Delete </button>
                                                            
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
                            <div className="">
                                <button className="bg-su-green w-full text-white rounded-md p-3" onClick={()=>{navigate(`/society/${code}/createproduct`)}}>
                                    Create Product
                                </button>
                            </div>
                        )}
                    </div>
                    
                </div>

                
            </div>

            
            
        </div>
    )
}

export default Manage