import React, { useContext, useState, useEffect } from "react"

import { postURL } from "../../utils/fetch"



const InfoContext = React.createContext()

export function useStaticInfo() {
  return useContext(InfoContext)
}

export function InfoProvider({ children }) {
    const [SocMap, setSocMap] = useState()
    const [PrivacyPage, setPrivacyPage] = useState()
    const [latestActivities, setlatestActivities] = useState([])
    const [latestNews, setlatestNews] = useState([])
    const [loading, setloading] = useState(true)
    
    async function getStaticInfo(){
        if(loading){
            await postURL("/api/websitestaticinfo",false,{}).then(docs=>{
                docs.forEach(doc=>{
                    if(doc.id==="registerDeclaration"){
                        setPrivacyPage(doc.content)
                    }
                    else if (doc.id==="socMap"){
                        console.log("Soc Map is set to",doc.content)
                        setSocMap(doc.content)
                    }
                    else if (doc.id==="latestActivities"){
                        setlatestActivities(doc.content)
                    }
                    else if (doc.id==="registerDeclaration"){
                        setlatestNews(doc.content)
                    }
                })

                setloading(false)
            })
        }
        
    }
    async function updateStaticInfo(){
        setloading(true)
    }
  

    useEffect(() => {
        if(loading){
            getStaticInfo()
        }
    }, [loading])
  

    const value = {
        SocMap,
        PrivacyPage,
        latestActivities,
        latestNews,
        updateStaticInfo
    }
    
    return (
    
        <InfoContext.Provider value={value}>
            {!loading && children}
        </InfoContext.Provider>
    )
  
  
}
