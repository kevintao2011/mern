import React, { useEffect, useState } from 'react'
import FieldForArray from '../../components/FormComponents/FieldForArray'
import { postURL } from '../../utils/fetch'

export default function EditLastestnews() {
  const [StaticData, setStaticData] = useState()
  const [News, setNews] = useState([])
  function handleChildData (data){
    setNews(data)
  }

  function SaveFieldValues (fieldName,fieldValues,index){
    console.log("Updating value from field",fieldName)
    let tmp = StaticData
    tmp[index]=fieldValues
    setStaticData(tmp)
  }
  useEffect(() => {
    console.log("StaticData:",StaticData)
  }, [StaticData])
  
  useEffect(() => {
    async function fetchData(){
      await postURL("/api/websitestaticinfo",true).then(result=>{
        if(result.success){
          setStaticData(result.data)
        }
      })
      // await fetch(
      //   "/api/websitestaticinfo",
      //   {
      //     method:"POST",
      //     body:JSON.stringify({
              
      //     }),
      //     headers: {
      //         "Content-Type": "application/json",
      //         // 'Content-Type': 'application/x-www-form-urlencoded',
      //         },
      //         mode:'cors'
      //   }
      // ).then(async res=>{
      //   const collection = await res.json()
      //   // collection.forEach(doc => {
      //   //   console.log(Object.keys(doc))
      //   // });
      //   console.log("collection",collection)
      //   // Replace with recursive in future
      //   let data = {}
      //   let title = {}
      //   let content = []
      //   // collection.forEach(doc => {
      //   //   const keys = (Object.keys(doc))
      //   //   keys.forEach((key,i)=>{
      //   //     console.log("element in ",key,":",doc[key])
      //   //     if (Array.isArray(doc[key])) {
      //   //       doc[key].forEach(element=>{
      //   //         console.log(`array element in ${key}`,element)
      //   //       })
      //   //     }
      //   //   })
      //   // });
        
      // })
    }
    fetchData()
    
  }, [])
  
  
  function handle(data){
    
  }
  
  return (
    StaticData&&(
      <div className='flex flex-col '>
    <p className='text-start underline font-bold'>編輯最新消息 Edit Latest News </p>
      {/* <p className='text-start'>編輯最新消息 Edit Latest News </p>
      
      <Field fieldType={"text"} uploadData={handle} className={"w-1/2"}/> */}
      {/* <Field fieldType={"text"} uploadData={handle} edit={true}/> */}
      {
        StaticData.map((doc,i) => {
          // console.log('e',doc)
          if(Array.isArray(doc.content)){
            return(
              // <p>{doc.name}</p>
              <div className="w-1/2" key={`edit-components-${i}`}>
                <p key={`title-${i}`}>{`${doc.name}`}</p>
                <FieldForArray
                  key={`${doc.name}`}
                  fieldName={doc.name} 
                  fieldType={doc.content_type} 
                  className={""} 
                  fieldValues={doc.content} 
                  multipleValue={doc.multiple_content}
                  handleUpdate={SaveFieldValues}
                  index={i}
                  postAPI={"/api/setwebsitestaticinfo"}
                />
                
              </div>
            )
          }else{
            return <></>
          }
          
        })
      }
    </div>
    )
    
  )
}
