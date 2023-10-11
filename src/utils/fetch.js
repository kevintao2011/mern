import { useAuth } from "../components/session"
import { auth } from "./firebasefunction"

class ServerFunction{
    constructor(name){
        this.name=name
    };
    
}
async function postURL(postURL,needToken=false,data={}){
    console.log(`"****calling to "${postURL} *******`)
    return await auth.currentUser.getIdToken().then(async token=>{
        console.log("token",token)
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
            if(response.ok){
                console.log("fetched Data from",postURL)
                const data = await response.json()
                console.log("data",data.data)
                return data.data
            }else{
                console.log("failed fetch user")
                return false
            }
        })}
        

    )
}

export default ServerFunction
export {postURL}