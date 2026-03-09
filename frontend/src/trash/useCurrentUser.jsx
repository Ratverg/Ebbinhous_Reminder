// //async function - get current user from my API "/api/current_user"
// //we should get JSON with all info

// import { useEffect, useState } from "react";


// export function useCurrentUser(){
//     const [currentUser, setCurrentUser] = useState("null");
//     async function getCurrentUser(){
//         const res = await fetch("http://localhost:8080/api/current_user",{
//             method:"GET",
//             credentials:"include"
//         })
        
//         if (res.ok) {
//             const currentUser = await res.json();
//             setCurrentUser(currentUser);
//             console.log(currentUser);
//         } else{
//             console.log(res);
//         }
//     }
//     useEffect(()=>{
//         getCurrentUser();
//     },[])
//     return {currentUser, setCurrentUser};
// }
