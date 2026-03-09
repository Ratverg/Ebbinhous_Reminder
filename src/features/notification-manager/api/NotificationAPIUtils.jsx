import { color } from "framer-motion";
import { useState } from "react";

// VITE_BACKEND_SERVER_NAME
const backendServerName = import.meta.env.VITE_BACKEND_SERVER_NAME;

export function useNotificationList() {
    const [notificationList, setNotificationList] = useState([]);
   
    async function getNotifications(user) {

        //return empty list if userID is null
        if (user === null) {
            setNotificationList([]);
            return;
        }
        //get notification list from API
        const res = await fetch(`${backendServerName}/api/users/${user.id}/notifications`,{
            method: "GET",
            credentials:"include"
        })

        if (res.ok){
            const list = await res.json();
            setNotificationList(list);
            return true;
        } else{
            return false;
        }
    }

   
    async function getNotification(user, notification) {

        //return empty list if userID is null
        if (user === null || notification === null) {
            return;
        }
        //get notification list from API
        const res = await fetch(`${backendServerName}/api/users/${user.id}/notifications/${notification.id}`,{
            method: "GET",
            credentials:"include"
        })

        if (res.ok){
            const notification = await res.json();
            return notification;
        } else{
            return false;
        }
    }

    async function addNotification (userId, notification) {

        //adds notification to user
        const res = await fetch(`${backendServerName}/api/users/${userId}/notifications`,
            {
                method: "POST",
                headers: { "Content-Type": "application/json"},
                body: JSON.stringify(notification),
                credentials:"include"
            })
        //this returns saved notification from DB (it will have ID) 
        const notificationFromDB = await res.json();

        //update notificationList locally, with notification, saved and returned from DB 
        //"prev => [...prev, value]" prev - is old, current state, we destruct it and add new value 
        setNotificationList(prev => [...prev, notificationFromDB]);
    }



    async function updateNotification (userId, notification) {


        //CREATE notificationList that will be passed to backEnd ("notification" and all other notification with the same hashtag and different color)
        const notificationListToUpdate = [notification];

        //CREATE local list with all updateds
        const localNotificationList = notificationList
                //update notification we passed
                .map(n=>n.id === notification.id ? notification : n)
                //update colors of all notifications with the same hashtag
                .map(n => {
                    if (n.hashTag === notification.hashTag && n.hashTag !="" && n.color != notification.color) {
                        const tempNotification = {...n, color: notification.color};
                        notificationListToUpdate.push(tempNotification);
                        return tempNotification;
                    } else {
                        return n;
                    }
                })

        
        //UPDATE locally this list
        setNotificationList (localNotificationList);

        //UPDATE all notification in the DB one by one
        for (const curr of notificationListToUpdate) {
            if (curr.id != null){
                // console.log(curr);
                const res = await fetch(`${backendServerName}/api/users/${userId}/notifications/${curr.id}`,
                {
                    method: "PUT",
                    headers: { "Content-Type": "application/json"},
                    body: JSON.stringify(curr),
                    credentials:"include"
                })
            } else {
                throw new Error("notification in notificationListToUpdate id === null");
            }
        }

        //TODO delete this!!!!!!1
        //UPDATE our main passed modified "notification" in DB
        // if (notification.id !=null){
        //     // console.log(notification);
        //     const res = await fetch(`http://localhost:8080/api/users/${userId}/notifications/${notification.id}`,
        //         {
        //             method: "PUT",
        //             headers: { "Content-Type": "application/json"},
        //             body: JSON.stringify(notification),
        //             credentials:"include"
        //         })
        //     const notificationFromDB = await res.json();
        //     } else {
        //          throw new Error("passed notification id === null");
        //     }
    }

    async function deleteNotification(userId, notificationId){

        //delete notification
        await fetch(`${backendServerName}/api/users/${userId}/notifications/${notificationId}`,
            {
                method: "DELETE",
                credentials:"include"
            })
        //update notificationList locally
        setNotificationList(prev => prev.filter(x=>x.id != notificationId))
    }

    return {notificationList, getNotifications, getNotification, addNotification, deleteNotification, updateNotification};
}