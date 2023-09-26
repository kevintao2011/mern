import React from 'react'

function FileField({imgs, fieldTitle, updatePhoto,index,single}) {
  function updatefileList(files){
    // const f = new File(files[0],files[0].name)
    // console.log(`uploading ${f} to ${imgs}`)
    if(single){
        return [files[0]]
    }else{
      return [...imgs,files[0]]
    }
  }
  return (
    <div className="">
      <div className="">{fieldTitle}</div>
      <div className="flex flex-row">
        {
          imgs.map((img,i)=>{
            console.log("showing img",img)
            return(
              <img 
                src={URL.createObjectURL(img)} 
                alt="" 
                width="100"
                height="100"
              />
            )
          })
        }
      </div>
      
      <input 
          className=' border w-full p-1 block rounded-md shadow  focus:border-blue-400 '
          id={"img"}
          type={"file"} 
          onChange={(e)=>{updatePhoto(index,updatefileList(e.target.files));}}
          // onChange={(e)=>{console.log(e.target.files)}}
      />
    </div>
    
  )
}

export default FileField