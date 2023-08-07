

import { useEffect, useState } from "react";
import { Link,Outlet,useLocation,useNavigate } from "react-router-dom";
import { auth } from "../utils/firebasefunction";
import DropdownComponent from "./dropdown";
import { useAuth } from "./session";

// from context


// from context
const Nav = () => {
    
    const location = useLocation() //get current path
    const [toggleDropdown, setToggleDropdown] = useState(false);
    // const [MySociety, setMySociety] = useState([])
    // const [loggedIn, setLoggedIn] = useState(false);
    
    const navigate = useNavigate();
    
    // from context

    const [CartNumber, setCartNumber] = useState([])

    const {currentUser,userDBInfo,loading,setuserDBInfo,Cart,setCart} = useAuth()
    // console.log("loading Nav",currentUser,userDBInfo,loading)
    // console.log("load user",currentUser,userDBInfo.societies)
    // if(currentUser && userDBInfo){
    //     console.log("Nav status",currentUser,userDBInfo.societies)
    //     // setMySociety(Object.keys(userDBInfo.societies))
        
    // }
  
    // from context
    useEffect(() => {
      setCartNumber(Cart?.length)
    }, [setCart,Cart])

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
            <div className="w-full bg-transparent">
                  
                <nav className="flex flex-row w-full  justify-between items-center">
                    
                    <div className=" w-1/3 ">
                        <Link  //home
                            to={"/"}
                            className="flex justify-start"

                        >
                            <img src="/assests/img/NavBanner/LinguSuLogo.png" alt="" className="" width="60rem" height="60rem" />
                            
                            
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
                    <div className="absolute top-5 right-5 ">
                            {currentUser&&userDBInfo&&Cart?(
                                
                                <div className="flex flex-col gap-5">
                                    
                                    {
                                        toggleDropdown?(
                                            <div className="w-full flex-col z-0 origin-top-right ">
                                                <div className="flex flex-row w-full ">
                                                    <button
                                                        className="justify-end items-end"
                                                    >
                                                        <img 
                                                            src="/assests/img/NavBanner/dot.svg" 
                                                            alt     = "promptation logo"
                                                            width   = {5}
                                                        
                                                            className = " object-contain "
                                                            onClick={()=>{setToggleDropdown(prev=>!prev)}}
                                                        />
                                                    </button>
                                                    
                                                </div>
                                                
                                                <div className="absolute right-2 w-32 ">
                                                    
                                                    <Link 
                                                        to="shop/cart"
                                                        className="flex  selectlink text-black "
                                                        onClick={async ()=>{setToggleDropdown(prev=>!prev);await uploadCart();}}
                                                    >
                                                        <p>Cart</p>
                                                        <div className="px-5">

                                                        
                                                            <div className="w-7 h-7 rounded-full bg-red-600  ">
                                                                <div className="w-full flex flex-row justify-center">
                                                                <p className="   ">{CartNumber}</p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </Link>
                                                    
                                                    {/* <button className="p-1 bg-green-500 rounded-md">
                                                        checkout
                                                    </button> */}
                                                    {userDBInfo.first_login?(
                                                        <Link 
                                                            to="account/setup"
                                                            className="flex  selectlink text-black "
                                                            onClick={()=>{setToggleDropdown(prev=>!prev)}}
                                                        >
                                                            Account Setup
                                                        </Link>
                                                    ):(
                                                        <Link 
                                                            to="profile"
                                                            className="flex  selectlink text-black"
                                                            onClick={()=>{setToggleDropdown(prev=>!prev)}}
                                                        >
                                                            Profile
                                                        </Link>
                                                        
                                                    )}
                                                    <button 
                                                        className="fle "
                                                        onClick={(e)=>{
                                                            e.preventDefault();
                                                            auth.signOut()
                                                            setuserDBInfo(null)
                                                            // alert("'trigggered onclick action'");
                                                            console.log('trigggered onclick action');
                                                            navigate("/")
                                                            setToggleDropdown(prev=>!prev)
                                                        }}
                    
                                                    >
                                                        <p className="selectlink text-black">
                                                            Log out
                                                        </p>
                                                    </button>
                                        
                                                </div>
                                            </div>
                                            
                                            
                                        ):(
                                            <button className="">
                                                <img 
                                                    src="/assests/img/NavBanner/dot.svg" 
                                                    alt     = "promptation logo"
                                                    width   = {5}
                                                    height  = {5}
                                                    className = "object-contain justify-end "
                                                    onClick={()=>{setToggleDropdown(prev=>!prev)}}
                                                />
                                            </button>
                                            
                                        )
                                    }
                                    
                                </div>
                                    
                                
                                
                            ):(
                                <div className="flex flex-row  gap-x-5 top-10 text-xs">
                                    <Link 
                                        to={"/signup"}
                                        className="flex  selectlink"
                                    >
                                        Sign Up
                                    </Link>
                                    
                                    <Link 
                                        to={"/login"}
                                        className="flex gap-2 selectlink top-10"
                                    >
                                        Sign In
                                    </Link>
                                    
                                </div>
                                    
                            
                                
                                
                            )
    
                            }
                        </div>
                        
                        
                        
                    
                        
                    </div>
                    
                    
                </nav>
                <Outlet />
            
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