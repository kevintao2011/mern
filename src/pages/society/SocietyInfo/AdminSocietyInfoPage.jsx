import React, { useEffect, useState } from 'react'
import { useAuth } from '../../../components/Contexts/session'
import { useStaticInfo } from '../../../components/Contexts/InfoContexts'
import FillForm from '../../../components/FormComponents/FillForm'
import { Checkbox, CheckboxGroup } from 'rsuite';
import { postURL } from '../../../utils/fetch';
import PaymentOption from '../../../components/Payment/PaymentOption';

function AdminSocietyInfoPage({code}) {
    const {Soc} = useAuth()
    const [SocietyInfo, setSocietyInfo] = useState(Soc[code])
    
    
    const data = ['payme', 'FPS', 'Cash', ''];
    return (
        <div className='grid grid-cols-1 gap-2 my-2'>
           
            <div className="card flex flex-col">
                <PaymentOption code={code}/>
                
            </div>
        </div>
        
    )
}

export default AdminSocietyInfoPage