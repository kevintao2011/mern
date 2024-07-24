import React, { useEffect,useRef,useState } from 'react'
import { useParams } from 'react-router-dom'
import { useAuth } from '../../components/Contexts/session'
import { postURL } from '../../utils/fetch'
import { toast } from 'sonner'
import { useStaticInfo } from '../../components/Contexts/InfoContexts'
import { Toggle } from 'rsuite'

const Product = () => {
    const{sku}= useParams()
    const{currentUser,Soc,Cart,setCart}= useAuth()
    const [ProductInfo, setProductInfo] = useState() // product info
    const [SubProducts, setSubProducts] = useState() //array of vars
    const [SelectedOption, setSelectedOption] = useState(0) //chosen index inside SubProducts List not product index
    const [Filter, setFilter] = useState()
    const [displaySubProduct, setdisplaySubProduct] = useState([])
    const [Quantity, setQuantity] = useState(0)
    const [CurrentImageURL, setCurrentImageURL] = useState()
    const {SocMap} = useStaticInfo()
    const [SelectedProduct, setSelectedProduct] = useState()

    function updateFilter(selectedLabels,i){
        console.log(i,"ori",Filter[i],"label to be insert",selectedLabels)//bug
        const arr = Filter
        arr[i]=selectedLabels
        console.log("Filter to be set",Filter)
        setFilter([...arr])
    }

    useEffect(() => {
        setSelectedProduct()
        console.log("Filter updated")
        if(Filter!==undefined){
            console.log("Filter ",Filter)
            //1.flatten label group into arr of labels
            var filters = []
            console.log(ProductInfo.options)
            Filter.forEach((labelIndexGroup,i)=>{
                labelIndexGroup.forEach(index=>{
                    //console.log(i,index,"add to filters",ProductInfo.options[i]['option'][index])
                    filters.push(ProductInfo.options[i]['option'][index])
                })
            })
            console.log('filters',filters)

            //2. generate all possible options for the product options
            function recursiveFilter(subproducts,filters){
                if(filters.length<1){
                    return subproducts
                }else{
                    const arr =subproducts.filter(subprod=>{
                        if (subprod.name.split(" ").some(str => filters[0]===str)) {
                            return true;
                        } else {
                            return false;
                        }
                    })
                    console.log("arr after",arr)
                    filters.shift()
                    console.log("filters",filters)
                    return recursiveFilter(arr,filters)
                }
            }
            if(filters.length<1){
                console.log("display all products",SubProducts)
                setdisplaySubProduct(SubProducts)
            }else{
                setdisplaySubProduct(recursiveFilter(SubProducts,filters))
            }
        }
        
    }, [Filter])
    useEffect(() => {
        if(ProductInfo!==undefined){
            setSubProducts(ProductInfo.product_list)
            setdisplaySubProduct(ProductInfo.product_list)
            var arr=[]
            ProductInfo.options.forEach(opt=>{
                arr.push([])
            })
            console.log("init filter",arr)
            setFilter(arr)
        }
    }, [ProductInfo])
    

    function SelectedButton({Selected=false,onUpdate=()=>{return false},label=""}){
        useEffect(() => {
            console.log("SelectedButton Rendered")
        }, [])
        return(
            <button 
                className={`${Selected?"bg-btn-blue text-white":"bg-gray-200"}  p-1 rounded-md w-fit`}
                onClick={()=>{
                    onUpdate(!Selected)
                }}
            >
                {label}
            </button>
        )
    }
    function SelectButtonGroup({Option,selectedIndexs,onChange=()=>{return []}}) { //Group of Select Button
        // should be in shape of ["label",....]

        return (
                <div className="">
                <div className="font-bold">{Option.text}</div>
                <div className="flex flex-row gap-2">
                    {
                        Option.option.map((op,i)=>{
                            if(selectedIndexs.includes(i)){
                                console.log(op,"is selected")
                            }else{
                                console.log(op,"is not selected")
                            }
                            return (
                                <SelectedButton 
                                    label={op} 
                                    Selected={selectedIndexs.includes(i)}
                                    onUpdate={
                                        (selected)=>{
                                            console.log("toogled")
                                            if(selected){
                                                selectedIndexs.push(i);
                                                console.log("selected",selectedIndexs)
                                                onChange(selectedIndexs)
                                            }
                                            else{
                                                onChange(selectedIndexs.filter(index=>{
                                                    console.log("remove")
                                                    return index!==i
                                                }))
                                                
                                            }
                                        }
                                    }
                                />
                            )
                        })
                    }
                </div>
            </div>
            
        )
    }
    

    // async function addToCart (product){
    //     // {
    //     //     _id:ProductInfo._id,
    //     //     option:SubProducts[SelectedOption].name,
    //     //     quantity:Quantity
    //     // }
    //     var TempCart
        
    //     console.log(Cart)
    //     var duplicate = false
    //     if(product.quantity===0){
    //         product.quantity=1
    //     }
    //     Cart.forEach((i,index) => {
    //         if (i._id === product._id && (i.option === product.option)){
    //             Cart[index]["quantity"]=parseInt(i.quantity)+parseInt(product.quantity)
    //             duplicate = true
    //             setCart(Cart)
    //             TempCart = Cart
                
    //             return
    //         }
            
    //     });

        
    //     if (!duplicate){
            
    //         setCart([...Cart,product])
    //         TempCart = [...Cart,product]
            
    //     }
    //     console.log(Cart)
        
    //     sessionStorage.setItem("Cart",JSON.stringify({[currentUser.email]:TempCart}))
    //     console.log("session",JSON.parse(sessionStorage.getItem("Cart")))
        
    // }
    async function addToCart(productsku){
        console.log(productsku)
        await postURL('/api/addtocart',true,{sku:SelectedProduct.sku,quantity:1}).then(result=>{
            
            if(result.success){
                console.log("added",result)
            }else{
                console.log("not added")
            }
        })
    }
    useEffect(() => {
        async function fetchProductInfo (){
            
            await postURL ("/api/getproduct",true,{sku:sku}).then(result=>{
                if(result.success){
                    console.log("fetched product")
                    // const product = result.data
                    // console.log("product Info",product)
                    
                    setProductInfo (result.data)
                    setCurrentImageURL(result.data.product_img_url[0])
                    // const a = product.product_list
                    // console.log("a")
                    // setNumberOfVariant(a.length)
                    // setSubProducts(product.product_list)
                }else{
                    toast.error(result.data)
                }
            })
                
            
        }
        fetchProductInfo()
        
    }, [])
    
    return (
        ProductInfo&&(
        <div className="w-full flex flex-col p-5 font-mincho">
            {
                
                <div className="flex flex-row w-full gap-5 bg-apple-gray p-5 rounded-md">
                    <div className="w-1/2 gallary flex flex-col gap-5 ">
                        <div className="flex flex-row justify-center">
                            <img 
                                src={CurrentImageURL||"/assests/img/imgplaceholder.jpg"} 
                                alt="" 
                                className='rounded-md max-w-md aspect-square fade-in-image'
                            
                            />
                        </div>
                        <div className="flex flex-row justify-between">
                            <div className=""></div>
                            <div className="flex flex-row gap-2">
                            {ProductInfo.product_img_url.map(url=>{
                                return(
                                    <img 
                                        src={url||"/assests/img/imgplaceholder.jpg"} 
                                        alt="" 
                                        className='rounded-md fade-in-image'
                                        width={100}
                                        onClick={(()=>{setCurrentImageURL(url);})}
                                        
                                    />
                                )
                            })}
                            </div>
                            <div className=""></div>
                        </div>
                    </div>
                    <div className="w-1/2 product-description  p-2 rounded-md">
                        <div className=" flex flex-col gap-5">
                            {/* <div className="">
                                {SocMap[ProductInfo]}
                            </div> */}
                            
                            <div className="text-lg font-bold ">
                                {`${ProductInfo.sku} ${ProductInfo.product_name_chi}`}
                            </div>
                            <div className="">
                                <div className="text-lg font-bold">產品介紹</div>
                                <pre className="pl-2">{ProductInfo.product_description_chi}</pre>
                            </div>
                            <div className="flex flex-col gap-2">
                                <div className="text-lg font-bold">
                                    Options 選項
                                </div>
                                {
                                    Filter&&(
                                        <div className="grid grid-cols-2 gap-2">
                                            {ProductInfo.options.map((opt,i)=>{
                                                return(
                                                    <SelectButtonGroup 
                                                        Option={opt}
                                                        selectedIndexs={Filter[i]} 
                                                        onChange={(selectedLabels)=>{
                                                            updateFilter(selectedLabels,i)
                                                        }
                                                    }/>
                                                
                                                )
                                                // return(
                                                    
                                                // )
                                            })}
                                        </div>
                                    )
                                }
                                <div className="flex flex-col">
                                    <div className="">已選 Selected Filter </div>
                                    <div className="flex flex-row gap-2">
                                        {
                                            Filter?.map((group,optionsIndexs)=>{
                                                return(
                                                    <div className="flex flex-row gap-2">
                                                        {
                                                            group.map((index,optionIndex)=>{
                                                                return <div className="rounded-md bg-btn-blue px-1 py-0.5 text-white">{ProductInfo.options[optionsIndexs]['option'][index]}</div>
                                                            })
                                                        }
                                                    </div>
                                                )
                                                
                                            })
                                        }
                                    </div>
                                </div>
                            </div>
                            
                            <div className="">
                                <div className="text-lg font-bold">產品 Product</div>
                                <div className="grid grid-cols-4 gap-2">
                                {
                                    displaySubProduct?.map((subproduct,i)=>{
                                        return(
                                            // <div className="">{subproduct.name}</div>
                                            <button 
                                                className={`bg-white  p-1 rounded-md text-gray-600 border-2 flex flex-row justify-center ${subproduct.name===SelectedProduct?.name?'border-sky-600 border-2':''}`}
                                                onClick={()=>{
                                                    console.log(subproduct)
                                                    if(subproduct.name!==SelectedProduct?.name){
                                                        setSelectedProduct(subproduct)
                                                    }
                                                    
                                                }}
                                            >
                                                <div className=" flex flex-row gap-2 justify-between">
                                                    <div className="">
                                                        {subproduct.name}
                                                    </div>
                                                    <div className="">
                                                        {subproduct.price?"":`$${subproduct.price}`}
                                                    </div>
                                                </div>
                                            </button>
                                        )
                                    })
                                }
                                </div>
                                
                            </div>
                            {
                                // SelectedProduct?(
                                //     <div className="w-full flex flex-row justify-center">
                                //         <button className="bg-web-green text-white rounded-md p-1">
                                //             Add To Cart
                                //         </button>
                                //     </div>
                                // ):(
                                //     <div className="w-full flex flex-row justify-center">
                                //         <div className="h-8">
                                //             {}
                                //         </div>
                                //     </div>
                                // )
                                <div className="w-full flex flex-row justify-center">
                                    <button disabled={!SelectedProduct} className="bg-su-green text-white rounded-md p-1 disabled:bg-gray-500"
                                        onClick={()=>{addToCart(SelectedProduct.sku)}}
                                    >
                                        Add To Cart
                                    </button>
                                </div>
                            }
                            
                        </div>
                        <div className="text-lg font-bold">
                            其他產品
                        </div>
                    </div>
                    
                </div>
                
            }
            
        </div>
        )
        
    )
}

export default Product