import React, { useEffect,useState } from 'react'
import NestedField from '../../../components/FormComponents/NestedField'

function EditCategory() {
    const [Categories, setCategories] = useState([])
    useEffect(() => {
        async function getCategories(){
            await fetch('/api/getcatoption', { 
                method: "POST",
                body: JSON.stringify({
                    
                }),
                headers: {
                "Content-Type": "application/json",
                // 'Content-Type': 'application/x-www-form-urlencoded',
                },
                mode:'cors'
                
            }).then(async response => {
                if (response.ok){
                    // registered
                    
                    var data = await response.json()
                    const cats = data.map(d=>{
                        return d["catergory_name"]
                    })
                    console.log(data)
                    setCategories(data)
                }
            })
        }
        getCategories()
        return () => {
        
      }
    }, [])
    
    return (
        
        <div className="">
            {
                Categories?.map((cat,i)=>{
                    return <NestedField 
                        content={{
                            field_value:cat.catergory_name,
                            field_type:"text",
                        }}
                        child_content={
                            cat.child_catergories
                        }
                        index={i}
                    />
                })
            }
        </div>
    )
}

export default EditCategory