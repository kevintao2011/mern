import React from 'react'
import { SelectPicker } from 'rsuite'



function RolesField({subprods,onChange}) {
    console.log("subprods",subprods)
    return (
        <div className="">
            <div className="grid grid-cols-3 gap-2">
                <div className="">
                    Role
                </div>
                <div className="">
                    Price
                </div>
                <div className="">
                    Quantity
                </div>
                {
                    subprods.map((subprod,i)=>{
                        return(
                        <>
                            <input type="text" defaultValue={subprod.name} name="" id="" onChange={(e)=>{subprods[i].name=e.target.value;onChange(subprods)}}/>
                            <input type="number" defaultValue={subprod.price} name="" id="" onChange={(e)=>{subprods[i].price=e.target.value;onChange(subprods)}}/>
                            <input type="number" defaultValue={subprod.quantity} name="" id=""onChange={(e)=>{subprods[i].quantity=parseInt(e.target.value);onChange(subprods)}}/>  
                        </>
                        )
                    })
                }
                <div className=""></div>
                <button 
                    className="w-full bg-blue-600 text-center text-white rounded-md"
                    onClick={()=>{subprods.push({name:"",price:0,quantity:0});onChange(subprods)}}
                >
                    Add
                </button>
                <div className=""></div>
            </div>
        </div>
    )
}

export default RolesField