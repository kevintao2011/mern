import React, { useState } from 'react'
import FileField from './FileField'
import { List } from 'rsuite';
function ProductCombination({headings,rowValues=[],update}) {
    const defaultData = [
        { text: 'Size',option:["Yellow","Green"] },
        { text: 'Color' },
    ];
    const [Data, setData] = useState(defaultData)
    const handleSortEnd = ({ oldIndex, newIndex }) =>
    setData(prvData => {
      const moveData = prvData.splice(oldIndex, 1);
      const newData = [...prvData];
      newData.splice(newIndex, 0, moveData[0]);
      return newData;
    }, []);
    return (
        // <>
        //   <table className='w-full'>   
        //     <tr>
        //         {/* {
        //             headings.map(heading=>{
        //                 return(
        //                     <th>
        //                         {heading}
        //                     </th>
                            
        //                 )
        //             })    
        //         } */}

        //         <th>
        //           Option
        //         </th>
        //         <th>
        //           unit price
        //         </th>
        //         <th>
        //           quantity
        //         </th>
        //         <th>
        //           Image
        //         </th>
        //     </tr>
            
        //         {rowValues.map((row,i)=>{
                    
        //             return (
        //                 <>
        //                 <tr>
        //                     {
        //                     headings.map((heading,index)=>{
        //                             return (
        //                                 <td>
        //                                     <input type="text" 
        //                                         value={row[heading]}
        //                                         placeholder={heading}
        //                                         className='w-full'
        //                                         onChange={(e)=>{rowValues[i][heading]=e.target.value;update(rowValues)}}
        //                                     />
        //                                 </td>   
        //                             )
        //                         })
        //                     }
        //                     <button
        //                         onClick={
        //                             ()=>{
        //                                 rowValues.splice(i,1)
        //                                 update(rowValues)
        //                             }
        //                         }
        //                     >
        //                         <img src="/assests/img/tablebutton/x-square.svg" alt="" />
        //                     </button>
        //                 </tr>
        //                 </>
        //             )
        //         })}
        //   </table> 
        //   <div className="flex flex-row w-full justify-end px-2">
        //       <button
        //           onClick={
        //               ()=>{
        //                   const rowData = {}
        //                   headings.forEach(h=>{
        //                       rowData[h]=""
        //                   })
        //                   rowValues.push(rowData)
        //                   update(rowValues)
        //               }
        //           }
        //       >
        //           Add
        //       </button>
        //   </div>
        // </>
        <div className="w-full grid grid-flow-row grid-cols-3 gap-2 text-sm border">
            <div className="">
                <div className="">Input</div>
                <input 
                    type="text" 
                    placeholder='e.g size, color'
                />
                <div className="">
                <div className="">Combine</div>
                    <List sortable onSort={handleSortEnd}>
                        {Data.map(({ text, disabled }, index) => (
                            <List.Item key={index} index={index}>
                                {text}
                            </List.Item>
                        ))}
                    </List>
                </div>
            </div>
            
            <div className="">
                <div className="">Options</div>
                {
                    Data.map(({ text, disabled },index)=>{ //{ text, disabled } => key in object
                        console.log(text, disabled)
                        return(
                            <>
                            <div className="">{text}</div>
                            <input className='field' type="text" placeholder='varaints' />
                            </>
                        )
                    })
                }
                
            </div>
            <div className="">
                <div className="">Quantity and Price</div>
            </div>
        </div>
    )
}


  

export default ProductCombination