import React, { useEffect, useState } from 'react'
import Field from '../../components/FormComponents/Field'

export default function EditLastestnews() {
  const [News, setNews] = useState([])
  function handleChildData (data){
    setNews(data)
  }
  useEffect(() => {
    async function fetchData(){
      await fetch(
        "/api/fetchData",
        {
          
        }
      )
      
      return () => {
      
      }
    }
    
    
  }, [])
  
  function handleUpdate(data){
    
  }
  
  return (
    <div className='flex flex-col '>
      <p className='text-start'>編輯最新消息 Edit Latest News </p>
      
      {/* <div className="flex flex-row gap-2">
        <input type="text"  className='border border-1 border-su-green'/>
        <button className='bg-green-400 p-1 rounded-md'>save</button>
        <button 
            className='bg-red-400 p-1 rounded-md'
        >
            delete
        </button>
        
        
      </div> */}
      <Field fieldType={"text"} uploadData={handleUpdate} className={"w-1/2"}/>
      {/* <Field fieldType={"text"} uploadData={handleUpdate} edit={true}/> */}
    </div>
  )
}
