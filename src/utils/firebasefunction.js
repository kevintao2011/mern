import { signInWithEmailAndPassword,getIdToken,createUserWithEmailAndPassword,getAuth,signOut,sendEmailVerification } from "firebase/auth";
import { FirebaseError, initializeApp } from "firebase/app";
// import { getFirestore,doc, getDoc } from "firebase/firestore";
import { setPersistence ,browserSessionPersistence, inMemoryPersistence } from "firebase/auth";
import { getStorage , connectStorageEmulator,ref,uploadBytes,listAll,list ,getDownloadURL,deleteObject} from "firebase/storage";

// const firebaseConfig = {

//     apiKey: process.env.FIREBASE_API_KEY,

//     authDomain: process.env.FIREBASE_AUTH_DOMAIN,

//     projectId: process.env.FIREBASE_PROJECT_ID,

//     storageBucket: process.env.FIREBASE_STORAGE_BUCKET,

//     messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,

//     appId: process.env.FIREBASE_APP_ID,

//     measurementId: process.env.FIREBASE_MEASUREMENT_ID

  
//   };

/*
    ref obj example

    Object { _service: {…}, _location: {…} }

    _location: Object { bucket: "website-10a80.appspot.com", path_: "Product/207/207-30-02" }
    ​​
    bucket: "website-10a80.appspot.com"
    ​​
    path_: "Product/207/207-30-02"
    ​​
    <prototype>: Object { … }
    ​
    _service: Object { _firebaseVersion: "9.23.0", _host: "127.0.0.1:9199", _protocol: "http", … }
    ​
    <prototype>: Object { … }
    EditProduct.jsx:102


*/
const firebaseConfig = {

    apiKey: "AIzaSyDbbnw-dv3GdWcL80A3ArLuYG4XADXpQWU",

    authDomain: "website-10a80.firebaseapp.com",

    projectId: "website-10a80",

    storageBucket: "website-10a80.appspot.com",

    messagingSenderId: "624906044728",

    appId: "1:624906044728:web:4b40d4983a0b146ed7edcd",

    measurementId: "G-PJ8LEQ6M7W"


};
  

export const app = initializeApp(firebaseConfig)
export const auth = getAuth(app);
// setPersistence(auth, inMemoryPersistence)
// auth.setPersistence()
setPersistence(auth, browserSessionPersistence)

// firebase cloud storage 
export const storage = getStorage();
connectStorageEmulator(storage, "127.0.0.1", 9199);

export async function uploadFile(dir,filename,file,limitKb=2000){
    const storage = getStorage();
    console.log("file",file)
    const storageRef = ref(storage,`${dir}${filename}.${file.type.split('/')[1]}`);
    console.log("file size",file.size/1000,"kb < ",limitKb)
    if(file.size/1000<limitKb){
        return await uploadBytes(storageRef, file).then(async (snapshot) => {
            console.log('Uploaded  a blob or file!',snapshot.ref);
            console.log(snapshot)
            return await getDownloadURL(snapshot.ref)
        });
    }else{
        console.log("fileSize Exceeded")
    }

}

export async function deleteFile(dir,filename){
    const storage = getStorage();
    const storageRef = ref(storage,`${dir}${filename}`);
    try{
        return await deleteObject(storageRef)
    }catch{
        console.log("no this file")
    }
    
}

export async function uploadFormImageFiles(e,dir,filename,limitKb=2000){
    const storage = getStorage();
    connectStorageEmulator(storage, "127.0.0.1", 9199);
    e.preventDefault()
    const form = e.target;
    const formData = new FormData(form);
    console.log("formData",formData)
    var files = Object.entries(Object.fromEntries(formData.entries()))

    // find max index 
    var max=0

    // list all previous files
    return await listAll(ref(storage,dir)).then(async result=>{
            
        console.log("storageresult",result.items)
        //find current max index before upload
        result.items.forEach(item=>{
            if(item.name.includes(filename)&&(parseInt(item.name.split("-")[1].split(".")[0])>max)){
                max = parseInt(item.name.split("-")[1].split(".")[0])
            }
        })
        console.log("max",max)
        if(result.items.length!==0){
            max++
        }
        var urlList = []
        // upload image
        for (const file of files) {
            if(file[1] instanceof File && file[1].type.includes("image")){
                console.log("files.image",file[1])
                // uploadBytes(storageRef, file).then((snapshot) => {
                //     console.log('Uploaded  a blob or file!');
                //     console.log(snapshot)
                    
                // });
                const UploadResult = await uploadBytes(ref(storage,`${dir}${filename}-${max}`),file[1])
                
                console.log("uploaded",`${filename}-${max}`);
                max++;
                const url = await getDownloadURL(UploadResult.ref)
                const obj = {[`${filename}-${max}`]:url}
                console.log("obj",obj);
                urlList.push(obj)
            }      
        }
        return urlList
    })
    
    

}

export function checkFileSize(e,limitinKb){
    const file = e.target.files[0];
    console.log("e.target",e.target.files[0])
    
    // const file = Object.fromEntries(formData.entries()) 
    console.log(file)
    if(file.size/1024 > limitinKb){ 
        console.log("too large!") 
        e.target.value = null;
    }
    
} 
// firebase cloud storage 
/*
const paragraph = 'http://127.0.0.1:9199/v0/b/website-10a80.appspot.com/o/Product%2F207%2Fundefined%2Fimg-0.webp?alt=media&token=40b705fb-60e9-4d92-93c7-e75f4b693672';
const regex = /img-\w/g;
const found = paragraph.match(regex);
*/
export function analyzeURL(url,target){
    //e.g http://127.0.0.1:9199/v0/b/website-10a80.appspot.com/o/Product%2F207%2Fundefined%2Fimg-0.webp?alt=media&token=40b705fb-60e9-4d92-93c7-e75f4b693672
    var regex
    switch (target) {
        
        case "filename":
            regex = /img-\w/g;
            return url.slice(url.search(regex)).split("?")[0]
        case "dir":
            regex = /Product/g;
            return url.slice(url.search(regex)).split("?")[0].replaceAll("%2F","/")
        case "index":
            regex = /img-\w/g;
            return url.slice(url.search(regex)).split(".")[0].split("-")[1]
        default://dir
            regex = /Product/g;
            return url.slice(url.search(regex)).split("?")[0].replaceAll("%2F","/")
    }
    
    
} 





export async function loginfirebase(email,password){
    
    
    console.log('function loginfirebase');
    console.log(app.options);
    
    const userCredential = await signInWithEmailAndPassword(auth,email,password);
    
    return userCredential;
    
}


export async function logOutfirebase(){
    // const a = getAuth(app)
    console.log("signOut")
    await signOut(auth).then(() => {
        // Sign-out successful.
        return true;
    }).catch((error) => {
        // An error happened.
        return false;
    });
    
}
export async function register (email,password){
    
    var result;
  
    try{
        result = await createUserWithEmailAndPassword(auth, email, password);
        console.log("account has been registered");
        sendEmailVerification(result.user);
        return true
    }
    catch(e){

        console.log("function logOutfirebase Error:",e.code);
        throw e;
        
    }
    
}

