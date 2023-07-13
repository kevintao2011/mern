import React,{useEffect, useState} from 'react'
import { useAuth } from '../../components/session'
import { auth } from '../../utils/firebasefunction'
const Shop = () => {
  const {userDBInfo} = useAuth()
  console.log(userDBInfo)
  const [Category, setCategory] = useState()
  const [ProductReference, setProductReference] = useState()
  const [Products, setProducts] = useState([])
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

  async function loadProduct(fetchOptions){
    if (!fetchOptions){
      
    }
  }

  useEffect(() => {
    getCategory()
    loadProduct()
    return () => {
      
    }
  }, [])
  
  return (
    
    
    <div className="flex flex-row mainpage-1">

      <div className="LHS flex flex-col p-10">
        <img 
          src="assests\img\shop\sorting.png" 
          alt="" 
        />
      {Category?.map(cat=>{
        return(
          <button className='selectlink pt-2 pl-2 self-start' value={cat} onClick={()=>{setProductReference(cat)}}>
            {cat}
          </button>
          
        )
      })}
      

      </div>
      <div className="RHS">
        {
          
        }
      </div>
    </div>
  )
}

export default Shop