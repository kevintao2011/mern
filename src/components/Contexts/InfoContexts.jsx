import React, { useContext, useState, useEffect } from "react"

import { postURL } from "../../utils/fetch"



const InfoContext = React.createContext()

export function useStaticInfo() {
  return useContext(InfoContext)
}

export function InfoProvider({ children }) {
    /**
     * 000: Object { 
     * _id: "64cf89986724b2386bba0395",
     * code: "000", 
     * society_eng: "Executive Committee of LingNam University Student Union"
     * society_chinese: "麻將學會"
     * society_eng: "Mahjong Society, LUSU"
     */
    const [SocMap, setSocMap] = useState()
    const [PrivacyPage, setPrivacyPage] = useState()
    const [latestActivities, setlatestActivities] = useState([])
    const [latestNews, setlatestNews] = useState([])
    const [loading, setloading] = useState(true)
    
    async function getStaticInfo(){
        if(loading){
            await postURL("/api/websitestaticinfo",false,{ids:["info","registerDeclaration","socMap","latestActivities","registerDeclaration"]}).then(result=>{
                if(result.success){
                    const docs = result.data
                    console.log("info",docs)
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
                }
                
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
        SocMap, //code:name
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
