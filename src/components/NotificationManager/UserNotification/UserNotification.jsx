import { NotificationWrapper } from "./NotificationWrapper";
import { NotificationHeader } from "./NotificationHeader";
import { NotificationDateInput } from "./NotificationDateInput";
import { NotificationDateView } from "./NotificationDateView";
import { useState } from "react";
import { motion} from "framer-motion";
import clsx from "clsx";

export function UserNotification({notification, selected, setSelected, setNotificationList}){
    const [editing, setEditing] = useState(false);
    return (

        <NotificationWrapper className={clsx("flex flex-col gap-3")}>

            {/*Notification header block */}
            <NotificationHeader {...{notification, selected, setSelected, setNotificationList, editing, setEditing}}/>

            {/*Notification input/view blocks */}
            <motion.div
            key={editing ? "edit" : "view"}
            layout
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.75 }}
            >
            {editing
                ? <NotificationDateInput {...{ notification, setNotificationList }} />
                : <NotificationDateView {...{ notification }} />}
            </motion.div>
        </NotificationWrapper>

    )
}