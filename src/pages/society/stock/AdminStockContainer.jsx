import React, { useEffect, useState } from 'react'
import { postURL } from '../../../utils/fetch'
import { toast } from 'sonner'
import { Drawer, InputPicker, Loader } from 'rsuite'
import { auth } from '../../../utils/firebasefunction'
import SearchTool from '../../../components/table/SearchTool'
import { BrowserView, MobileView } from 'react-device-detect'
import CreateStockContainer from './CreateStockContainer'

function AdminStockContainer({code}) {
    const [Stocks, setStocks] = useState()
    const [SelectedStock, setSelectedStock] = useState([])
    const [Product, setProduct] = useState() 
    const [InputMap, setInputMap] = useState([])//[...{label: sku+name ,value: sku}]
    const [SelectedProduct, setSelectedProduct] = useState() //SKU
    const [showDrawer, setshowDrawer] = useState(false)
    const [open, setOpen] = useState(false);
    useEffect(() => {
        postURL('/api/findsocietystock',true,{code:code}).then(result=>{
            if(result.success){
                const stocks = result.data
                
                result.data.map(stockDoc=>{
                    
                })
                setStocks(result.data)
                toast.success("loaded stocks")
            }else{
                toast.error("failed to get stocks")
            }
            
        })
    }, [])
    function updateFilter(sku){
        const match = new RegExp(`${sku}`,"gm")
        setSelectedStock(Stocks.filter(stock=>match.test(stock.sku)))
   
    }
    useEffect(() => {
      getSocProduct()
    
      return () => {
        
      }
    }, [])
    

    async function getSocProduct(){
        await fetch('/api/getsocproducts', { 
            method: "POST",
            body: JSON.stringify({
                user:{
                    token:await auth.currentUser.getIdToken()
                },
                id:code
            }),
            headers: {
            "Content-Type": "application/json",
            // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            mode:'cors'
            
        }).then(async response => {
            
            if (response.ok){
                // registered
                
                console.log("recieved")
                await response.json().then(data=>{
                    console.log("product in fetch",data.data)
                    const prodDict = {}
                    // const prods = data.data.map(bigproduct=>{
                    //     bigproduct.totalSales = 0
                    //     bigproduct.product_list.forEach(product=>{
                    //         bigproduct.totalSales +=product.total_sales
                    //     })
                    //     console.log("sales: ",bigproduct.totalSales)
                    //     return {[bigproduct.sku]:bigproduct}
                    // })
                    data.data.forEach(bigproduct=>{
                        bigproduct.totalSales = 0
                        bigproduct.product_list.forEach(product=>{
                            bigproduct.totalSales +=product.total_sales
                        })
                        console.log("sales: ",bigproduct.totalSales)
                        prodDict[bigproduct.sku]=bigproduct
                    })
                    setProduct(prodDict)
                    
                    setInputMap(Object.keys(prodDict).map(p=>{ 
                        return {label:p+" "+prodDict[p].product_name_chi, value:prodDict[p].sku}
                    }))
                })
            }else{
                console.log("response.body",await response.json())
                const data = await response.json()
                console.log("data.error",data.data)
                setProduct([])
            }  
        })
        
        
    }
    
    return (
        (Stocks&&Product)?(
            <div className='text-sm flex flex-col gap-2 mt-2'>
                <BrowserView>
                    <Drawer open={open} onClose={() => setOpen(false)} size='lg' >
                        <Drawer.Body className=''>
                            <CreateStockContainer close={()=>{setOpen(false)}} Product={SelectedProduct}/>
                        </Drawer.Body>
                        
                        
                    </Drawer>
                </BrowserView>
                <MobileView>
                    <Drawer open={open} onClose={() => setOpen(false)} size='full' >
                            <Drawer.Body className=''>
                            <CreateStockContainer close={()=>{setOpen(false)}} Product={SelectedProduct}/>
                        </Drawer.Body>
                        
                        
                    </Drawer>
                </MobileView>
                <div className="flex flex-col gap-2">
                    <div className="flex flex-row gap-2">
                        <InputPicker data={InputMap} placeholder={"Select a product here"} onChange={(e)=>{setSelectedProduct(Product[e]);updateFilter(e)}} size='sm'/>
                        {
                            SelectedProduct&&(
                                <div className="flex flex-col justify-center">
                                    <button className="bg-su-green text-white rounded-md h-full p-1" onClick={()=>{setOpen(true)}}>  Add New Stock </button>
                                </div>
                                
                            )
                        }
                        
                    </div>
                    <div className="">
                        {
                            SelectedProduct&&(
                                <div className="Product Profile">
                                    <div className="grid grid-cols-4 gap-2">
                                        {/* {
                                            SelectedProduct.options.map(optionObj=>{
                                                return(
                                                    <div className="flex flex-row gap-2">
                                                        {optionObj.text}
                                                        {
                                                            optionObj.option.map(optString=>{
                                                                return(
                                                                    <div className={`px-1 rounded-md bg-${optString.toLowerCase()}-500 text-white`}>{optString}</div>
                                                                )
                                                            })
                                                        }
                                                    </div>
                                                )
                                            })
                                        } */}
                                        {
                                            SelectedProduct.product_list.map(subproduct=>{
                                                return(
                                                    <div className="card">
                                                        <div className="">{subproduct.name}</div>
                                                        <div className="">SKU {subproduct.sku}</div>
                                                        <div className="">Total Sales {subproduct.total_sales} </div>
                                                        <div className="">Inventory {SelectedStock.filter(stock=>stock.sku.includes(subproduct.sku)).length}</div>
                                                        <div className="">Need to Order {SelectedStock.filter(stock=>!stock.spot_goods).length}</div>
                                                    </div>
                                                )
                                            })
                                        }
                                    </div>
                                    
                                </div>
                            )
                        }
                    </div>
                </div>
                
                
                
                {
                    SelectedStock.length<1?(
                        <div>
                            No Stock
                        </div>
                    ):(
                        <div className="grid xl:grid-cols-3 lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-2 text-sm">
                            {
                                SelectedStock.map(s=>{
                                    return(
                                        <div className="w-full rounded-md shadow border-gray-200 p-1 border-t-su-green border-t-4 grid md:grid-cols-2 grid-cols-1">
                                            <div className="">
                                                <div className="underline font-bold">{s.sku}</div>
                                                <div className="flex flex-row justifty-between">
                                                    貨存 {s.spot_goods?("In Stock"):("需要預訂 Require Order")}
                                                </div>
                                                <div className="flex flex-row justifty-between">
                                                    建立者 Created by {s.created_by.sid}
                                                </div>
                                                <div className="flex flex-row justifty-between">
                                                    買家 Owner {s.owner?(s.owner):(" / ")}
                                                </div>
                                                <div className="flex flex-row justifty-between gap-2">
                                                    狀態 
                                                    <div className={`${s.status==="for-sale"?'text-green-500':''}`}>
                                                        {s.status}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="flex flex-col">
                                                <div className="">Remark 備註</div>
                                            </div>

                                        </div>
                                    )
                                })
                            }
                        </div>
                    )
                }
            </div>
        ):(
            <Loader />
        )
        
        
    )
}

export default AdminStockContainer