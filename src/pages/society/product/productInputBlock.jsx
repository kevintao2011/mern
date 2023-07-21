import { useState } from "react"


export const Inputblock = (props) => {
    const index = props.index
    const value = props.value
    const [defaultValue, setdefaultValue] = useState()
    if (props.value){
        setdefaultValue(value)
    }
    console.log("index",index)

    return(
       
        <div className="border-su-green border-dashed border-y-2" key={index}>
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