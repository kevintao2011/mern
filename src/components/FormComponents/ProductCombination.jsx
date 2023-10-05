import React from 'react'
import FileField from './FileField'
function ProductCombination({headings,rowValues=[],update}) {
  return (
    <>
      <table className='w-full'>   
        <tr>
            {/* {
                headings.map(heading=>{
                    return(
                        <th>
                            {heading}
                        </th>
                        
                    )
                })    
            } */}

            <th>
              Option
            </th>
            <th>
              unit price
            </th>
            <th>
              quantity
            </th>
            <th>
              Image
            </th>
        </tr>
        
            {rowValues.map((row,i)=>{
                
                return (
                    <>
                    <tr>
                        {
                        headings.map((heading,index)=>{
                                return (
                                    <td>
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
                    </tr>
                    </>
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
          >
              Add
          </button>
      </div>
    </>
  )
}


  

export default ProductCombination