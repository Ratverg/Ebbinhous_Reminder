import { useState } from "react"

// VITE_BACKEND_SERVER_NAME
const backendServerName = import.meta.env.VITE_BACKEND_SERVER_NAME;

export function useTGBotUtils() {
    const [tgUserInfo, setTGUserInfo] = useState(null);
    const [deepLink, setDeepLink] = useState(null)
    const [botHealth, setBotHealth] = useState(null)

    async function getTGUserInfo(user) {
        // returns {'authCodeTemp': '5KM89W', 'telegramId': 922102960, 'chatId': 922102960}
        if (user === null) {
            setTGUserInfo(null);
            return;
        }
        //get tgUserInfo from back
        try{
            const res = await fetch (`${backendServerName}/api/get-current-tg-user`,{
                method:"GET",
                credentials:"include"
            });
            if (res.status === 200){
                const data = await res.json();
                // console.log (`res.status = ${res.status}`)
                // console.log(res);
                setTGUserInfo(data)
            } else {
                // console.log (`res.status = ${res.status}`)
                // console.log(res);
                setTGUserInfo(null)
            }
        } catch (e) {
            console.error("Failed to fetch TG user info", e);
            setTGUserInfo(null);
        }
    }

    async function getDeepLink(user) {
        // returns {'authCodeTemp': '5KM89W', 'telegramId': 922102960, 'chatId': 922102960}
        if (user === null) {
            setDeepLink(null);
            return;
        }
        //get tgUserInfo from back
        const res = await fetch (`${backendServerName}/api/generate-deep-link`,{
            method:"GET",
            credentials:"include"
        });
        //if response is ok
        if (res.ok) {
            const data = await res.json();
            setDeepLink(data)
            return data;
        }
        return null;
    }

    async function getBotHealth() {
        // returns {'authCodeTemp': '5KM89W', 'telegramId': 922102960, 'chatId': 922102960}
            // if (user === null) {
            //     setBotHealth(null);
            //     return;
            // }
        //get tgUserInfo from back
        const res = await fetch (`${backendServerName}/api/tg-health`,{
            method:"GET",
            credentials:"include"
        });
        //if response is ok
        if (res.ok) {
            const data = await res.json();
            setBotHealth(data)
        }
    }
    async function deleteCurrentTGAccount(user) {
        // returns {'authCodeTemp': '5KM89W', 'telegramId': 922102960, 'chatId': 922102960}
        if (user === null) {
            setTGUserInfo(null);
            return;
        }
        //delete tgUserInfo from back
        try{
            const res = await fetch (`${backendServerName}/api/delete-current-tg-user`,{
                method:"DELETE",
                credentials:"include"
            });
            if (res.status === 200){
                console.log("Account successfully deleted.");
                return true;
            } else {
                console.error("Failed to delete account, response not 200");
                return false;
            }
        } catch (e) {
            console.error("Failed to delete TG user ", e);
            return false;
        }

    }
    return {tgUserInfo, getTGUserInfo, deepLink, getDeepLink, botHealth, getBotHealth, deleteCurrentTGAccount}
}