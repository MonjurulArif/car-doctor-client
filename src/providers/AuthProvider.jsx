// import React from 'react';

import { createContext, useEffect, useState } from "react";
import { GoogleAuthProvider, createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
import app from "../firebase/firebase.config";

export const AuthContext = createContext();
const auth = getAuth(app);

//whoever uses AuthProvider will access every element(children) inside of it
const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const googleProvider = new GoogleAuthProvider();

    const createUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    };

    const signIn = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    };

    const googleSignIn = () => {
        setLoading(true);
        return signInWithPopup(auth, googleProvider);
    };

    const logOut = () => {
        setLoading(true);
        return signOut(auth);
    };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUSer) => {
            setUser(currentUSer);
            console.log("current user in auth provider", currentUSer);
            setLoading(false);
            if (currentUSer && currentUSer.email) {
                const loggedUser = {
                    email: currentUSer.email,
                };
                // fetch("http://localhost:5000/jwt", {
                fetch("https://car-doctor-server-phi-one.vercel.app/jwt", {
                    method: "POST",
                    headers: {
                        "content-type": "application/json",
                    },
                    body: JSON.stringify(loggedUser),
                })
                    .then((res) => res.json())
                    .then((data) => {
                        console.log("jwt response", data);
                        //Warning: Local storage is not the best(second best place) to store access token
                        localStorage.setItem("car-access-token", data.token);
                        // navigate(from, { replace: true });
                    });
            } else {
                localStorage.removeItem("car-access-token");
            }
        });
        return () => {
            return unsubscribe();
        };
    }, []);

    const authInfo = {
        user,
        loading,
        createUser,
        signIn,
        googleSignIn,
        logOut,
    };

    return <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
