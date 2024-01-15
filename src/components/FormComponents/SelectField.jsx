import React, { useEffect } from 'react'
import { useState } from 'react'
import { InputPicker } from 'rsuite';
function SelectField({optionsMap,single,returnFunction,value,index,disabled=false}) {
    console.log("optionsMap",optionsMap)
    const [MappedOptions, setMappedOptions] = useState()
    useEffect(() => {
        setMappedOptions(optionsMap.map(option=>{
            return {label:Object.keys(option)[0],value:Object.values(option)[0]}
        }))
    }, [optionsMap])
    useEffect(() => {
      console.log("MappedOptions",MappedOptions)
    }, [MappedOptions])
    
    const [SelectedValue, setSelectedValue] = useState()
    useEffect(() => {
        console.log("SelectedValue",SelectedValue,index,[...value])
        if(SelectedValue){
            if(single){
                returnFunction(index,SelectedValue)
              }else{
                if(value.includes(SelectedValue)){
                    console.log("duplicate")
                    returnFunction(index,[...value])

                }else{
                    console.log("new",index)
                    returnFunction(index,[...value,SelectedValue])
                }
              }
        }
      
    }, [SelectedValue])
    
    
    return (
        <InputPicker data={MappedOptions} onChange={setSelectedValue} className='w-full' disabled={disabled} />
    )
}

export default SelectField