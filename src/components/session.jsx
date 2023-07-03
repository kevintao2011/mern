import React, { useContext, useState, useEffect } from "react"
import { auth } from "../utils/firebasefunction"
import { createUserWithEmailAndPassword,signInWithEmailAndPassword,signOut,updateEmail,updatePassword,updateProfile,sendPasswordResetEmail,sendEmailVerification } from "firebase/auth"

const AuthContext = React.createContext()

export function useAuth() {
  return useContext(AuthContext)
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState()
  const [loading, setLoading] = useState(true)
  const [userDBInfo, setuserDBInfo] = useState()

  function signup(email, password) {
    return createUserWithEmailAndPassword(auth,email, password)
  }

  function login(email, password) {
    return signInWithEmailAndPassword(auth,email, password)
  }

  function logout() {
    return signOut(auth)
  }

  function resetPassword(email) {
    return sendPasswordResetEmail(auth,email)
  }

  function updateEmail(email) {
    return currentUser.updateEmail(email)
  }

  function updatePassword(password) {
    return currentUser.updatePassword(password)
  }

  async function getDBInfo(){
    console.log("getDBInfo",auth.currentUser.uid)
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
                console.log("fetched user")
                const data = await response.json()
                console.log("userInfo",data)
                setuserDBInfo(data)
                
                
                
            }else{
              console.log("failed fetch user")
            }
        })}

    )
    
        

  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async user => {
      console.log("session changed",typeof(user),user)
      
      setCurrentUser(user)
      if(user){
        await getDBInfo().then(()=>{
          // if(userDBInfo.firstlogin){
            
          // }
          setLoading(false)
          console.log(loading)
          
        })
        
      }else{
        console.log("no user")
        setLoading(false)
      }
      
      
    })
    
    
    return unsubscribe
  }, [])

  const value = {
    currentUser,
    userDBInfo,
    loading,
    setuserDBInfo,
    login,
    signup,
    logout,
    resetPassword,
    updateEmail,
    updatePassword,
    
  }
  
  return (
  
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  )
  
  
}
