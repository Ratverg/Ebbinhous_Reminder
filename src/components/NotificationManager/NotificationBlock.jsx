import { UserNotification } from "./UserNotification/UserNotification";
import { ActionButton } from "./ui/ActionButton";
import { motion, AnimatePresence } from "framer-motion";
import { generateDates } from "../../utils/DatesUtils";
import { useState } from "react";
import { p } from "framer-motion/client";

// -------Notification block-------
export function NotificationBlock({notificationList, selected, setSelected, setNotificationList}){
    const [currentHashtag, setCurrentHashtag] = useState("All");
    const [hashtagList, setHashtagList] = useState([{name: "All", color: "#BB4848"}, {name: "Study", color: "#BB4848"}, {name: "Health", color: "#BB4848"}]);


    //handler to delete selected notification
    const handleDeleteSelected = ()=>{
            setNotificationList(
                notificationList.filter((notification)=> !selected.includes(notification.id))
            )
        }
    
    //handler to create new notification
    const handleCreateNewNotification = ()=>{
        //new notification with default parameters
        //todo generate ID for notification
        const newId = Date.now();
        const newNotification = {
            id: newId,
            title: "New notification",
            hashTag: "Main",
            color: "#3F98E1",
            dates: generateDates(new Date(),3),
            repeatNumbers: 3,
            repeated: 0,
            attachment: ""
        }
        setNotificationList((prevList)=>
            [...prevList,newNotification ]    
        )
    }



    return(
        <div className={"flex flex-col gap-2 px-[0rem] py-4 rounded-lg w-full items-start transition-all duration-300"}>

            {/* block title */}

            <p className="font-semibold text-lg">Notification list</p>
            
            {/* notification filter  buttons */}
            <div className="flex flex-row gap-2">
                {hashtagList.map((hashtag)=>(
                    <ActionButton text={hashtag.name} color={hashtag.color} onClick={()=>setCurrentHashtag(hashtag.name)} />
                    // <p>rat</p>
                ))}
            </div>

            {/* notifications list with AnimatePresence for transition smooth animation */}
            <div className="flex flex-col gap-2 w-full">
            <AnimatePresence>
                {notificationList
                .filter(
                    n => currentHashtag === "All" || currentHashtag === n.hashTag
                )
                .map((notification) => (
                    <motion.div
                    key={notification.id}
                    layout
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    >
                    <UserNotification
                        {...{ notification, selected, setSelected, setNotificationList }}
                    />
                    </motion.div>
                ))}
            </AnimatePresence>
            </div>

            {/* notification buttons */}
            <div className="flex flex-row gap-2">
                <ActionButton text={"Delete"} color={"#BB4848"} onClick={handleDeleteSelected}/>
                <ActionButton text={"Add"} color={"#48BB78"} onClick={handleCreateNewNotification}/>
            </div>
        </div>
    )
}
