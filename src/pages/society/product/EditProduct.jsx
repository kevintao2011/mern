import React, { useEffect, useState } from 'react'
import { postURL } from '../../../utils/fetch'
import { useParams } from 'react-router-dom'
import { Loader } from 'rsuite'



function LoadingContent() {
  return (
    <div>fetching data.....</div>
  )
}

function EditProduct({pid}) {
    // const {id} = useParams()
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
        Product?(
            <div className="flex flex-col font-mincho">
                <div className="text-xl font-bold flex flex-row">
                    <input className='field' type="text" defaultValue={Product.product_name_chi}/>
                    <button>save</button>
                    
                </div>
                {
                    Product.product_img_url.map(url=>{
                        return <img src={url} alt="" width={100} />
                    })
                }
                {
                    Product.options.map(({text,option,id})=>{
                        return(
                            <>
                            <div className="">{text}</div>
                            {
                                option.map(opt=>{
                                    return (
                                        <div className="">{opt}</div>
                                        
                                    )
                                })
                            }
                            </>
                        )
                    })
                }
                
            </div>
        ):(
        <Loader size="lg" content={<LoadingContent/>} />
        )
    )
}

export default EditProduct