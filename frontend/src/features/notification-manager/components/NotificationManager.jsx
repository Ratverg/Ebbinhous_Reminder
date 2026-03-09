
import { NotificationManagerWrapper } from "./NotificationManagerWrapper";
import { NotificationBlock } from "./NotificationBlock";
import { useContext, useState } from "react";
import { UserContext } from "../../auth/context/UserProvider";
import { NotificationContext } from "../context/NotificationProvider";


// -------Task Manager Section-------
export function NotificationManager() {
    return (
        <NotificationManagerWrapper
            className={"flex flex-col gap-2 rounded-lg items-start px-[0.5rem] bg-surface"}
        >
            {/*Block with notification manager*/}
            <NotificationBlock/>
        </NotificationManagerWrapper>
    )
}


