import React, { useEffect,useState } from 'react'
import FillForm from '../../../components/FormComponents/FillForm'
function CreateSingleProduct() {
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
                    field_name:"Product Title/Name",
                    field_type:"text",
                    single_value:true,
                    field_value:[], //given
                    
                },
                {
                    field_name:"Product Description",
                    single_value:true,
                    field_value:[], //given
                    field_type:"text",
                    field_props:"paragraph"
                },
                {
                    field_name:"Product Image",
                    field_value:[], //given
                    field_type:"file",
                    single_value:true,
                },
                {
                    field_name:"Parent Category",
                    single_value:true,
                    field_value:[], //given
                    field_type:"select",
                    field_props:"multiple search",//search 
                    field_options:Categories
                    
                },
                {
                    field_name:"Product Price",
                    single_value:true,
                    field_value:[], //given
                    field_type:"number",
                    
                },
                {
                    field_name:"Sale Price",
                    single_value:true,
                    field_value:[], //given
                    field_type:"number",
                },
                {
                    field_name:"tags",
                    single_value:false,
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
        <div className={`w-full `}>
            <div className="flex flex-col">
                <div className="flex flex-row">

                </div>
                
            </div>
            {
                FormData&&(
                    <FillForm 
                        fields={FormData} 
                        title={"Products"}
                        className={"w-1/2"}
                        description={"A list of all the users in your account including their name, title, email and role."}    
                    />
                )
            }
            
        </div>

    )
}

export default CreateSingleProduct