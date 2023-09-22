import React, { useState } from 'react'

function SSelectFieldWithSearch({items ,uploadSelected}) {
  const [SearchValue, setSearchValue] = useState()
  
  return (
    <div className="border w-full p-1  rounded-md shadow  focus:border-blue-400 flex flex-row">
      <input 
        className='' 
        type="text" 
      />
      <img src="/assests/img/icon/search.svg" alt="" />
    </div>
  )
}

export default SSelectFieldWithSearch