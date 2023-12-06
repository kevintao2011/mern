import React, { useEffect,useRef,useState } from 'react'
import { useParams } from 'react-router-dom'
import { useAuth } from '../../components/session'
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
    const [Filter, setFilter] = useState([])
    const [displaySubProduct, setdisplaySubProduct] = useState([])
    const [NumberOfVariant, setNumberOfVariant] = useState() //NumberOfVariant
    const [Quantity, setQuantity] = useState(0)
    const [CurrentImageURL, setCurrentImageURL] = useState()
    const {SocMap} = useStaticInfo()

    function updateFilter(selectedLabels,i){
        console.log(i,"ori",Filter[i],"label to be insert",selectedLabels)//bug
        const arr = Filter
        arr[i]=selectedLabels
        console.log("Filter to be set",Filter)
        setFilter([...arr])
    }
    useEffect(() => {
        console.log("Filter updated")
        console.log("Filter updated")
        if(Filter!==undefined){
            console.log("Filter Str",Filter)
            //1.flatten label group into arr of labels
            var filters = []
            Filter.forEach((labelIndexGroup,i)=>{
                // if(labelIndexGroup.length>0){
                //     labelIndexGroup.forEach(index=>{
                //         console.log("add to filters",ProductInfo.options[i]['option'][index])
                //         filters.push(ProductInfo.options[i]['option'][index])
                //     })
                // }
                labelIndexGroup.forEach(index=>{
                    console.log(i,index,"add to filters",ProductInfo.options[i]['option'][index])
                    filters.push(ProductInfo.options[i]['option'][index])
                })
            })
            console.log('filters',filters)
            if(filters.length<1){
                setdisplaySubProduct(SubProducts)
            }else{
                setdisplaySubProduct(SubProducts.filter(subprod=>{
                    if(()=>{
                        subprod.name.split(" ").forEach(str=>{
                            return filters.includes(str)
                        })
                        return false
                    }){
                        return true
                    }else{
                        return false
                    }
                }))
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
    

    function SelectedButton({onUpdate=()=>{return false},label=""}){//Selected=false,
        const [Checked, setChecked] = useState(false)
        const firstLoad = useRef(true)
        useEffect(() => {
            if(!firstLoad.current){
                onUpdate(Checked);
                toast(Checked?"true":"false")
            }
            firstLoad.current = false
        }, [Checked])
        useEffect(() => {
            console.log("SelectedButton Rendered")
        }, [])
        
        
        return(
            <button 
                className={`${Checked?"bg-btn-blue text-white":"bg-gray-200"}  p-1 rounded-md w-fit`}
                onClick={()=>{
                    setChecked(prev=>!prev);
                }}
            >
                {label}
            </button>
        )
    }
    function SelectButtonGroup({Option,onChange=()=>{return []}}) { //Group of Select Button
        const [SelectedIndex, setSelectedIndex] = useState([])// should be in shape of ["label",....]
        const firstLoad = useRef(true)
        useEffect(() => {
            if(!firstLoad.current){
                console.log("Button gps",SelectedIndex)
                onChange(SelectedIndex)
            }
            firstLoad.current=false

        }, [SelectedIndex])
        return (
            
                <div className="">
                <div className="font-bold">{Option.text}</div>
                <div className="flex flex-row gap-2">
                    {
                        Option.option.map((op,i)=>{
                            if(SelectedIndex.includes(i)){
                                console.log(op,"is selected")
                            }else{
                                console.log(op,"is not selected")
                            }
                            return (
                                <SelectedButton 
                                    label={op} 
                                    // Selected={SelectedIndex.includes(i)}
                                    onUpdate={
                                        (selected)=>{
                                            console.log("toogled")
                                            if(selected){
                                                SelectedIndex.push(i);
                                                setSelectedIndex([...SelectedIndex])
                                                console.log("added",SelectedIndex)
                                            }
                                            else{
                                                setSelectedIndex(SelectedIndex.filter(index=>{
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
    

    async function addToCart (product){
        // {
        //     _id:ProductInfo._id,
        //     option:SubProducts[SelectedOption].name,
        //     quantity:Quantity
        // }
        var TempCart
        
        console.log(Cart)
        var duplicate = false
        if(product.quantity===0){
            product.quantity=1
        }
        Cart.forEach((i,index) => {
            if (i._id === product._id && (i.option === product.option)){
                Cart[index]["quantity"]=parseInt(i.quantity)+parseInt(product.quantity)
                duplicate = true
                setCart(Cart)
                TempCart = Cart
                
                return
            }
            
        });

        
        if (!duplicate){
            
            setCart([...Cart,product])
            TempCart = [...Cart,product]
            
        }
        console.log(Cart)
        
        sessionStorage.setItem("Cart",JSON.stringify({[currentUser.email]:TempCart}))
        console.log("session",JSON.parse(sessionStorage.getItem("Cart")))
        
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
                        <div className=" flex flex-col gap-2">
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
                            <div className="text-lg font-bold">
                                Options 選項
                            </div>
                            <div className="grid grid-cols-2 gap-2">
                                {ProductInfo.options.map((opt,i)=>{
                                    return(
                                        <SelectButtonGroup Option={opt} onChange={(selectedLabels)=>{//selectedIndexs={Filter[i]}
                                            // console.log(i,"ori",Filter[i],"label to be insert",selectedLabels)//bug
                                            // const arr = Filter
                                            // arr[i]=selectedLabels
                                            // console.log("Filter to be set",Filter)
                                            // setFilter([...arr])
                                            updateFilter(selectedLabels,i)
                                        }}/>
                                     
                                    )
                                    // return(
                                        
                                    // )
                                })}
                            </div>
                            <div className="">
                                <div className="text-lg font-bold">產品 Product</div>
                                <div className="grid grid-cols-3 gap-2">
                                {
                                    displaySubProduct?.map((subproduct,i)=>{
                                        return(
                                            // <div className="">{subproduct.name}</div>
                                            <button className='bg-web-green p-1 rounded-md text-white'>{subproduct.name}</button>
                                        )
                                    })
                                }
                                </div>
                                
                            </div>
                            <div className="flex flex-col">
                                <div className="">已選</div>
                                {
                                    Filter?.map(group=>{
                                        return(
                                            <div className="">
                                                Selected {
                                                    group.map(label=>{
                                                        return label
                                                    })
                                                }
                                            </div>
                                        )
                                        
                                    })
                                }
                            </div>
                        </div>
                    </div>
                </div>
                
            }
            <div className="text-lg font-bold">
                類似產品
            </div>
        </div>
        )
        
    )
}

export default Product