import React, { useState } from 'react'

function StockCard({stock}) {
    const [Modified, setModified] = useState(false)
    return (
        stock?(
            <div className="w-full rounded-md shadow border-gray-200 p-1 border-t-su-green border-t-4 grid md:grid-cols-2 grid-cols-1 gap-2">
                <div className="">
                    <div className="underline font-bold">{stock.sku}</div>
                    <div className="flex flex-row w-full justify-between ">
                        <div className="">貨存 </div>
                        <div className="">{stock.spot_goods?("In Stock"):("需要預訂 Require Order")}</div>
                    </div>
                    <div className="flex flex-row w-full justify-between">
                        <div className="">建立者 Created by </div>
                        <div className="">{stock.created_by.sid}</div>
                    </div>
                    <div className="flex flex-row w-full justify-between">
                        <div className="">買家 Owner </div>
                        <div className="">{stock.owner?(stock.owner):(" / ")}</div>
                    </div>
                    <div className="flex flex-row w-full justify-between">
                        狀態 
                        <div className={`${stock.status==="for-sale"?'text-green-500':''}`}>
                            {stock.status}
                        </div>
                    </div>
                </div>
                <div className="flex flex-col">
                    <div className="flex flex-col h-full justify-between ">
                        <div className="">
                            <div className="">Remark 備註</div>
                            <textarea className='w-full rounded-md border border-su-green'/>
                        </div>
                        {
                            Modified&&(
                                <div className="w-full flex flex-row justify-end">
                                    <div className="">Save</div>
                                </div>
                            )
                        }
                        
                    </div>
                    
                </div>

            </div>
        ):(
            <div className="">This Stock cannot be loaded properly</div>
        )
        
    )
}

export default StockCard