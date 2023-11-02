import React, { useEffect,useState } from 'react'
import FillForm from '../../../components/FormComponents/FillForm'
import { postURL } from '../../../utils/fetch'
import { storage, uploadFile } from '../../../utils/firebasefunction';
function CreateSingleProductContainer({onExit,code,session}) {
    const [FormData, setFormData] = useState()
    const [Categories, setCategories] = useState()
    
    useEffect(() => {
        async function getCategories(){
            await fetch('/api/getcatshownoption', { 
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
                // {
                //     field_name:"sku",
                //     single:true,
                //     field_value:[], //given
                //     field_type:"text",
                //     required:true,
                //     requirement:"only-letter-number"
                // },
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
        async function convertAllURL(){
            
            
        }
        await Promise.all(
            obj["product_img_url"].map(async (file,index)=>{
                console.log("upload to",`Product/${code}/${obj["sku"]}/`,`img-${index}`)
                return await uploadFile(`Product/${code}/${obj["sku"]}/`,`img-${index}`,file,2000)
            })
        ).then(async (urls)=>{
            obj["product_img_url"]=urls
            await postURL('/api/createproduct',true,{
                code:code,
                ...obj
            }).then(
                console.log("upload Done")
            )
        })
        
    }
    return (
    <div className={`w-full blur-0 p-2  flex flex-col justify-center overflow-y-scroll`}>
            
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
            <div >
                Reminders
            </div>
            <ol className="list-disc" >
                <li>SKU cannot be same with other product</li>
                <li>Product image cannot be larger than 500kb</li>
            </ol>
            
        </div>

    )
}

export default CreateSingleProductContainer