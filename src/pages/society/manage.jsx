import React, {useState,useEffect} from 'react'

const Manage = () => {
    const [Authrize, setAuthrize] = useState()
    const [tab, settab] = useState('Member')
    const iconsize = 20;
    const soc = "CHINESE"
    // useEffect(() => {
    //   async function getSocInfo(){
    //     await fetch('/api/soc',{
    //         method:"POST",
    //         body:JSON.stringify({
    //             user:{
    //                 token:token
    //             }
    //         }),
    //         headers: {
    //             "Content-Type": "application/json",
    //             // 'Content-Type': 'application/x-www-form-urlencoded',
    //             },
    //             mode:'cors'
            
    //     }).then(async response =>{
    //         if(response.ok){
    //             console.log("fetched user")
    //             const data = await response.json()
    //             console.log("userInfo",data)
    //             setuserDBInfo(data)
                
    //             setLoading(false)
                
    //         }
    //     })
    //   }
    
    //   return () => {
        
    //   }
    // }, [tab])
    

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
                <div className='flex pb-5'>
                    <button className="bg-su-green text-white rounded-md px-4 py-2" >
                        Edit Profile
                    </button>
                    
                </div>
                
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
                    中文系籌委會
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
                    Culture Study Society
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
                            和光
                        </div>
                        <div className="">
                            Wogwong, The 27th Chinese Society, Association of Art Programme, L.U.S.U.
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
                    {"32"}
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
                <div className="h-full w-full bg-green-100 rounded-b-3xl rounded-tr-3xl">
                    <div className="p-10 ">
                        {tab==="Member"&&(
                            <div className="">

                            </div>
                            
                        )}
                        {tab==="Activity"&&(
                            <div className="">
                                <button className="bg-su-green w-full text-white rounded-md p-3" >
                                    Create Activity
                                </button>
                            </div>
                            
                        )}
                        {tab==="Product"&&(
                            <div className="">
                                <button className="bg-su-green w-full text-white rounded-md p-3" >
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