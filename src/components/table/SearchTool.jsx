import React, { useEffect, useState } from 'react'

function SearchTool({inputData,updateOutput,searchFieldID,className}) {
  console.log("inputData",inputData)
  const [SearchTarget, setSearchTarget] = useState()
  useEffect(() => {
    var result
    if(SearchTarget){
      result=inputData.filter(entry=>{
        if (String(entry[searchFieldID]).toLowerCase().includes(String(SearchTarget).toLowerCase())){
          return entry
        }
      })
      updateOutput(result)
    }else{
      updateOutput(inputData)
    }
    console.log("result after search",result)
  }, [SearchTarget])
  useEffect(() => {
    console.log("filter option changed to",searchFieldID)
  }, [searchFieldID])
  
  
  return (
    <div className={`flex flex-row justify-between border w-full p-1 mx-1 rounded-md shadow  focus:border-blue-400 ${className}`}>
        <input type="text" className="w-full bg-transparent" onChange={(e)=>{setSearchTarget(e.target.value)}}/>
        <img src="/assests/img/icon/search.svg" alt="" />
    </div>
  )
}

export default SearchTool