import { signInWithEmailAndPassword,getIdToken,createUserWithEmailAndPassword,getAuth,signOut,sendEmailVerification } from "firebase/auth";
import { FirebaseError, initializeApp } from "firebase/app";
// import { getFirestore,doc, getDoc } from "firebase/firestore";
import { setPersistence ,browserSessionPersistence, inMemoryPersistence } from "firebase/auth";

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

