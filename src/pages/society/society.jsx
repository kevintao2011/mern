import React from 'react'
import { useParams } from 'react-router-dom'

console.log("society Page")
const Society = () => {
    const {id} = useParams();
    return (
        <div>Society {id}</div>
    )
}

export default Society