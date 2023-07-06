import React from "react";
import { Link ,useNavigate} from "react-router-dom";
export default function DropdownComponent(props) {
    const items = props.items
    const title = props.title
    const show = props.show
    const navigate = useNavigate()
    console.log("show",show)
    return (
        <div className="w-full flex flex-col appearance-none  ">
            {/* <Link 
                to="/"
                className="flex-col  selectlink "
                onClick={()=>{
                    console.log("moved")
                    
                }}
                
                
            >
                {title}
                
                
            </Link> */}
            <p className="flex-col  selectlink ">
                {title}
            </p>
            
            {show&&items?.map(item=>{
                console.log("item",item)
                    const code = Object.keys(item)[0]
                    return(
                        <button className="selectlink" onClick={()=>{navigate({code})}}>
                            {code}
                        </button>
                        
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
