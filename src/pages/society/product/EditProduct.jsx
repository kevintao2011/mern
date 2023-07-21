import React,{useEffect, useState} from 'react'
import { useParams , useNavigate, useLocation} from 'react-router-dom'
import { storage,uploadFormImageFiles,uploadFile } from '../../../utils/firebasefunction'
import { auth } from '../../../utils/firebasefunction'
const EditProduct = () => {

  const {code,id} = useParams()
  const location = useLocation();
  const [Product, setProduct] = useState()
  const [CatOption, setCatOption] = useState()

  const Inputblock = (props) => {
        const index = props.index
        const value = props.value
        const [defaultValue, setdefaultValue] = useState()
        if (props.value){
            setdefaultValue(value)
        }
        console.log("index",index)

        return(
           
            <div className="" key={index}>
                <div className="flex flex-row py-2 justify-between">
                    <label htmlFor="variant" className="w-full block mb-2 text-lg font-medium greentxt justify-self-start">
                        option
                    </label>
                    <span className='px-5'></span>
                    {
                        defaultValue?(
                            <input 
                                type="text"
                                name="variant" 
                                id="variant"  
                                required="required" 
                                defaultValue={defaultValue}
                                className='rounded-md px-5 w-full justify-self-center'
                            />
                        ):
                        (
                            <input 
                                type="text"
                                name="variant" 
                                id="variant"  
                                required="required" 
                                className='rounded-md px-5 w-full justify-self-center'
                            />
                        )
                    }
                    
                </div>
            <div className="flex flex-row py-2 justify-between">
                <label htmlFor="price" className="w-full block mb-2 text-lg font-medium greentxt justify-self-start">
                    price
                </label>
                <span className='px-5'></span>
                <input 
                    type="number"
                    name="price" 
                    id="price"  
                    required="required" 
                    className='rounded-md px-5 w-full justify-self-center'
                />
            </div>
            <div className="flex flex-row py-2 justify-between">
                <label htmlFor="inventory" className="w-full block mb-2 text-lg font-medium greentxt justify-self-start">
                    Inventory
                </label>
                <span className='px-5'></span>
                <input 
                    type="number"
                    name="inventory" 
                    id="inventory"  
                    required="required" 
                    className='rounded-md px-5 w-full justify-self-center'
                />
            </div>
                
            </div>
            
            
        )
    }
  
  useEffect(() => {
    setProduct(location.state.Product.filter(item=>
        item._id===id
    ));
    async function getCatOption(){
      await fetch('/api/getcatoption', { 
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
              
              console.log("fetched CatOptions")
              var data = await response.json()
              data = data[0]
              console.log("CatOptions",data)
              setCatOption(data.categories)
              console.log("CatOptions",CatOption)
              
          }else{
              console.log("response.body",await response.json())
              const data = await response.json()
              console.log("data.error",data)
              setCatOption(data)
              
          }  
      })
    }

    getCatOption()
    console.log(id)
    console.log("Product",Product)
  
    
  }, [])
  
  return (
    <div className="mainpage-1 flex flex-col ">
      <div>EditProduct</div>
      {
        CatOption&&Product?.map(details=>{
          return(
            <div className="">
           
              <form action="">

                <div className="flex flex-row py-2 justify-between">
                    <label htmlFor="product_name" className="w-full block mb-2 text-lg font-medium greentxt justify-self-start">
                        Product Name
                    </label>
                    <span className='px-5'></span>
                    <input 
                        type="text"
                        name="product_name" 
                        id="product_name"  
                        required="required" 
                        className='rounded-md px-5 w-full justify-self-center'
                        defaultValue={details.product_name}
                    />
                    
                
                </div>

                <div className="flex flex-row py-2 justify-between">
                    <label htmlFor="type" className="w-full block mb-2 text-lg font-medium greentxt justify-self-start" >
                        Product Category
                    </label>
                    <span className='px-5'></span>
                    
                    <select 
                        name="type" 
                        id="type"
                        required="required" 
                        className='rounded-md px-5 w-full justify-self-center'
                        defaultValue={Product[0].type}
                        // onChange={(e)=>{setCategory(e.target.value);}}
                    >
                        {CatOption.map(option=>{
                            return(
                                <option value={option}>{option}</option>
                            )
                        })}
                        
                        
                    </select>
                
                </div>
                
              </form>
            </div>
            
          )
        })
      }
    </div>
    
  )
}

export default EditProduct