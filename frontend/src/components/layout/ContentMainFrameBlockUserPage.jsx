import { useContext, useEffect } from "react";
import { NotificationManager } from "../../features/notification-manager/components/NotificationManager";
import { NotificationContext } from "../../features/notification-manager/context/NotificationProvider";
import { CalendarBlock } from "../../features/calendar/components/CalendarBlock";
import { TGBotContext } from "../../features/tg-bot/context/TGBotProvider";
import { TGBotBlock } from "../../features/tg-bot/components/TGBotBlock";
import { UserContext } from "../../features/auth/context/UserProvider";

function ContentMainFrameBlockUserPage({ }) {
    //Extract notification state and actions from ReactContext
    const { notificationList, getNotifications, addNotification, deleteNotification, updateNotification } = useContext(NotificationContext);
    //Extract user state and actions from ReactContext
    const { currentUser, getCurrentUser } = useContext(UserContext);
    //Extract TG bot state from Reactcontext
    const {tgUserInfo, getTGUserInfo, deepLink, getDeepLink, botHealth, getBotHealth, deleteCurrentTGAccount} = useContext(TGBotContext)


    //Load INITIAL notification list, when "currentUser" changed null => not null, for example.
    useEffect(() => {
        //Fetch notifications for current authenticated user, only if it is exists
        getNotifications(currentUser);
    }, [currentUser])
    
    //Load currentUser, when page loaded (component mount) 
    useEffect(() => {
        getCurrentUser();
    }, [])

    return (
        // div of MAIN page
        <div className="
            z-20
            bg-surfaceMuted/70 text-text rounded-2xl
            flex gap-8
            flex-col md:flex-row
            px-4 py-8
            mx-0 md:mx-5 lg:mx-32  
        ">
            {/*container of LEFT part*/}
            {/* flex-grow - to grow it as wide, as it possible */}
            <div className="
                flex-grow
            ">
                <NotificationManager/>
            </div>

            {/*container of RIGHT part*/}
            {/* flex-shrink-0 - this is to prevent from shrinking when test on the LEFT side take a lot of space*/}
            <div className="
                flex flex-col flex-shrink-0 items-center
                gap-8
            ">
                
                <CalendarBlock
                    {...{
                        notificationList
                    }}
                />
                <TGBotBlock
                    {...{
                        notificationList,
                        currentUser,
                        tgUserInfo,
                        getTGUserInfo,
                        deepLink,
                        getDeepLink,
                        botHealth,
                        getBotHealth,
                        deleteCurrentTGAccount
                    }}
                />
            </div>
        </div>
    )
}
export default ContentMainFrameBlockUserPage;







