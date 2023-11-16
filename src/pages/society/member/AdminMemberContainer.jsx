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

function AdminMemberContainer({Member,code}) {
    const navigate = useNavigate()
    const {Soc,currentUser,userDBInfo} = useAuth()
    const [Open, setOpen] = useState(false)
    const [DisplayCreate, setDisplayCreate] = useState(false)
    const [MemberList, setMemberList] = useState()
    const [AddSIDField, setAddSIDField] = useState()
    const [MembershipFee, setMembershipFee] = useState([])
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
    function fetchMembershipProduct(){

    }
    useEffect(() => {
        fetchMemberList()
        fetchMembershipProduct()
    }, [])

    useEffect(() => {
      console.log("MemberList is set to ",MemberList)
    }, [MemberList])
    
    
    return (
        <div className="flex flex-col text-sm">
            <div className="">
                <EntryTable
                    headings={["Membership Type","Price"]}
                    rowValues={MembershipFee}
                    update={(v)=>{setMembershipFee(v);console.log("MembershipFee:",MembershipFee)}}
                />
                <div className="flex flex-row justify-end ">
                    <button className="bg-green-600 p-1 rounded-md text-white text-sm">Update</button>
                </div>
            </div>

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