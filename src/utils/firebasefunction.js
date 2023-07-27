import { signInWithEmailAndPassword,getIdToken,createUserWithEmailAndPassword,getAuth,signOut,sendEmailVerification } from "firebase/auth";
import { FirebaseError, initializeApp } from "firebase/app";
// import { getFirestore,doc, getDoc } from "firebase/firestore";
import { setPersistence ,browserSessionPersistence, inMemoryPersistence } from "firebase/auth";
import { getStorage , connectStorageEmulator,ref,uploadBytes,listAll,list ,getDownloadURL,deleteObject} from "firebase/storage";

// const firebaseConfig = {
//     apiKey: process.env.FIREBASE_apikey,

//     authDomain: process.env.FIREBASE_authDomain,

//     projectId: process.env.FIREBASE_projectId,

//     storageBucket: process.env.FIREBASE_storageBucket,

//     messagingSenderId: process.env.FIREBASE_messagingSenderId,

//     appId: process.env.FIREBASE_appId,

//     measurementId: process.env.FIREBASE_measurementId

// };
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

export async function uploadFile(dir,filename,file,storage){
    const storageRef = ref(storage,`${dir}${filename}`);
    console.log("file size",file.size/1000,"kb")
    return await uploadBytes(storageRef, file).then(async (snapshot) => {
        console.log('Uploaded  a blob or file!',snapshot.ref);
        console.log(snapshot)
        return await getDownloadURL(snapshot.ref)
    });
}

export async function deleteFile(dir,filename,storage){
    const storageRef = ref(storage,`${dir}${filename}`);
    try{
        return await deleteObject(storageRef)
    }catch{
        console.log("no this file")
    }
    
}

export async function uploadFormImageFiles(e,dir,filename){
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

