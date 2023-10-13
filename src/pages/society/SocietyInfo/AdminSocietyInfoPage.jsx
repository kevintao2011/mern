import React, { useState } from 'react'
import { useAuth } from '../../../components/session'
import { useStaticInfo } from '../../../components/Contexts/InfoContexts'
import FillForm from '../../../components/FormComponents/FillForm'
import { Checkbox, CheckboxGroup } from 'rsuite';

function AdminSocietyInfoPage({code}) {
    const {Soc} = useAuth()
    const [SocietyInfo, setSocietyInfo] = useState(Soc[code])
    const [SelectedPayments, setSelectedPayments] = useState([])
    
    const data = ['payme', 'FPS', 'Cash', ''];
    return (
        <div className='grid grid-cols-1 gap-2 my-2'>
           
            <div className="card flex flex-col">
                <div className="">
                    <div className="flex flex-row">
                        <div className="">付款資訊 Payment Method</div>
                        <Checkbox
                            indeterminate={SelectedPayments.length > 0 && SelectedPayments.length < data.length}
                            checked={SelectedPayments.length === data.length}
                            onChange={(value, checked) => setSelectedPayments(checked ? data : [])}
                        >
                            Check all
                        </Checkbox>
                    </div>
                    
                    <div className='flex '>
                       
                    
                        <CheckboxGroup inline name="checkboxList" value={SelectedPayments} onChange={values => setSelectedPayments(values)}>
                            {data.map(item => (
                            <Checkbox key={item} value={item}>
                               {item}
                            </Checkbox>
                            ))}
                        </CheckboxGroup>
                    </div>
                </div>
                
            </div>
        </div>
        
    )
}

export default AdminSocietyInfoPage