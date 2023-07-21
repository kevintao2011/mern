import React, { useEffect,useState } from 'react'
import { useParams , useNavigate, useLocation} from 'react-router-dom'
import { auth } from '../../utils/firebasefunction'

import { useAuth } from '../../components/session'
import { storage,uploadFile } from '../../utils/firebasefunction'

const EditActivity = () => {
    const {code,id} = useParams()
    const [Activity, setActivity] = useState()
    const location = useLocation();
    //

    const [error, seterror] = useState(null)
    const [Poster, setPoster] = useState()

    const [singleDay, setsingleDay] = useState(false)
    const [Uploading, setUploading] = useState(false)
    const navigate = useNavigate()
    const {setuserDBInfo,userDBInfo,Soc} = useAuth()
    const [Product, setProduct] = useState()
    const [SelectedProduct, setSelectedProduct] = useState([])
    console.log("code",code)
    
    async function handleUpload(e){
        e.preventDefault()
        setUploading(true)
      
        const file = e.target.files[0];
        // const formData = new FormData(form);
        // const filename = "test"
        // const files = Object.entries(Object.fromEntries(formData.entries())) 
        console.log("file type",file.type)
        await uploadFile(`${code}/${Activity._id}/`,`Poster`,file,storage).then(
           async ResultURL=>{
            console.log("PosterURL",ResultURL)
            await fetch("/api/changeposter",{
                method: "POST",
                body: JSON.stringify({
                    user:{
                        token:await auth.currentUser.getIdToken()
                    },
                    data:{
                        posterURL:ResultURL,
                        id:Activity._id
                    }
                }),
                headers: {
                "Content-Type": "application/json",
                // 'Content-Type': 'application/x-www-form-urlencoded',
                },
                mode:'cors'
                
            }).then(response=>{
                if( response.ok) {
                    setPoster(ResultURL)
                    
                }
            })
            
           }
        ).then(()=>{
            setUploading(false)
        })
        
    }

    async function updateProduct(e){
        e.preventDefault()
        console.log(e.target)
        const form = e.target;
        const formData = new FormData(form);
        console.log("formData",formData)
        const updateProductList=[]
        formData.forEach((value, key) => {
            updateProductList.push(key)
        })
        console.log("updateProductList",updateProductList)
        const reqbody = {
            user:{
                token:await auth.currentUser.getIdToken()
            },
            data:{
                id:Activity._id,
                productList:updateProductList
            }
        }
        await fetch('/api/updateActivityProduct', { 
            method: "POST",
            body: JSON.stringify(reqbody),
            headers: {
            "Content-Type": "application/json",
            // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            mode:'cors'
        }
          
        ).then(async response => {
            
            if (response.ok){
                // registered
                
                console.log("updated")
                
                //   navigate(`/society/${code}/manage`)
                
                
            }else{
                console.log("response.body",await response.json())
                const data = await response.json()
                console.log("data.error",data)
                seterror(data.code)
                
                
            }  
        })
    }
    // console.log({
    //     user:{
    //         "token":await auth.currentUser.getIdToken()
    //     },
    //     "id":id
    // })
    //
    async function getActivityDetails(){
        await fetch('/api/getactivity', { 
            method: "POST",
            body: JSON.stringify({
                user:{
                    token:await auth.currentUser.getIdToken()
                },
                id:id
                
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
                console.log("data.PosterURL",data.posterURL)
                if(data.posterURL){
                    setPoster(data.posterURL)
                }
                setsingleDay(data.single_date)
                console.log("data.start_date",data.start_date)
                setSelectedProduct(data.packages)
                console.log("SelectedProduct-data.packages",data.packages)
                
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
        
        setProduct(location.state.Product.filter(item=>
            item.status==="active"
        ));
        console.log("Product",Product)
        console.log(location.state.Product)
        // return () => {
        //     second
        // }
    }, [])
    
    return (
        Activity&&(
            <div className="flex flex-col p-20 justify-center">
                <div className="flex flex-row">
                    <div className="w-2/3">
                        <div>
                            <p className='selectlink'>Basic Information</p>
                            
                        </div>  
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

                        



                    </div>
                    <div className="Poster w-1/3 flex flex-col">
                        <p className='selectlink'> Poster</p>
                        <div className="flex flex-col items-center">
                            {
                                Poster?(
                                    <img 
                                        src     ={Poster}
                                        alt     = "promptation logo"
                                        width   = {300}
                                        height  = {300}
                                        className = "object-contain "
                                    />
                                
                                ):(
                                    <div className="">
                                        <p>This activity has no poster uploaded yet</p>
                                    </div>
                                )
                            }
                            <form action="" onSubmit={(e)=>{e.preventDefault()}} className='py-5'>
                                <div className="flex flex-col">
                                    <div className="flex flex-row ">
                                        <p className='selectlink text-sm' htmlFor="image-upload">Upload Poster</p> 
                                        <input type="file" id="image-upload" name="image" onChange={(e)=>{handleUpload(e);}}/>
                                    </div>
                                    <p className='text-red-600 text-sm'> It is adviced to upload a Poster in A4 Scale for optimized visual effect </p>
                                </div>

                            </form>
                        </div>
                        
                    </div>
                    
                </div>
                <div className="Product flex flex-col">
                    <p className='selectlink'>Product</p>
                    <form action="" onSubmit={(e)=>updateProduct(e)}>
                        {
                            Product&&Product.map(item=>{
                                return(
                                    <div className="flex flex-row">
                                        
                                        <p className='w-1/6'>{item.product_name}</p>
                                        <input type="checkbox" name={item._id} id={item._id} defaultChecked={ SelectedProduct.includes(item._id)}  />
                                        {/* <select name="" id="">
                                            {
                                                Product.map(item=>{
                                                    return(
                                                        <option value={item._id}>{item.product_name}</option>
                                                    )
                                                })
                                            }
                                        </select> */}
                                    </div>
                                    
                                )
                            })
                        }
                        <button type='submit' className=' rounded-full bg-su-green text-white p-2 my-5'>
                            update
                        </button>
                    </form>
                    
                </div>
                
            </div>
            
        )

    )
}

export default EditActivity