

import React, { useEffect,useState } from 'react'
import FillForm from '../../../components/FormComponents/FillForm'
import { postURL } from '../../../utils/fetch'
import { toast } from 'sonner'
import moment from 'moment'
import { uploadFile } from '../../../utils/firebasefunction'

function CreateActivityContainer({onExit,code}) {
    const [FormData, setFormData] = useState()
    const [Categories, setCategories] = useState()
    async function handleSubmit(dataObj){
        //1. Create Product e.g ticket for the Event
        //2. Create Stocks for the ticket
        //3. Create Activity for the Event

        
        console.log("handleSubmit",dataObj)
        const obj={}
        Object.keys(dataObj).forEach(i => {
            obj[dataObj[i]["field_name"]]=dataObj[i]["field_value"]
        });
        console.log(obj)

        await postURL('/api/getnextsku',true,{code:code}).then(async result=>{
            console.log("result",result)
            if(result.success){
                const sku = result.data
                obj.sku=sku
                toast(sku)
                await Promise.all(
                    obj["posterURL"].map(async (file,index)=>{
                        console.log("obj",obj)
                        console.log("upload to",`Activity/${code}/${sku}/`,`img-${index}`)
                        return await uploadFile(`Activity/${code}/${sku}/`,`img-${index}`,file,2000)
                    })
                ).then(async (urls)=>{
                    toast.success("Photo created successfully")
                    obj["posterURL"]=urls
                    await postURL('/api/createproduct',true,{
                        code:code,
                        ...obj
                    }).then((result)=>{
                        if(result.success){
                            console.log("result",result)
                            toast.success(result.data)
                        }else{
                            toast.error(result.data)
                        }
                    })
                })
            }else{
                toast.error("(outside)cannot get sku")
            }     
            
        })
        await postURL("/api/createactivitynproduct",true,{...obj,code:code}).then(result=>{
            if(result.success){
                toast.success("created")
            }else{
                toast.error(result.data)
                // delete uploaded image
                
            }
        })
    }
    useEffect(() => {
        async function getCategories(){
            await fetch('/api/getcatoption', { 
                method: "POST",
                body: JSON.stringify({
                    
                }),
                headers: {
                "Content-Type": "application/json",
                // 'Content-Type': 'application/x-www-form-urlencoded',
                },
                mode:'cors'
                
            }).then(async response => {
                if (response.ok){
                    await response.json().then(data=>{
                        setCategories(data.map(d=>{
                            console.log("Categories",d)
                            return d.catergory_name
                        }))
                    })
                }
            })
        }
        getCategories()
    }, [])
    useEffect(() => {
        if(Categories){
            console.log("Categories",Categories)
            const data = [
                {
                    field_name:"activity_name",
                    field_type:"text",
                    single:true,
                    field_value:"", //given
                    // required:true,
                },
                {
                    field_name:"activity_description",
                    single:true,
                    field_value:"", //given
                    field_type:"text",
                    field_props:"paragraph"
                },
                {
                    field_name:"start_time",
                    field_value:moment().utcOffset(8), //given
                    field_type:"date",
                    single_value:true,
                    // required:true,
                },
                {
                    field_name:"end_time",
                    single_value:true,
                    field_value:moment().utcOffset(8), //given
                    field_type:"date",
                    // required:true,

                },
                {
                    field_name:"links",
                    field_type:"text",
                    single:false,
                    field_value:[], //given
                    is_kv:true,
                    field_options:[],
                    split_by:'field'
                },
                // {
                //     field_name:"packages",
                //     single:false,
                //     field_value:[], //given
                //     field_options:[],
                //     field_type:"select",
                //     field_props:"",
                    
                // },
                
                {
                    field_name:"tags",
                    single:false,
                    field_value:[], //given
                    field_props:"multiple",
                    field_type:"text",
                    split_by:' '
                },
                {
                    field_name:"published",
                    single:true,
                    field_value:false, //given
                    field_type:"boolean",
                    is_required:true,
                },
                {
                    field_name:"posterURL",
                    single:true,
                    field_value:[], //given
                    field_type:"file",
                },
                {
                    field_name:"product_list",
                    single:true,
                    field_value:[], //given
                    field_type:"role",
                    is_required:true,

                },
                
            ]
            setFormData(data)
        }
        
        
    }, [Categories])
    
    
    return (
        <div className={`w-full blur-0 p-2 h-full flex flex-col justify-center`}>
            <div className="flex flex-col">
                <div className="w-full flex flex-row justify-end">
                    <button onClick={onExit}>X</button>
                </div>
                
            </div>
            {
                FormData&&(
                    <FillForm 
                        fields={FormData} 
                        title={"Activity"}
                        className={"w-full"}
                        description={"A list of all the users in your account including their name, title, email and role."}    
                        TitleMap={
                            {
                                activity_name:"Activity Name",
                                activity_description:"Activity Description",
                                start_time:"Start Time",
                                end_time:"End Time",
                                links:"Links",
                                // packages:"Product Included",
                                tags:"Tags",
                                poster_url:"Poster"

                            }
                        }
                        onSubmit={handleSubmit}
                        
                    />
                )
            }
            
            
        </div>

    )
}

export default CreateActivityContainer