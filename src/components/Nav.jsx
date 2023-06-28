"use client"

import { useState, useEffect } from "react";
import { Link,Outlet } from "react-router-dom";
import { auth } from "../utils/firebasefunction";
import { updateCurrentUser } from "firebase/auth";
import DropdownComponent from "./dropdown";
const Nav = () => {
    
    const [toggleDropdown, setToggleDropdown] = useState(false);
    const [MySociety, setMySociety] = useState([])
    const [loggedIn, setLoggedIn] = useState(false);
    auth.onAuthStateChanged((user) => {
        console.log("AuthStateChanged")
        if (user) {
            setLoggedIn(true);
        } else {
            setLoggedIn(false);
        }
    });
    
    
    useEffect(() => {
        async function getSocieties(){
            if (loggedIn){
                console.log("fetching societies")
                await auth.currentUser.getIdToken().then(async token=>{
                    console.log("token",token)
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
                            console.log(MySociety)
                        }
                    })}
                )
            }
            
           
        }
        getSocieties()
        
        if (loggedIn !== undefined) {
            
            
        }
    }, [loggedIn]);

    
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

                                <Link 
                                    to="/"
                                    className="flex-col  selectlink "
                                    onMouseEnter={()=>{
                                        console.log("moved")
                                        setToggleDropdown(true)
                                    }}
                                    onMouseLeave={()=>{
                                        console.log("moved")
                                        setToggleDropdown(false)
                                    }}
                                    
                                >
                                    My Society
                                    {toggleDropdown?
                                        (<div className="hover-list">
                                            {
                                                MySociety.map((soc)=>{
                                                console.log(soc)
                                                return(
                                                    
                                                   
                                                    <Link to={"/soc:id"} className="selectlink">
                                                        {soc}
                                                    </Link>
                                                )
                                            })}
                                            {/* {for soc in MySociety} */}
                                            
                                            </div>
                                        ):(<></>)}
                                    
                                </Link>

                                
                                

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