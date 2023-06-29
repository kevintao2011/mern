/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState, useEffect, createContext, Children} from 'react';
import 'firebase/auth';
import { auth } from '../utils/firebasefunction';


export default function Session(){
    const UserContext = createContext()
    
    const [userDBInfo, setuserDBInfo] = useState(null)
    const [SessionID, setSessionID] = useState(null)
    const [loggedIn, setLoggedIn] = useState(false);
    useEffect(() => {
        auth.onAuthStateChanged((user) => {
            
            console.log("AuthStateChanged")
            async function getUserDBInfo(){
                await auth.currentUser.getIdToken().then(async token=>{
                    console.log("token",token)
                    await fetch ("/api/getuser",
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
                            setuserDBInfo(Object.keys(data.societies))
                            return data
                        }
                    })}
                    
                )
                
            }
            if (user) {
                setuserDBInfo(getUserDBInfo()) 
                setLoggedIn(true);
            } else {
                setLoggedIn(false);
            }
        });// Unsubscribe from the onAuthStateChanged listener when the component unmounts
    }, []);
    
    return (
        <UserContext.Provider value={{userDBInfo,SessionID}}>
            {Children}
        </UserContext.Provider>
    );
}
