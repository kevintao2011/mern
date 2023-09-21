import React, { useState } from 'react'

/*
    contents:[{
        field_value:
        field_type:
        field_name: // not useful for cat
    }],
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
    name,
    topNode,
    index,
    handleUpdate,
    isRoot = true
}) {
    const [NewID, setNewID] = useState()
    const [NewValue, setNewValue] = useState()
    const [HideAddNew, setHideAddNew] = useState(true)
    
    function renewSubTree(i,node){
        topNode[`child_${name}`][i]=node
        handleUpdate(i,topNode)
    }
    return (
        topNode&&(
            <div className="" key={`${crypto.randomUUID()}`}>
                {
                    topNode&&(
                        <div className="flex flex-col" >
                            {
                                topNode[`${name}_name`] &&(
                                    <label 
                                        htmlFor={`${name}_name`}
                                        className=""
                                    >
                                        編號 ID: {topNode.id}
                                    </label>
                                )
                            }
                            <div className="flex flex-row">
                                <input 
                                    type={topNode[`${name}_fieldtype`]} 
                                    // defaultValue={value}
                                    value={topNode[`${name}_name`]}
                                    className="bg-gray-50 border w-full p-1 block rounded-lg shadow shadow-gray-400 overflow-scroll"
                                    id={`${topNode.id}`}
                                    onChange={(e)=>{
                                        // FieldValues[i]=e.target.value
                                        // setFieldValues([...FieldValues])
                                        // updateToParents(fieldName,FieldValues,index)
                                    }}
                                /> 
                                
                            </div>
                            <div className="flex flex-row">
                                {
                                    !HideAddNew&&(
                                        <div className="flex flex-row my-1">
                                            
                                            
                                            <form 
                                                action="" 
                                                
                                                onSubmit={(e)=>{
                                                    e.preventDefault();
                                                    console.log(NewID,NewValue);
                                                    const newchild={
                                                        [`${name}_name`]:NewValue,
                                                        id:NewID,
                                                        [`child_${name}`]:[],
                                                        
                                                    }
                                                    topNode[`child_${name}`].push(newchild)
                                                    handleUpdate(index,topNode)
                                                    setNewID()
                                                    setNewValue()

                                                }}
                                            >
                                                
                                                    <input 
                                                        type="text" 
                                                        id='id'
                                                        placeholder='id (eng only) e.g.membership'
                                                        className='border border-b-2 mx-1 rounded-md overflow-scroll'
                                                        required="required"
                                                        value={NewID}
                                                        onChange={e=>{setNewID(e.target.value)}}
                                                    />
                                                    
                                                    <input 
                                                        type="text" 
                                                        id={`${name}_name`}
                                                        placeholder='catergory name e.g.會籍 Membership'
                                                        className='border border-b-2 mx-1 rounded-md overflow-scroll'
                                                        required="required"
                                                        value={NewValue}
                                                        onChange={e=>{setNewValue(e.target.value)}}
                                                    />
                                                    <button 
                                                        type='submit'
                                                        // handleAddChild(e)
                                                        className='mx-1 p-1 bg-blue-500 rounded-md'
                                                        
                                                    >
                                                        Add sub{name} 
                                                    </button>
                                                
                                            </form>
                                            
                                        
                                        
                                            {/* <img 
                                                src="/assests/img/plus-circle.png" 
                                                alt="" 
                                                
                                            /> */}

                                        </div>
                                    )
                                }   
                                {
                                    HideAddNew&&(
                                        <button 
                                            className='p-1 bg-blue-500 rounded-md'
                                            onClick={()=>{setHideAddNew(prev=>!prev)}}
                                        >
                                            New Sub{name}
                                        </button>
                                    )
                                }
                                {
                                    !isRoot&&(
                                        <button className='p-1 mx-1 bg-green-500 rounded-md'>
                                            New Category Under {NewValue}
                                        </button>
                                    )
                                }
                                
                            </div>
                            
                            
                            
                            
                        </div>
                        
                        
                        
                    )
                    
                }
                {
                    // topNode[`child_${name}`]&&(
                    //     <div className="ms-2">
                    //         <NestedField
                    //             name={name}
                    //             child_contents={[]}
                    //         />
                    //     </div>
                        
                    // )
                    topNode[`child_${name}`]?.map((node,i)=>{
                        return(
                            <div className="ms-2">
                                <NestedField
                                    name={name}
                                    index={i}
                                    handleUpdate={renewSubTree}
                                    topNode={node}
                                    isRoot={false}
                                />
                            </div>
                        )
                    })
                }
                
                
            </div>
        )
        
    )
}

export default NestedField