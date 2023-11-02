import React, { useEffect,useRef,useState } from 'react'
import ListTable from '../../../components/FormComponents/ListTable'
import { useNavigate } from 'react-router-dom'
import CreateSingleProductContainer from './CreateSingleProductContainer';
import { Drawer, ButtonToolbar, Button, Placeholder, Loader } from 'rsuite';
import {BrowserView, MobileView} from 'react-device-detect';
import { auth } from '../../../utils/firebasefunction';
import EditProduct from './EditProduct';

function AdminProductContainer({code,session}) {//Product,
    const [DrawerContent, setDrawerContent] = useState()
    const navigate = useNavigate()
    const [showDrawer, setshowDrawer] = useState(false)
    const [open, setOpen] = useState(false);
    const [Product, setProduct] = useState()
    
    console.log(code)
    // let sideBarRef = useRef()
    
    // useEffect(() => {
    //     let handler = (e)=>{
    //         if(!sideBarRef?.current.contains(e.target)){
    //             setshowDrawer(false)
    //         }
    //     }
    //     document.addEventListener("mousedown",handler)
    //     return()=>{
    //         document.removeEventListener("mousedown",handler)
    //     }
    // }, [])

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
                    const prods = data.data.map(bigproduct=>{
                        bigproduct.totalSales = 0
                        bigproduct.product_list.forEach(product=>{
                            bigproduct.totalSales +=product.total_sales
                        })
                        console.log("sales: ",bigproduct.totalSales)
                        return bigproduct
                    })
                    setProduct(prods)
                })
            }else{
                console.log("response.body",await response.json())
                const data = await response.json()
                console.log("data.error",data.data)
                setProduct([])
            }  
        })
        
        
    }
    useEffect(() => {
        if(!open){
            console.log("refreshing product")
            getSocProduct()
        }
    }, [open])
    
    return (
        Product?(
            <div className="w-full ">
                {/* {
                    <div 
                        className={`absolute top-30 right-0 bg-transparent drawer ${showDrawer?'active':'inactive'} z-1` }
                        ref={sideBarRef}
                    >
                        <CreateSingleProductContainer code={code}/>
                    </div>
                } */}
                <div className=''>
                    
                    <BrowserView>
                        <Drawer open={open} onClose={() => setOpen(false)} size='md' >
                            <Drawer.Body className=''>
                                {DrawerContent}
                            </Drawer.Body>
                            
                            
                        </Drawer>
                    </BrowserView>
                    <MobileView>
                        <Drawer open={open} onClose={() => setOpen(false)} size='full' >
                            <Drawer.Body >
                                <CreateSingleProductContainer code={code} />
                            </Drawer.Body>
                            
                            
                        </Drawer>
                    </MobileView>
                    

                    
                </div>
                <div className={`w-full flex-col ${showDrawer&&'blur-md'} z-0`}  >
                
                    <div className="w-full flex flex-row justify-center">
                        <div className="w-1/2 flex flex-row">
                            
                            <div className="">
                                <div className="text-3xl">Product</div>
                            </div>
                        </div>
                        <div className="w-1/2 py-1">
                            <div className="w-full flex flex-row gap-2 justify-end">
                            {/* <ButtonToolbar>
                                <Button  
                                    onClick={() =>setOpen(true)}
                                    appearance="primary"
                                    color="green"
                                >
                                    Create Product
                                </Button>
                            </ButtonToolbar> */}
                            <button className="bg-su-green  text-white rounded-md p-1 " onClick={()=>{setOpen(true);setDrawerContent(<CreateSingleProductContainer code={code} session={session}/>)}}>
                                {/* setshowDrawer(prev=>!prev) */}
                                Create Product
                            </button>
                                {/* <button className="bg-su-green  text-white rounded-md p-1 " onClick={()=>{navigate(`/society/${code}/createproduct`)}}> */}
                                {/* <button className="bg-su-green  text-white rounded-md p-1 " onClick={()=>{navigate(`/society/${code}/createproduct`)}}>
                                    Create Tree Product
                                </button>
                                <button className="bg-su-green  text-white rounded-md p-1 " onClick={()=>{setshowDrawer(prev=>!prev)}}>
                                    Create Product
                                </button>
                                <button className="bg-su-green  text-white rounded-md p-1 " onClick={()=>{navigate(`/society/${code}/createproduct`)}}>
                                    Virtual Stocks
                                </button> */}
                            </div>
                            
                        </div>
                        
                        
                    </div>
                    {Array.isArray(Product)&&(
                        <ListTable 
                            dataEntries={Product}
                            TitleMap={{
                                // _id:"_ID",
                                sku:"SKU",
                                session:"session",
                                product_name_chi:"Product Name",
                                product_type:"Category",
                                published:"published",
                                totalSales:"Total Sales"
                            }}
                            EditLink={`/society/${code}/manage/editproduct`}
                            DeletAPI={`/api/${code}/manage/hideproduct`}
                            onEdit = {(id)=>{setDrawerContent(<EditProduct  pid={id}/>);setOpen(true)}}
                        />
                    )}
                    {/* <CreateSingleProductContainer code={code}/> */}
                </div>
            </div>
        ):(
            <Loader/>
        )
        
    )
}

export default AdminProductContainer