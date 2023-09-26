import React, { useEffect, useState } from 'react'
import SearchTool from './SearchTool'
function ListTable({dataEntries,horizontalEntry,TitleMap,TableTitle,EditLink,DeletAPI}) {
    console.log("dataEntries.dataEntries",dataEntries)
    const headings = Object.keys(TitleMap)
    console.log("headings",headings)
    const [filteredResult, setfilteredResult] = useState(dataEntries)
    const [filterOption, setfilterOption] = useState(headings[0])
    
    function handleFilter(filteredArray){
        console.log("Filtered Result:",filteredArray)
        setfilteredResult(filteredArray)
    }
    
    return (
        <div>
            <div className="flex flex-row justify-between">
                <SearchTool 
                    inputData={dataEntries}
                    updateOutput={handleFilter}
                    className={"w-1/2"}
                    searchFieldID={filterOption}
                />
                <select name="" id="heading" className='rounded-md bg-transparent flex flex-row justify-between border w-full p-1 mx-1  shadow  focus:border-blue-400'>
                    {headings.map(title=>{
                        return <option value="" id={title} onClick={e=>{setfilterOption(e.currentTarget.id);console.log(e.currentTarget.id)}}>
                            {TitleMap[title].toUpperCase()}
                        </option>
                    })}
                </select>
                
            </div>
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
                        filteredResult.map((entry,i)=>{
                            const keys = Object.keys(TitleMap)
                            console.log("Keys:",keys)
                            return (
                                <tr>
                                    {keys.map(key=>{
                                        if(key in TitleMap){
                                            // console.log("KV:",entry,entry[key])
                                            return (
                                                <td>
                                                    {
                                                        Array.isArray(entry[key])?(
                                                            <div className="">
                                                                {
                                                                    entry[key].map(item=>{
                                                                        return <>{item}</>
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
                                        <div className="flex flex-row gap-2">
                                            <button onClick={()=>{}}>
                                                <img src="/assests/img/tablebutton/pencil.svg" alt="" />
                                            </button>
                                            
                                            <img src="/assests/img/tablebutton/search.svg" alt="" />
                                            <button onClick={()=>{}}>
                                               <img src="/assests/img/tablebutton/x-square.svg" alt="" /> 
                                            </button>
                                            
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