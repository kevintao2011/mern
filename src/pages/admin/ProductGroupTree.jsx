//abadon this page since tree approach is abandoned

import React, { useEffect, useState } from 'react'
import { CheckTree, InputPicker, Tree, TreePicker } from 'rsuite';
import { mockTreeData } from './mock.js';
import { postURL } from '../../utils/fetch.js';
import { toast } from 'sonner';
//https://www.mongodb.com/docs/manual/tutorial/model-tree-structures-with-ancestors-array/ readthis
function ProductGroupTree() {
    const [ProductGroups, setProductGroups] = useState()
    const [ProductGroupsForRs, setProductGroupsForRs] = useState()
    const [ProductTrees, setProductTrees] = useState([])
    const [NewGroup, setNewGroup] = useState()
    async function getProductGroups(){
        await postURL('/api/getproductgroups',false,{}).then(result=>{
            if(result.success){
                setProductGroups(result.data)
                console.log("ProductGroup",result.data)
            }else{
                toast.warning(result.data)
            }
        })
    }
    async function getProductGroupsForRs(){
        await postURL('/api/getproductgroupsforrsbydb',false,{}).then(result=>{
            if(result.success){
                setProductGroupsForRs(result.data)
                console.log("ProductGroupForRs",result.data)
            }else{
                toast.warning(result.data)
            }
        })
    }
    useEffect(() => {
        getProductGroups()
        getProductGroupsForRs()
        getProductTree()
        
    }, [])

    async function getProductTree(){
        await postURL('/api/websitestaticinfo',true,{ids:["product_group_tree"]}).then(result=>{
            if(result.success){
                setProductTrees(result.data[0].content)
                console.log("Tree",result.data[0].content)
            }
        })
    }

    async function refreshTree(){
        await postURL('/api/generateproductgrouptrees',true,{}).then(result=>{
            // if(result.success){
            //     setProductTrees(result.data)
            // }
        })
    }
    async function handleAdd(){
        await postURL('/api/addProductGroup',true,{}).then
    } 
    

    const [TreeData, setTreeData] = useState([
        {
            "label": "Planner",
            "value": "1-1",
            "children": [
                {
                    "label": "Camilla",
                    "value": "1-1-1",
                    "visible": true,
                    // "refKey": "String_1-1-1"
                },
                {
                    "label": "Johnny",
                    "value": "1-1-2",
                    "visible": true,
                    // "refKey": "String_1-1-2"
                },
                {
                    "label": "Monte",
                    "value": "1-1-3",
                    "visible": true,
                    // "refKey": "String_1-1-3"
                },
                {
                    "label": "Kaela",
                    "value": "1-1-4",
                    "visible": true,
                    // "refKey": "String_1-1-4"
                }
            ],
            "visible": true,
            // "refKey": "String_1-1"
        },
        {
            "label": "Facilitator",
            "value": "1-2",
            "children": [
                {
                    "label": "Fannie",
                    "value": "1-2-1",
                    "visible": true,
                    // "refKey": "String_1-2-1"
                },
                {
                    "label": "Blanche",
                    "value": "1-2-2",
                    "visible": true,
                    // "refKey": "String_1-2-2"
                },
                {
                    "label": "Josefa",
                    "value": "1-2-3",
                    "visible": true,
                    // "refKey": "String_1-2-3"
                },
                {
                    "label": "Santos",
                    "value": "1-2-4",
                    "visible": true,
                    // "refKey": "String_1-2-4"
                }
            ],
            "visible": true,
            // "refKey": "String_1-2"
        },
        {
            "label": "Engineer",
            "value": "1-3",
            "children": [
                {
                    "label": "Wyman",
                    "value": "1-3-1",
                    "visible": true,
                    // "refKey": "String_1-3-1"
                },
                {
                    "label": "Anahi",
                    "value": "1-3-2",
                    "visible": true,
                    // "refKey": "String_1-3-2"
                },
                {
                    "label": "Sherwood",
                    "value": "1-3-3",
                    "visible": true,
                    // "refKey": "String_1-3-3"
                },
                {
                    "label": "Diamond",
                    "value": "1-3-4",
                    "visible": true,
                    // "refKey": "String_1-3-4"
                }
            ],
            "visible": true,
            "refKey": "String_1-3"
        }
    ])
    useEffect(() => {
      console.log(TreeData)
    }, [TreeData])
    

    return (
        <div>
            <TreePicker defaultExpandAll data={ProductTrees} style={{ width: 246 }} />

            
            <div className="flex flex-col p-4 border rounded-md gap-2">
                <div className="text-md font-bold">產品分類 Product Group</div>
                <input type="text" placeholder='Type a new Product Group' className='rounded-md'/>
                <div className="text-md font-bold">附屬於產品 Parent Products</div>
                <CheckTree data={ProductTrees}  defaultExpandAll onChange={e=>{console.log(e)}} />
                <div className="flex flex-row justify-center">
                    <button className=' bg-btn-blue text-white rounded-md px-2' onClick={async ()=>{handleAdd()}}>Save</button>
                </div>
                
            </div>
            
            <div className="flex flex-col">
            {/* {
                ProductGroups?.map(group=>{
                    return (
                        <div className="">
                            <div className="">{group.group_name}</div>
                            {group.ancestors.map(child=>{
                                return <div className="">{child}</div>
                            })}
                        </div>
                        
                        
                    )
                })
            } */}
            </div>
            <button className="bg-btn-blue text-white rounded-md px-2 py-0.5" onClick={async ()=>{ await refreshTree()}}>Click this To Regenerate Product Tree </button>
        </div>
    )
}

export default ProductGroupTree