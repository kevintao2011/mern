import React, { useEffect,useState } from 'react'
import FillForm from '../../../components/FormComponents/FillForm'

function CreateActivityContainer({onExit}) {
    const [FormData, setFormData] = useState()
    const [Categories, setCategories] = useState()
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
                    field_value:[], //given
                    
                },
                {
                    field_name:"activity_description",
                    single:true,
                    field_value:[], //given
                    field_type:"text",
                    field_props:"paragraph"
                },
                {
                    field_name:"start_time",
                    field_value:[], //given
                    field_type:"date",
                    single_value:true,
                },
                {
                    field_name:"end_time",
                    single_value:true,
                    field_value:[], //given
                    field_type:"date",
                    
                    
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
                {
                    field_name:"packages",
                    single:false,
                    field_value:[], //given
                    field_options:[],
                    field_type:"select",
                    field_props:"",
                    
                },
                
                {
                    field_name:"tags",
                    single:false,
                    field_value:[], //given
                    field_props:"multiple",
                    field_type:"text",
                    split_by:' '
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
                                packages:"Product Included",
                                tags:"tags"

                            }
                        }
                        
                    />
                )
            }
            
            
        </div>

    )
}

export default CreateActivityContainer