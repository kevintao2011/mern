import React, { useEffect } from 'react'
import { postURL } from '../../../utils/fetch'

function AdminStockContainer({code}) {
    useEffect(() => {
        postURL('/api/findsocietystock',true,{code:code})
    }, [])
    return (
        <div>AdminStockContainer</div>
        
        
    )
}

export default AdminStockContainer