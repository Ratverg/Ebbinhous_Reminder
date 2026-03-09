import { createContext, useEffect, useState } from "react";
import { useNotificationList } from "../api/NotificationAPIUtils";
import { getHashtagList } from "../../../utils/CustomHooks";

//create empty NotificationContext
export const NotificationContext = createContext(null);

// {children} - system React component, that represent nested components
export function NotificationProvider({ children }) {
    //import custom hook
    //get {notificationList, getNotifications, addNotification, deleteNotification, updateNotification}
    const {
        notificationList,
        getNotifications,
        getNotification,
        addNotification,
        deleteNotification,
        updateNotification
    } = useNotificationList();

    //array of selected notifications, for fast-editing, or deleting
    const [selected, setSelected] = useState([]);

    //current hashtag for fast-filtering set to "All" by default
    const [currentHashtag, setCurrentHashtag] = useState("All");

    //hashtag list generated from notification list hastag object is {hashtag: "name", color: "#123"}
    const hashtagList = getHashtagList(notificationList);

    //create values we pass to context
    const values = {
        notificationList,
        getNotifications,
        getNotification,
        addNotification,
        deleteNotification,
        updateNotification,
        selected,
        setSelected,
        currentHashtag,
        setCurrentHashtag,
        hashtagList
    }

    return (
        //Bind all notification functions "values" to main React Context
        <NotificationContext.Provider value={values}>
            {children}
        </NotificationContext.Provider>
    )
}