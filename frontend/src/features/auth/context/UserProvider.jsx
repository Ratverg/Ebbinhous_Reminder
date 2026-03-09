import { createContext, useEffect } from "react";
import { useCurrentUser } from "../api/UserAPIUtils";

//create an empty UserContext
export const UserContext = createContext(null);

export function UserProvider({children}){
    
    //import customHook
    const {currentUser, getCurrentUser, authenticateUser, logoutUser, createNewUser,loginFormVisible, setLoginFormVisible} = useCurrentUser() ;

    //wrapper with UserContext.Provider, so anybody can have it in all sub-children
    return (
        <UserContext.Provider value={{
            currentUser,
            getCurrentUser,
            authenticateUser,
            logoutUser,
            createNewUser,
            loginFormVisible,
            setLoginFormVisible
        }}>
            {children}
        </UserContext.Provider>
    )
}