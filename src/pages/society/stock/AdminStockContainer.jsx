import React, { useEffect, useState } from 'react'
import { postURL } from '../../../utils/fetch'
import { toast } from 'sonner'

function AdminStockContainer({code}) {
    const [Stocks, setStocks] = useState()
    useEffect(() => {
        postURL('/api/findsocietystock',true,{code:code}).then(result=>{
            if(result.success){
                setStocks(result.data)
                toast.success("loaded stocks")
            }else{
                toast.error("failed to get stocks")
            }
            
        })
    }, [])
    return (
        <div>
            <div className="text-blue">AdminStockContainer</div>
            {
                Stocks&&(
                    
                        Stocks.map(s=>{
                            return(
                                <div className="">{s._id}</div>
                            )
                        })
                    
                )
            }
        </div>
        
        
    )
}

export default AdminStockContainer