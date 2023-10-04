import React, { useEffect,useRef,useState } from 'react'
import ListTable from '../../../components/FormComponents/ListTable'
import { useNavigate } from 'react-router-dom'
// import Calendar from 'rsuite/Calendar';
import { Drawer, ButtonToolbar, Button, Placeholder} from 'rsuite';
import moment from 'moment';
import ActivityCalendar from '../../../components/ActivityCalendar';
import CreateActivityContainer from './CreateActivityContainer';

function AdminActivityContainer({Activities,code}) {
    const navigate = useNavigate()
    const [showDrawer, setshowDrawer] = useState(false)
    const [open, setOpen] = useState(false);
    const [openWithHeader, setOpenWithHeader] = useState(false);
    console.log(code)
    
    
    
    return (
        <div className="">
            <div className="">
                

                <Drawer open={open} onClose={() => setOpen(false)}>
                    <Drawer.Body>
                    <Placeholder.Paragraph />
                    </Drawer.Body>
                </Drawer>

                <Drawer open={open} onClose={() => setOpen(false)}>
                    <Drawer.Body className=''>
                        <CreateActivityContainer/>
                    </Drawer.Body>
                   
                    
                </Drawer>
            </div>
            <div className={`w-full flex-col ${showDrawer&&'blur-md'} z-0`}  >
                <div className="w-full flex flex-row justify-center">
                    <div className="w-1/2 flex flex-row">
                        
                        <div className="">
                            <div className="text-3xl">Activity</div>
                        </div>
                    </div>
                    <div className="w-1/2 py-1">
                        <div className="w-full flex flex-row gap-2 justify-end">
                            <button className="bg-su-green  text-white rounded-md p-1 " onClick={()=>{navigate(`/society/${code}/createactivity`)}}>
                            
                            {/* <button className="bg-su-green  text-white rounded-md p-1 " onClick={()=>{setshowDrawer(prev=>!prev)}}> */}
                                Create Activity
                            </button>

                            <ButtonToolbar>
                                <Button onClick={() => setOpen(true)}>Create Activity</Button>
                                {/* <Button onClick={() => setOpenWithHeader(true)}>Open with header</Button> */}
                            </ButtonToolbar>
                            
                        </div>
                        
                    </div>
                    
                    
                </div>
                {Array.isArray(Activities)&&(
                        <ListTable 
                            dataEntries={Activities}
                            TitleMap={{
                                // _id:"_ID",
                                activity_name:"Activity Name",
                                single_date:"One Day Only?",
                                start_date:"Start Date",
                                end_date:"End Date",
                                start_time:"Start time",
                                end_time:"End time",
                                payment_method:"payment method",
                                status:"status"
                            }}
                        />
                )}
                <div className="flex flex-col mt-5">
                    <div className="text-xl">Activity Calendar</div>
                </div>
                <CreateActivityContainer/>
                <ActivityCalendar Activities={Activities}/>

                
            </div>
        </div>
        
    )
}

export default AdminActivityContainer