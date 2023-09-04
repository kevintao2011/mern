import React, { Component, useState,useEffect } from 'react'
import PropTypes from 'prop-types';

function FunctionalChildComponent({ number , deleteFunction ,index }) {

  const [childNum, setchildNum] = useState(number)
  function onDelet(){
    deleteFunction(true,index)
  }

  function updateToParent(){
    // load state into 
    // can use ref to trigger ?
    // 
    const data = {}
    deleteFunction(data,index)
  }

  

  useEffect(() => {
    
    console.log("child init",number)
    
  }, [number])
 

  return (

    <div className="">
      
      <h1>Hello, {number}!</h1>;
      <button
        onClick={()=>{onDelet()}} 
      >
        delet
      </button>
    </div>
  )
    
  
}

export default FunctionalChildComponent

