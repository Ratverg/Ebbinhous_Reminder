import { UserNotification } from "./UserNotification";
import { ActionButton } from "../../../components/ui/ActionButton";
import { motion, AnimatePresence } from "framer-motion";
import { useContext, useEffect, useState } from "react";
import { generateDates } from "../../../utils/DatesUtils";
import { X } from "lucide-react";
import clsx from "clsx";
import { createDefaultNotification } from "../../../utils/CustomHooks";
import { UserContext } from "../../auth/context/UserProvider";
import { NotificationContext } from "../context/NotificationProvider";


// -------NOTIFICATION BLOCK-------
export function NotificationBlock() {
    const {currentUser} = useContext(UserContext);
    const {notificationList, addNotification, deleteNotification, selected, setSelected, hashtagList, currentHashtag, setCurrentHashtag} =useContext(NotificationContext);

    //handler - DELETE selected notification
    const handleDeleteSelected = () => {
        //delete each selected notification by id
        selected.forEach((id) => {
            deleteNotification(currentUser.id, id);
        })
        setSelected([]);
    }

    //handler - CREATE NEW notification
    const handleCreateNewNotification = () => {
        //new notification with default parameters
        addNotification(currentUser.id, createDefaultNotification(notificationList));
    }

    return (
        <div
        className={clsx(
            "flex flex-col gap-2 px-0 py-0 rounded-lg w-full items-start",
        )}>

            {/* block title */}

            <p className="font-medium">Notification list</p>

            {/* notifications filter  buttons */}
            <div className="flex flex-row gap-2">
                {hashtagList.map((hashtag, i) => (
                    // console.log(hashtag)
                    <ActionButton
                        key={i}
                        text={hashtag.hashtag}
                        color={hashtag.color}
                        active={currentHashtag === hashtag.hashtag}
                        onClick={() => setCurrentHashtag(hashtag.hashtag)}
                    />
                ))}
            </div>

            {/* notifications list with AnimatePresence for transition smooth animation */}
                <div className="flex flex-col w-full relative"> {/* relative important for popLayout */}
                    <AnimatePresence mode="sync">
                        {notificationList
                            .filter(n => (currentHashtag === "All" || currentHashtag === n.hashTag))
                            .map(notification => (
                                <motion.div
                                    key={notification.id}
                                    layout = "position" // no scaling, only position
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: "auto" }}
                                    exit={{ opacity: 0, height: 0 }}
                                    transition={{ duration: 0.3 }} // short transition
                                >
                                    <UserNotification {...{notification}}/>
                                </motion.div>
                            ))}
                    </AnimatePresence>
                </div>

                {/* notification buttons */}
                <motion.div 
                    layout
                    transition={{ duration: 0.3 }} 
                    className="flex flex-row gap-2"
                >
                    <ActionButton text={"Delete"} color={"#BB4848"} onClick={handleDeleteSelected} />
                    <ActionButton text={"Add"} color={"#48BB78"} onClick={handleCreateNewNotification} />
                </motion.div>
        </div>
    )
}
