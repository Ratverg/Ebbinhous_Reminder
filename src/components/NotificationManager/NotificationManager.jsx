import { ActionButton } from "./ui/ActionButton";
import { NotificationManagerWrapper } from "./NotificationManagerWrapper";
import { NotificationBlock } from "./NotificationBlock";
import { useState } from "react";


// -------Task Manager Section-------
export function NotificationManager({
    notificationList,
    setNotificationList
}){
    
    const [selected, setSelected] = useState([]);

    return (
        <NotificationManagerWrapper 
            className={"flex flex-col gap-2 rounded-lg items-start px-[0.5rem] flex-1 w-full bg-[#F8FAFC]"}
        >
            {/*Block with notification manager*/}
            <NotificationBlock
                {...{
                    notificationList,
                    setNotificationList,
                    selected,
                    setSelected
                }}
            />
        </NotificationManagerWrapper>
    )
}
