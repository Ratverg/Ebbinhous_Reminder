import { ActionButton } from "./ui/ActionButton";
import { NotificationManagerWrapper } from "./NotificationManagerWrapper";
import { NotificationBlock } from "./NotificationBlock";
import { useState } from "react";


// -------Task Manager Section-------
export function NotificationManager({notificationList, setNotificationList}){
    
    const [selected, setSelected] = useState([]);

    return (
        <NotificationManagerWrapper 
            className={"flex flex-col gap-2 rounded-lg items-start px-[0.5rem] flex-1 w-full bg-[#F8FAFC]"}
        >
            {/* Main title */}
            <p className="font-semibold text-xl">Notification list</p>

            {/* action buttons block */}
            <div className="flex xlex-row gap-2">
                <ActionButton text="All" color="#182433"/>
                <ActionButton text="Study" color="#3F98E1"/>
                <ActionButton text="Work" color="#ECC94B"/>
                <ActionButton text="Health" color="#48BB78"/>
            </div>

            {/* block with active notifications */}
            <NotificationBlock
                title="Active notifications"
                notificationList={notificationList}
                setNotificationList = {setNotificationList} 
                setSelected ={setSelected}
                selected = {selected}
            />
        </NotificationManagerWrapper>
    )
}
