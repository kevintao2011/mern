import React, { useEffect, useState } from 'react'
import EditLastestnews from './EditLastestnews'
import SearchField from '../../components/FormComponents/SSelectFieldWithSearch'
import ToggleList from './ToggleList'
import MembershipManagement from './Membership/MembershipManagement'
import CategoryTable from './shop/CategoryTable'
/*
  Index tree 
  {
      Edit:[
        { 
          LatestNews:[],
          LatestActivities:[]
        }
      ],
      Member:[
        
      ]
    }
*/

export default function AdminPage() {
  const [Indexs, setIndexs] = useState(
    {
      "網站資訊 Website Info":{ 
        expanded:false,
        subIndex:{
          "最新消息 Edit Latest News":{
            expanded:false,
            subIndex:{
            }
          },
          "最新活動 Edit Latest Activities":{
            expanded:false,
            subIndex:{
            }
          }
        }
          
      },
      "商店設定 Shop Setting":{ 
        expanded:false,
        subIndex:{
          "更改類型選項 Edit Category Option":{
            expanded:false,
            subIndex:{
            }
          },
          
        }
          
      },
      "學會設定 Socities":{ 
        expanded:false,
        subIndex:{
          "增加/更改學會 Edit Societies":{
            expanded:false,
            subIndex:{
            }
          },
          
          
        }
          
      },
      
      "會員事務 Membership":{
        expanded:false,
        subIndex:{
          "學會會員 Society Member":{
            expanded:false,
            subIndex:{
            }
          },
          "會員查詢 Society Member":{
            expanded:false,
            subIndex:{
            }
          },
          "更改會員狀態 Society Member":{
            expanded:false,
            subIndex:{
            }
          }
        }
      },
      "場地管理 Venue Management":{ 
        expanded:false,
        subIndex:{
          "建立預約 Create Booking":{
            expanded:false,
            subIndex:{
            }
          },
          "加入場地 Add New Venue":{
            expanded:false,
            subIndex:{
            }
          }
        },

          
      },
    }
  )
  const [Index, setIndex] = useState(
    
  )
  const [Tab, setTab] = useState()
  function setPage(title){
    setTab(title)
  }
  useEffect(() => {
    console.log("set Tab to", Tab)
  }, [Tab])
  
  
  return (
    <div className="w-full flex flex-row">
      <div className="w-3/12">
        <div className="p-5">
          <p className='text-start underline font-bold'>管理功能 Functions</p>
          
          
          <div className="w-full ">
            
            {
              
              Object.keys(Indexs).map(index=>{
                return <ToggleList
                  title={index}
                  subIndexs={Indexs[index]["subIndex"]}
                  onPressed={setPage}
                />
              })
              
            }
            
          </div>
        </div>
        
      </div>
      <div className="w-9/12">
        
        <div className="flex flex-col">  
            <CategoryTable/>
            <EditLastestnews/>
            {/* <button> End of Admin Page </button> */}
        </div>
      </div>

        
    </div>
    
  )
}
