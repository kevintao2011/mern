

import { useEffect, useState } from "react";
import { Link,Outlet,useLocation,useNavigate } from "react-router-dom";
import { auth } from "../utils/firebasefunction";
import DropdownComponent from "./dropdown";
import { useAuth } from "./Contexts/session";

// from context


// from context
const Nav = () => {
    
    const location = useLocation() //get current path
    const [toggleDropdown, setToggleDropdown] = useState(false);

    
    const navigate = useNavigate();
    
    // from context

    const [CartNumber, setCartNumber] = useState([])

    const {currentUser,userDBInfo,loading,setuserDBInfo,Cart,setCart} = useAuth()

    // from context
    // useEffect(() => {
    //   setCartNumber(Cart?.length)
    // }, [setCart,Cart])

    async function uploadCart(){
        await fetch(
            "/api/uploadcart",
            {
                method:"POST",
                body:JSON.stringify({
                    user:{
                        token:await currentUser.getIdToken()
                    },
                    cart:Cart
                    
                }),
                headers: {
                    "Content-Type": "application/json",
                    // 'Content-Type': 'application/x-www-form-urlencoded',
                    },
                    mode:'cors'
                
            })
            
        
    }

    console.log("location.pathname",location.pathname)
    if(!loading){ //location.pathname==="/"
        return (
            <div className="w-full bg-transparent 
            ">
                  
                <nav className="flex flex-row w-full  justify-between items-center">
                    
                    <div className=" w-1/3 ">
                        <Link  //home
                            to={"/"}
                            className="flex justify-start"

                        >
                            <img src="/assests/img/NavBanner/LinguSuLogo2.png" alt="" className="" width="60rem" height="60rem" />
                            
                            
                        </Link>
                    </div>
                    
                <div className="md:flex md:flex-row w-1/3 justify-center hidden">
                    
                        <div className="">

                        </div>
                        <img 
                        src     ="\assests\img\NavBanner\STUDENTUNION.svg" 
                        alt     = "promptation logo"
                        width   = {200}
                        height  = {100}
                        className = "object-contain "
                        />
                    
                    
                    
                        <img 
                        src     ="\assests\img\NavBanner\LingNam.svg" 
                        alt     = "promptation logo"
                        width   = {150}
                        height  = {100}
                        className = "object-contain px-5"
                        />
                    
                        <img 
                        src     ="\assests\img\NavBanner\LINGNAMUNIVERSITY.svg" 
                        alt     = "promptation logo"
                        width   = {300}
                        height  = {100}
                        className = "object-contain "
                        />
                       
                        
                        

                    </div>
                    <div className="flex flex-row gap-x-5  w-2/3 md:w-1/3 justify-end">             
                    <div className="absolute top-1 right-5 ">
                            {currentUser&&userDBInfo?(      // logged in    &&Cart          
                                <div className="flex flex-col mt-4 mr-4 font-mincho field border-2 border-gray-300">   
                                    {
                                        toggleDropdown?(
                                            <div className="w-full flex-col ">
                                                <button
                                                    className="justify-end items-end "
                                                >
                                                    <img 
                                                        src="/assests/img/NavBanner/dot.svg" 
                                                        alt     = "promptation logo"
                                                        width   = {6}
                                                    
                                                        className = " object-contain "
                                                        onClick={()=>{setToggleDropdown(prev=>!prev)}}
                                                    />
                                                </button>
                                    
                                                <div className="absolute right-5 w-60 top-14 text-base bg-white rounded-md p-2 shadow">
                                                    <Link 
                                                        to={"/soclist"}
                                                        className="flex   text-black"
                                                    >
                                                        組織列表 Society List
                                                    </Link>
                                                    <Link 
                                                        to={"/shop/product"}
                                                        className="flex   text-black"
                                                    >
                                                        商店 Shop
                                                    </Link>
                                                    <Link 
                                                        to="shop/cart"
                                                        className="flex   text-black "
                                                        onClick={async ()=>{setToggleDropdown(prev=>!prev);}}
                                                    >
                                                        <div className="flex flex-row gap-5">
                                                            <div className="">購物車 Cart</div>
                                                            <div className="">

                                                            
                                                               
                                                                <div className="aspect-square h-full flex flex-row justify-center items-center rounded-full bg-su-green text-white">
                                                                    <div className="">{CartNumber}</div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </Link>
                                                    
                                                    
                                                    {userDBInfo.first_login?(
                                                        <Link 
                                                            to="account/setup"
                                                            className="flex   text-black "
                                                            onClick={()=>{setToggleDropdown(prev=>!prev)}}
                                                        >
                                                            Account Setup
                                                        </Link>
                                                    ):(
                                                        <Link 
                                                            to="profile"
                                                            className="flex   text-black"
                                                            onClick={()=>{setToggleDropdown(prev=>!prev)}}
                                                        >
                                                            個人資料 Profile
                                                        </Link>
                                                        
                                                    )}
                                                    <Link 
                                                        className="flex   text-black "
                                                        onClick={(e)=>{
                                                            e.preventDefault();
                                                            auth.signOut()
                                                            setuserDBInfo(null)
                                                            
                                                            console.log('trigggered onclick action');
                                                            navigate("/")
                                                            setToggleDropdown(prev=>!prev)
                                                        }}
                    
                                                    >
                                                       
                                                        登出 Log out
                                                    </Link >

                                                    
                                        
                                                </div>
                                            </div>
                                            
                                            
                                        ):(
                                            <button className=" ">
                                                <img 
                                                    src="/assests/img/NavBanner/dot.svg" 
                                                    alt     = "promptation logo"
                                                    width   = {6}
                                                    height  = {6}
                                                    className = "object-contain justify-end "
                                                    onClick={()=>{setToggleDropdown(prev=>!prev)}}
                                                />
                                            </button>
                                            
                                        )
                                    }
                                    
                                </div>
                                    
                                
                                
                            ):(   // not logged in 
                        <div className="flex flex-col  gap-y-1 text-xs ">
                                    
                                    <Link 
                                        to={"/signup"}
                                        className="flex flex-row text-xs font-mincho bg-su-green text-white rounded-md text-center p-1"
                                    >
                                        註冊 Sign Up
                                    </Link>
                                    
                                    <Link 
                                        to={"/login"}
                                        className="flex flex-row text-xs font-mincho bg-su-green text-white rounded-md text-center p-1"
                                    >
                                        登入 Sign In
                                    </Link>
                                    
                                </div>
                            )
                            }
                        </div>
                        
                        
                        
                    
                        
                    </div>
                    
                    
                </nav>
                <Outlet/>
            
            </div>
          
            
            
        )
    }else{
        return(
            <>
            <h1>Nav</h1>
            </>
        )
    }
    
}

export default Nav