/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState, useEffect, Component } from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';
import { auth } from '../utils/firebasefunction';

export default function session(){
    const [currentUser, setCurrentUser] = useState(null);
    const [User, setUser] = useState(User)
    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(async user => {
            await user.getIdToken()
            setCurrentUser(user); // Update the current user state when the auth state changes
        });

        return unsubscribe; // Unsubscribe from the onAuthStateChanged listener when the component unmounts
    }, []);
    
    return (
    <div>
        {currentUser ? (
        <p>Welcome, {currentUser.email}!</p>
        ) : (
        <p>Please sign in.</p>
        )}
    </div>
    );
}
