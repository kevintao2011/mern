import React from "react";
import { Link } from "react-router-dom";
export default function DropdownComponent(props) {
    const items = props.items
    const title = props.title
    const show = props.show
    console.log("show",show)
    return (
        <div className="w-full  appearance-none  ">
            <Link 
                to="/"
                className="flex-col  selectlink "
                onClick={()=>{
                    console.log("moved")
                    
                }}
                
                
            >
                {title}
                
                
            </Link>
            {show&&items?.map(item=>{
                    return(
                        <p className="selectlink ">{item}</p>
                    )
                })
                
            }
            
            {/* <select className="w-full p-2.5 text-su-green bg-white border rounded-md shadow-sm outline-none appearance-none focus:border-indigo-600">
                
                
                {items.map(item=>{
                    return(
                        <option className={item}>{item}</option>
                    )
                })}
            </select> */}
            {/* <select className="w-full p-2.5 text-su-green bg-white border rounded-md shadow-sm outline-none appearance-none focus:border-indigo-600">
                
                
                {items.map(item=>{
                    return(
                        <option className={item}>{item}</option>
                    )
                })}
            </select> */}
        </div>
    );
}
