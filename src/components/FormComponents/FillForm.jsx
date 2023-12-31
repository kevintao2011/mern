import React, { useEffect, useState } from 'react'
import SSelectFieldWithSearch from './SSelectFieldWithSearch'
import FileField from './FileField'
import MultipleValuesField from './MultipleValuesField'
import { DatePicker, Toggle } from 'rsuite';
import SelectField from './SelectField';
import RolesField from './RolesField';
import EntryTable from '../table/EntryTable';
import ProductCombination from './ProductCombination';
import { toast } from 'sonner';
import { classifyValue } from '../../utils/basicFunction';


function FillForm({fields , className ,title ,description ,TitleMap={},postAPI,onSubmit}) {
    // const [Headings, setHeadings] = useState([])
    const [ErrorMsg, setErrorMsg] = useState("")
    const [Fields, setFields] = useState()
    useEffect(() => {
        console.log("Initing form")
        setFields(fields)
    }, [])
    
    // index: index of field, single: multiple objects, id : field id
    function RequireValidation(){
        function onlyLettersAndNumbers(str) {
            return /^[A-Za-z0-9]*$/.test(str);
          }
        var msg =""
        console.log(Fields)
        Fields.forEach(field => {
            console.log(field.field_name,classifyValue(field.field_value))
            if(field.required&&(field.field_value.length<1 || (classifyValue(field.field_value)==='object' && Object.keys(field.field_value).length===0))){
                msg+=`${TitleMap[field.field_name]} cannot be empty ! `//\n
            }
            if(field.requirement?.includes('only-letter-number')){
                if(!onlyLettersAndNumbers(TitleMap[field.field_name])){
                    msg+=`${TitleMap[field.field_name]} can only include letters and number ! `//\n
                }
                
            }
        });
        // if(msg!==""){
        //     setErrorMsg(msg)
        //     return false
        // }else{
        //     return true
        // }
        return msg
        
        
    }
    function updateField(index,values){
        console.log(Fields,"updating ",index,values)
        var newFields  = Fields
        newFields[index]["field_value"]=values
        setFields([...newFields])
        console.log("updated",newFields)
        
    }

    function updateKVField(index,key,value){
        console.log(Fields,"updating ",key,value)
        var newFields  = Fields
        newFields[index]["field_value"][key]=value
        setFields([...newFields])
        console.log("updated",newFields)
        
    }
    
    async function handleSubmit(){
        await fetch (
            postAPI,
            {
                
            }
        )
    }
    return (
        <div className={`${className} font-mincho`}>
            <div className="">
                <p className='text-2xl font-bold pb-5'>{title}</p>
                <p className='my-2 text-sm'>{description}</p>
            </div>
            <table className="w-full ">
                <tbody className=''>
                    {
                        Fields?.map((field,index)=>{
                            // console.log("field",index," ",field)
                            return(
                                <tr key={`field-${index}`} className=''>
                                    <td className="text-start">{TitleMap[field.field_name]?TitleMap[field.field_name]:field.field_name}</td>
                                    <td className='py-2'>
                                        {
                                            field.field_type.includes('select')&&(
                                                <SelectField
                                                    index={index}
                                                    optionsMap={field.field_options}
                                                    returnFunction={updateField}
                                                    single={field.single}
                                                    value={field.field_value}
                                                    
                                                    
                                                />
                                            )
                                            
                                        }
                                        {
                                            field.field_type.includes('text')&&(
                                                field.single?(
                                                    field.field_props?.includes('paragraph')?(
                                                        <textarea 
                                                            name="" 
                                                            id="" 
                                                            cols="30" 
                                                            className='field w-full my-1' 
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
                                                        isKV={field.is_kv}
                                                    
                                                    />
                                                )
                                                
                                            )
                                        }
                                        {
                                            field.field_type.includes('number')&&(
                                                <input 
                                                    className='field w-full'
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
                                        {
                                            field.field_type.includes('date')&&(
                                                <DatePicker 
                                                    format="yyyy-MM-dd HH:mm"
                                                    className='w-full shadow '
                                                    onChange={(v)=>{updateField(index,v)}}
                                                />
                                            )
                                        }
                                        {
                                            field.field_type.includes('boolean')&&(
                                            <Toggle
                                                onChange={v=>{updateField(index,v)}}
                                                defaultChecked={field.single_value}
                                                onLoad={()=>{updateField(index,false)}}
                                            />  
                                            )
                                        }
                                        {
                                            field.field_type.includes('role')&&(
                                                <RolesField 
                                                    subprods={field.field_value}
                                                    onChange={v=>{updateField(index,v)}}
                                                /> 
                                                // <EntryTable
                                                //     headings={["Role","Quantity","Price"]}
                                                //     rowValues={field.field_value}
                                                //     update={(v)=>{updateField(index,v)}}
                                                //     HeadingMap={{"Role":"name","Quantity":"quantity","Price":"price"}}
                                                // />
                                            )
                                        }
                                        {
                                            field.field_type.includes('product')&&(
                                                
                                                <ProductCombination 
                                                    productData={field.field_value}
                                                    update={(k,v)=>{updateKVField(index,k,v)}}
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
            {
                postAPI&&(
                    <div className="w-full flex flex-row justify-center">
                        <button 
                            className='text-center my-5 p-1 bg-green-500 rounded-md'
                            onClick={handleSubmit}
                        >
                            Create
                        </button>
                    </div>
                )
                
            }
            {
                onSubmit&&(
                    <div className="w-full flex flex-row justify-center">
                        <button 
                            className='text-center my-5 p-1 bg-green-500 rounded-md text-white'
                            onClick={()=>{
                                const msg = RequireValidation()
                                if(msg===""){
                                    // setErrorMsg("")
                                    onSubmit(Fields)
                                }else{
                                    toast.error(msg,{
                                        position:"top-right"
                                    })
                                }
                                
                            }}
                        >
                            Create
                        </button>
                    </div>
                )
            }
            {/* <div className="text-sm text-red-500">
                <pre>{ErrorMsg}</pre>
            </div> */}
            
            
        </div>
    )
}



export default FillForm