import { useState } from "react";

// VITE_BACKEND_SERVER_NAME
const backendServerName = import.meta.env.VITE_BACKEND_SERVER_NAME;

export function useCurrentUser(){
    const [currentUser, setCurrentUser] = useState(null);
    const [loginFormVisible, setLoginFormVisible] = useState(false);

    async function logoutUser(){
        const res = await fetch (`${backendServerName}/api/logout`, {
            method:"GET",
            credentials: "include"
        })
        if(res.ok){
            console.log("logged out")
            setCurrentUser(null) ;
        } else{
            console.log("log out failed")
        }
        ;
    }

    async function authenticateUser(cred){
                const res = await fetch(`${backendServerName}/api/login`,{
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(cred),
                credentials: "include" // include session cookie
            })
            
            if (res.ok){
                return true;
            } else {
                return false;
            }
        }

    async function createNewUser(cred) {
        const res = await fetch(`${backendServerName}/api/sign-up`, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(cred),
            credentials: "include"
        })    
        
        if (!res.ok) {
                console.log("in createNewUser function resnot ok")
                const data = await res.json().catch(() => ({}));
                throw new Error(JSON.stringify(data))
            }
            const createdUser = await res.json();
            console.log(createdUser);
            // setCurrentUser(createdUser);
            return createdUser;
    }

    async function getCurrentUser(){

            const res = await fetch(`${backendServerName}/api/current_user`,{
            method:"GET",
            credentials:"include"
            })
            if (!res.ok) {
                // throw new Error(`no current user, response status is: ${res.status} `)
                return null;
            }  
            const currentUser = await res.json();
            setCurrentUser(currentUser);
            return currentUser;
    }
    return {currentUser, getCurrentUser, authenticateUser, logoutUser, createNewUser,loginFormVisible, setLoginFormVisible};
}

