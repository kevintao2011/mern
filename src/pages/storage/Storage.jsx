import React,{useEffect,useState} from 'react'
import { storageRef } from '../../utils/firebasefunction'
import { getStorage, ref, listAll,getDownloadURL,connectStorageEmulator,uploadBytes} from "firebase/storage";
import { uploadFormImageFiles } from '../../utils/firebasefunction';
const Storage = () => {
    const [Download, setDownload] = useState([])
    async function handleSubmit(e){
        await uploadFormImageFiles(e,"Test/","Image").then((urls)=>{
            console.log("urls",urls)
        })        
    }
    function checkFileSize(e,limitinKb){
        const file = e.target.files[0];
        console.log("e.target",e.target.files[0])
        
        // const file = Object.fromEntries(formData.entries()) 
        console.log(file)
        if(file.size/1024 > limitinKb){ 
            console.log("too large!") 
            e.target.value = null;
        }
        
    } 
    async function fetchstorage(){
        const storage = getStorage();
        connectStorageEmulator(storage, "127.0.0.1", 9199);
        const storageRef = ref(storage,"/Test/");
        console.log("storageRef",storageRef)
        await listAll(storageRef).then(async result=>{
            
            
            console.log("storageresult",result.items)
            //filter
            result.items=result.items.filter(item=>
                item.name.includes("Image")
            )
            var max=0
            result.items.forEach(item=>{
                console.log(item.name)
                if(parseInt(item.name.split("-")[1].split(".")[0])>max){
                    max = parseInt(item.name.split("-")[1].split(".")[0])
                }
            })
            console.log("max",max)
            //get downloadURL
            await Promise.all(
                result.items.map(async img=>{
                    
                    return await getDownloadURL(img)
                    
                })
            ).then(list=>{
                console.log("list",list)
                setDownload(list)
            })
            
            
            

        })
            
        

    }

    
    useEffect(() => {
        fetchstorage()
     
    
        
    }, [])
    

  return (
    
    <div>
        <p>Storage</p>
        <div className="">
        {
           Download&&(
                Download.map(url=>{
                    console.log("displaying image fetched from",url)
                    return(
                        <img src={url} alt="" height={300} width={300}/>
                    )
                })
           )
        }
        </div>
        <form action="" onSubmit={(e)=>handleSubmit(e)}>
            <label for="image-upload">Upload an image:</label>
            <input type="file" alt='poster' name="image1" id="image-upload" accept=".jpg, .jpeg, .png" onChange={(e)=>{checkFileSize(e,100)}} />
            <button type='submit' >submit</button>

            <label for="text">text</label>
            <input type="text" alt='poster' name="text" id="text" accept=".jpg, .jpeg, .png"/>
            <button type='submit' >submit</button>

            <label for="image-upload2">Upload an image:</label>
            <input type="file" alt='poster' name="image2" id="image-upload2" accept=".jpg, .jpeg, .png" onChange={(e)=>{checkFileSize(e);}}/>
            <button type='submit' >submit</button>
        </form>
        
            
        
    </div>
        
    
    
  )
}

export default Storage