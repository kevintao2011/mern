import React, { useEffect,useState } from 'react'
import { useParams , useNavigate} from 'react-router-dom'
import { auth } from '../../utils/firebasefunction'

import { useAuth } from '../../components/session'
const EditActivity = () => {
    const {code,id} = useParams()
    const [Activity, setActivity] = useState()

    //
    const [Submit, setSubmit] = useState(true)
    const [error, seterror] = useState(null)

    const [singleDay, setsingleDay] = useState(false)
    const navigate = useNavigate()
    const {setuserDBInfo,userDBInfo,Soc} = useAuth()
    
    console.log("code",code)

    //
    async function getActivityDetails(){
        await fetch('/api/getactivity', { 
            method: "POST",
            body: JSON.stringify({
                user:{
                    token:await auth.currentUser.getIdToken()
                },
                id:id,
                
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
                // const startDate = new Date(data.start_date).toISOString().split('T')[0]
                data.start_date =  new Date(data.start_date).toISOString().split('T')[0]
            if (!data.single_date){
                    data.end_date =  new Date(data.end_date).toISOString().split('T')[0]
                }
                
                setActivity(data)
                
                setsingleDay(data.single_date)
                console.log("data.start_date",data.start_date)
                
                
            }else{
                console.log("response.body",await response.json())
                const data = await response.json()
                console.log("data.error",data)
                setActivity(data)
                
            }  
        })
    }

    useEffect(() => {
        getActivityDetails()
    
        // return () => {
        //     second
        // }
    }, [])
    
    return (
        Activity&&(
            <div className="flex flex-col">
                <div className="">
                    <div>{code}EditActivity{id}</div>  
                    <form action="" onSubmit={(e)=>{}} className='m-10'>
                    
                    <div className="flex flex-row py-2 justify-between">
                        <div className="">
                            
                        </div>
                        <label htmlFor="society" className="w-full block mb-2 text-lg font-medium greentxt justify-self-start">
                            Society
                        </label>
                        <span className='px-5'></span>
                        
                        
                        <input 
                            type="text"
                            name="code" 
                            id="code"  
                            required="required" 
                            value={code}
                            placeholder={code}
                            className='rounded-md px-5 w-full justify-self-center'
                            disabled={true}
                        />

                    </div>

                    
                    
                    <div className="flex flex-row py-2 justify-between">
                        <label htmlFor="activity_name" className="w-full block mb-2 text-lg font-medium greentxt justify-self-start">
                            Activity name
                        </label>
                        <span className='px-5'></span>
                        <input 
                            type="text"
                            name="activity_name" 
                            defaultValue={Activity.activity_name}
                            id="activity_name"  
                            required="required" 
                            className='rounded-md px-5 w-full justify-self-center'
                        />
                        
                    
                    </div>

                    <div className="flex flex-row py-2 justify-between">
                        
                        <label htmlFor="single_date" className="w-full block mb-2 text-lg font-medium greentxt justify-self-start">
                            Single Date?
                        </label>
                        <span className='px-5'></span>

                        <label className="relative inline-flex w-full items-center cursor-pointer">
                        <input type="checkbox" id="single_date" name='single_date' defaultChecked={Activity.single_date} value={singleDay} className="sr-only peer" onClick={()=>{setsingleDay(prev=>!prev);console.log("use Effect:",singleDay)}} />
                            <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-2 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                        
                        </label>


                    </div>
                    
                    
                    {singleDay?(
                        <div className="">
                            <div className="flex flex-row py-2 justify-between">
                                <label htmlFor="start_date" className="w-full block mb-2 text-lg font-medium greentxt justify-self-start">
                                    Activity Date
                                </label>
                                <span className='px-5'></span>
                                <input 
                                    type="date"
                                    name="start_date" 
                                    id="start_date"  
                                    // defaultValue={Activity.start_date}
                                    defaultValue={Activity.start_date}
                                    required="required" 
                                    className='rounded-md px-5 w-full justify-self-center'
                                />
                            </div>
                            <div className="flex flex-row py-2 justify-between">
                                <label htmlFor="start_time" className="w-full block mb-2 text-lg font-medium greentxt justify-self-start">
                                    Start Time
                                </label>
                                <span className='px-5'></span>
                                <input 
                                    type="time"
                                    name="start_time" 
                                    id="start_time"  
                                    required="required"
                                    defaultValue={Activity.start_time}
                                    className='rounded-md px-5 w-full justify-self-center'
                                />
                            </div>
                            <div className="flex flex-row py-2 justify-between">
                                <label htmlFor="end_time" className="w-full block mb-2 text-lg font-medium greentxt justify-self-start">
                                    End Time
                                </label>
                                <span className='px-5'></span>
                                <input 
                                    type="time"
                                    name="end_time" 
                                    id="end_time" 
                                    defaultValue={Activity.end_time} 
                                    required="required" 
                                    className='rounded-md px-5 w-full justify-self-center'
                                />
                            </div>
                        </div>
                        

                        
                    ):(
                        <div className="">
                            <div className="flex flex-row py-2 justify-between">
                                <label htmlFor="start_date" className="w-full block mb-2 text-lg font-medium greentxt justify-self-start">
                                    Start Date
                                </label>
                                <span className='px-5'></span>
                                <input 
                                    type="date"
                                    name="start_date" 
                                    id="start_date"  
                                    required="required"
                                    defaultValue={Activity.start_date}
                                    className='rounded-md px-5 w-full justify-self-center'
                                />
                                
                            
                            </div>

                            <div className="flex flex-row py-2 justify-between">
                                <label htmlFor="end_date" className="w-full block mb-2 text-lg font-medium greentxt justify-self-start">
                                End Date
                                </label>
                                <span className='px-5'></span>
                                <input 
                                    type="date"
                                    name="end_date" 
                                    id="end_date"  
                                    required="required" 
                                    className='rounded-md px-5 w-full justify-self-center'
                                    defaultValue={Activity.end_date}
                                />
                                
                            
                            </div>
                        </div>
                    )}
                    
                    
                    
                    
                    <div className="flex flex-row py-2 justify-between">
                        <label htmlFor="payment_method" className="w-full block mb-2 text-lg font-medium greentxt justify-self-start">   
                            Payment method
                        </label>
                        <span className='px-5'></span>
                        {/* <select 
                            
                            type="text"
                            name="payment_method" 
                            id="payment_method"  
                            required="required" 
                            className='rounded-md px-5 w-full justify-self-center'
                        >
                            <option value="cash" >cash</option>
                            <option value="FPS" >FPS</option>
                            
                        </select> */}
                        <div className="rounded-md px-5 w-full justify-self-center">
                            <input 
                                type="checkbox" 
                                name="payment_method" 
                                id="payment_method" 
                                defaultChecked={Activity.payment_method==="Cash"}
                                value={"Cash"} 
                            /> 
                            Cash
                        </div>
                        
                        
                        
                    
                    </div>
                    {/* <div className="flex flex-row py-2 justify-between">
                        <label htmlFor="description" className="w-full block mb-2 text-lg font-medium greentxt justify-self-start">
                            description
                        </label>
                        <span className='px-5'></span>
                        <input 
                            type="text"
                            name="description" 
                            id="description"  
                            required="required" 
                            placeholder='Student Number on Your Card'
                            className='rounded-md px-5 w-full justify-self-center'
                        />
                        
                    
                    </div> */}
                    <div className="flex flex-row py-2 justify-between">
                        <div className="">
                            
                        </div>
                        <label htmlFor="status" className="w-full block mb-2 text-lg font-medium greentxt justify-self-start">
                            Release Now? 
                        </label>
                        <span className='px-5'></span>
                        <select 
                            name="status" 
                            id="status"  
                            defaultValue={Activity.status} 
                            required="required" 
                            className='rounded-md px-5 w-full justify-self-center'
                        >
                            <option value="Later">Later</option>
                            <option value="Now">Now</option>
                            
                        </select>
                    </div>
                <div className=" w-full flex flex-row justify-center p-5">
                        <button 
                            className=" py-2 w-1/6  bg-su-green rounded-full text-white " 
                            type="submit"
                            // disabled={!Submit}
                        >
                            Update
                        </button>
                    </div>
                    
                    <p
                        className="flex flex-row py-2 w-full justify-center text-red-600" 
                    >
                        {error}
                    </p>
                    </form>
                    <form action="" onSubmit={(e)=>{}} className='m-10'>
                    <label for="image-upload">Upload an image:</label>
                        <input type="file" id="image-upload" name="image"/>
                        <button type="submit" className='p-1 bg-su-green rounded-full' onClick={(e)=>{console.log(e.target.value)}}> Upload</button>
                    </form>
                </div>
                
            </div>
            
        )

    )
}

export default EditActivity