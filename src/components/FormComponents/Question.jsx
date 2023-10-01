import React, { useState } from 'react'
import { Dropdown,Toggle } from 'rsuite'
function Question({
    data={
        field_name:"",
        field_type:"text",
    },
    textSize = "text-lg",
    updateQuestion,
    index
}) {

        const PropertyMap = {
            field_name: "Question" ,
            field_value:"Preset Answer",
            single:"Single Answer",
            field_props:"Question Properties",
            
        }


            
        return (
            <div className="border-b border-gray-300 shadow-md shadow-gray-300 bg-white px-4 py-5 sm:px-6 ">
                <div className="flex flex-row gap-4">
                    <input 
                        type="text" 
                        name="" 
                        id="" 
                        className={`rounded-md${textSize}`}
                        placeholder='Untitled Question'
                    />
                    <select name="" id="" className={`field ${textSize}`}
                        onChange={(e)=>{updateQuestion(index,"field_type",e.target.value)}}
                    >
                        <option value="text">Text 文字</option>
                        <option value="select">Select 選項</option>
                        <option value="number">Number 數字</option>
                        <option value="file">Image 影像</option>
                        <option value="date">Date 日期</option>
                    </select>

                    {
                        data.field_type==="text"&&(
                            <Toggle
                                onChange={(v)=>{updateQuestion(index,"single",v)}}
                                checked={data.single?data.single:false}
                            />
                        )
                    }
                </div>
                
                <div className="flex flex-row justify-center gap-2">
                    <img src="/assests/img/plus-circle.png" width={25} alt="" />
                    <div className="border-l-2 border-gray-400"></div>
                    Required
                    <Toggle
                        onChange={(v)=>{updateQuestion(index,"required",v)}}
                        checked={data.required?data.required:false}
                    />
                </div>
            </div>
            
            
            
        )
    }

export default Question