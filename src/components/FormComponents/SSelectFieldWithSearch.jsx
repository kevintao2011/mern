import React, { useEffect, useState } from 'react'

function SSelectFieldWithSearch({options,uploadSelected,index,single,values,canSearch}) {
  const [SearchValue, setSearchValue] = useState("")
  const [searchResult, setsearchResult] = useState(options)
  useEffect(() => {
    if (SearchValue===""){
      setsearchResult(options)
    }else{
      const result = options.filter(item=>item.includes(SearchValue))
      console.log("filter result ", result)
      setsearchResult(result)
    }
  }, [SearchValue])
  console.log("options",options)

  function addValues (newValue){
    if(single){
      var a =[]
      a.push(newValue)
      values=a
    }
    else{
      if (!values.includes(newValue)){
        values.push(newValue)
      }
    }
    console.log("values",values)
    return values
  }

  // function deletedValues (index){
  //   values.splice(index,1)
  // }
  
  return (
    <div className="flex flex-row">
      <div className="w-full flex flex-col">
        {
          canSearch&&(
            <div className='flex flex-row justify-between border w-full  p-1 rounded-md shadow  focus:border-blue-400 '>
            <input type="text" className="w-full" onChange={(e)=>{setSearchValue(e.target.value)}}/>
            <img src="/assests/img/icon/search.svg" alt="" />
          </div>
          )
        }
        {/* <div className='flex flex-row justify-between border w-full  p-1 rounded-md shadow  focus:border-blue-400 '>
          <input type="text" className="w-full" onChange={(e)=>{setSearchValue(e.target.value)}}/>
          <img src="/assests/img/icon/search.svg" alt="" />
        </div> */}
        <div className="flex flex-col w-full">
          {searchResult.map(item=>{
            return (
              <button
                value={item} 
                key={crypto.randomUUID()}
                className="border p-1 rounded-md shadow  focus:border-blue-400 flex flex-row"
                onClick={()=>{addValues(item);uploadSelected(index,values);}} //uploadSelected(index,values)
              >
                {item}
              </button>
            )
          })}
        </div>
      </div>
      <div className="w-full flex flex-col">
        <div
            
            className="border p-1 rounded-md shadow  focus:border-blue-400 flex flex-row"
            // onClick={()=>{deletSelected(index)}}
          >
            Selected Categories
        </div>
        {
          values?.map((value,i)=>{
            return (
              <div className="flex flex-row">
                <button
                  value={value} 
                  key={crypto.randomUUID()}
                  className="border p-1 rounded-md shadow  focus:border-blue-400 flex flex-row"
                  onClick={()=>{values.splice(i,1);uploadSelected(index,values);}}
                >
                    {`${value} x`}
                    
                </button>
                
              </div>
            
            )
          })
        }
      </div>
      
      
    </div>
    
    
  )
}

export default SSelectFieldWithSearch