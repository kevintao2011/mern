import React, { useEffect, useState } from 'react'
import { Tree, TreePicker } from 'rsuite';
import { mockTreeData } from './mock.js';
import { postURL } from '../../utils/fetch.js';
import { toast } from 'sonner';
//https://www.mongodb.com/docs/manual/tutorial/model-tree-structures-with-ancestors-array/ readthis
function ProductGroupTree() {
    const [ProductGroups, setProductGroups] = useState()
    const [ProductTrees, setProductTrees] = useState([])
    async function getProductGroups(){
        await postURL('/api/getproductgroups',false,{ids:["product_group_tree"]}).then(result=>{
            if(result.success){
                setProductGroups(result.data)
                console.log("ProductGroup",result.data)
            }else{
                toast.warning(result.data)
            }
        })
    }
    useEffect(() => {
        getProductGroups()
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
            <div className="flex flex-col">
            {
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
            }
            </div>
            <button className="" onClick={async ()=>{ await refreshTree()}}>Refresh Tree</button>
        </div>
    )
}

export default ProductGroupTree