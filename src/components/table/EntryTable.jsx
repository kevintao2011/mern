import React from 'react'

function EntryTable({headings,rowValues=[],update}) {
    return (
        <>
            <table className='w-full'>
                
                <tr>
                    {
                        headings.map(heading=>{
                            return(
                                <th>
                                    {heading}
                                </th>
                            )
                        })    
                    }
                </tr>
                
                    {rowValues.map((row,i)=>{
                        
                        return (
                            
                            <tr className="items-center">
                                {
                                headings.map((heading,index)=>{
                                        return (
                                            <td className='p-1'>
                                                <input type="text" 
                                                    value={row[heading]}
                                                    placeholder={heading}
                                                    className='w-full'
                                                    onChange={(e)=>{rowValues[i][heading]=e.target.value;update(rowValues)}}
                                                />
                                            </td>   
                                        )
                                    })
                                }
                                <div className="h-full items-center p-1">
                                    <button
                                        onClick={
                                            ()=>{
                                                rowValues.splice(i,1)
                                                update(rowValues)
                                            }
                                        }
                                    >
                                        <img src="/assests/img/tablebutton/x-square.svg" alt="" />
                                    </button>
                                </div>
                                
                                
                            </tr>
                        
                            
                            
                        )
                        
                    })}
                    
                
            
            </table> 
            <div className="flex flex-row w-full justify-end px-2">
                <button
                    onClick={
                        ()=>{
                            const rowData = {}
                            headings.forEach(h=>{
                                    rowData[h]=""
                            })
                            rowValues.push(rowData)
                            update(rowValues)
                        }
                    }
                    className='p-1 bg-blue-700 text-white rounded-md'
                >
                    Add
                </button>
            </div>
        </>
        
        
    )
}

export default EntryTable