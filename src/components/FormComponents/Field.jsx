import { useState } from "react"

export default function Field({fieldType,index,handleUpdate,fieldName,className,edit=true ,data}) {
    const [mutilpleField, setmutilpleField] = useState(false) //multipleField: can add new field for multiple input
    
    const [first, setfirst] = useState()

    // for multiple
    const [CSS, setCSS] = useState("")
    const [dataSet, setdataSet] = useState([{fieldType:"text",content:""}])
    function handleAddField(data){
        setdataSet([...dataSet,data])
    }
    function handleDelete(data){
        
    }

    return (
        <div className="">
            {/* <select className='bg-gray-50 border w-full p-1 block rounded-lg shadow shadow-gray-400' >
                <option value="true">
                    Yes
                </option>
                <option value="">
                    No
                </option>
            </select> */}
            <label htmlFor="">多項?</label>
        <input type="checkbox" id={""} onChange={(e)=>{setmutilpleField(e.target.checked);console.log(e.target.checked)}}/>
            {mutilpleField?(
                <div className={className||"flex flex-row gap-2"}>
                    <input className='bg-gray-50 border w-full p-1 block rounded-lg shadow shadow-gray-400' type={fieldType} onChange={(e)=>{console.log()}}/>
                    <button className='p-1 bg-red-600 rounded-md '>Delete</button>
                </div>
                ):(
                    <div className={className}>
                        <div className="flex flex-row w-1/2">
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
                        <button
                            className='px-2 bg-blue-600 rounded-md'
                            onClick={()=>{handleAddField()}}
                        >
                            Add 
                        </button>
                    </div>
                    
                    {
                        dataSet.map((v,i)=>{
                            if(fieldType==="select"){
                                return(
                                    <select>
                                        <option value="">
                                            
                                        </option>
                                    </select>
                                )
                            }else{
                                return(
                                    
                                    <input 
                                        className="bg-gray-50 border w-full p-1 block rounded-lg shadow shadow-gray-400" 
                                        type={v.fieldType} 
                                    /> 
                                )
                            }
                        })   
                    }
                    {
                        edit&&(
                            <button className="p-1 rounded-md bg-blue-600">
                                add
                            </button>
                        )
                    }
                    
                    
                </div>
            )}
        </div>
       
    )
 
}