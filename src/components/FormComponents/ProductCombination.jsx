import React, { useEffect, useState } from 'react'
import FileField from './FileField'
import { List, Toggle } from 'rsuite';
function ProductCombination({productData,update}) {
    const defaultData = [
        { text: 'Size',option:["Yellow","Green"] },
        { text: 'Color' },
    ];
    const [Option, setOption] = useState(
        productData.option?productData.option:[]
    )
    const [Data, setData] = useState(
        productData.data?productData.data:{}
    )
    const [PriceList, setPriceList] = useState([])
    useEffect(() => {
        var variantOptions = []
        for (let index = 0; index < Option.length; index++) {
            variantOptions.push(Option[index].option.map(text=>{
                return text
            }))
        }
        const l = findCombinations(variantOptions)
        console.log("l: ",l)
        setPriceList(l)
        if(!productData.data){
            update("data", {})
        }else{
            l.forEach(subProdName=>{
                const searchList = Object.keys(productData.data)
                const match =  new RegExp(`${subProdName}`,"gm") 
                if(searchList.findIndex(([val]) => match.test(val))=== -1){
                    productData.data[subProdName] = {quantity:0,price:0}
                }
            })
            update("data", productData.data)
            
        }
    }, [Option])
    
    useEffect(() => {
        if(productData.option){
            Object.keys(productData.option.map(opt=>{
                return(
                    {text:opt,option:productData.option[opt]}
                )
                }))
        }
    }, [])
    
    const [optionInput, setoptionInput] = useState("")
    const handleSortEnd = ({ oldIndex, newIndex }) =>
    setOption(prvData => {
      const moveData = prvData.splice(oldIndex, 1);
      const newData = [...prvData];
      newData.splice(newIndex, 0, moveData[0]);
      update("option", newData)
      return newData;
      
    }, []);

    function findCombinations(arrays) { 
        function backtrack(currCombination, remainingArrays) {
            if (remainingArrays.length === 0) {
                if(currCombination.join(' ')!==""){
                    combinations.push(currCombination.join(' '));//join('_')
                }
            return;
            }
        
            const currentArray = remainingArrays[0];
            for (let i = 0; i < currentArray.length; i++) {
            const element = currentArray[i];
            backtrack(currCombination.concat(element), remainingArrays.slice(1));
            }
        }
        
        const combinations = [];
        backtrack([], arrays);
        // const data = {}
        // combinations.forEach(C=>{
        //     data[C]={
        //         quantity:0,
        //         price:0,
        //     }
        // })
        // update("data",data)
        return combinations;
    }
    


    function OptionInput({option,index,updateOptionChoice}) {
        /*
            Description:This component contains 2 parts
            1.Options
                add Categories for the subporducts
            2.Choice
                Render base on Options Inputted
            3. 
        */
        const [Input, setInput] = useState("")
        console.log("optionInput",option)
        return (
                <>
                    <div className="">{option["text"]}</div>
                    <input 
                        type="text" 
                        className='w-full'
                        placeholder='e.g blue, xl , s'
                        value={Input}
                        onChange={(e)=>{
                            // console.log("input in option",e.target.value)
                            setInput(e.target.value)
                        }}
                        onKeyDown={(e)=>{ 
                            if(e.key=== 'Enter'){
                                console.log("added sub option")
                                Option[index]["option"].push(Input)
                                console.log("Updated subdata:",Option)
                                updateOptionChoice([...Option])
                                setOption([...Option])
                                setInput("")
                            }
                            
                        }}
                    />
                    <div className="flex flex-row gap-2">
                    {
                        Option[index]["option"].map((opt,i)=>{
                            return <div className="flex flex-row gap-1 " key={opt}> 
                                {opt}
                                <button className='text-red-600' 
                                    onClick={()=>{
                                        Option[index]["option"].splice(i,1)
                                        console.log("option",Option)
                                        updateOptionChoice([...Option])
                                        setOption([...Option])
                                    }}
                                >
                                    x
                                </button>
                            </div>
                        })
                    }
                    </div>
                    
                    
                </>
        )
    }
    
    return (
        <div className="flex flex-col text-xs">
            <div className="w-full grid grid-flow-row grid-cols-2 gap-2 text-sm border rounded-lg">
                <div className="">
                    <div className="">Options</div>
                    <input 
                        type="text" 
                        className='w-full'
                        placeholder='e.g size, color, type and press enter to add'
                        value={optionInput}
                        onChange={(e)=>{
                            console.log("input",e.target.value)
                            setoptionInput(e.target.value)
                        }}
                        onKeyDown={(e)=>{ 
                            if(e.key=== 'Enter'){
                                console.log("added option")
                                Option.push({text:optionInput,option:[]})
                                console.log("Option",Option)
                                update("option",[...Option])
                                
                                setOption([...Option])
                                setoptionInput("")
                            }
                            
                        }}
                    />
                    <div className="">
                        <div className="">Option Level</div>
                        <List sortable onSort={handleSortEnd}>
                            {Option.map(({ text, disabled }, index) => (
                                <List.Item 
                                    key={index} 
                                    index={index}
                                    className='border rounded-lg'
                                    size='xs'
                                >
                                    <div className="w-full flex flex-row justify-between">
                                        <div className="">
                                            {text}
                                        </div>
                                        <button
                                            onClick={()=>{
                                                Option.splice(index,1);
                                                console.log("option",Option)
                                                update("option",[...Option])

                                                setOption([...Option])
                                            }}
                                            className='text-red-600'
                                        >
                                            x
                                        </button>
                                    </div>
                                </List.Item>
                            ))}
                        </List>
                    </div>
                </div>
                
                <div className="">
                    <div className="">Choice</div>
                    {
                        Option.map((option,index)=>{ //{ text, disabled } => key in object
                            console.log("passed option",option)
                            return(
                                <OptionInput option={option} index={index}  key={`option-${index}`}
                                    updateOptionChoice={
                                        choices=>{productData["option"][index]=choices;
                                        update("option",choices)}
                                    }
                                />
                            )
                        })
                    }
                    
                    
                </div>
                
            </div>
            <div className="">
                
                <div className="grid grid-cols-4">
                    <div className="">Combination</div>
                    <div className="">Quantity</div>
                    <div className="">Price</div>
                </div>
                {/* <Variants option={productData.option?productData.option:{}} /> */}
                
                <div className="flex flex-col" >
                    {PriceList.map(v=>{
                        return (
                            <div className="grid grid-cols-4 gap-2 my-1"key={v} >
                                <div className="">{v}</div>
                                <input 
                                type="number" 
                                name="" id="" 
                                placeholder='quantity' 
                                min={0} 
                                value={productData["data"]?.[v]?.["quantity"]?productData["data"]?.[v]?.["quantity"]:0}
                                onChange={(e)=>{
                                    console.log("productData",productData,v)
                                    // var obj = productData["data"]
                                    if(!productData["data"]){
                                        productData["data"]={}
                                
                                    }
                                    if(!productData["data"][v]){
                                        productData["data"][v]={}
                                    }
                                    productData["data"][v]["quantity"]=Number(e.target.value)
                                    update("data", productData["data"])//productData["data"][v]
                                    }}
                                />
                                <input 
                                    type="number" 
                                    name="" 
                                    id="" 
                                    placeholder='price' 
                                    min={0}
                                    value={productData["data"]?.[v]?.["price"]?productData["data"]?.[v]?.["price"]:0}
                                    onChange={(e)=>{
                                        console.log("productData",productData,v)
                                        // var obj = productData["data"]
                                        if(!productData["data"]){
                                            productData["data"]={}
                                    
                                        }
                                        if(!productData["data"][v]){
                                            productData["data"][v]={}
                                        }
                                        productData["data"][v]["price"]=Number(e.target.value)
                                        update("data", productData["data"])//productData["data"][v]
                                        }}
                                />
                            </div>
                        )
                    })}
                </div>
        
            </div>
        </div>
        
    )
}


  

export default ProductCombination