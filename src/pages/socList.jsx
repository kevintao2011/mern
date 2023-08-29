import React, { useEffect,useState } from 'react'

const SocList = () => {
    const [SocietyList, setSocietyList] = useState([])
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
            console.log("soclist",data)
            setSocietyList(data)
        }
        })
    }
    useEffect(() => {
            
        getSocList()
       
    }, [])
    
    return (
    <div className="">
            <p className='text-xl'>學會列表</p>
            <ul>
                <li className='py-5'>
                    <div className="p-5 mx-5 rounded-lg bg-slate-400">
                        <p>學會 Society: society_chinese l.society_eng</p>
                        
                        <p>幹事會名稱 Name of Executive Committee: l.exco_name_chinese l.exco_name_eng</p>
                        
                    </div>
                </li>
                {
                    SocietyList.map(l=>{
                        return(
                            <li className='py-5'>
                                <div className="p-5 mx-5 rounded-lg bg-slate-400">
                                    <p>學會 Society: {l.society_chinese} {l.society_eng}</p>
                                    
                                    <p>幹事會名稱 Name of Executive Committee: {l.exco_name_chinese} {l.exco_name_eng}</p>
                                    
                                </div>
                            </li>
                        )
                    })
                }
            </ul>
        </div>
        
        
    )
}

export default SocList