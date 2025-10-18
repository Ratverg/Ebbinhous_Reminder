import { UserNotification } from "./UserNotification/UserNotification";
import { ActionButton } from "./ui/ActionButton";
import { motion, AnimatePresence } from "framer-motion";
import { generateDates } from "../../utils/DatesUtils";
import { useEffect, useState } from "react";

//-------GET HASHTAG LIST FUNCTION-------
function getHashtagList(notificationList){
    const tempList =[{hashtag: "All", color: "#123"}];

    notificationList.forEach((notification)=>{
        if (!tempList.some((x)=>x.hashtag === notification.hashTag)) {
            tempList.push({hashtag: notification.hashTag, color: notification.color})
        }
    })

    return tempList;

}


// -------NOTIFICATION BLOCK-------
export function NotificationBlock({
    notificationList,
    selected,
    setSelected,
    setNotificationList
}) {
    //current hashtag set to "All" by default
    const [currentHashtag, setCurrentHashtag] = useState("All");
    //hashtag list generated from notification list hastag object is {hashtag: "name", color: "#123"}
    const [hashtagList, setHashtagList] = useState(getHashtagList(notificationList));

    //auto update hashtagList, when notification list changed
    useEffect(()=>{
        setHashtagList(getHashtagList(notificationList))
        
    },[notificationList])

    

    //handler - DELETE selected notification
    const handleDeleteSelected = ()=>{
            setNotificationList(
                notificationList.filter((notification)=> !selected.includes(notification.id))
            )
        }
    
    //handler - CREATE NEW notification
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
            attachment: "",
            editing: true
        }
        setNotificationList((prevList)=>
            [...prevList,newNotification ]    
        )

    }


    return(
        <div className={"flex flex-col gap-2 px-[0rem] py-4 rounded-lg w-full items-start transition-all duration-300"}>

            {/* block title */}

            <p className="font-semibold text-lg">Notification list</p>
            
            {/* notifications filter  buttons */}
            <div className="flex flex-row gap-2">
                {hashtagList.map((hashtag)=>(
                    // console.log(hashtag)
                    <ActionButton
                        text={hashtag.hashtag}
                        color={hashtag.color}
                        onClick={()=>setCurrentHashtag(hashtag.hashtag)}
                    />
                ))}
            </div>

            {/* notifications list with AnimatePresence for transition smooth animation */}
            <div className="flex flex-col gap-2 w-full">
            <AnimatePresence>
                {notificationList
                    .filter(
                        //hashtag === "All" OR notification.hashtag
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
                            {...{
                                notification,
                                selected,
                                setSelected,
                                notificationList,
                                setNotificationList,
                                hashtagList,
                                setHashtagList
                            }}
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
