import React, { useEffect,useState } from 'react'

const SocList = () => {
    const [Filter, setFilter] = useState()
    const [SocietyList, setSocietyList] = useState([])
    const [LHSPage, setLHSPage] = useState(1)
    const [GroupedSocietyList, setGroupedSocietyList] = useState([[]])
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
    useEffect(() => {
      
      let pageGroups = [];
      let pageGroup = [];
      let counter = 0;
      SocietyList.forEach(soc=>{
        if (soc.society_chinese){
            pageGroup.push(soc.society_chinese)
            counter++
        }else if (soc.society_eng){
            pageGroup.push(soc.society_eng)
            counter++
        }
        if (counter > 9){
            pageGroups.push(pageGroup)
            pageGroup=[]
            counter = 0
        }
        console.log("pageGroups",pageGroups)
        
      })
      pageGroups.push(pageGroup)
      setGroupedSocietyList(pageGroups)
    
     
    }, [SocietyList])
    useEffect(() => {
      console.log(LHSPage)
    
      
    }, [LHSPage])
    
    
    return (
    <div className="flex flex-row p-10">
        <div className="LHS w-3/12">
        <div className="flex- flex-col py-2">
                <img 
                    src="/assests/img/soclist/Societies.png" 
                    alt="" 
                />
            </div>
            <div className="grid grid-cols-2">
                
            </div>
            <div className="flex flex-col">
                {
                    GroupedSocietyList[LHSPage-1]?.map(socName=>{
                        return(
                            <div className="py-1 bg-red-300 my-2 rounded-md text-center">
                                <p>{socName}</p>
                            </div>
                        )
                    })
                }
            </div>

            <div className="flex flex-row justify-between">
                <button
                    onClick={()=>{
                        if (LHSPage > 1){
                            setLHSPage(LHSPage=>LHSPage-1)
                        }
                        
                    }}
                >
                    <img src="/assests/img/soclist/previousButton.png" alt="" />
                    
                </button>
                <p>第{LHSPage}頁</p>
                <button
                    onClick={()=>{
                        console.log("clicked ")
                        if (LHSPage < (GroupedSocietyList.length)){
                            console.log(LHSPage,"smaller than ",GroupedSocietyList.length)
                            setLHSPage(LHSPage=>LHSPage+1)
                        }
                        
                    }}
                >
                    <img src="/assests/img/soclist/nextButton.png" alt="" />
                </button>
            </div>
        </div> 
        <div className="RHS w-9/12">
            <ul>
                {/* <li className='py-5'>
                    <div className="p-5 mx-5 rounded-lg bg-gray-100">
                        <p>學會 Society: society_chinese l.society_eng</p>
                        
                        <p>幹事會名稱 Name of Executive Committee: l.exco_name_chinese l.exco_name_eng</p>
                        
                    </div>
                </li> */}
                {
                    SocietyList.map(l=>{
                        return(
                            <li className='py-5'>
                                <a href={l.ig?l.ig:""}>
                                    <div className="p-5 mx-5 rounded-lg bg-gray-100">
                                        
                                        {/* <p>學會 Society: {l.society_chinese} {l.society_eng}</p> */}
                                        <p>{l.society_chinese} {l.society_eng}</p>
                                        {/* <p>幹事會名稱 Name of Executive Committee: {l.exco_name_chinese} {l.exco_name_eng}</p> */}
                                        <p>{l.exco_name_chinese} {l.exco_name_eng}</p>
                                        
                                    </div>       
                                </a>
                                
                            </li>
                        )
                    })
                }
            </ul> 
        </div>  

    </div>
        
        
    )
}

export default SocList