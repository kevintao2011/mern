import React, { useState } from 'react'
import Question from './Question'
function CreateForm({index,data}) {
    const [QList, setQList] = useState([{
        field_name:"",
        field_type:"text",
    }])
    const [FormName, setFormName] = useState("")
    function updateQuestion(index,key,value){
        console.log(`update ${index}th question (${key}) to ${value}`)
        QList[index][key]=value
        setQList([...QList])
    }
    return (
        
        <div className="px-10 bg-purple-50 h-screen">
            
            <div className="text-3xl p-4 my-4 border-t-8 border-purple-800 rounded-xl flex flex-col bg-white">
                <input 
                    type="text" 
                    name="" 
                    id="form_title" 
                    placeholder='Untitled Form'
                />
                <textarea 
                    name="" 
                    id="form_description" 
                    cols="30" 
                    className='text-lg' 
                    placeholder='Untitled Form'>
                </textarea>
               
            </div>
            {/* <Question /> */}
            {
                QList.map((q,i)=>{
                    return(
                        <Question 
                            data={q}
                            updateQuestion={updateQuestion}
                            key={`question-${i}`}
                            index={i}
                        />
                    )
                })
            }
           
        </div>
        
    )
}

export default CreateForm