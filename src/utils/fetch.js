import { toast } from "sonner"
import { useAuth } from "../components/session"
import { auth } from "./firebasefunction"

class ServerFunction{
    constructor(name){
        this.name=name
    };
    
}
async function postURL(postURL,needToken=false,data={}){
    console.log(`"****calling to "${postURL} *******`)
    if(needToken){
        return await auth.currentUser.getIdToken().then(async token=>{
            console.log("token",token,"Data",data)
            try {
                return await fetch (postURL,
                {
                    method:"POST",
                    body:JSON.stringify({
                        user:{
                            token:token
                        },
                        data
                    }),
                    data:data,
                    headers: {
                        "Content-Type": "application/json",
                        // 'Content-Type': 'application/x-www-form-urlencoded',
                        },
                        mode:'cors'
                    
                }).then(async response =>{
                    try {
                        if(response.ok){
                        
                            return await response.json().then(data=>{
                                console.log("(Authed)Return requested data of",postURL,data)
                                return data
                            })
                            
                        }else{
                            return await response.json().then(data=>{
                                console.log("(Authed)request Return failed",postURL,data.data)
                                return data
                            })
                        }
                    } catch (error) {
                        console.log(error)
                        // toast.warning(error.name)
                    }
                    
                })
            } catch (error) {
                if (error.name === 'AbortError') {
                    return {success:false,data:error.name}
                } else {
                    return {success:false,data:error.name}
                }
            
            }
            
        }
            
    
        )
    }else{
        try {
            return await fetch (postURL,
            {
                method:"POST",
                body:JSON.stringify({
                    user:{
                        token:"token"
                    },
                    data
                }),
                data:data,
                headers: {
                    "Content-Type": "application/json",
                    // 'Content-Type': 'application/x-www-form-urlencoded',
                    },
                    mode:'cors'
                
            }).then(async response =>{
                if(response.ok){
                        
                    return await response.json().then(data=>{
                        console.log("requested Return data of",postURL,data.data)
                        return data
                    })
                    
                }else{
                    return await response.json().then(data=>{
                        console.log("request Return failed",postURL,data.data)
                        return data
                    })
                }
            })
        } catch (error) {
            if (error.name === 'AbortError') {
                return {success:false,data:error.name}
            } else {
                return {success:false,data:error.name}
            }
        }
        
    }
    
    
}

export default ServerFunction
export {postURL}