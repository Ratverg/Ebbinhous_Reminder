
import TaskManagerSection from "./TaskManagerSection";
import TaskManagerSectionV2 from "./TaskManagerSectionV2";
import CalendarSection from "./CalendarSection";
import { useEffect, useState } from "react";
import InputBlock from "./TestComponent";

function Title({text}){
    return (
            <div className="text-base font-semibold md:text-2xl">
                <h1>{text}</h1>
            </div>
    )
}

function getUserNotificationList(UserID){
    return([
        {
            id: 10001,
            title: "Git basics1",
            hashTag: "Study",
            color: "#3F98E1 ",
            dates: [new Date(2025, 9, 1),new Date(2025, 10, 22),new Date(2025, 9, 22)],
            repeated: 1,
            repeatNumbers: 1,
            attachment: "/src/assets/icons/ico-timer.png"
        },
        {
            id: 10002,
            title: "Revit lesson 2",
            hashTag: "Work",
            color: "#ECC94B",
            dates: [new Date(2025, 9, 11),new Date(2025, 10, 12), new Date(2025, 10, 12), new Date(2025, 10, 12), new Date(2025, 10, 12)],
            repeated: 3,
            repeatNumbers: 1,
            attachment: "/src/assets/icons/ico-timer.png"
        },
        {
            id: 10003,
            title: "Rollerblading",
            hashTag: "Health",
            color: "#48BB78",
            dates: [new Date(2025, 9, 12),new Date(2025, 10, 2)],
            repeated: 0,
            repeatNumbers: 1,
            attachment: "/src/assets/icons/ico-timer.png"
        }
        
    ])
}

function ContentMainFrameBlockUserPage(){

    const [notificationList, updateNotificationList] = useState(getUserNotificationList());
    

    return(
        <div className="
            bg-[#F2F4F6] text-[#243850]
            font-semibold

            mx-0 px-4 py-5 text-xs
            md:mx-5 lg:mx-32 md:px-16 md:py-8 md:text-base
            
            flex flex-col gap-4 items-start
            md:gap-8 md:flex-row
        "> 
            {/* <InputBlock /> */}
            {/* <TaskManagerSection notificationList={notificationList}  updateNotificationList = {updateNotificationList}/> */}
            <TaskManagerSectionV2 notificationList={notificationList}  updateNotificationList = {updateNotificationList}/>
            {/* <CalendarSection notificationList={notificationList} updateNotificationList = {updateNotificationList} /> */}
            {/* <NotificationList /> */}
        </div>
    )
}
export default ContentMainFrameBlockUserPage;
