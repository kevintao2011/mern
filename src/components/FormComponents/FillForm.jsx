import React, { useEffect, useState } from 'react'
import SSelectFieldWithSearch from './SSelectFieldWithSearch'
function FillForm({fields , className ,title ,description}) {
    const [Headings, setHeadings] = useState([])
    const [CategoryMap, setCategoryMap] = useState()
    const [Values, setValues] = useState()
    const [FieldType, setFieldType] = useState("text")
    const fieldTypeMap = {
        
    }

    useEffect(() => {
        setFieldType()
      
        return () => {
          
        }
      }, [fields.field_type])
    
    
    useEffect(() => {
        var hlist = []
        fields.map(field=>{
            hlist.push(field.field_name)
        })
        setHeadings(hlist)
    }, [])
    /*
        [
            {
            field_name:"Product Title/Name",
            field_type:"text",
            field_value:"", //given
            
            },
            :
            :
        ]
    */
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
                    var newMap = {}
                    var data = await response.json()
                    data.forEach(d=>{
                        newMap[d.catergory_name]=d.id
                    })
                    setCategoryMap(newMap)
                }
            })
        }
        getCategories()
        return () => {
        
        }
    }, [])
    
    return (
        <div className={`${className}`}>
            <div className="">
                <p className='text-2xl font-bold pb-5'>{title}</p>
                <p className='my-2 text-base'>{description}</p>
            </div>
            <table className="w-full">
                {
                    fields.map(field=>{
                        return(
                            <tr>
                                <td className="text-start">{field.field_name}</td>
                                {/* <th className="text-start">{field.field_name}</th> */}
                                {
                                    field.field_type.includes('search')&&<SSelectFieldWithSearch items={Object.keys(field.field_type)} />
                                }
                                {
                                    field.field_type.includes('select')?(
                                        <></>
                                    ):(
                                        <input 
                                            className=' border w-full p-1 block rounded-md shadow  focus:border-blue-400 '

                                            id={field.field_name}
                                            type={field.field_type} 
                                        />
                                    )
                                }
                                
                                
                            </tr>
                        )
                        
                    })
                }
                {/* <tr>
                    <th>Name:</th>
                    <td>Bill Gates</td>
                </tr>
                <tr>
                    <th>Telephone:</th>
                    <td>555 77 854</td>
                </tr>
                <tr>
                    <th>Telephone:</th>
                    <td>555 77 855</td>
                </tr> */}
            </table>
        </div>
    )
}



export default FillForm