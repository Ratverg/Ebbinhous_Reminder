import { NotificationWrapper } from "./NotificationWrapper";
import { NotificationHeader } from "./NotificationHeader";
import { NotificationDateInput } from "./NotificationDateInput";
import { NotificationDateView } from "./NotificationDateView";
import { motion} from "framer-motion";
import clsx from "clsx";

export function UserNotification({
    notification,
    selected,
    setSelected,
    notificationList,
    setNotificationList,
    hashtagList,
    setHashtagList
}){
    return (

        <NotificationWrapper
            className={clsx(
                "flex flex-col gap-3",
                notification.editing
                    ? " border-blue-400" 
                    : " border-[#E6EBF2]"   
                )
            }
        >


            {/*Notification input/view blocks */}
            <motion.div
            key={notification.editing ? "edit" : "view"}
            layout
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.75 }}
            >
            {/*Notification header block */}
            <NotificationHeader {...{
                notification,
                selected,
                setSelected,
                notificationList,
                setNotificationList,
                hashtagList,
                setHashtagList
                }}
            />

            {notification.editing
                ? <NotificationDateInput {...{ notification, setNotificationList }} />
                : <NotificationDateView {...{ notification }} />}
            </motion.div>
        </NotificationWrapper>

    )
}