import React, { useEffect, useState } from 'react'
import SearchTool from '../table/SearchTool'
import moment from 'moment/moment'
import { Toggle } from 'rsuite'
function ListTable({dataEntries,horizontalEntry,TitleMap,TableTitle,EditLink,DeletAPI}) {
    console.log("dataEntries.dataEntries",dataEntries)
    const headings = Object.keys(TitleMap)
    console.log("headings",headings)
    const [filteredResult, setfilteredResult] = useState(dataEntries)
    const [filterOption, setfilterOption] = useState(headings[0])
    
    function handleFilter(filteredArray){
        // console.log("Filtered Result:",filteredArray)
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
                            // console.log("Keys:",keys)
                            return (
                                <tr>
                                    {keys.map(key=>{
                                        if(key in TitleMap){
                                            // console.log("KV:",entry,entry[key])
                                            return (
                                                <td>
                                                    {
                                                        entry[key]===undefined?(
                                                            <div className="overflow-scroll"> </div>
                                                        ):(
                                                            Array.isArray(entry[key])?(
                                                                <div className="overflow-scroll">
                                                                    {
                                                                        entry[key].map(item=>{
                                                                            return <>{item}</>
                                                                        })
                                                                    }
                                                                </div>
                                                                
                                                            ):(
                                                                (String(entry[key])==="true"||String(entry[key])==="false")?(
                                                                    <Toggle 
                                                                        checked={(Boolean(entry[key]))}
                                                                        // disabled={true}
                                                                        size={"sm"}
                                                                    />
                                                                    // <div className="overflow-scroll">{String(entry[key])}</div>
                                                                ):(
                                                                    (moment(entry[key]).isValid()&&isNaN(entry[key]))?(
                                                                        <div className="overflow-scroll">{moment(entry[key]).format("MMM Do YY")}</div>
                                                                    ):(
                                                                        <div className="overflow-scroll">{String(entry[key])}</div>
                                                                    )
                                                                )
                                                                
                                                                
                                                            
                                                            )
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