/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState, useEffect, Component } from 'react';
import 'firebase/auth';
import { auth } from '../utils/firebasefunction';

//handle refresh 
// export default function session(){
//     const [currentUser, setCurrentUser] = useState(auth.currentUser);
//     useEffect(() => {
//         const unsubscribe = auth.onAuthStateChanged(async user => {
//             await user.getIdToken()
//             setCurrentUser(user); // Update the current user state when the auth state changes
//         });

//         return unsubscribe; // Unsubscribe from the onAuthStateChanged listener when the component unmounts
//     }, []);
    
//     return (
//     <div>
//         {currentUser.emailVerified ? (
//         <p>Welcome, {currentUser.email}!</p>
//         ) : (
//         <p>Please verify the email before using the system.</p>
//         )}
//     </div>
//     );
// }
