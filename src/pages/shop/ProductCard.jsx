import React from 'react'
import { useNavigate } from 'react-router-dom'
import { twcolorMap } from '../../utils/colorFunction'
import { useStaticInfo } from '../../components/Contexts/InfoContexts'

function ProductCard({product}) {
    const navigate = useNavigate()
    const {SocMap} = useStaticInfo()
    const prices = product.product_list.map(subprods=>{return subprods.price})
    const minPrice = Math.min(...prices)
    const maxPrice = Math.max(...prices)
  return (
    <div>
        <div className="Product shadow rounded p-1 bg-apple-gray "> 
            <div className=" flex flex-col justify-center items-center gap-1">
                <button
                onClick={(e)=>{navigate(`/shop/product/${product.sku}`)}}
                >
                <img 
                    src     = {product.product_img_url[0]||"/assests/img/imgplaceholder.jpg"}
                    alt     = {product.product_name}
                    width   = {200}
                    height  = {200}
                    className = "object-contain rounded-xl w-full aspect-square"
                />
                </button>
                <div className="w-full flex flex-row gap-2 ">
                    
                <div className="w-full flex flex-row gap-2 overflow-hidden">
                    {
                    product.product_list.map(subprod=>{
                        // const col = Math.round(Math.random()*9)*100
                        // const [bgColor,textColor]= generateRandomTwBgnTextColor()
                        // const index = Math.round(Math.random()*9)
                        // console.log(getRandomColorString[col]) //${bgColor} ${textColor}
                        
                        return (
                        <div className={`rounded px-0.5 text-xs whitespace-nowrap  ${twcolorMap[subprod.name]?twcolorMap[subprod.name]:twcolorMap["other"]} `}>{subprod.name}</div>
                        )
                    })
                    }
                </div>
                </div>
                <div className="w-full flex flex-row justify-start">
                <div className='text-xs'>{SocMap[product.code].society_chinese}</div>
                </div>
                <div className="w-full flex flex-row justify-start">
                <div className='text-xs'>{product.product_name_chi}</div>
                </div>
                <div className="w-full flex flex-row justify-start text-xs">
                    {minPrice===maxPrice?`HKD $${minPrice}`:`HKD $${minPrice}-${maxPrice}`}
                </div>
                
                
                
            </div>
                
            </div>
    </div>
  )
}

export default ProductCard