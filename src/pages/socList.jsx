import React, { useEffect,useState } from 'react'

const socList = () => {
    const [Soclist, setSoclist] = useState([])
    async function getSocList(){
        await fetch('/api/soclist'
        ,{
            method:"POST",
            headers: {
            "Content-Type": "application/json",
            // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            mode:'cors'
        }).then(async response =>{
        if(response.ok){
            const data = await response.json()
            console.log("data",data)
            setSoclist(data)
        }
        })
    }
    useEffect(() => {
            
        getSocList()
        
    }, [])
    
    return (
        <div>socList</div>
    )
}

export default socList