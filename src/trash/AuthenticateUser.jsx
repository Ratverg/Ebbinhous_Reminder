// import { useState } from "react";

// export  function useAuthenticateUser(){
//     const [authResult, setAuthResult] = useState(false);



//     //authentication function
//     async function authenticateUser(cred){
//         //build request body for POST method
//         // const body = new URLSearchParams();
//         // body.append("username", cred.username);
//         // body.append("password", cred.password);
        
//         const res = await fetch("http://localhost:8080/api/login",{
//             method: "POST",
//             headers: { "Content-Type": "application/json" },
//             body: JSON.stringify(cred),
//             credentials: "include" // include session cookie
//         })
        
//         if (res.ok){
//             console.log("OKKK")
//             setAuthResult(true);
            
//         } else {
//             console.log(res)
//             setAuthResult(false);
//         }
//     }

//     // returns result and function
//     return {authResult, authenticateUser};
// }