import React from 'react'
import EditLastestnews from './EditLastestnews'
export default function AdminPage() {
  return (
    <div className="w-full">
        <div className="flex flex-col">
            <button className='bg-su-green p-1 rounded-lg'> Edit Products/Activities </button>
            <EditLastestnews/>
            <button> End of Admin Page </button>
        </div>
    </div>
    
  )
}
