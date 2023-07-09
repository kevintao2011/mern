import React from 'react'
import { useParams } from 'react-router-dom'

console.log("society Page")
const Society = () => {
    const {code} = useParams();
    return (
        <div>Society {code}</div>
    )
}

export default Society