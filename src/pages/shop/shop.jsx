import React,{useEffect, useState} from 'react'
import { useAuth } from '../../components/Contexts/session'
import { auth } from '../../utils/firebasefunction'
import { useNavigate } from 'react-router-dom'
import { postURL } from '../../utils/fetch'
import SearchTool from '../../components/table/SearchTool'
import { generateRandomTwBgnTextColor,getRandomColorString,twcolorMap } from '../../utils/colorFunction'
import { SearchBar } from 'rsuite/esm/Picker'
import SearchIcon from '@rsuite/icons/Search';
import { useStaticInfo } from '../../components/Contexts/InfoContexts'
import ProductCard from './ProductCard'
import ThemeText from '../../components/Text Decoration/ThemeText'
import { Carousel, Dropdown ,Pagination} from 'rsuite'
import { toast } from 'sonner'

const Shop = () => {
  const {userDBInfo} = useAuth()
  console.log(userDBInfo)
  const [Category, setCategory] = useState()
  const [ProductReference, setProductReference] = useState()
  const [Products, setProducts] = useState([])
  const [displayProduct, setdisplayProduct] = useState()
  const {currentUser} = useAuth()
  const navigate = useNavigate()
  const [CurrentPage, setCurrentPage] = useState(0)
  const [MaxPage, setMaxPage] = useState(0)
  const [IPP, setIPP] = useState(10)
  const [Pages, setPages] = useState([])
  const {SocMap} = useStaticInfo()
  async function getCategory(){
    await postURL('/api/getshopcategory',true,{major:currentUser.major}).then(r=>{
      if(r.success){
        setCategory(r.data)
        console.log("cats:",r.data)
      }
    })
    
  }
  useEffect(() => {
    toast(MaxPage.toString())
  }, [MaxPage])
  useEffect(() => {
    loadProduct(CurrentPage,IPP)
  }, [IPP])
  
    // if (!fetchOption){ //load all product
    //   fetchOption="all"
    // }
    // await fetch(
    //   `/api/geshopproducts`,
    //   {
    //     method: "POST",
    //     body: JSON.stringify({}),
    //     headers: {
    //     "Content-Type": "application/json",
    //     },
    //     mode:'cors'
    //   }
    // ).then(async products=>{
    //   const data = await products.json()
    //   console.log("Products:",data.products)
    //   setProducts(data.products)
    //   setdisplayProduct(data.products)
    // })
  async function loadProduct(page,ipp){

    await postURL(`/api/getshopproducts`,true,{page:page,ipp:ipp}).then(result=>{
      if(result.success){
        setProducts(result.data.products)
        setdisplayProduct(result.data.products)//(result.data.products.slice((CurrentPage)*IPP,(CurrentPage)*IPP+IPP))
        console.log(page,"result.data.maxPage",result.data.maxPage)
        console.log("result.data.products",result.data.products)
        setMaxPage(result.data.maxPage)
        setCurrentPage(page)
        // const arr = []
        // for (let index = 0; index < result.data.maxPage; index++) {
        //   arr.push(index)
        // }
        // setPages(arr)
      }else{

      }
  })}
  
  function loadpages(nextPageIndex){
    setCurrentPage(nextPageIndex-1)
    toast((nextPageIndex-1)*IPP)
    setdisplayProduct(Products.slice((nextPageIndex-1)*IPP,(nextPageIndex-1)*IPP+IPP))
  }

  useEffect(() => {
    getCategory()
    loadProduct(CurrentPage,IPP)
    return () => {
    }
  }, [])

  useEffect(()=>{
    if(ProductReference!=="all"){
      setdisplayProduct(Products.filter(p=>(p.type===ProductReference&&p.status==="active")))
      console.log("displayProduct",displayProduct)
    }else{
      setdisplayProduct(Products)
    }
  }, [ProductReference])
  
  return (
    
    
    <div className="flex flex-col mainpage font-mincho gap-4">
      
      {/* <div className="h-60 aspect-video w-full p-2 rounded  flex flex-row justify-center">
        
      </div> */}
      {/* <img src="/assests/img/shop/DummyBanner.jpg" alt="" className='h-full '/> backgroundColor:"#fff",*/}
      <div className="flex flex-row justify-center">
        
          <Carousel autoplay shape='bar'>
            <img src="/assests/img/shop/DummyBanner.jpg" alt='1' className='object-contain 'style={{backgroundColor:"#fff",width:"transparent"}}/>
            <img src="/assests/img/shop/DummyBanner.jpg" alt='2' className='object-contain 'style={{backgroundColor:"#fff",width:"transparent"}}/>
          </Carousel>
       
      </div>
      <div className="flex flex-row">
        <div className="LHS flex flex-col  md:p-5 ">
          {/* <img 
            src="assests\img\shop\sorting.png" 
            alt="" 
          /> */}
          
          <ThemeText RedText='分類' GreenText='Category' className='text-md font-bold'/>
          <div className="grid md:grid-cols-1 grid-cols-2 grid-flow-row">
          <button className='md:pt-2 md:pl-2 text-start' value="all" onClick={()=>{setProductReference("all")}}>
            all
          </button>
          {Category?.map(category=>{
            const kv = Object.entries(category)[0]
            console.log(category,kv[0],Object.entries(category))
            return(
              <button className=' md:pt-2 md:pl-2 text-start text-sm' value={kv[1]} onClick={(e)=>{setProductReference(e.target.value)}}>
                {kv[0]}
              </button>
            
            )
          })}
          </div>  
        

        </div>
        <div className="RHS w-full flex flex-col gap-1 pr-5">
          {/* <div className="flex flex-row  justify-center">
            <p className='selectlink text-3xl p-5'>Product</p>
          </div> */}
          <div className="rounded-md  w-full p-2 flex flex-col gap-2 ">
            <div className="flex flex-row">
              <ThemeText RedText='搜尋' GreenText='商品' className='text-md font-bold'/>
              <div className="">Search Product</div>
            </div>
            <div className="w-full rounded-lg shadow border flex flex-row justify-between">
                <input type="text" className='w-full rounded-md'/>
                {/* <SearchIcon size="3em"/> */}
            </div>
            <div className="text-xs flex flex-row justify-between">
              <div className="">
                分類 
                {Category?.map(category=>{
                const kv = Object.entries(category)[0]
                console.log(category,kv[0],Object.entries(category))
                return(
                  <>
                  <button className=' text-start' value={kv[1]} onClick={(e)=>{setProductReference(e.target.value)}}>
                    {`${kv[0]}`}
                  </button>
                  
                  </>
                )
                })}
              </div>

              <div className="">
              <Dropdown title="Items" size='xs' onSelect={(s,e)=>{setIPP(s)}}>
                <Dropdown.Item value={10}  onClick={(e)=>{toast(e.target.value);setIPP(e.target.value)}}>10 Items</Dropdown.Item>
                <Dropdown.Item value={20} onClick={(e)=>{toast(e.target.value);setIPP(e.target.value)}}>20 Items</Dropdown.Item>
                <Dropdown.Item value={30} onClick={(e)=>{toast(e.target.value);setIPP(e.target.value)}}>30 Items</Dropdown.Item>
              </Dropdown>
              </div>
              
            </div>
          </div>
          
          <div className="grid xl:grid-cols-6 md:grid-cols-5  grid-cols-2 grid-flow-row gap-5 ">
            {
              displayProduct?.map(product=>{
                return(
                  <ProductCard product={product}/>
                )
              })
            }

          </div>
          <div className="flex flex-row w-full justify-center pt-4 pb-10">
            {/* <button className='border bg-white-600 rounded'> {"<"} </button>
            {
              Pages.map(index=>{
                return(
                  
                  <button
                    className={`p-1 border  ${(index===CurrentPage)?'bg-white-200':'bg-white-600'} ${index===0?'rounded-s-sm':index===(MaxPage-1)?'rounded-e-sm':''}`}
                  >
                    {index+1}
                  </button>
                )
              })
            }
            <button>{">"}</button> */}
            <Pagination
              prev
              last
              next
              first
              size="md"
              total={(MaxPage+1)*IPP}
              limit={IPP}
              activePage={CurrentPage+1}
              onChangePage={e=>{loadProduct(e-1,IPP)}}
            />
          </div>
          {/* <div className="flex overflow-x-auto sm:justify-center">
              <Pagination  currentPage={CurrentPage} totalPages={MaxPage+1} onPageChange={()=>{}} showIcons />
            </div> */}
          
          
        </div>
      </div>
      
    </div>
  )
}

export default Shop