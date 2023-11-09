import React, { useContext, useState, useEffect } from "react"

import { postURL } from "../../utils/fetch"
// import {
//     Notification,
//     useToaster,
//     Placeholder,
//     Uploader,
//     ButtonToolbar,
//     SelectPicker,
//     Button
//   } from 'rsuite';
import { Toaster, toast } from "sonner";


const NotificationContext = React.createContext()

export function useNoti() {
  return useContext(NotificationContext)
}

export function NotiProvider({ children }) {
    // const toaster = useToaster();
    // const notiType ={
    //     info:{ label: 'info', value: 'info'},
    //     greenTick:{ label: 'success', value: 'success' },
    //     warning:{ label: 'warning', value: 'warning' },
    //     error:{ label: 'error', value: 'error' }
    // }
    
    // const position = {
    //     tl:{ label: 'topStart', value: 'topStart' },
    //     tm:{ label: 'topCenter', value: 'topCenter' },
    //     tr:{ label: 'topEnd', value: 'topEnd' },
    //     bl:{ label: 'bottomStart', value: 'bottomStart' },
    //     bm:{ label: 'bottomCenter', value: 'bottomCenter' },
    //     br:{ label: 'bottomEnd', value: 'bottomEnd' }
    // }

    // top-left, top-center, top-right, bottom-left, bottom-center, bottom-right
    function popMessage(header="info",pos="top-right",text){
        // toaster.push(message(text,header),'topStart')
        switch (header) {
            case "success":
                toast.success(text,{
                    position:{pos},
                })
                break;
            case "error":
                toast.error(text,{
                    position:{pos},
                })
                break;
            case "warning":
                toast.warning(text,{
                    position:{pos},
                })
            break;
            case "info":
                toast.info(text,{
                    position:{pos},
                })
                break;
            case "loading":
                toast.loading(text,{
                    position:{pos},
                })
                break;
            default:
                toast.info(text,{
                    position:{pos},
                })
                break;
            
        }
        
    }

    // function message(msg,type){
    //     return(
    //         <Notification type={type} header={type} closable>
    //             <div className="w-full">{msg}</div>
    //         </Notification>
    //     )
    // }
   
    

    const value = {
        popMessage
    }
    
    return (
    
        <NotificationContext.Provider value={value}>
            {children}
            <Toaster/>
        </NotificationContext.Provider>
    )
  
  
}
