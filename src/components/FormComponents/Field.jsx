import { useState,useEffect } from "react"

export default function Field({fieldType,index,handleUpdate,fieldName,className,edit=true ,fieldValues,multipleValue}) {
    const [mutilpleField, setmutilpleField] = useState(false) //multipleField: can add new field for multiple input
    const [FieldValues, setFieldValues] = useState([])
    const fieldPropertyExample ={
        
    }

    // for multiple
    const [CSS, setCSS] = useState("")
    const [fieldCounter, setfieldCounter] = useState()
    const [dataSet, setdataSet] = useState([{fieldType:"text",content:""}])
    useEffect(() => {
        let values = []
        fieldValues.forEach(value => {
            values.push(value)
        });
        setFieldValues(values)
        if (multipleValue){
            setmutilpleField(true)
        }
    }, [fieldValues])

    useEffect(() => {
      console.log("FieldValues",FieldValues)
    
      
    }, [FieldValues])
    
    
    function handleAddField(data){
        // setdataSet([...dataSet,data])
        setFieldValues([...FieldValues,data])
    }

    function handleDelete(i){
        console.log("deleting index",i)
        var tmp = fieldValues.toSpliced(i,1)
       
        console.log("tmp",tmp)
        setFieldValues(tmp)
    }
    
    console.log("field content_type",fieldType)
    return (
        <div className={className}>
            {/* <div className="">
                <label htmlFor="">多項 Mutiple input?</label>
                <input type="checkbox" id={"multiple"} onChange={(e)=>{setmutilpleField(e.target.checked);console.log(e.target.id)}}/>
            </div> */}
            
            <div className={className}>
                <div className="flex flex-row w-1/2">
                    {
                        !fieldType&&(
                            <select name="" id="" className='bg-gray-50 border w-full p-1 block rounded-lg shadow shadow-gray-400'>
                                <option 
                                    value="text" 
                                    className='bg-gray-50 border w-full p-1 block rounded-lg shadow shadow-gray-400'
                                >
                                    text 
                                </option>
                                <option 
                                    value="select" 
                                    className='bg-gray-50 border w-full p-1 block rounded-lg shadow shadow-gray-400'
                                >
                                    Multiple Choice
                                </option>
                            </select>
                        )
                    }
                </div>
            </div>
            

            {
                // dataSet.map((v,i)=>{
                //     if(fieldType==="select"){
                //         return(
                //             <select>
                //                 <option value="">
                                    
                //                 </option>
                //             </select>
                //         )
                //     }else{
                //         return(
                            
                //             <input 
                //                 className="bg-gray-50 border w-full p-1 block rounded-lg shadow shadow-gray-400" 
                //                 type={v.fieldType} 
                //             /> 
                //         )
                //     }
                // })   
                FieldValues.map((value,i)=>{
                    return(
                        <>
                            
                            {
                                mutilpleField&&(// Add and Delete Button and for mutilpleField
                                    <div className="flex flex-row">
                                        <input 
                                            type={fieldType} 
                                            defaultValue={value}
                                            className="bg-gray-50 border w-full p-1 block rounded-lg shadow shadow-gray-400"
                                            onChange={(e)=>{
                                                let tmp = FieldValues
                                                tmp[i]=e.target.value
                                                setFieldValues(tmp)
                                            }}
                                        />
                                        <button 
                                            className='p-1  bg-red-600 rounded-md '
                                            onClick={()=>{handleDelete(i)}}
                                        >
                                            Delete
                                        </button>
                                    </div>
                                )
                            }
                            <>
                                
                            </>
                        </>
                        
                    )
                })
            }
            {
                mutilpleField&&(
                    <button
                        className='px-2 my-2 bg-blue-600 rounded-md'
                        onClick={()=>{handleAddField("")}}
                    >
                        Add 
                    </button>
                )
            }
        </div>
       
    )
 
}