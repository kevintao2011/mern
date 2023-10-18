import React, { useEffect,useState } from 'react'
import FillForm from '../../../components/FormComponents/FillForm'
import { postURL } from '../../../utils/fetch'

function CreateSingleProductContainer({onExit,code}) {
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
                            return {[d.catergory_name]:d.id}
                        }))
                    })
                }
            })
        }
        getCategories()
    }, [])
    useEffect(() => {
        if(Categories){
            //for fill form
            console.log("Categories",Categories)
            const data = [
                {
                    field_name:"product_name_chi",
                    field_type:"text",
                    single:true,
                    field_value:[], //given
                    required:true
                    
                },
                {
                    field_name:"product_description_chi",
                    single:true,
                    field_value:[], //given
                    field_type:"text",
                    field_props:"paragraph",
                    required:true
                    
                },
                {
                    field_name:"product_img_url",
                    field_value:[], //given
                    field_type:"file",
                    single:true,
                    required:false
                },
                {
                    field_name:"product_type",
                    single:true,
                    field_value:[], //given
                    field_type:"select",
                    // field_props:"multiple search",//search 
                    field_options:Categories,
                    required:true
                    
                },
                // {
                //     field_name:"parent",
                //     single:false,
                //     field_value:[], //given
                //     field_options:[],
                //     field_type:"select",
                //     field_props:"",
                    
                // },
                // {
                //     field_name:"unit_price",
                //     single:true,
                //     field_value:[], //given
                //     field_type:"number",
                    
                // },
                {
                    field_name:"sku",
                    single:true,
                    field_value:[], //given
                    field_type:"text",
                    required:true
                },
                {
                    field_name:"tags",
                    single:false,
                    field_value:[], //given
                    field_props:"multiple",
                    field_type:"text",
                    split_by:' ',
                    required:false
                },
                {
                    field_name:"product_link",
                    single:false,
                    field_value:[], //given
                    field_props:"multiple",
                    field_type:"text",
                    split_by:'field',
                    is_kv:true,
                    required:false
                },
                // {
                //     field_name:"has_variant",
                //     single:true,
                //     field_value:[], //given
                //     field_props:"multiple",
                //     field_type:"boolean",
                // },
                {
                    field_name:"published",
                    single:true,
                    field_value:false, //given
                    field_type:"boolean",
                    required:true
                },
                {
                    field_name:"product_list",
                    single:true,
                    field_value:{}, //given
                    required:true,
                    /*
                    {
                        data:{
                            s-blue:{
                                unit price:0
                                quantity:0
                                img_url:[]
                            },
                            s-yellow:{
                                unit price:0
                                quantity:0
                                img_url:[]
                            },
                        }
                        option:{
                            size:[s,m,l]
                            color:[blue,red,yellow]
                        }
                    }
                    */
                    field_type:"products",
                },
            ]
            setFormData(data)
        }
        
        
    }, [Categories])
    
    async function handleSubmit(data){
        console.log(data)
        var obj={}
        data.forEach(field => {
            obj[field.field_name]=field.field_value
        });
        postURL('/api/createproduct',true,{
            code:code,
            ...obj
        })
    }
    return (
    <div className={`w-full blur-0 p-2 h-full flex flex-col justify-center`}>
            {/* <div className="flex flex-col">
                <div className="w-full flex flex-row justify-end">
                    <button onClick={onExit}>X</button>
                </div>
                
            </div> */}
            {
                FormData&&(
                    <FillForm 
                        fields={FormData} 
                        title={"Create Products"}
                        className={"w-full"}
                        description={"SKU must be number and english"}   
                        TitleMap={{
                            product_name_chi:"Product Title/Name",
                            product_description_chi:"Product Description",
                            product_type:"Product Type",
                            product_img_url:"Product Image",
                            is_limited:"Limited Quantity ?",
                            parent:"Parent Product",
                            tags:"tags",
                            inventory:"stock",
                            unit_price:"UNIT Price",
                            allowed_coupon:"Coupons",
                            published:"Publish Now?",
                            session:"Session",
                            total_sales:"Sold",
                            has_variant:"Has Variant",
                            subproducts:"Product List",
                            sku:"SKU",
                            product_link:"Product Links",
                            product_list:"Product List"

                        }}
                        onSubmit={(data)=>{handleSubmit(data)}}
                        
                    />
                )
            }
            
        </div>

    )
}

export default CreateSingleProductContainer