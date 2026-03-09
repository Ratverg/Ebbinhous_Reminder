

// import { ThreePointButtonWithMenu } from "./ThreePointButtonWithMenu";
// import { RadioButtonV1 } from "./RadioButtonV1";
// import { HashTagButton } from "../../../components/ui/HashTagButton";
// import { NotificationHashTagSelector } from "./NotificaitonHashTagSelector";
// import { useCallback, useContext, useEffect, useState } from "react";
// import clsx from "clsx";
// import { ButtonType03 } from "../../../components/ui/ButtonTypeV03";
// import { NotificationContext } from "../context/NotificationProvider";
// import { UserContext } from "../../auth/context/UserProvider";

// import icoApply from "../../../assets/icons/ico-apply.png";
// import icoEdit from "../../../assets/icons/ico-edit.png";

// export function NotificationHeader({
//     notification,
//     datesObj,
//     setDates,
//     repeat,
//     setRepeat,
//     notificationRef
// }) {
//     const {currentUser} = useContext(UserContext);
//     const {updateNotification, deleteNotification, selected, setSelected, getNotification} = useContext(NotificationContext);
//     const [localTitle, setLocalTitle] = useState(notification.title);

//     // --- Handlers (оставляем логику без изменений) ---
//     const handleUpdateNotificationStart = async() => {
//         const freshNotification = await getNotification(currentUser, notification);
//         const freshDatesObj = freshNotification.dates.map(x=>{
//             return {
//                 "repeatDate": new Date(x.repeatDate),
//                 "sentAt": x.sentAt ? new Date(x.sentAt): null,
//                 "status": x.status
//             };
//         });
//         setDates(freshDatesObj);
//         const updatedNotification = {...freshNotification, editing: true}
//         updateNotification(currentUser.id, updatedNotification);
//     };

//     const handleUpdateNotificationFinish = () => {
//         const normalizedDatesObj = datesObj.map(dateObj =>{
//             return {
//                 "repeatDate": dateObj.repeatDate.toISOString(),
//                 "sentAt": dateObj.sentAt ? dateObj.sentAt.toISOString() : null,
//                 "status": dateObj.status
//             }
//         });
//         const updatedNotification = {...notification, editing: false, dates: normalizedDatesObj, repeatNumbers: repeat, title: localTitle }
//         updateNotification(currentUser.id, updatedNotification);
//     };

//     const handleClickOutside = (e) => {
//         if (notificationRef.current && !notificationRef.current.contains(e.target)) {
//             handleUpdateNotificationFinish();
//         }
//     }

//     useEffect(()=>{
//         if (notification.editing){
//             document.addEventListener("mousedown", handleClickOutside);
//         }
//         return () => {
//             document.removeEventListener("mousedown", handleClickOutside);
//         }
//     },[notification.editing, handleClickOutside])

//     return (
//         <div className={clsx(
//             "flex flex-row w-full justify-between gap-4 items-center relative py-1 transition-all"
//         )}>
//             {/* 1. Radiobutton (Selection) */}
//             <div className="flex-shrink-0">
//                 <RadioButtonV1 selected={selected} setSelected={setSelected} notification={notification} />
//             </div>

//             {/* 2. Hashtag - Делаем его более компактным и "легким" */}
//             <div className="flex-shrink-0 min-w-[80px]">
//                 {notification.editing
//                     ? <NotificationHashTagSelector notification={notification} />
//                     : <HashTagButton
//                         text={`#${notification.hashTag}`}
//                         color={notification.color}
//                         // Совет: Внутри HashTagButton лучше использовать opacity для фона, 
//                         // например bg-blue-500/10 и text-blue-600
//                     />
//                 }
//             </div>

//             {/* 3. Notification Title - Основной акцент */}
//             <div className="flex-grow">
//                 {notification.editing
//                     ? <input
//                         type="text"
//                         autoFocus
//                         value={localTitle}
//                         onChange={(e) => setLocalTitle(e.target.value)}
//                         className="
//                             w-full px-2 py-1
//                             text-base font-medium text-gray-800
//                             bg-gray-50 rounded-lg
//                             border-b-2 border-blue-400
//                             outline-none transition-all
//                             placeholder:text-gray-400
//                             focus:bg-white focus:shadow-sm
//                         "
//                         placeholder="Название задачи..."
//                     />
//                     : <p
//                         className="
//                             w-full px-2 py-1
//                             text-base font-medium text-gray-700
//                             bg-transparent
//                             border-b-2 border-transparent
//                             truncate
//                         "
//                     >
//                         {notification.title}
//                     </p>
//                 }
//             </div>

//             {/* 4. Actions - Иконки */}
//             <div className="flex-shrink-0 flex items-center gap-1">
//                 {notification.editing
//                     ? <ButtonType03 
//                         src={icoApply}
//                         alt={"save"}
//                         onClick={handleUpdateNotificationFinish}
//                         className="hover:scale-110 transition-transform opacity-80 hover:opacity-100"
//                     />
//                     : <ButtonType03 
//                         src={icoEdit}
//                         alt={"edit"}
//                         onClick={handleUpdateNotificationStart}
//                         className="hover:scale-110 transition-transform opacity-60 hover:opacity-100"
//                     /> 
//                 }
//             </div>
//         </div>
//     )
// }













import { ThreePointButtonWithMenu } from "./ThreePointButtonWithMenu";
import { RadioButtonV1 } from "./RadioButtonV1";
import { HashTagButton } from "../../../components/ui/HashTagButton";
import { NotificationHashTagSelector } from "./NotificaitonHashTagSelector";
import { useCallback, useContext, useEffect, useState } from "react";
import clsx from "clsx";
import { ButtonType03 } from "../../../components/ui/ButtonTypeV03";
import { NotificationContext } from "../context/NotificationProvider";
import { UserContext } from "../../auth/context/UserProvider";
// 1. Import your images as variables
import icoApply from "../../../assets/icons/ico-apply.png";
import icoEdit from "../../../assets/icons/ico-edit.png";

export function NotificationHeader({
    notification,
    datesObj,
    setDates,
    repeat,
    setRepeat,
    notificationRef
}) {
    const {currentUser} = useContext(UserContext);
    const {updateNotification, deleteNotification, selected, setSelected, getNotification} = useContext(NotificationContext);
    const [localTitle, setLocalTitle] = useState(notification.title);


    //Handlers

    //start editing notification
    const handleUpdateNotificationStart = async() => {

        //---Important---
        //when we press "edit" on notification, we have to update All notification List. 
        //Back server is running, and sends notifications - notification.date.sentAt could be changed!
        // So we need to get fresh notification (and fresh datesObj), otherwise, we will erase it's status while updating from "old local" props
        //---

        //getfresh notificationList from back
        const freshNotification = await getNotification(currentUser, notification);
        //update datesObj for current notification
        const freshDatesObj = freshNotification.dates.map(x=>{
            return {
                "repeatDate": new Date(x.repeatDate),
                "sentAt": x.sentAt ? new Date(x.sentAt): null,
                "status": x.status
            };
        });
        setDates(freshDatesObj);
        //set editing to true
        const updatedNotification = {...freshNotification, editing: true}
        updateNotification(currentUser.id, updatedNotification);
    };

    // - finish editing notification
    // - save actual information from "dates" and "repeat"
    const handleUpdateNotificationFinish = () => {
        const normalizedDatesObj = datesObj.map(dateObj =>{
            return {
                "repeatDate": dateObj.repeatDate.toISOString(),
                "sentAt": dateObj.sentAt ? dateObj.sentAt.toISOString() : null,
                "status": dateObj.status
            }
        });
        const updatedNotification = {...notification, editing: false, dates: normalizedDatesObj, repeatNumbers: repeat, title: localTitle }
        updateNotification(currentUser.id, updatedNotification);
    };

    //delete current notification
    const handleDeleteNotification = ()=>{
        deleteNotification(currentUser.id,notification.id);
    }


    //handler that update notification list with "updated notification" as input
    const handleUpdateNotificationList = (updatedNotification) => {
        updateNotification(currentUser.id, updatedNotification);
    };

    //handle click outside the notification
    //Handle click outside the notification
    const handleClickOutside = (e) => {
        //Checks does the notification exists AND does the clicked .target NOT inside the notification
        if (notificationRef.current && !notificationRef.current.contains(e.target)) {
            handleUpdateNotificationFinish();
        }
    }

    useEffect(()=>{
        if (notification.editing){
            //add eventlistener to the whole document, when notification is editing
            document.addEventListener("mousedown", handleClickOutside);
        }
        return () => {
            //remove event listener, when unmount
            document.removeEventListener("mousedown", handleClickOutside);
        }

    },[notification.editing, handleClickOutside])

    return (
        <div className={clsx("flex flex-row w-full justify-between gap-2 items-center relative")}>

            {/* radiobutton */}
            <RadioButtonV1 selected={selected} setSelected={setSelected} notification={notification} />

            {/* Show hashtag button OR edit hashtag button */}

            {/* hashtag selector */}
            {notification.editing
                ? <NotificationHashTagSelector
                    {...{
                        notification
                    }}
                />
                : <HashTagButton
                    text={`#${notification.hashTag}`}
                    color={notification.color}
                />
            }

            {/* notification title */}
            {notification.editing
                ? <input
                        type="text"
                        value={localTitle}
                        onChange={(e) => setLocalTitle(e.target.value)}
                        className={clsx(
                            "px-2 py-1 w-full rounded-md",
                            "bg-inputForm  text-textMuted outline-none ",
                            "focus:text-text focus:bg-transparent"
                        )}
                    />
                : <p
                    className={clsx(
                        "px-2 py-1 w-full rounded-md",
                        "bg-transparent  text-textSecondary outline-none "   
                    )}
                >
                    {notification.title}
                </p>
            }

            {notification.editing
                ?<ButtonType03 
                    src={icoApply}
                    alt={"ico-apply"}
                    onClick={handleUpdateNotificationFinish}
                />
                :<ButtonType03 
                    src={icoEdit}
                    alt={"ico-edit"}
                    onClick={handleUpdateNotificationStart}
                /> 
            }
            {/* <ButtonType03 
                src={"/src/assets/icons/ico-delete.png"}
                alt={"ico-delete.png"}
                onClick={handleDeleteNotification}
            />  */}

            
            

            {/* three point button */}
            {/* <ThreePointButtonWithMenu  {...{
                currentUser,
                notification,
                notificationList,
                updateNotification,
                dates,
                setDates,
                repeat,
                setRepeat
            }} /> */}
        </div>
    )
}





