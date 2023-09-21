import React, { useEffect,useState } from 'react'
import NestedField from '../../../components/FormComponents/NestedField'

function CategoryTable() { // Array of nested list 
    const [Categories, setCategories] = useState([])
    const [CategoryCount, setCategoryCount] = useState()
    const [CategoryProperties, setCategoryProperties] = useState([])
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
                    var catergoryMap = {}
                    var data = await response.json()
                    data.forEach(d=>{
                        catergoryMap[d.catergory_name]=d.id
                    })
                    console.log("Categories",data[0])
                    const filteredData = data.map(d=>{
                        return(
                            {
                                _id:d._id,
                                catergory_name:d.catergory_name,
                                parent_category:d.parent_category,
                                child_category:d.child_category,
                                published:d.published
                            }
                        )
                    })
                    
                    setCategories(filteredData)
                    var props = Object.keys(filteredData[0])
                    // props.splice(0,1)
                    console.log("Category porperty",filteredData)
                    setCategoryProperties(props)
                }
            })
        }
        getCategories()
        return () => {
        
      }
    }, [])

    
    

    function renewTree(index,node){
        Categories[index]=node
        console.log("renewTree",Categories)
        setCategories([...Categories])
    }
    
    return (

        
        
        <div className="w-full">
            {
                Categories&&CategoryProperties&&(
                    <div className="flex flex-col p-1">
                        <div className="w-full rounded-lg ">
                            <div className="flex flex-row justify-between">
                                <div className=""></div>
                                <div className="">
                                    <button className='bg-green-500 rounded-md p-2 text-white'>
                                        Add New Categories
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div class="w-full overflow-x-auto rounded-md">
                            <table class="w-full text-sm text-left text-gray-500 bg-gray-100">
                                <thead class="text-xs text-gray-700 uppercase bg-gray-50  dark:text-gray-400">
                                    <tr>
                                        {CategoryProperties.map(catTitle=>{
                                            return (
                                                <th scope="col" class="px-6 py-3">
                                                    {catTitle}
                                                </th>
                                            )

                                        })}
                                        <th scope="col" class="px-6 py-3">
                                                ACTION
                                        </th>                                            
                                       
                                    </tr>
                                    
                                </thead>
                                <tbody>
                                    {
                                        Categories.map(cat=>{
                                            return (
                                                <>
                                                    <tr class="border-b bg-gray-100 ">
                                                        {
                                                            CategoryProperties.map(props=>{
                                                                return(
                                                                    <>
                                                                        <td class="px-6 py-4">
                                                                            {
                                                                                typeof cat[props] === "boolean" ? String(cat[props]) : cat[props]
                                                                            }
                                                                            {/* {cat[props]} */}
                                                                        </td>
                                                                        
                                                                    </>
                                                                )
                                                            })
                                                            
                                                        }
                                                        <td class="px-6 py-4">
                                                            <div className="flex flex-row gap-2">
                                                                {/* <img src="/assests/img/tablebutton/gear.svg" alt="" /> */}
                                                                <button
                                                                    
                                                                >
                                                                    <img src="/assests/img/tablebutton/pencil.svg" alt="" />
                                                                </button>
                                                                <button>
                                                                    <img src="/assests/img/tablebutton/x-square.svg" alt="" />
                                                                </button>
                                                                
                                                                
                                                            </div>
                                                        </td>
                                                    </tr>
                                                    
                                                </>
                                            )
                                        })
                                    }
                                    {/* <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                        <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                            Apple MacBook Pro 17"
                                        </th>
                                        <td class="px-6 py-4">
                                            Silver
                                        </td>
                                        <td class="px-6 py-4">
                                            Laptop
                                        </td>
                                        <td class="px-6 py-4">
                                            $2999
                                        </td>
                                    </tr>
                                    <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                        <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                            Microsoft Surface Pro
                                        </th>
                                        <td class="px-6 py-4">
                                            White
                                        </td>
                                        <td class="px-6 py-4">
                                            Laptop PC
                                        </td>
                                        <td class="px-6 py-4">
                                            $1999
                                        </td>
                                    </tr>
                                    <tr class="bg-white dark:bg-gray-800">
                                        <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                            Magic Mouse 2
                                        </th>
                                        <td class="px-6 py-4">
                                            Black
                                        </td>
                                        <td class="px-6 py-4">
                                            Accessories
                                        </td>
                                        <td class="px-6 py-4">
                                            $99
                                        </td>
                                    </tr> */}
                                </tbody>
                            </table>
                        </div>

                    </div>
                    
                )
            }
        </div>
    )
    // return (
        
    //     <div className="">
    //         <p className='text-sm'>更改商品類型 Edit Product Options</p>
    //         <p className='text-sm'>ID 不能重疊</p>
            
    //         {
                    
    //             Categories?.map((cat,i)=>{
    //                 return <NestedField 
    //                     topNode={
    //                         cat
    //                     }
    //                     name={"catergory"}
    //                     index={i}
    //                     handleUpdate={renewTree}
    //                 />
    //             })
                
    //         }
              
    //         <div className="flex flex-row gap-2">
    //             <button
    //                 onClick={()=>{setCategories([...Categories,
    //                     {
    //                         catergory_name:"",
    //                     }
    //                 ])}}
    //             > Add 
    //             </button>
    //             <button
    //                 onClick={()=>{}}
    //             > Save
    //             </button>
    //         </div>
    //     </div>
    // )
}

export default CategoryTable