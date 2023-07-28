import React,{useEffect, useState} from 'react'
import { useAuth } from '../../components/session'
import { auth } from '../../utils/firebasefunction'
const Shop = () => {
  const {userDBInfo} = useAuth()
  console.log(userDBInfo)
  const [Category, setCategory] = useState()
  const [ProductReference, setProductReference] = useState()
  const [Products, setProducts] = useState([])
  const [displayProduct, setdisplayProduct] = useState()
  const {currentUser} = useAuth()
  async function getCategory(){
    await fetch('/api/getcatoption', { 
        method: "POST",
        body: JSON.stringify({
            user:{
                token:await auth.currentUser.getIdToken()
            },
            data:{
              major:currentUser.major
            }
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
            const data = await response.json()
            console.log("Category",data[0].categories)
            setCategory(data[0].categories)
            
            
        }else{
            console.log("response.body",await response.json())
            const data = await response.json()
            console.log("Category",data)
            setCategory(data)
            
        }  
    })
    
    
  }
  
  async function loadProduct(fetchOption){
    if (!fetchOption){ //load all product
      fetchOption="all"
    }
    // const belongSoc = currentUser.societies.map(soc=>{
    //   return [soc]
    // })
    // const reqbody = {
    //   user:{
    //     token:await auth.currentUser.getIdToken()
    //   },
    //   filter:{
    //     societies:belongSoc,
    //     category:fetchOption 
    //   }
    // }

    await fetch(
      `/api/getproducts`,
      {
        method: "POST",
        body: JSON.stringify({}),
        headers: {
        "Content-Type": "application/json",
        },
        mode:'cors'
      }
    ).then(async products=>{
      const data = await products.json()
      console.log("Products:",data.products)
      setProducts(data.products)
      setdisplayProduct(data.products)
    })
  }

  useEffect(() => {
    getCategory()
    loadProduct()
    return () => {
    }
  }, [])

  useEffect(()=>{
    if(ProductReference!=="all"){
      setdisplayProduct(Products.filter(p=>p.type===ProductReference))
    }else{
      setdisplayProduct(Products)
    }
  }, [ProductReference])
  
  return (
    
    
    <div className="flex flex-row mainpage-1">

      <div className="LHS flex flex-col p-10">
        <img 
          src="assests\img\shop\sorting.png" 
          alt="" 
        />
        <button className='selectlink pt-2 pl-2 self-start' value="all" onClick={()=>{setProductReference("all")}}>
          all
        </button>
        {Category?.map(cat=>{
          return(
            <button className='selectlink pt-2 pl-2 self-start' value={cat} onClick={()=>{setProductReference(cat)}}>
              {cat}
            </button>
          
          )
      })}
      

      </div>
      <div className="RHS w-full">
        <div className="flex flex-row  justify-center">
          <p className='selectlink text-3xl p-5'>Product</p>
        </div>
        <div className="grid grid-cols-4 grid-flow-row">
          {
            displayProduct?.map(product=>{
              return(
                <div className="Product">
                  {
                    product.product_icon?(
                      <div className="ProductCard p-2 flex flex-col justify-center items-center">
                          <img 
                            src     = {product.product_icon}
                            alt     = "promptation logo"
                            width   = {200}
                            height  = {200}
                            className = "object-contain rounded-xl"
                          />
                          <div className="justify-center">
                            <p>{product.product_name}</p>
                          </div>
                      </div>
                    ):(
                      <div className="ProductCard p-2 flex flex-col justify-center items-center">
                          <img 
                            src     = "/assests/img/imgplaceholder.jpg"
                            alt     = "promptation logo"
                            width   = {200}
                            height  = {200}
                            className = "object-contain rounded-xl"
                          />
                          <div className="flex flex-row justify-center">
                            <p>{product.product_name}</p>
                          </div>
                      </div>
                    )
                    
                  }
                </div>
              )
            })
          }

        </div>
        
      </div>
    </div>
  )
}

export default Shop