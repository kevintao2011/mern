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
import Dictionary from '../../Dictionary';

/*
    Template
    {
        {
            field_name:,
            field_type:,
            required:,
            single:,
            field_value:,
            
            --Optional--
            a.Select
                field_options
            b.text
                field_props
                split_synbol
                iskv
            c.files

        }
    }

*/
/** 
 * Description
 * @param {Array} fields [Array follows template above],
 * @param {String}title Title of Form,
 * @param {String}description Description of form,
 * @param {Object}TitleMap Object(dictionary) that convert field_name to other name to dispaly,
 * @param {String}postAPI mutual exclusive to onSubmit, submit inside the component
 * @param {function}onSubmit mutual exclusive to postAPI, trigger submit action in parent
 * @param {boolean}allowDisable restrict edit
 * @param {function}onChange allow pass changes to parent component
 * @param {function}mapFunction map data to FillForm accepted shape (undone)
 * @param {function}reverseMapFunction map FillForm returned data to desired shape (undone)
*/
function FillForm({fields , className ,title ,description="" ,TitleMap={},postAPI,onSubmit,allowDisable=false,onChange,mapFunction,reverseMapFunction}) {
    const [disabled, setdisabled] = useState(false)
    const [ErrorMsg, setErrorMsg] = useState("")
    const [Fields, setFields] = useState()
    useEffect(() => {
        console.log("Initing form")
        setFields(fields)
    }, [])

    useEffect(()=>{
        if(Fields){
            console.log("onchg",onChange)
            console.log("return to parent",Fields)
            if(onChange){
                onChange(Fields)
            }
        }
        
    }, [Fields])
    
    // index: index of field, single: multiple objects, id : field id
    function RequireValidation(){
        function onlyLettersAndNumbers(str) {
            return /^[A-Za-z0-9]*$/.test(str);
          }
        let msg =""
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
        let newFields  = Fields
        newFields[index]["field_value"]=values
        setFields([...newFields])
        console.log("updated",newFields)
        
    }

    function updateKVField(index,key,value){
        console.log(Fields,"updating ",key,value)
        let newFields  = Fields
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
                <div className="flex flex-row gap-5">
                    <p className='text-xl font-bold  '>{title}</p>
                    {
                        allowDisable&&(
                            
                            <div className="flex flex-col justify-center">
                                <div className="h-full flex flex-row items-center gap-2 ">
                                    <div className=" ">{Dictionary.Form.displayText.edit.chi}</div>
                                    <Toggle onChange={e=>{setdisabled(!e)}} defaultChecked={!disabled}/>
                                </div>
                            </div>
                            
                          
                            
                        )
                    }
                </div>
                {
                    description&&(
                        <p className='my-2 text-sm'>{description}</p>
                    )
                }
                
            </div>
            <table className="w-full ">
                <tbody className=''>
                    {
                        Fields?.map((field,index)=>{
                            // console.log("field",index," ",field)
                            return(
                                <tr key={`field-${index}`} className=''>
                                    <td className="text-start">{TitleMap[field.field_name]?TitleMap[field.field_name]:field.field_name}</td>
                                    <td className='py-1'>
                                        {
                                            field.field_type.includes('select')&&(
                                                <SelectField
                                                    index={index}
                                                    optionsMap={field.field_options}
                                                    returnFunction={updateField}
                                                    single={field.single}
                                                    value={field.field_value}
                                                    disabled={disabled}
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
                                                            disabled={disabled}
                                                        >

                                                        </textarea>
                                                    ):(
                                                        <input 
                                                            className=' border w-full p-1 block rounded-md shadow  focus:border-blue-400 '
                                                            id={field.field_name}
                                                            type={field.field_type} 
                                                            value={field.field_value}
                                                            onChange={(e)=>{updateField(index,e.target.value)}}        
                                                            disabled={disabled}
                                                            
                                                        />
                                                    )
                                                    
                                                    
                                                ):(
                                                    <MultipleValuesField 
                                                        values={field.field_value}
                                                        uploadValues={updateField}
                                                        splitSymbol={field.split_by}
                                                        index={index}
                                                        isKV={field.is_kv}
                                                        disabled={disabled}
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
                                                    disabled={disabled}
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
                                                    disabled={disabled}
                                                />
                                            )
                                        }
                                        {
                                            field.field_type.includes('date')&&(
                                                <DatePicker 
                                                    format="yyyy-MM-dd HH:mm"
                                                    className='w-full shadow '
                                                    onChange={(v)=>{updateField(index,v)}}
                                                    disabled={disabled}
                                                />
                                            )
                                        }
                                        {
                                            field.field_type.includes('boolean')&&(
                                            <Toggle
                                                onChange={v=>{updateField(index,v)}}
                                                defaultChecked={field.field_value}
                                                onLoad={()=>{updateField(index,false)}}
                                                disabled={disabled}
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