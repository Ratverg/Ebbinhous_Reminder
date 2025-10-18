import { ThreePointButtonWithMenu } from "../ui/ThreePointButtonWithMenu";
import { RadioButtonV1 } from "../ui/RadioButtonV1";
import { HashTagButton } from "../ui/HashtagButton";
import { NotificationHashTagSelector } from "./NotificaitonHashTagSelector";
import { useState } from "react";
import clsx from "clsx";


export function NotificationHeader({
    notification,
    selected,
    setSelected,
    notificationList,
    setNotificationList,
    hashtagList,
    setHashtagList
}){

    const [title, setTitle] = useState(notification.title);

    //handler that update notification list with "updated notification" as input
    const handleUpdateNotificationList = (updatedNotification) => {
        setNotificationList(prevList =>
            prevList.map(n =>
                n.id === updatedNotification.id ? updatedNotification : n
            )
        );
    };
    
    return(
        <div className={clsx("flex flex-row w-full justify-between gap-2 items-center relative")}>
            
            {/* radiobutton */}
            <RadioButtonV1 selected={selected} setSelected={setSelected} notification={notification}/>
            
            {/* Show hashtag button OR edit hashtag button */}
            
            

            {/* hashtag selector */}
            {notification.editing
                ?<NotificationHashTagSelector 
                    {...{
                        notification,
                        notificationList,
                        setNotificationList,
                        hashtagList,
                        setHashtagList
                    }}
                />
                : <HashTagButton
                    text={`#${notification.hashTag}`}
                    color={notification.color}
                />
            }
           
            {/* notification title */}
            {notification.editing
                ?<input
                    type="text"
                    value = {title}
                    onChange={(e)=>setTitle(e.target.value)}
                    onKeyDown={(e)=>{
                            if (e.key === "Enter") {
                                handleUpdateNotificationList({...notification, title: title});
                            }
                        }
                    }
                    onBlur={()=>{handleUpdateNotificationList({...notification, title: title})}}
                    className="
                        text-sm font-semibold text-gray-600
                        bg-transparent rounded-md
                        m-0 p-0 px-1
                        h-[1.5rem] leading-[1.5rem] w-full
                        border-2 border-gray-400
                        outline-none
                        focus:border-blue-400 focus:text-black
                    "
                />
                : <p
                    className="
                    text-sm font-semibold text-gray-600
                    bg-transparent rounded-md
                    m-0 p-0 px-1
                    h-[1.5rem] leading-[1.5rem] w-full
                    outline-none
                    "
                >
                    {notification.title}
                </p>
            }

            {/* three point button */}
            <ThreePointButtonWithMenu  {...{notification, setNotificationList}}/>
        </div>
    )
}