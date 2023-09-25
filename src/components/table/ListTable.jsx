import React from 'react'

function ListTable({dataEntries,horizontalEntry,TitleMap}) {
    console.log("dataEntries.dataEntries",dataEntries)
    const headings = Object.keys(TitleMap)
    console.log("headings",headings)
    
    return (
        <div>
            <table className='w-full'>
                <tbody>
                    <tr>
                        {
                            headings.map(heading=>{
                                if(TitleMap[heading]){
                                    return <th className='text-start'>{TitleMap[heading].toUpperCase()}</th>
                                }
                                
                            })
                        }
                        <th>ACTIONS</th>
                        
                    </tr>
                  
                    {
                        dataEntries.map((entry,i)=>{
                            const keys = Object.keys(entry)
                            console.log("Keys:",keys)
                            return (
                                <tr>
                                    {keys.map(key=>{
                                        console.log("KV:",entry,entry[key])
                                        if(TitleMap[key]){
                                            return (
                                                <td>
                                                    {
                                                        Array.isArray(entry[key])?(
                                                            <div className="">
                                                                {
                                                                    entry[key].map(item=>{
                                                                        <>{item}</>
                                                                    })
                                                                }
                                                            </div>
                                                            
                                                        ):(
                                                            
                                                            <div className="">{String(entry[key])}</div>
                                                        
                                                        )
                                                    }
                                                    
                                                </td>
                                            )
                                        }
                                    })}
                                    <td>
                                        <div className="flex flex-row justify-between">
                                            <img src="/assests/img/tablebutton/pencil.svg" alt="" />
                                            <img src="/assests/img/tablebutton/search.svg" alt="" />
                                            <img src="/assests/img/tablebutton/x-square.svg" alt="" />
                                        </div>
                                    </td>
                                </tr>
                            )
                                
                        })
                    }
                   
                </tbody>
            </table>
        </div>
    )
}

export default ListTable