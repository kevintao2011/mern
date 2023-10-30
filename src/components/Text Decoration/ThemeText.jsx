import React from 'react'

function ThemeText({RedText="",GreenText="",BlackText="",className=""}) {
  return (
    <div className={`flex flex-row ${className}`}>
    <div className="redtext ">{RedText}</div>
        <div className="greentext">{GreenText}</div>
        <div className="text-black">{BlackText}</div>
    </div>
  )
}

export default ThemeText