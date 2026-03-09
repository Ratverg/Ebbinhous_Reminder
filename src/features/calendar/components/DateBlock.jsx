import clsx from "clsx";
import { AnimatePresence, motion } from "framer-motion";
import { useState, useEffect } from "react";
import { getTasksForDate } from "../utils/CalendarUtils";
import { ShowNotifications } from "./ShowNotification";


//simplest square "brick" for day
export function DateBlock({
    day,
    hasTasks,
    notificationList,
    monthOffset
}) {
    const [visible, setVisible] = useState(false);
    const [notificationListForDate, setNotificationListForDate] = useState([]);

    //updates for notification list, that passed to ShowNotifications 
    useEffect(() => {
        // console.log(monthOffset);
        setNotificationListForDate(getTasksForDate(day, notificationList));
    }, [notificationList, monthOffset, day]);
    return (
        <div
            className={clsx(
                "flex flex-col h-6 w-6 m-1 justify-center rounded-md relative hover:bg-surfaceMuted cursor-default",
                hasTasks
                    ? "border-[2px] border-borderFocus"
                    : "bg-mainBackGround"
            )}
            onMouseEnter={() => setVisible(true)}
            onMouseLeave={() => setVisible(false)}
        >
            <p className="text-center">{day.getDate()}</p>

            {/* opacity animation of POP UP appe */}
            <AnimatePresence>
                {
                    visible &&
                    notificationListForDate.length > 0 &&
                    (
                        <motion.nav
                            initial={{ opacity: 0, y: 0 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 0 }}
                            transition={{ duration: 0.3 }}
                        >
                            <ShowNotifications notificationListForDate={notificationListForDate} />
                        </motion.nav>
                    )}
            </AnimatePresence>
        </div>
    )
}