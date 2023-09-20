import React from 'react'
import NewCreateProduct from '../product/NewCreateProduct'
function EditMembership() {
  return (
    <div className="w-full flex flex-col">
        <div className="text-start">
            <p>Membership</p>
        </div>
        <NewCreateProduct
            product_type={"會籍 Membership"}
            
        />
    </div>
  )
}

export default EditMembership