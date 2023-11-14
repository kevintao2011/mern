import React, { useEffect, useState } from 'react'
import { postURL } from '../../../utils/fetch'
import { auth } from '../../../utils/firebasefunction'
function AdminOrderContainer({code}) {
    const [Order, setOrder] = useState()
    async function getOrders(){
        await postURL("/api/getordersbysoc",true,{code:code}).then(result=>{
            if(result.success){
                setOrder(result)
            }
        })
    }
    useEffect(() => {
        getOrders()
        
        
    }, [])

    async function updateOrderStatus(order,val){
        order.status=val
        await fetch('/api/updateorderstatus', { 
            method: "POST",
            body: JSON.stringify({
                user:{
                    token:await auth.currentUser.getIdToken()
                },
                order:order
            }),
            headers: {
            "Content-Type": "application/json",
            // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            mode:'cors'
            
        }).then(async response => {
            
            if (response.ok){
                // registered
                
                console.log("updated")
                const data = await response.json()
                console.log("Activity",data)
               
                
                
            }else{
                console.log("response.body",await response.json())
                const data = await response.json()
                console.log("data.error",data)
                
                
            }  
        })
        
    }
    
    return (
        Order&&(
            <div className="grid grid-cols-1 gap-4 font-mincho text-sm">
                {
                    Order?.map(order=>{
                        return(
                            <div className="field grid grid-cols-2">
                                <div className="flex flex-col md:flex-row">
                                    <div className="">訂單編號 {order._id}</div>
                                    <div className="">付款方式 {order.payment_method}</div>
                                </div>

                                <div className="flex flex-col md:flex-row">
                                    
                                    <div className=''>狀態 </div>
                                    <select name="" id="" defaultValue={order.status} onChange={(e)=>{updateOrderStatus(order,e.target.value)}}>
                                    <option value="Confirmed">已確認付款</option>
                                    <option value="To be confirmed">等待確認付款</option>
                                    <option value="Processing">處理中</option>
                                    <option value="Delivering">運送中</option>
                                    <option value="Delivered">已運送</option>
                                    <option value="Cancelled">已取消</option>
                                    </select>
                                </div>
                                <div className=''>學生編號 {order.sid}</div>
                                <div className=''>學生姓名 {order.chi_name}</div>
                                <div className=''>聯絡電話 {order.contact}</div>
                                <div className=''>建立日期 {Date(order.create_at).substring(0,24)}</div>
                                
                                <div className="">
                                    <div className='py-2'>訂單物品</div>
                                    {
                                        order.products.map((item,i)=>{
                                        return(
                                            <div>{i+1}.{item.product_name}-{item.option} x {item.quantity}</div>
                                        )
                                        })
                                    } 
                                </div>
                                
                            </div>
                        )
                        })
                }
            </div>
            
        )
        
    )
}

export default AdminOrderContainer