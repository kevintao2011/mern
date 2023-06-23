"use client"

import { useState, useEffect } from "react";
import { Link,Outlet } from "react-router-dom";


const Nav = () => {
    
    
    return (
       
        <>
            <nav className="flex flex-row w-full px-10 justify-between items-center">
                
                <div className="">
                    <Link 
                        to={"/"}
                        className="flex gap-2 "
                    >
                        <img src="./logo192.png" alt="" className=""/>
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
                    <Link 
                        href="/api/auth/"
                        className="flex gap-2 justify-center selectlink"
                    >
                        <p className="p-2">Event</p>
                    </Link>
                    <Link 
                        href="/api/auth/"
                        className="flex gap-2 selectlink"
                    >
                        Shop
                    </Link>
                    {/* <Link 
                        href="/api/auth/"
                        className="flex gap-2 selectlink"
                    >
                        Cart
                    </Link> */}
                    
                    <div className="">
                        {false?(
                            <div className="flex flex-row">
                                <Link 
                                    href="/profile"
                                    className="flex gap-2 selectlink"
                                >
                                    Profile
                                </Link>

                                <button 
                                    className="flex gap-2 selectlink "
                                    onClick={(e)=>{
                                        e.preventDefault();
                                        // alert("'trigggered onclick action'");
                                        console.log('trigggered onclick action');
                                    

                                    }}

                                >
                                    Log out
                                </button>
                                
                                
                            </div>
                                
                            
                            
                        ):(
                            <div className="flex flex-row px-0">
                                <Link 
                                    to={"/login"}
                                    className="flex gap-2 selectlink"
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