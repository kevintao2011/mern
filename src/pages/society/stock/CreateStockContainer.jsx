import React, { useEffect } from 'react'

function CreateStockContainer({close , Product}) {
    // useEffect(() => {
    //   first
    
    //   return () => {
    //     second
    //   }
    // }, [])
    
    return (
        <div>
            CreateStockContainer
            <div className=" w-full flex flex-row">
                {
                    Product.product_list.map(subproduct=>{
                        return(
                            <div className="p-1">
                                <div className="">{Product.product_name_chi} {subproduct.name}</div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
        
    )
}

export default CreateStockContainer 