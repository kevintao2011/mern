

import { useState, useEffect } from "react";
import { Link,Outlet } from "react-router-dom";
import { auth } from "../utils/firebasefunction";
import { updateCurrentUser } from "firebase/auth";
import DropdownComponent from "./dropdown";
const Nav = () => {
    
    const [toggleDropdown, setToggleDropdown] = useState(false);
    const [MySociety, setMySociety] = useState([])
    const [loggedIn, setLoggedIn] = useState(false);
    
    
    
    useEffect(() => {
        auth.onAuthStateChanged((user) => {
            console.log("AuthStateChanged",user?.email)
            if (user) {
                setLoggedIn(true);
            } else {
                setLoggedIn(false);
            }
        });
        async function getSocieties(){
            if (loggedIn){
                console.log("fetching societies")
                await auth.currentUser.getIdToken().then(async token=>{
                    // console.log("token",token)
                    await fetch ("/api/getusersocieties",
                    {
                        method:"POST",
                        body:JSON.stringify({
                            user:{
                                token:token
                            }
                        }),
                        headers: {
                            "Content-Type": "application/json",
                            // 'Content-Type': 'application/x-www-form-urlencoded',
                            },
                            mode:'cors'
                        
                    }).then(async response =>{
                        if(response.ok){
                            const data = await response.json()
                            setMySociety(Object.keys(data.societies))
                            
                        }
                    })}
                )
            }
            
           
        }
        getSocieties()
        
        if (loggedIn !== undefined) {
            
            
        }
    }, [ loggedIn]);

    
    return (
       
        <>
            <nav className="flex flex-row w-full px-10 justify-between items-center">
                
                <div className="">
                    <Link 
                        to={"/"}
                        className="flex gap-2 "
                    >
                        <img src="./assests/img/LingULogoGreen.png" alt="" className="" width="100" height="100" />
                        

                        {/* <Image 
                            src     ="./assests/img/LingULogoGreen.svg" 
                            alt     = "promptation logo"
                            width   = {100}
                            height  = {100}
                            className = "object-contain"
                        /> */}
                        
                    </Link>
                </div>
                <div className="flex flex-row gap-5">
                    
                    {/* <Link 
                        href="/api/auth/"
                        className="flex gap-2 selectlink"
                    >
                        Shop
                    </Link> */}
                    {/* <Link 
                        href="/api/auth/"
                        className="flex gap-2 selectlink"
                    >
                        Cart
                    </Link> */}
                    
                    <div className="">
                        {auth.currentUser?(
                            
                            <div className="flex flex-row gap-5">
                                <Link 
                                    to="profile"
                                    className="flex  selectlink"
                                >
                                    Profile
                                </Link>

                            <button onClick={()=>{setToggleDropdown((prev)=>!prev)}}>
                                <DropdownComponent 
                                    items={MySociety} 
                                    title={"My Society"}
                                    show={toggleDropdown} 
                                    className="text-su-green relative w-full lg:max-w-sm"
                                />
                            </button>

                            
                                

                                <button 
                                    className="flex  selectlink "
                                    onClick={(e)=>{
                                        e.preventDefault();
                                        auth.signOut()
                                        // alert("'trigggered onclick action'");
                                        console.log('trigggered onclick action');
                                        

                                    }}

                                >
                                    Log out
                                </button>
                                
                                
                            </div>
                                
                            
                            
                        ):(
                            <div className="flex flex-row px-0 gap-5">
                                <Link 
                                    to={"/signup"}
                                    className="flex  selectlink"
                                >
                                    Sign Up
                                </Link>
                                
                                {/* <button 
                                    className="flex gap-2 selectlink"
                                    onClick={(e)=>{
                                        e.preventDefault();
                                        // alert("'trigggered onclick action'");
                                        console.log('trigggered onclick action');
                                    
                                    }}
                                >
                                    Login
                                </button> */}
                                <Link 
                                    to={"/login"}
                                    className="flex gap-2 selectlink"
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
        </> 
        
        
    )
}

export default Nav