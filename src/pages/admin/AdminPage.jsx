import React, { useEffect, useState } from 'react'
import EditLastestnews from './EditLastestnews'
import SearchField from '../../components/FormComponents/SearchField'
import ToggleList from './ToggleList'

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
      Edit:{ 
        expanded:false,
        subIndex:{
          News:{
            expanded:false,
            subIndex:{
            }
          },
          Activities:{
            expanded:false,
            subIndex:{
            }
          }
        }
          
      },
      Member:{
        expanded:false,
        subIndex:{
          Society:{
            expanded:false,
            subIndex:{
            }
          }
        }
      }
    }
  )
  const [Index, setIndex] = useState(
    
  )
  const [Tab, setTab] = useState()
  return (
    <div className="w-full flex flex-row">
      <div className="w-3/12">
        <div className="p-5">
          <p className='text-start underline font-bold'>管理功能 Functions</p>
          <ul>
            <li>
              <div className="p-1 rounded-lg bg-gray-100">
                <p className='text-base'>Edit Latest News </p>
              </div>
            </li>
          </ul>
          
          <div className="w-full ">
            
            {
              
              Object.keys(Indexs).map(index=>{
                return <ToggleList
                  title={index}
                  subIndexs={Indexs[index]["subIndex"]}
                />
              })
              
            }
            
          </div>
        </div>
        
      </div>
      <div className="w-9/12">
        
        <div className="flex flex-col">
          <div className="">
            <button className='bg-su-green p-2 rounded-lg text-white '>
              Edit Products/Activities 
            </button>
          </div>
            
            <EditLastestnews/>
            {/* <button> End of Admin Page </button> */}
        </div>
      </div>

        
    </div>
    
  )
}
