import React from 'react'
/*
    content:{
        field_value:
        field_type:
        field_name: // not useful for cat
    },
    child_content:[
        {
            content:{
                field_value:
                field_type:
                field_name: // not useful for cat
            },
            child_content:[

            ],
        }
    ],
*/

function NestedField({
    content,
    child_content,
    index 
}) {
  return (
    <div className="" key={`${crypto.randomUUID()}`}>
        {
            content&&(
                <div className="flex flex-row" >
                    <input 
                        type={content.field_type} 
                        // defaultValue={value}
                        value={content.field_value}
                        className="bg-gray-50 border w-full p-1 block rounded-lg shadow shadow-gray-400"
                        onChange={(e)=>{
                            // FieldValues[i]=e.target.value
                            // setFieldValues([...FieldValues])
                            // updateToParents(fieldName,FieldValues,index)
                        }}
                    /> 
                    {
                        child_content.length&&(// Add and Delete Button and for mutilpleField
                            child_content.map((content,i)=>{
                                return(
                                    <NestedField
                                        
                                    />
                                )
                            })
                        )
                    }
                </div>
            )
        }
        
    </div>
  )
}

export default NestedField