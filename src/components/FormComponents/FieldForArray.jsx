import { useState,useEffect } from "react"
import { useAuth } from "../session"
import { auth } from "../../utils/firebasefunction"
export default function FieldForArray(
    {
        fieldType,
        index=0,
        handleUpdate,
        returnFunction,
        fieldName,
        
        edit=true ,
        fieldValues,
        multipleValue,

        // style related
        className="w-full",
        AddButtonCSS , 
        DeleteButtonCSS,
        fieldCSS,

        //for direct Update to server
        postAPI,
    }) {
    const [mutilpleField, setmutilpleField] = useState(false) //multipleField: can add new field for multiple input
    const {currentUser,userDBInfo,loading,setuserDBInfo,Cart,setCart} = useAuth()
    const [FieldValues, setFieldValues] = useState([])
    const [updateMsg, setupdateMsg] = useState("")
    const fieldPropertyExample ={
        
    }

    // for multiple
    const [CSS, setCSS] = useState("")
    const [fieldCounter, setfieldCounter] = useState()
    const [dataSet, setdataSet] = useState([{fieldType:"text",content:""}])
    useEffect(() => { // has has imported values
        let values = []
        fieldValues.forEach(value => {
            values.push(value)
        });
        console.log(fieldName,"has values",values)
        setFieldValues(values)
        if (multipleValue){
            setmutilpleField(true)
        }
    }, [fieldValues])

    // useEffect(() => { // while fieldValues changed
    //     if(returnFunction&&FieldValues){
    //         returnFunction(index,FieldValues)
    //     }
        

    // }, [FieldValues])
    
    const [Submit, setSubmit] = useState(false)
    useEffect(() => {
      
    }, [])
    
    function handleAddField(data){
        // setdataSet([...dataSet,data])
        setFieldValues([...FieldValues,data])
    }

    function handleDelete(i){
        //console.log("deleting index",i)
        //console.log(fieldName," b4 FieldValues",FieldValues)
        FieldValues.splice(i,1)
        //console.log(fieldName," after FieldValues",FieldValues)
        setFieldValues([...FieldValues])
    }

    async function handleSubmit(){
        await fetch(postAPI, { 
        method: "POST",
        body: JSON.stringify({
            user:{
                token:await auth.currentUser.getIdToken(),
                _id:userDBInfo._id
            },
            data:{
                name:fieldName,
                content:FieldValues
            }
        }),
        headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        mode:'cors'
        
    }).then(async response => {
        
        if (response.ok){
            // updated
            setupdateMsg("Updated")
            
            
        }else{
            setupdateMsg("Update Failed")
            
        }  
        
    })
    }

    function updateToParents(){
        handleUpdate(fieldName,FieldValues)
    }
    
    //console.log("field content_type",fieldType)
    return (
        <div className="w-full">
            
            <div className={className}>
                <div className="flex flex-row ">
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
                
                FieldValues?.map((value,i)=>{
                    return(  
                        <div className="flex flex-row w-full my-1 gap-1" key={`${fieldName}-${i}`}>
                            <input 
                                type={fieldType} 
                                // defaultValue={value}
                                value={value}
                                className="field bg-white"
                                onChange={(e)=>{
                                    FieldValues[i]=e.target.value
                                    setFieldValues([...FieldValues])
                                    if(handleUpdate){
                                        updateToParents(fieldName,FieldValues,index)
                                    }
                                    
                                }}
                            /> 
                            {
                                mutilpleField&&(// Add and Delete Button and for mutilpleField
                                        <button 
                                            className={DeleteButtonCSS||'p-1  bg-red-600 rounded-md '}
                                            onClick={()=>{handleDelete()}}
                                        >
                                            Delete
                                        </button>
                                )
                            }
                        </div>
                    )
                })
            }
            <div className="flex flex-row gap-2">
                {
                    mutilpleField&&(
                        <div className="">
                            <button
                                className={AddButtonCSS||'p-1 my-2 bg-blue-600 rounded-md'}
                                onClick={()=>{handleAddField("")}}
                            >
                                Add 
                            </button>  
                            
                        </div>
                        
                        
                    )
                }
                {
                    postAPI&&(
                        <button
                            className={AddButtonCSS||'p-1 my-2 bg-green-600 rounded-md'}
                            onClick={()=>{handleSubmit()}}
                            disabled={Submit}
                        >
                            Update 
                        </button>  
                    )
                }
                <p className="text-red-500">{updateMsg}</p>
            </div>
            
        </div>
       
    )
 
}