import React, { useEffect,useRef,useState } from 'react'
import ListTable from '../../../components/FormComponents/ListTable'
import { useNavigate } from 'react-router-dom'
import CreateSingleProductContainer from './CreateSingleProductContainer';
import { Drawer, ButtonToolbar, Button, Placeholder } from 'rsuite';

function AdminProductContainer({Product,code}) {
    const navigate = useNavigate()
    const [showDrawer, setshowDrawer] = useState(false)
    const [open, setOpen] = useState(false);
    
    
    console.log(code)
    let sideBarRef = useRef()
    
    useEffect(() => {
        let handler = (e)=>{
            if(!sideBarRef?.current.contains(e.target)){
                setshowDrawer(false)
            }
        }
        document.addEventListener("mousedown",handler)
        return()=>{
            document.removeEventListener("mousedown",handler)
        }
    }, [])
    useEffect(() => {
      
    
      return () => {
        
      }
    }, [])
    
    return (
        <div className="">
            {
                <div 
                    className={`absolute top-30 right-0 bg-transparent drawer ${showDrawer?'active':'inactive'} z-1` }
                    ref={sideBarRef}
                >
                    <CreateSingleProductContainer/>
                </div>
            }
            <div className="">
                

                <Drawer open={open} onClose={() => setOpen(false)}>
                    <Drawer.Body className=''>
                        <CreateSingleProductContainer/>
                    </Drawer.Body>
                    
                    
                </Drawer>

                
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
                        <button className="bg-su-green  text-white rounded-md p-1 " onClick={()=>{setOpen(true)}}>
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
                            
                            product_name_chi:"Product Name",
                            product_type:"Category",
                            inventory:"stock",
                            total_sales:"sold",
                            unit_price:"UNIT Price",
                            published:"published",
                            session:"session"

                        }}
                    />
                )}
                <CreateSingleProductContainer/>
            </div>
        </div>
        
    )
}

export default AdminProductContainer