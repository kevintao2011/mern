import React, { useEffect } from 'react'
import FillForm from '../../../components/FormComponents/FillForm'
function CreateSingleProduct() {
    useEffect(() => {
      
    
      return () => {
        
      }
    }, [])
    const data = [
        {
            field_name:"Product Title/Name",
            field_type:"text",
            field_value:"", //given
            
        },
        {
            field_name:"Product Description",
            field_value:"", //given
            field_type:"text",
        },
        {
            field_name:"Product Image",
            field_value:"", //given
            field_type:"file",
        },
        {
            field_name:"Parent Category",
            field_value:[], //given
            field_type:"search",
            field_props:"select multiple",
            select_options:[]
        },
        {
            field_name:"Product Price",
            field_value:[], //given
            field_type:"number",
        },
        {
            field_name:"Sale Price",
            field_value:[], //given
            field_type:"number",
        },
        {
            field_name:"Sale Price",
            field_value:[], //given
            field_type:"number",
        },


        
    ]
    
    return (
        <div className={`w-full `}>
            <div className="flex flex-col">
                <div className="flex flex-row">

                </div>
                
            </div>
            <FillForm 
                fields={data} 
                title={"Products"}
                className={"w-1/2"}
                description={"A list of all the users in your account including their name, title, email and role."}    
            />
        </div>

    )
}

export default CreateSingleProduct