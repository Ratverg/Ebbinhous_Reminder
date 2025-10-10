import { useEffect, useRef, useState } from "react";
import ContentWrapper from "./ContentWrapper";
import clsx from "clsx";
import { button, div, menu } from "framer-motion/client";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";


//-------small action menu buttons-------
function SmallActionButton({onChange, text, onClick}){
    return(
        <button
            className=" border-none rounded-none hover:bg-[#829cb6] text-sm"
            onClick={onClick}

        >
            {text}
        </button>
    )
}


// -------Action buttons-------
function ActionButton({text = "btn", active = false, onClick, color = "#ffffff"}){
    return(
        <button
        onClick={onClick}
        style={{ backgroundColor: color }}
        className={clsx(
            "text-white",
            "h-[1.3rem] text-xs px-3 rounded-full relative duration-500",
            "md:h-[1.5rem] md:text-xs",
            
            "after:absolute after:bottom-1 after:left-1/2 after:h-[2px] after:bg-[#ffffff] after:translate-x-[-50%]",
            "after:transition-all after:duration-300 ",
            active
            ? "after:w-full text-[#ffffff]" //active button
            : "after:w-0 text-[#ffffff] hover:text-[#ffffff] hover:after:w-[80%]" //inactive button
        )}>
            {text}
        </button> 
    )
}

// -------Three point button-------
function ThreePointButton ({onClick}){
    return(
        <button className="text-base" onClick={onClick}>
            ⋮
        </button>
    )
}

// -------Three point button with menu-------
function ThreePointButtonWithMenu ({onClick, isEditing, setIsEditing}){
    const [menuVisible, setMenuVisible] = useState(false);
    const containerRef = useRef(null);


    //----Handlers----

    //Show menu handler
    const showMenuToggle = ()=>{
        setMenuVisible(!menuVisible);
    }

    //handle clicks outisde menu
    const clickOutSide = (e)=>{
        // Checks: Does the containerRef exist AND is the clicked target NOT inside the container?
        if (containerRef.current && !containerRef.current.contains(e.target)) {
            setMenuVisible(false)
        }
    }

    //dinamically add clickOutSide handler to the document, only when menu is visible
    useEffect(()=>{
        if (menuVisible){
            //add event listener when menu is visible
            document.addEventListener("mousedown",clickOutSide)
        }
        return () => {
            //remove event listener, when menu is hidden
            console.log("removeddd")
            document.removeEventListener("mousedown", clickOutSide)
        }
    },[menuVisible, clickOutSide]);

    return(
        <div ref={containerRef} className="flex flex-col bg-[#79bcff]">
            <button className="text-base" onClick={showMenuToggle}>
                ⋮
            </button>
            {menuVisible &&
                <div className="opacity-95 absolute flex flex-col items-start z-50 bg-[#fff]  bottom-4 right-1 p-2 rounded-md shadow-[0_0_10px_10px_rgba(0,0,0,0.05)]">
                    <SmallActionButton text="Deleteeeee" onClick={()=>console.log("hello")} />
                    {isEditing
                        ? <SmallActionButton text="Finish" onClick={()=>setIsEditing(false)} />
                        : <SmallActionButton text="Edit" onClick={()=>setIsEditing(true)} />
                    }
                </div>
            }   

        </div>
    )
}

// -------Hash tag button-------
function HashTagButton({text = "btn", color = "#1f6e93" }){
    return(
        <button
        style={{ backgroundColor: color }}
        className={clsx(
            "text-white",
            "h-[1.3rem] text-xs px-3 rounded-full relative duration-500",
            "md:h-[1.5rem] md:text-xs",
            "hover:opacity-50"
        )}
        
        >
            {text}
        </button> 
    )
}

// -------Progress bar-------
function ProgressBar({ready = 0, total = 4}){
    const barsArray = Array.from({length: total}, (_, i) => i);
    return(
        <div className="flex flex-row w-50 gap-1 md:gap-1">
            {barsArray.map((element, i)=>
                <div
                key={i}
                className={clsx(
                    "w-3 h-1.5 rounded-full",
                    "md:w-8 md:h-1.5",
                    (ready <= i)
                    ? "bg-[#d3dce0]"
                    : "bg-[#2EA5DC]"
                )}
                />      
            )
        }
        </div>
    );
}


//function to get date in YYYYY/MM/DD from date object
function dateToYYYYMMDD(date){
    if (!date) return '';
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
}

//function to get date in YYYY/MM/DD/hh/mm from date object
const dateToYYYYMMDDHHMM = (date) => {
    if (!date) return '';
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, '0');
    const d = String(date.getDate()).padStart(2, '0');
    const h = String(date.getHours()).padStart(2, '0');
    const min = String(date.getMinutes()).padStart(2, '0');
    // Формат: YYYY-MM-DDTHH:MM
    return `${y}-${m}-${d}T${h}:${min}`;
}

//function to get date in YYYY/MM/DD/hh/mm from date object
const dateToYYYYMMDDHHMMV2 = (date) => {
    if (!date) return '';
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, '0');
    const d = String(date.getDate()).padStart(2, '0');
    const h = String(date.getHours()).padStart(2, '0');
    const min = String(date.getMinutes()).padStart(2, '0');
    // Формат: YYYY-MM-DDTHH:MM
    return `${d}-${m}-${y} ${h}:${min}`;
}


//-------Small action menu (edit-delete-finish editing)--------
function SmallActionMenu({isEditing, setIsEditing, smallMenuRef}){

    return (
            <div ref={smallMenuRef} className="opacity-95 absolute flex flex-col items-start z-50 bg-[#fff]  bottom-4 right-1 p-2 rounded-md shadow-[0_0_10px_10px_rgba(0,0,0,0.05)]">
                <SmallActionButton text="Deleteeeee" onClick={()=>console.log("hello")} />
                {isEditing
                    ? <SmallActionButton text="Finish" onClick={()=>setIsEditing(false)} />
                    : <SmallActionButton text="Edit" onClick={()=>setIsEditing(true)} />
                }
            </div>
    )
} 

// -------User notification-------
function UserNotification({notification, selected, setSelected, updateNotificationList}){
    const [title, setTitle] = useState(notification.title);
    const [dates, setDates] = useState(notification.dates);
    const [isEditing, setIsEditing] = useState(true);
    const [dateStrings, setLocalDateString] = useState (notification.dates.map((x)=>dateToYYYYMMDDHHMM(x)));

    //------HANDLERS-------

    //handler to update notifacation list
    const handleUpdate = (updatedNotification) => {
        updateNotificationList(prevList =>
            prevList.map(n =>
                n.id === updatedNotification.id ? updatedNotification : n
            )
        );
    };


   
    return(
        // main container, have 4 main columns
        <div className={clsx(
            "flex flex-row bg-[#ffffff] hover:bg-[#F2F4F6] rounded-md border-[2px] border-[#a7a7a744] ",
            "gap-2 items-center h-16 px-2 py-1",
            isEditing
                ? "h-auto"
                : "h-auto"

        )}>
            {isEditing ? (
                    <>
                        {/* select radiobutton */}
                        <div className="flex flex-col">
                            <input 
                                type="checkbox"
                                checked={selected.includes(notification.id)}
                                onChange={(e)=>{
                                    // console.log(e.target.checked)
                                    e.target.checked === true
                                        ? setSelected ([...selected, notification.id])
                                        : setSelected (selected.filter(x => x!=notification.id))
                                    }   
                                }
                                className="active:ring-blue-300 "
                            />
                        </div>
                        {/* task name and task info */}
                        <div className="flex flex-col justify-between h-full">
                            <input
                                type="text"
                                value = {title}
                                onChange={(e)=>setTitle(e.target.value)}
                                onKeyDown={(e)=>{
                                         // console.log(e)
                                        if (e.key === "Enter") {
                                            handleUpdate({...notification, title: title});
                                        }
                                    }
                                }
                                onBlur={()=>{handleUpdate({...notification, title: title})}}
                                className="bg-[#e0e0e0] rounded-md text-sm font-semibold"
                            />
                            {dates.map((date,j)=>(
                                <div className="opacity-60 text-xs font-normal flex flex-row p-0 -m-[1px] border-none items-center">
                                    <img
                                        src="/src/assets/icons/ico-timer.png"
                                        alt="ico-timer.png"
                                        className="h-3 w-3"
                                        /> 
                                    <input
                                    className="bg-[#e0e0e0] rounded-md"
                                        type="datetime-local"
                                        value={dateStrings[j]}
                                        onChange={(e)=>{
                                                //set local dateString values
                                                setLocalDateString(dateStrings.map((x,i) => i === j ? e.target.value: x))
                                                //create "Date object" array from datesStirng "YYYY-mm-dd"
                                                const newDates = dates.map((x,i)=> i === j ? new Date(e.target.value) : x)
                                                setDates(newDates) 
                                                handleUpdate({...notification, dates: newDates})
                                            }
                                        }
                                        onBlur={()=>{handleUpdate({...notification, dates: dates})}}
                                    />
                                </div>
                            ))}
                        </div>
                        {/* task hashtag and task progressBar */}
                        <div className="flex flex-col justify-between self-stretch items-end ml-auto">
                            <HashTagButton text={notification.hashTag} color={notification.color} />
                            <ProgressBar ready={notification.repeated} />
                        </div>
                        {/* "three point" section */}
                        <div className="relative flex flex-col items-center self-start">
                            <ThreePointButtonWithMenu  isEditing={isEditing} setIsEditing={setIsEditing}/>
                        </div>

                    </>
                ):(
                    <>
                        {/* select radiobutton */}
                        <div className="flex flex-col">
                            <input 
                                type="checkbox"
                                checked={selected.includes(notification.id)}
                                onChange={(e)=>{
                                    // console.log(e.target.checked)
                                    e.target.checked === true
                                        ? setSelected ([...selected, notification.id])
                                        : setSelected (selected.filter(x => x!=notification.id))
                                    }   
                                }
                                className="active:ring-blue-300 "
                            />
                        </div>

                        {/* task name and task info */}
                        <div className="flex flex-col justify-between h-full">
                            <p
                                className="rounded-md text-sm font-semibold"
                            >{notification.title}</p>
                            {/* <p className="text-sm font-semibold">{notification.title}</p> */}
                            {dates.map((date,j)=>(
                                <div className="opacity-60 text-xs font-normal flex flex-row items-center ">
                                    <img
                                        src="/src/assets/icons/ico-timer.png"
                                        alt="ico-timer.png"
                                        className="h-3 w-3"
                                        />
                                    <p>{dateToYYYYMMDDHHMMV2(date)}</p>     
                                </div>
                            ))}
                        </div>
                        {/* task hashtag and task progressBar */}
                        <div className="flex flex-col justify-between self-stretch items-end ml-auto">
                            <HashTagButton text={notification.hashTag} color={notification.color} />
                            <ProgressBar ready={notification.repeated} />
                        </div>
                        {/* "three point" section */}
                        <div className="relative flex flex-col items-center self-start">
                            <ThreePointButtonWithMenu  isEditing={isEditing} setIsEditing={setIsEditing}/>
                        </div>
                    </>
                )
            }
        </div>
    )      
}

// -------Notification block-------
function NotificationBlock({title = "", notificationList, selected, setSelected, updateNotificationList}){

        const handleDeleteSelected = ()=>{
            updateNotificationList(
                notificationList.filter((notification)=> !selected.includes(notification.id))
            )
        }
    return(
        <ContentWrapper className={"flex flex-col gap-2 px-[0.5rem] py-4 rounded-lg w-full items-start transition-all duration-300"}>

            {/* block title */}
            <p className="font-semibold text-lg">{title}</p>

            {/* notifications list with AnimatePresence for transition smooth animation */}
            <div className="flex flex-col gap-1 w-full">
                <AnimatePresence>
                    {notificationList.map((notification,i)=>(
                        <motion.div
                            key={notification.id}
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3 }}
                        >
                            <UserNotification
                                notification={notification}
                                selected={selected}
                                setSelected={setSelected}
                                updateNotificationList={updateNotificationList}
                            >
                            </UserNotification>
                        </motion.div>
                    ))}
                </AnimatePresence>

            </div>

            {/* notification buttons */}
            <div className="flex flex-row gap-2">
                <ActionButton text={"Delete"} color={"#BB4848"} onClick={handleDeleteSelected}/>
                <ActionButton text={"Add"} color={"#48BB78"}/>
            </div>
        </ContentWrapper>
    )
}


// -------Task Manager Section-------
function TaskManagerSection({notificationList, updateNotificationList}){
    
    const [selected, setSelected] = useState([1000,2000]);

    return (
        <ContentWrapper 
            className={"flex flex-col gap-2 rounded-lg items-start px-[0.5rem] flex-1 w-full"}
        >
            {/* Main title */}
            <p className="font-semibold text-xl">Notification list</p>

            {/* action buttons block */}
            <div className="flex xlex-row gap-2">
                <ActionButton text="All" color="#182433"/>
                <ActionButton text="Study" color="#3F98E1"/>
                <ActionButton text="Work" color="#ECC94B"/>
                <ActionButton text="Health" color="#48BB78"/>
            </div>

            {/* block with active notifications */}
            <NotificationBlock
                title="Active notifications"
                notificationList={notificationList}
                updateNotificationList = {updateNotificationList} 
                setSelected ={setSelected}
                selected = {selected}
            />
            
            {/* block with compleated notifications */}
            <NotificationBlock
                title="Compleated notifications"
                notificationList={notificationList}
                setSelected ={setSelected}
                selected = {selected}
            />
        </ContentWrapper>
    )
}

export default TaskManagerSection;



