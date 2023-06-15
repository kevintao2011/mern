import React from 'react'

function handleClick(){
  console.log('clicked');
  return(alert("cl"))
}
const FunctionEvent = () => {
  return (
    <div>FunctionEvent
        <button onClick={handleClick}>Clieck Here</button>
    </div>
  )
}

export default FunctionEvent