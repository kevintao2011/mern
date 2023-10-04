import React, { useEffect, useState } from 'react'
import SearchTool from '../../../components/table/SearchTool'
import { ButtonToolbar,Button } from 'rsuite'
import { useAuth } from '../../../components/session'
import FillForm from '../../../components/FormComponents/FillForm'
import ListTable from '../../../components/FormComponents/ListTable'
import moment from 'moment'
import FieldForArray from '../../../components/FormComponents/FieldForArray'
import { postURL } from '../../../utils/fetch'
function AdminMemberContainer({Member,code}) {
    const {Soc,currentUser,userDBInfo} = useAuth()
    const [Open, setOpen] = useState(false)
    const [DisplayCreate, setDisplayCreate] = useState(false)
    const [MemberList, setMemberList] = useState()
    const [AddSIDField, setAddSIDField] = useState()
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
    useEffect(() => {
        fetchMemberList()
    }, [])

    useEffect(() => {
      console.log("MemberList is set to ",MemberList)
    }, [MemberList])
    
    
    return (
        <div className="flex flex-col">
            <div className="w-full flex flex-row justify-center">
                <div className="w-1/2 flex flex-row">
                    
                    <div className="">
                        <div className="text-3xl">Member</div>
                    </div>
                </div>
                <div className="w-1/2 py-1">
                    <div className="w-full flex flex-row gap-2 justify-end">
                        <button onClick={()=>{setDisplayCreate(true)}}>
                            Add new member
                        </button>
                    </div>
                    
                </div>
                
                
            </div>

            {
                MemberList&&(
                    <div className="flex flex-col">
                        
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
                                )}}
                             >
                                Add
                             </button >
                             <button 
                                className='p-1 bg-green-600 rounded-md text-white'
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