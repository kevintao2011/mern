import React, { useState } from 'react'

function SearchTool({inputData,updateOutput}) {
  const [SearchTarget, setSearchTarget] = useState()
  return (
    <div className='flex flex-row justify-between border w-full p-1 mx-1 rounded-md shadow  focus:border-blue-400 '>
        <input type="text" className="w-full bg-transparent" onChange={(e)=>{}}/>
        <img src="/assests/img/icon/search.svg" alt="" />
    </div>
  )
}

export default SearchTool