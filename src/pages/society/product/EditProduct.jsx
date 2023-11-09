import React, { useEffect, useState } from 'react'
import { postURL } from '../../../utils/fetch'
import { useNavigate, useParams } from 'react-router-dom'
import { Loader, Toggle } from 'rsuite'
import { analyzeURL, deleteFile, storage, uploadFile } from '../../../utils/firebasefunction'
import FileField from '../../../components/FormComponents/FileField'
import ThemeText from '../../../components/Text Decoration/ThemeText'
import { Input } from 'rsuite';
import { isDuplicated, shallowEqual,shallowCopy, deepEqual, IntToFixDisgitString } from '../../../utils/basicFunction'
import { findCombinations } from '../../../utils/basicFunction'
import { deleteObject, listAll, ref } from 'firebase/storage'
import { toast } from 'sonner'
import { Navigate } from 'react-router-dom'

function LoadingContent() {
  return (
    <div>fetching data.....</div>
  )
}

function EditProduct({pid,close}) {
    const {code} = useParams()
    const [Product, setProduct] = useState()
    const [NewImages, setNewImages] = useState([])
    const [Edited, setEdited] = useState(false)
    const [Original, setOriginal] = useState()
    const [FirstLoad, setFirstLoad] = useState(true)
    const [Saving, setSaving] = useState(false)
    const [DeleteImagesIndex, setDeleteImagesIndex] = useState([])
    const navigate = useNavigate();
    async function getproduct(){
        console.log("fetch")
        await postURL("/api/editsocproduct",true,{id:pid}).then(prod=>{
            console.log("prod",prod)
            setProduct({...prod})
            setOriginal(shallowCopy(prod))

        })
    } 
    
    
    useEffect(() => {
        getproduct()
    }, [])
    useEffect(() => {
        console.log("product props changed",Product)
        //   console.log("compare",Product,Original)
        if(FirstLoad&&(Product!==undefined)){
            setFirstLoad(false)
        }else{
            if(!FirstLoad){
                setEdited(true)
            }
        }

    }, [Product,NewImages])
    useEffect(() => {
        console.log("Edited",Edited)
    }, [Edited])
    
    useEffect(() => {
      console.log("original changed")
    }, [Original])


    function expandProductList(){
        const options = Product.options.map(option=>{
            return(option.option)
        })
        const result = findCombinations(options)
        const oriProds =  Product.product_list.map(prod=>{
            return (prod.name)
        })
        const newProds = result.filter(name=>!oriProds.includes(name))
        function findNextIndex(productlist){
            const intArry = productlist.map(prod=>{
                console.log(parseInt(prod.sku.split("-")[3]))
                return (parseInt(prod.sku.split("-")[3]))
            })
            console.log("max",Math.max(...intArry)+1)
            return Math.max(...intArry)+1;
            
        }
        const start = findNextIndex(Product.product_list)  
        Product.product_list.push(...newProds.map((p,i)=>{
            console.log(IntToFixDisgitString((start+i),3))
            const newsku = Product.sku+"-"+IntToFixDisgitString((start+i),3)
            return{
                name: p,
                price: 0,
                quantity: 0,
                sku: newsku,
                total_sales: 0,
            }
        }))

        setProduct({...Product})
        
    }

    async function handleUpdate(){
        console.log("ref:",`Product/${code}/${Product.sku}/`)
        const folderdir = `Product/${code}/${Product.sku}/`
        const Ref = ref(storage ,folderdir)
        console.log("ref:",Ref)
        if(NewImages.length>0){
            // TMR me: complete this
            // Get img index , find biggest
            // upload new
            const nextIndex = Math.max(
                ...Product.product_img_url.map(url=>{
                    return parseInt(analyzeURL(url,"index"))
                })
            )+1
            console.log("nextIndex:",nextIndex)
            // NewImages.map((imgFile,i)=>{
            //     ret
            // })
            await Promise.all(
                NewImages.map(async (file,index)=>{
                    return await uploadFile(folderdir,`img-${nextIndex+index}`,file,2000)
                })
            ).then(async (urls)=>{
                Product.product_img_url.push(...urls)
                setNewImages([])
            })
            
        }
        if(DeleteImagesIndex.length>0){
            console.log("ref:",Ref)
            await listAll(Ref).then(async result=>{
                console.log(result)
                const dref = result.items.filter(ref=>{
                    return DeleteImagesIndex.map((i)=>{
                        console.log(ref._location.path_,`/img-${i}.`)
                        if(ref._location.path_.includes(`/img-${i}.`)){
                            return true
                        }else{
                            return false
                        }
                    }).includes(true)
                    
                })
                console.log("dref",dref)
                await Promise.all(
                    dref.map(async r=>{
                        return await deleteObject(r).then(() => {
                        // File deleted successfully
                            console.log("deleted")
                            return true
                        }).catch((error) => {
                            console.log("error")
                            return false
                        // Uh-oh, an error occurred!
                        });
                    })
                ).then(async()=>{
                    
                })
            })
        }
        await postURL("/api/updateproduct",true,Product).then(()=>{
            toast.success("Product Information Updated",{
                duration:3000
            })
            setProduct({...Product})
            close()
        })
        
    }

    
    return (
        // //border-2 border-red-600
        <div className="`w-full overflow-y-scroll p-1 ">
            {Product?(
                <div className="flex flex-col font-mincho py-10 gap-4">
                    <div className="flex flex-row justify-between text-lg font-bold gap-2">
                        <div className="flex flex-row ">
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
                        <div className="flex flex-row gap-2">
                            <div className="">發布 Published?</div>
                            <div className="">
                                <Toggle defaultChecked={Product.published} 
                                    onChange={(pub)=>{
                                        Product.published=pub;
                                        setProduct({...Product})
                                        
                                    }} 
                                />
                            </div>
                        </div>
                        
                    </div>
                    
                    <div className="text font-bold flex flex-row gap-2">
                        <input 
                            className='border-gray border-b-2  p-1 focus:outline-none'  
                            type="text" 
                            defaultValue={Product.product_name_chi}
                            onChange={(e)=>{
                                Product.product_name_chi=e.target.value;
                                setProduct({...Product})
                            }}
                        />
                        {/* <button className='rouned-md bg-blue-500 px-1 rounded-md text-white font-normal'>儲存 Save</button> */}
                        
                    </div>
                    {/* <div className="font-bold text-base">圖片 Image Gallery</div> */}
                    <div className="">
                        <div className="flex flex-row text-lg font-bold gap-2">
                            <ThemeText GreenText={"產品介紹"}/>
                            <ThemeText BlackText={"Description"}/>
                            
                        </div>
                        <Input as="textarea" rows={5} value={Product.product_description_chi} placeholder="Textarea" 
                            onChange={(e)=>{
                                Product.product_description_chi=e
                                setProduct({...Product})
                            }}
                        />
                    </div>

                    <div className="bg-gray-50 rounded-lg">
                        <div className="flex flex-row text-lg font-bold gap-2">
                            <ThemeText RedText={"圖片"}/>
                            <ThemeText BlackText={"Image Gallery"}/>
                            
                        </div>

                        
                        
                        <div className="flex flex-row gap-1">
                            <>
                                {
                                    Product.product_img_url.map((url,i)=>{
                                        return (
                                            <button
                                                onClick={()=>{
                                                    DeleteImagesIndex.push(i)
                                                    setDeleteImagesIndex([...DeleteImagesIndex])
                                                    Product.product_img_url.splice(i,1)
                                                    setProduct({...Product})
                                                }}
                                            >
                                                <img src={url} alt="" width={100} 
                                                    
                                                    className='rounded-md'
                                                    //onClick={()=>{deleteFile(`Product/${code}/${Product.sku}/img`)}}
                                                />
                                            </button>
                                        )
                                    })
                                }
                                
                            </>
                            
                            
                        </div>    
                    </div>
                    

                    <div className="bg-gray-50">
                        <div className="flex flex-row text-lg font-bold gap-2">
                            <ThemeText RedText={"新增圖片"}/>
                            <ThemeText BlackText={"New Images"}/>
                            
                        </div>
                        <FileField 
                            imgs={NewImages} 
                            index={0} 
                            updatePhoto={(index,imagefiles)=>{setNewImages([...imagefiles])}}
                            w={"100"}
                            h={"100"}
                        />    
                    </div>
                    

                    <div className=" rounded-lg flex flex-col gap-2 bg-gray-50">
                        <div className="font-bold text-xl">
                            <div className="flex flex-row gap-1">
                                <ThemeText
                                    RedText={"產"}
                                    GreenText={"品"}
                                    BlackText={"資訊"}
                                />
                                <ThemeText
                                    RedText={"Product"}
                                />
                                <ThemeText
                                    GreenText={"Information"}
                                />
                            </div>
                        </div>
                        <div className="flex flex-col gap-2">
                            <div className="">
                                <div className="font-bold text-base underline">
                                    分類 Options 
                                </div>
                                <div className="pl-5">
                                    {
                                        Product.options.map(({text,option,id},index)=>{
                                            return(
                                                <div className="flex flex-col gap-2">

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
                                                            option.map((opt,i)=>{
                                                                console.log("Original",Original.options[index].option,"Opt",Product.options[index].option)
                                                                return (
                                                                    <div className="rounded-md px-1 bg-blue-500 text-white">
                                                                        {
                                                                            Original.options[index].option.includes(opt)?(
                                                                                <div className="">{opt}</div>
                                                                            ):(
                                                                                <button
                                                                                    onClick={()=>{
                                                                                        Product.options[index].option.splice(i,1)
                                                                                        Product.product_list = Product.product_list.filter((p)=>{
                                                                                            const props = p.name.split(" ")
                                                                                            return !props.map(prop=>{
                                                                                                console.log(prop,opt,prop===opt)
                                                                                                if (prop===opt){
                                                                                                    console.log("pop")
                                                                                                    return false
                                                                                                }else{
                                                                                                    return true
                                                                                                }
                                                                                            }).includes(false)
                                                                                            
                                                                                        })
                                                                                        console.log("reduced list",Product.product_list)
                                                                                        setProduct({...Product})
                                                                                    }}
                                                                                >
                                                                                    {opt}
                                                                                </button>
                                                                            )
                                                                        }
                                                                        
                                                                    </div>
                                                                    
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
                                                                        if(!isDuplicated(Product.options[index].option,e.target.value)){
                                                                            Product.options[index].option.push(e.target.value)
                                                                            expandProductList()
                                                                            // setProduct({...Product})
                                                                        }
                                                                        
                                                                        e.target.value=""
                                                                    }
                                                                }
                                                            }
                                                        />
                                                    </div>
                                                
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                                        
                            </div>

                            <div className="">
                                <div className="font-bold text-base underline">
                                     標籤 Tags
                                </div>
                                <div className="pl-5 flex flex-row gap-2">
                                    {
                                        Product.tags.map((tag,index)=>{
                                            return(
                                                <div className="flex flex-row gap-2">
                                                    <div className="rounded-md px-1 bg-blue-500 text-white">
                                                        <button
                                                            onClick={()=>{
                                                                Product.tags.splice(index,1)
                                                                setProduct({...Product})
                                                            }}
                                                        >
                                                            <div className="">{tag}</div>
                                                        </button>
                                                        
                                                    </div>
                                                    
                                                </div>
                                            )
                                        })
                                    }
                                    <input 
                                        type="text" 
                                        className='w-16 rounded-md border-2 border-blue-500 ' 
                                        onKeyDown={
                                            (e)=>{ 
                                            if(e.key=== ' '){
                                                    console.log("added tags")
                                                    if(!isDuplicated(Product.tags,e.target.value)){
                                                        Product.tags.push(e.target.value)
                                                        setProduct({...Product})
                                                    }
                                                    e.target.value=""
                                                }
                                            }
                                        }
                                    />
                                </div>
                                        
                            </div>

                            <div className="flex flex-col gap-2">
                                <div className="font-bold pt-2 underline">
                                    選項列表 Product List {Product.product_list.length}
                                </div>

                                
                                <div className="">
                                    <div className="grid grid-cols-4 gap-2">
                                        <div className="">Option</div>
                                        {/* <input type="text" name="" id="" value={"quantity"}/>
                                        <input type="text" name="" id="" value={"Price"}/>
                                        <input type="text" name="" id="" value={"total sales"} /> */}
                                        <div className="">{"quantity"}</div>
                                        <div className="">{"Price"}</div>
                                        <div className="">{"total sales"}</div>
                                        

                                    </div>
                                    {
                                        Product.product_list.map((subproduct,i)=>{
                                            return(
                                                <div className="grid grid-cols-4 gap-2">
                                                    <div className="">{subproduct.name}</div>
                                                    <input type="number" name="" id="" value={subproduct.quantity} 
                                                        onChange={(e)=>{
                                                            Product.product_list[i].quantity=e.target.value
                                                            setProduct({...Product})
                                                        }}
                                                    />
                                                    <input 
                                                        type="number" 
                                                        name="" 
                                                        id="" 
                                                        value={subproduct.price}
                                                        onChange={(e)=>{
                                                            Product.product_list[i].price=e.target.value
                                                            setProduct({...Product})
                                                        }}
                                                    />
                                                    {/* <input type="number" name="" id="" className='disabled:bg-gray-100' value={subproduct.total_sales} disabled/> */}
                                                    <div className="">{subproduct.total_sales}</div>

                                                </div>
                                            )
                                        })
                                    }
                                </div>
                                
                                <div className="">
                                    <div className="flex flex-row justify-center gap-2">
                                        {
                                            Edited&&(
                                                <>
                                                    <button 
                                                        onClick={async ()=>{ 
                                                            await handleUpdate()
                                                        }} 
                                                        disabled={Saving}
                                                    >
                                                        <div className="p-1 rounded-md bg-web-green text-white " >儲存 Save</div>
                                                    </button>
                                                    
                                                    <button
                                                        onClick={()=>{
                                                            setProduct(Original)
                                                            setNewImages([])
                                                            setEdited(false)
                                                            setDeleteImagesIndex([])
                                                        }}
                                                    >
                                                        <div className="p-1 rounded-md bg-web-red text-white ">還原 Revert</div>
                                                    </button>
                                                </>
                                            )
                                        }
                                        
                                        <button onClick={()=>{}}>
                                            <div className="p-1 rounded-md bg-web-red text-white ">下架商品 Remove</div>
                                            
                                        </button>
                                        
                                    </div>
                                </div>
                                
                            </div>

                            
                        </div>
                        
                    </div>
                    
                    <div className="">
                        <div className="">Reminders</div>
                    </div>
                    
                </div>
            ):(
            <Loader size="lg" content={<LoadingContent/>} />
            )}
        </div>
        
    )
}

export default EditProduct