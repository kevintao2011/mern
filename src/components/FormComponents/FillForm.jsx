import React, { useEffect, useState } from 'react'
import SSelectFieldWithSearch from './SSelectFieldWithSearch'
import FileField from './FileField'
import MultipleValuesField from './MultipleValuesField'
function FillForm({fields , className ,title ,description}) {
    // const [Headings, setHeadings] = useState([])
    
    const [Fields, setFields] = useState()
    useEffect(() => {
        console.log("Initing form")
        setFields(fields)
    }, [])
    
    // index: index of field, single: multiple objects, id : field id

    function updateField(index,values){
        var newFields  = Fields
        newFields[index]["field_value"]=values
        setFields([...newFields])
        console.log("updated",newFields)
    }
    
    
    return (
        <div className={`${className}`}>
            <div className="">
                <p className='text-2xl font-bold pb-5'>{title}</p>
                <p className='my-2 text-base'>{description}</p>
            </div>
            <table className="w-full">
                <tbody>
                    {
                        Fields?.map((field,index)=>{
                            // console.log("field",index," ",field)
                            return(
                                <tr key={`field-${index}`}>
                                    <td className="text-start">{field.field_name}</td>
                                    <td>
                                        {
                                            field.field_type.includes('select')&&(
                                                <SSelectFieldWithSearch 
                                                    key={crypto.randomUUID()}
                                                    options={field.field_options} 
                                                    uploadSelected={updateField}
                                                    index={index}
                                                    single={field.single_value}
                                                    values={field.field_value} 
                                                    canSearch={field.field_props.includes('search')}
                                                />
                                            )
                                            
                                        }
                                        {
                                            field.field_type.includes('text')&&(
                                                field.single_value?(
                                                    field.field_props?.includes('paragraph')?(
                                                        <textarea 
                                                            name="" 
                                                            id="" 
                                                            cols="30" 
                                                            className='w-full' 
                                                            onChange={(e)=>{updateField(index,e.target.value)}}
                                                        >

                                                        </textarea>
                                                    ):(
                                                        <input 
                                                            className=' border w-full p-1 block rounded-md shadow  focus:border-blue-400 '
                                                            id={field.field_name}
                                                            type={field.field_type} 
                                                            value={field.field_value}
                                                            onChange={(e)=>{updateField(index,e.target.value)}}        
                                                            
                                                        />
                                                    )
                                                    
                                                    
                                                ):(
                                                    <MultipleValuesField 
                                                        values={field.field_value}
                                                        uploadValues={updateField}
                                                        splitSymbol={field.split_by}
                                                        index={index}
                                                    />
                                                )
                                                
                                            )
                                        }
                                        {
                                            field.field_type.includes('number')&&(
                                                <input 
                                                    className=' border w-full p-1 block rounded-md shadow  focus:border-blue-400 '
                                                    id={field.field_name}
                                                    type={field.field_type} 
                                                    value={field.field_value}
                                                    onChange={(e)=>{updateField(index,field.field_type==='file'?e.target.files:e.target.value)}}
                                                    min={0}                                      
                                                />
                                            )
                                        }
                                        {
                                            field.field_type.includes('file')&&(
                                                
                                                <FileField 
                                                    imgs={field.field_value}
                                                    fieldTitle={field.field_name}
                                                    single={field.single_value}
                                                    updatePhoto={updateField}
                                                    index={index}
                                                    
                                                />
                                            )
                                        }
                                    </td>
                                    
                                    
                                    
                                </tr>
                            )
                            
                        })
                    }
                </tbody>
                
                
            </table>
            <div className="w-full flex flex-row justify-center">
                <button className='text-center my-5 p-1 bg-green-500 rounded-md'>
                    Create
                </button>
            </div>
            
        </div>
    )
}



export default FillForm