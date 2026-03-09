
import clsx from "clsx";
import { AnimatePresence, motion } from "framer-motion";
import { useContext, useRef, useState } from "react";
import { NotificationDateInput } from "./NotificationDateInput";
import { NotificationDateView } from "./NotificationDateView";
import { NotificationHeader } from "./NotificationHeader";
import { NotificationWrapper } from "./NotificationWrapper";



export function UserNotification({notification}){
    //this is MAIN DATA SOURCE of "dates" and "repeats" when we change DATES or REPEAT - we change other react components
    //we will change it locally, and when we click "apply" notificationList will be updated from this source
    const [datesObj, setDates] = useState(notification.dates.map(x=>{
        // console.log(`x.sentAt - ${x.sentAt ? new Date(x.sentAt): null}  repeatDate ${x.repeatDate}`);
        return {
            "repeatDate": new Date(x.repeatDate),
            "sentAt": x.sentAt ? new Date(x.sentAt): null,
            "status": x.status
        };
    }));
    const [repeat, setRepeat] = useState(notification.repeatNumbers);

    // -------- Hide notification when clicked outside logic-----
    //reference for the notification
    const notificationRef = useRef(null);

    return (
        <div ref={notificationRef}>

            <AnimatePresence mode="popLayout">
                <motion.div
                        key={notification.editing ? "edit" : "view"}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }} // short fade
                >
                    <NotificationWrapper
                        
                        className={clsx(
                            "flex flex-col ",
                            notification.editing ? " border-borderFocus" : " border-border"
                        )}
                    >
                        <NotificationHeader {...{ notification, datesObj, setDates, repeat, setRepeat, notificationRef }} />
                        
                        {notification.editing ? (
                            <NotificationDateInput {...{ notification, datesObj, setDates, repeat, setRepeat }} />
                        ) : (
                            <NotificationDateView {...{ notification, datesObj, setDates, repeat, setRepeat }} />
                        )}
                    </NotificationWrapper>
                </motion.div>
            </AnimatePresence>
        </div>
    
    )
}