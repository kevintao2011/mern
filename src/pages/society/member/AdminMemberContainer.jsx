import React, { useEffect, useState } from 'react'
import SearchTool from '../../../components/table/SearchTool'
import { ButtonToolbar,Button } from 'rsuite'
import { useAuth } from '../../../components/session'
import FillForm from '../../../components/FormComponents/FillForm'
import ListTable from '../../../components/FormComponents/ListTable'
import moment from 'moment'
import FieldForArray from '../../../components/FormComponents/FieldForArray'
import { postURL } from '../../../utils/fetch'
import { useNavigate } from 'react-router-dom'
import EntryTable from '../../../components/table/EntryTable'
import { toast } from 'sonner'

function AdminMemberContainer({Member,code}) {
    const navigate = useNavigate()
    const {Soc,currentUser,userDBInfo} = useAuth()
    const [Open, setOpen] = useState(false)
    const [DisplayCreate, setDisplayCreate] = useState(false)
    const [MemberList, setMemberList] = useState()
    const [AddSIDField, setAddSIDField] = useState()
    const [MembershipFee, setMembershipFee] = useState()
    const [Membership, setMembership] = useState(true)
    const [Creating, setCreating] = useState(false)
    const [NewMemberType, setNewMemberType] = useState({
            "name": "",
            "price": 0,
    })
    async function updateMembershipProductList(newOrOldsubDoc){
        try{ //{product:Membership,newSubprod:NewMemberType}
            await postURL('/api/addmembertype',true,newOrOldsubDoc).then(result=>{
                if(result.succes){
                    setMembership(result.data)
                    return result.succes
                }else{
                    toast.error(result.data)
                    return result.succes
                }
            })
        }catch{
            toast.error("Failed to create new membership type")
        }
        
    }
    async function fetchMemberList(){
        console.log("calling fetch member")
        await fetch("/api/getmemberlist", { 
            method: "POST",
            body: JSON.stringify({
                user:{
                    token:await currentUser.getIdToken(),
                    _id:userDBInfo._id
                },
                data:{
                    code:code
                }
            }),
            headers: {
            "Content-Type": "application/json",
            // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            mode:'cors'
        }).then(async res=>{
            if(res.ok){
                await res.json().then(v=>{
                    console.log("MemberList:",v.data)
                    v.data.forEach(membership=>{
                        // membership.user=membership.user.username
                        membership.username=membership.user.username
                        membership.sid=membership.user.sid
                        membership.expiry_date=moment(membership.expiry_date).utcOffset(8).format("DD-MM-YYYY")
                    })
                    setMemberList(v.data)
                })
            }else{
                return
            }
        })
    }
    async function fetchMembershipProduct(){
        await postURL("/api/gettypeproduct",true,{code:code,category:"membership"}).then(MembershipProduct=>{
            if(MembershipProduct===null){
                console.log("MembershipProduct",MembershipProduct)
            }else{
                setMembership(MembershipProduct)
            }
            
        })
    }
    useEffect(() => {
        fetchMemberList()
        fetchMembershipProduct()
    }, [])

    useEffect(() => {
      console.log("MemberList is set to ",MemberList)
    }, [MemberList])
    
    
    return (
        <div className="flex flex-col text-sm gap-2 my-2">
            {/* List for membership information */}
            {
                Membership?(
                    <div className="w-full border-2 border-t-su-green border-t-2 rounded-md p-1">
                        <div className="flex flex-row gap-2 ">
                            <div className="text-lg font-bold ">會費資料</div>
                            <div className="">
                                <button onClick={()=>{setCreating(true)}} className='my-0.5 p-0.5 bg-su-green rounded-md text-white'>New type</button>
                            </div>
                            {
                                Creating&&(
                                    <button 
                                        onClick={()=>{
                                            setCreating(false);
                                            setNewMemberType(
                                                {
                                                    "name": "",
                                                    "price": 0,
                                                }
                                            )}
                                        }
                                    className='my-0.5 p-0.5 bg-web-red rounded-md text-white'>Cancel</button>
                                )
                            }
                            
                        </div>
                        
                        <div className="w-full grid grid-cols-3 gap-2">
                            <div className="">會員類型</div>
                            <div className="">會費</div>
                            <div className=""></div>
                            <div className="">基本會員</div>
                            <div className="">$30</div>
                            <div className="flex flex-row justify-center">
                                <button 
                                    className='rounded-md bg-web-green text-sm text-white my-0.5 px-1' 
                                    onClick={()=>{setCreating(false)}}
                                >
                                    Update
                                </button>
                            </div>
                            
                            
                        </div> 
                        {
                            Creating&&(
                                <div className="grid grid-cols-3">
                                    <input type="text" placeholder='New Type' defaultValue={NewMemberType.name} name="" id=""  className='rounded-md border me-2' onChange={(e)=>{
                                        NewMemberType.name=e.target.value
                                        setNewMemberType({...NewMemberType})
                                    }}/>
                                    <input type="number" placeholder='Price' defaultValue={NewMemberType.price} name="" id="" className='rounded-md border me-2' onChange={(e)=>{
                                        NewMemberType.price=e.target.value
                                        setNewMemberType({...NewMemberType})
                                    }}/>
                                    <div className="flex flex-row justify-center">
                                        <button  className="rounded-md bg-blue-600 text-sm text-white my-0.5 px-1" onClick={
                                            async ()=>{
                                                setCreating(false);
                                                await updateMembershipProductList({NewMemberType}).then(success=>{
                                                    if(success){
                                                        setNewMemberType({
                                                            "name": "",
                                                            "price": 0,
                                                        })
                                                    }else{
                                                        
                                                    }
                                                })
                                                
                                            }
                                        }>
                                            Add
                                        </button>
                                    </div>
                                    
                                </div>
                            )
                        }
                    </div>
                    
                ):(
                    <div className="flex flex-col border rounded-md p-2 gap-2">
                        <div className="w-full flex flex-row justify-center">
                            <div className="">No MemberShip Yet</div>
                        </div>
                        <div className="w-full flex flex-row justify-center">
                            <button className="bg-su-green text rounded-md text-white px-1">Create</button>
                        </div>
                    </div>
                )
            }
            {/* <div className="">
                <EntryTable
                    headings={["Membership Type","Price"]}
                    rowValues={MembershipFee}
                    update={(v)=>{setMembershipFee(v);console.log("MembershipFee:",MembershipFee)}}
                />
                <div className="flex flex-row justify-end ">
                    <button className="bg-green-600 p-1 rounded-md text-white text-sm">Update</button>
                </div>
            </div> */}

            {/* Add Member */}
            <div className="w-full flex flex-row justify-center">
                <div className="w-1/2 flex flex-row">
                    
                    <div className="">
                        <div className="text-3xl">會員 Member</div>
                    </div>
                </div>
                <div className="w-1/2 py-1">
                    <div className="w-full flex flex-row gap-2 justify-end">
                        {/* <button className='p-1 bg-su-green text-white rounded-md' onClick={()=>{setDisplayCreate(true)}}>
                            新增會員 Add new member
                        </button> */}
                        {/* <button className='p-1 bg-su-green text-white rounded-md' onClick={()=>{setDisplayCreate(true)} }>
                            編輯會員 Edit Membership Option
                        </button> */}
                    </div>
                    
                </div>
                
                
            </div>
            {/* Member List */}
            {
                MemberList&&(
                    <div className="flex flex-col ">
                        
                        <div className="flex flex-col ">
                            <div className="flex flex-row gap-2 p-1">
                             <input 
                                type="text"
                                className='field w-full' 
                                placeholder='Please Enter the SID of the student'
                                onChange={e=>{setAddSIDField(e.target.value)}}
                             />
                             <button 
                                className='p-1 bg-blue-600 rounded-md text-white'
                                onClick={()=>{postURL(
                                    '/api/addmembership',
                                    true,
                                    {
                                        sid:AddSIDField,
                                        code:code
                                    }
                                ).then(result=>{
                                    if(result.success){
                                        
                                    }
                                })}}
                             >
                                Add
                             </button >
                             <button 
                                className='p-1 bg-web-green rounded-md text-white'
                                onClick={()=>{setDisplayCreate(false)}}
                            >
                                Hide
                             </button>
                            </div>
                            {
                                MemberList&&(
                                    <ListTable 
                                        dataEntries={MemberList}
                                        TitleMap={{
                                            // _id:"_ID",
                                            user:"User Name",
                                            role:"Role",
                                            expiry_date:"Expiry Date",
                                            sid:"SID"
                                        }}
                                    />
                                )
                            }
                            
                        </div>
                    </div>
                    
                    
                    
                )
            }
        </div>
    )
}

export default AdminMemberContainer