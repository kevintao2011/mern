import React, { useEffect, useState } from 'react'
import { postURL } from '../../../utils/fetch'
import { useParams } from 'react-router-dom'
import { Loader } from 'rsuite'
import { deleteFile } from '../../../utils/firebasefunction'
import FileField from '../../../components/FormComponents/FileField'
import ThemeText from '../../../components/Text Decoration/ThemeText'



function LoadingContent() {
  return (
    <div>fetching data.....</div>
  )
}

function EditProduct({pid}) {
    const {code} = useParams()
    const [Product, setProduct] = useState()
    async function getproduct(){
        await postURL("/api/editsocproduct",true,{id:pid}).then(prod=>{
            console.log("prod",prod)
            setProduct(prod)
        })
        
    } 
    useEffect(() => {
        getproduct()
        
    }, [])
    
    return (
        // //border-2 border-red-600
        <div className="`w-full overflow-y-scroll p-1 ">
            {Product?(
                <div className="flex flex-col font-mincho py-10 gap-4">
                    
                    <div className="flex flex-row text-xl font-bold gap-2">
                        <ThemeText
                            RedText={"產"}
                            GreenText={"品"}
                            BlackText={"名稱"}
                            
                        />
                        <ThemeText
                            RedText={"Product"}
                        />
                        <ThemeText
                            GreenText={"Name"}
                        />
                    </div>
                    
                    <div className="text font-bold flex flex-row gap-2">
                        <input className='border-gray border-b-2  p-1 focus:outline-none'  type="text" defaultValue={Product.product_name_chi}/>
                        <button className='rouned-md bg-blue-500 px-1 rounded-md text-white font-normal'>儲存 Save</button>
                        
                    </div>
                    {/* <div className="font-bold text-base">圖片 Image Gallery</div> */}

                    <div className="flex flex-row text-xl font-bold gap-2">
                        <ThemeText RedText={"圖片"}/>
                        <ThemeText BlackText={"Image Gallery"}/>
                        
                    </div>
                    
                    <div className="">
                        <>
                            {
                                Product.product_img_url.map(url=>{
                                    return (
                                        <img src={url} alt="" width={200} 
                                            className='rounded-md'
                                            onClick={()=>{deleteFile(`Product/${code}/${Product.sku}/img`)}}
                                        />
                                    )
                                })
                            }
                            {/* <FileField 
                                imgs={}  
                            /> */}
                        </>

                        
                    </div>

                    <div className="grid grid-cols-2">
                        <div className="">

                        </div>
                    </div>
                    
                    <div className="font-bold text-base">
                        分類 Options 
                    </div>
                    <div className="pl-5">
                        {
                            Product.options.map(({text,option,id})=>{
                                return(
                                    <>
                                    <div className="flex flex-row gap-2 text-base">
                                        <div className="font-bold underline">{text}</div>
                                        {/* <div className=" rouned-md bg-blue-500 px-1 rounded-md text-white">
                                            <button>
                                                add option
                                            </button>
                                        </div> */}
                                        
                                    </div>
                                    
                                    <div className="flex flex-row gap-2">
                                        {
                                            option.map(opt=>{
                                                return (
                                                    <div className="rounded-md p-1 bg-blue-500 text-white">{opt}</div>
                                                    
                                                )
                                            })
                                        }
                                        <input 
                                            type="text" 
                                            className='w-16 rounded-md border-2 border-blue-500 ' 
                                            onKeyDown={
                                                (e)=>{ 
                                                    if(e.key=== 'Enter'){
                                                        console.log("added sub option")
                                                        // Option[index]["option"].push(Input)
                                                        // console.log("Updated subdata:",Option)
                                                        // updateOptionChoice([...Option])
                                                        // setOption([...Option])
                                                        // setInput("")
                                                    }
                                                }
                                            }
                                        />
                                    </div>
                                    
                                    </>
                                )
                            })
                        }
                    </div>
                    <div className="font-bold">
                        Products 產品
                    </div>
                    <div className="grid grid-cols-4 gap-2">
                        <div className="">Option</div>
                        <input type="text" name="" id="" value={"quantity"}/>
                        <input type="text" name="" id="" value={"Price"}/>
                        <input type="text" name="" id="" value={"total sales"}/>

                    </div>
                    {
                        Product.product_list.map(subproduct=>{
                            return(
                                <div className="grid grid-cols-4 gap-2">
                                    <div className="">{subproduct.name}</div>
                                    <input type="number" name="" id="" value={subproduct.quantity}/>
                                    <input type="number" name="" id="" value={subproduct.price}/>
                                    <input type="number" name="" id="" value={subproduct.total_sales}/>

                                </div>
                            )
                        })
                    }
                    
                </div>
            ):(
            <Loader size="lg" content={<LoadingContent/>} />
            )}
        </div>
        
    )
}

export default EditProduct