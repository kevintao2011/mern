
// import React, { useEffect,useState } from 'react'
// import FillForm from '../../../components/FormComponents/FillForm'
// import { postURL } from '../../../utils/fetch'
// import { storage, uploadFile } from '../../../utils/firebasefunction';
// import { toast } from 'sonner';
// import { findCombinations } from '../../../utils/basicFunction';
// import * as ics from 'ics' //https://www.npmjs.com/package/ics?activeTab=readme

// function generateICS(){
//     const event = {
//         start: [2018, 5, 30, 6, 30],
//         duration: { hours: 6, minutes: 30 },
//         title: 'Bolder Boulder',
//         description: 'Annual 10-kilometer run in Boulder, Colorado',
//         location: 'Folsom Field, University of Colorado (finish line)',
//         url: 'http://www.bolderboulder.com/',
//         geo: { lat: 40.0095, lon: 105.2669 },
//         categories: ['10k races', 'Memorial Day Weekend', 'Boulder CO'],
//         status: 'CONFIRMED',
//         busyStatus: 'BUSY',
//         organizer: { name: 'Admin', email: 'Race@BolderBOULDER.com' },
//         attendees: [
//           { name: 'Adam Gibbons', email: 'adam@example.com', rsvp: true, partstat: 'ACCEPTED', role: 'REQ-PARTICIPANT' },
//           { name: 'Brittany Seaton', email: 'brittany@example2.org', dir: 'https://linkedin.com/in/brittanyseaton', role: 'OPT-PARTICIPANT' }
//         ]
//       }
       
//     //   async function handleDownload() {
//     //     const filename = 'ExampleEvent.ics'
//     //     const file = await new Promise((resolve, reject) => {
//     //       ics.createEvent(event, (error, value) => {
//     //         if (error) {
//     //           reject(error)
//     //         }
       
//     //         resolve(new File([value], filename, { type: 'text/calendar' }))
//     //       })
//     //     })
//     //     return URL.createObjectURL(file);
       
//     //     // trying to assign the file URL to a window could cause cross-site
//     //     // issues so this is a workaround using HTML5
//     //     const anchor = document.createElement('a');
//     //     anchor.href = url;
//     //     anchor.download = filename;
       
//     //     document.body.appendChild(anchor);
//     //     anchor.click();
//     //     document.body.removeChild(anchor);
       
//     //     URL.revokeObjectURL(url);
//     //   }
// }
  
// function CreateSingleProductContainer({onExit,code,session,close}) {
//     const [FormData, setFormData] = useState()
//     const [Categories, setCategories] = useState()

//     const [Type, setType] = useState('info')
 


//     useEffect(() => {
        
        
//         async function getCategories(){
//             await fetch('/api/getcatshownoption', { 
//                 method: "POST",
//                 body: JSON.stringify({
                    
//                 }),
//                 headers: {
//                 "Content-Type": "application/json",
//                 // 'Content-Type': 'application/x-www-form-urlencoded',
//                 },
//                 mode:'cors'
                
//             }).then(async response => {
//                 if (response.ok){
//                     await response.json().then(data=>{
//                         setCategories(data.map(d=>{
//                             console.log("Categories",d)
//                             return {[d.catergory_name]:d.id}
//                         }))
//                     })
//                 }
//             })
//         }
//         getCategories()
//     }, [])
//     useEffect(() => {
//         if(Categories){
//             //for fill form
//             console.log("Categories",Categories)
//             const data = [
//                 {
//                     field_name:"product_name_chi",
//                     field_type:"text",
//                     single:true,
//                     field_value:[], //given
//                     required:true
                    
//                 },
//                 {
//                     field_name:"product_description_chi",
//                     single:true,
//                     field_value:[], //given
//                     field_type:"text",
//                     field_props:"paragraph",
//                     required:true
                    
//                 },
//                 {
//                     field_name:"product_img_url",
//                     field_value:[], //given
//                     field_type:"file",
//                     single:true,
//                     required:false
//                 },
//                 {
//                     field_name:"product_type",
//                     single:true,
//                     field_value:[], //given
//                     field_type:"select",
//                     // field_props:"multiple search",//search 
//                     field_options:Categories,
//                     required:true
                    
//                 },

//                 {
//                     field_name:"tags",
//                     single:false,
//                     field_value:[], //given
//                     field_props:"multiple",
//                     field_type:"text",
//                     split_by:' ',
//                     required:false
//                 },
//                 {
//                     field_name:"product_link",
//                     single:false,
//                     field_value:[], //given
//                     field_props:"multiple",
//                     field_type:"text",
//                     split_by:'field',
//                     is_kv:true,
//                     required:false
//                 },

//                 {
//                     field_name:"published",
//                     single:true,
//                     field_value:false, //given
//                     field_type:"boolean",
//                     required:true
//                 },
//                 {
//                     field_name:"product_list",
//                     single:true,
//                     field_value:{}, //given
//                     required:true,
//                     field_type:"products",
//                 },
//             ]
//             setFormData(data)
//         }
        
        
//     }, [Categories])
    
//     async function handleSubmit(data){
//         console.log(data)
//         var obj={}
//         data.forEach(field => {
//             obj[field.field_name]=field.field_value
//         });
//         const OptionsArr = obj.product_list.option.map(opt=>{
//             return opt.option
//         })  
//         const filterList = findCombinations(OptionsArr)      
//         Object.keys(obj.product_list.data).filter(name=>!filterList.includes(name)).forEach(k=>{
//             delete obj.product_list.data[k]
//         })
//         await postURL('/api/getnextsku',true,{code:code,session:session}).then(async result=>{
//             console.log("result",result)
//             if(result.success){
//                 const sku = result.data
//                 obj.sku=sku
//                 toast(sku)
//                 await Promise.all(
//                     obj["product_img_url"].map(async (file,index)=>{
//                         console.log("obj",obj)
//                         console.log("upload to",`Product/${code}/${sku}/`,`img-${index}`)
//                         return await uploadFile(`Product/${code}/${sku}/`,`img-${index}`,file,2000)
//                     })
//                 ).then(async (urls)=>{
//                     toast.success("Photo created successfully")
//                     obj["product_img_url"]=urls
//                     await postURL('/api/createproduct',true,{
//                         code:code,
//                         ...obj
//                     }).then((result)=>{
//                         if(result.success){
//                             console.log("result",result)
//                             toast.success(result.data)
//                             close()
//                         }else{
//                             toast.error(result.data)
//                         }
//                     })
//                 })
//             }else{
//                 toast.error("(outside)cannot get sku")
//             }     
            
//         })
        
        
        
//     }
//     return (
//     <div className={`w-full blur-0 p-2  flex flex-col justify-center overflow-y-scroll`}>
            
//             {
//                 FormData&&(
                    
//                     <FillForm 
                        
//                         fields={FormData} 
//                         title={"創建活動 New Activities"}
//                         className={"w-full"}
//                         description={"SKU must be number and english"}   
//                         TitleMap={{
//                             product_name_chi:"Activity Title/Name",
//                             product_description_chi:"Activity Description",
//                             product_type:"Product Type",
//                             product_img_url:"Product Image",
//                             is_limited:"Limited Quantity ?",
//                             parent:"Parent Product",
//                             tags:"tags",
//                             inventory:"stock",
//                             unit_price:"UNIT Price",
//                             allowed_coupon:"Coupons",
//                             published:"Publish Now?",
//                             session:"Session",
//                             total_sales:"Sold",
//                             has_variant:"Has Variant",
//                             subproducts:"Product List",
//                             sku:"SKU",
//                             product_link:"Product Links",
//                             product_list:"Product List"

//                         }}
//                         onSubmit={(data)=>{handleSubmit(data)}}
                        
//                     />
//                 )
//             }
//             <div >
//                 Reminders
//                 {/* <a href={generateICS({
//             start: new Date('2023-12-01T09:00:00Z'), // Example start date and time
//             end: new Date('2023-12-01T10:00:00Z'), // Example end date and time
//             summary: 'Example Event', // Example event title
//             description: 'This is an example event.', // Example event description
//             location: 'Example Location', // Example event location
//           })} download>Add to Calendar</a> */}
//                 <a href="data:text/calendar;charset=utf-8,BEGIN:VCALENDAR%0D%0AVERSION:2.0%0D%0ABEGIN:VEVENT%0D%0AUID:1234567890%0D%0ADTSTART:20231201T090000Z%0D%0ADTEND:20231201T100000Z%0D%0ASUMMARY:Example Event%0D%0ALOCATION:Example Location%0D%0ADESCRIPTION:This is an example event.%0D%0AEND:VEVENT%0D%0AEND:VCALENDAR">Add to Calendar</a>
//             </div>
//             <ol className="list-disc" >
//                 <li>SKU cannot be same with other product</li>
//                 <li>Product image cannot be larger than 500kb</li>
//             </ol>
            
//         </div>

//     )
// }

// export default CreateSingleProductContainer


import React, { useEffect,useState } from 'react'
import FillForm from '../../../components/FormComponents/FillForm'
import { postURL } from '../../../utils/fetch'
import { toast } from 'sonner'
import moment from 'moment'

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
        await postURL("/api/createactivitynproduct",true,{...obj,code:code}).then(result=>{
            if(result.success){
                toast.success("created")
            }else{
                toast.error(result.data)
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
                    field_name:"poster_url",
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