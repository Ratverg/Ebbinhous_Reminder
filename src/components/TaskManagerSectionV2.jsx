import { useEffect, useRef, useState } from "react";
import clsx from "clsx";
import { button, div, menu } from "framer-motion/client";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import CustomDateInput from "./CustomDateInput";


//------- FUNCTIONS----

//generate dates array from start day and repeat numbers
function generateDates(date = null, repeatNumbers = 4){

            //calculating parameters of the "first time learned day"
            const startDate = date === null ? new Date(): date;
            //switch to select curves variats, according to prefered repeat times
            
            function getRepeatPattern (repeatNumbers){
                switch (repeatNumbers) {
                    case 1:
                        return [7];
                    case 2:
                        return [1,7];
                    case 3:
                        return [1,3,7];
                    case 4:
                        return [1,3,7,30]
                    default:
                        return []
                }
            }
            const repeatPattern = getRepeatPattern(repeatNumbers);
            
            //calculating dates array according to Ebbighouse curve repeat pattern
            const dates = repeatPattern.map((daysOffset, i) => {
                const tempDate = new Date(startDate);
                tempDate.setDate(tempDate.getDate() + daysOffset);
                return tempDate
            })
            return dates;
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
    return `${m}/${d}/${y},   ${h}:${min}`;
}

//function to get date in YYYY/MM/DD/hh/mm from date object
const dateToYYYYMMDDHHMMV3 = (date) => {
  if (!date) return '';
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  let hours = date.getHours();
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12 || 12; // convert 0 -> 12 and 13–23 -> 1–11

  return `${m}/${d}/${y}, ${hours}:${minutes} ${ampm}`;
};

//-------function to detect desktop/mobile -------
function useIsMobile(breakpoint = 768) {
  const [isMobile, setIsMobile] = useState(window.innerWidth < breakpoint);

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < breakpoint;
      setIsMobile(mobile);
    };

    window.addEventListener("resize", handleResize);

    //check ones after mount 
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, [breakpoint]);

  return isMobile;
}


//--------WRAPPERS--------

//Task wrapper
function ContentWrapperTask({children, className}){
    return(
            <div
            className={clsx(
                "border-2",
                "bg-[#ffffff] text-[#243850] font-semibold border-[#E6EBF2]",
                // "shadow-[0_0_10px_10px_rgba(0,0,0,0.05)]",
                // "lg:shadow-[0_0_5px_5px_rgba(0,0,0,0.05)]",
                "px-1 py-1 text-xs rounded-[0.5rem]",
                "lg:px-4 lg:py-2 lg:text-base lg:rounded-[0.5rem]",
                "flex",
                className
                )}>
                {children}
            </div>

    )
}

//Block wrapper
function ContentWrapperBlock({children, className}){
    return(
            <div
            className={clsx(
                "bg-[#ffffff] text-[#243850] font-semibold",
                "shadow-[0_0_10px_10px_rgba(0,0,0,0.05)]",
                "lg:shadow-[0_0_5px_5px_rgba(0,0,0,0.05)]",
                "px-4 py-4 text-xs rounded-[1rem]",
                "lg:px-8 lg:py-8 lg:text-base lg:rounded-[1rem]",
                "flex",
                className
                )}>
                {children}
            </div>

    )
}


//-------Small action menu buttons-------
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

// -------Three point button with POP UP menu-------
function ThreePointButtonWithMenu ({onClick, isEditing, setIsEditing}){
    const [menuVisible, setMenuVisible] = useState(false);
    const containerRef = useRef(null);

    //Handlers

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

    //dynamically add clickOutSide handler to the document, only when menu is visible
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
        <div ref={containerRef} className="flex flex-col ml-auto relative">
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
        <div className="flex flex-row w-50 gap-1 md:gap-[2px] flex-1 bg-[#ffffff] rounded-full overflow-hidden">
            {barsArray.map((element, i)=>
                <div
                key={i}
                className={clsx(
                    "flex-1 w-auto h-1.5 rounded-none",
                    "",
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


//------- Radiobutton-------
function RadioButtonV1({selected, setSelected, notification}){
    return (
            <input 
                type="checkbox"
                checked={selected.includes(notification.id)}
                onChange={() => 
                    setSelected(selected.includes(notification.id)
                        ? selected.filter(x => x !== notification.id)
                        : [...selected, notification.id])
                }
                className="
                    flex-shrink-0
                    appearance-none 
                    h-4 w-4 
                    border-2 border-[#D8DBE0]
                    bg-[#F3F4F6] 
                    rounded-[0.3rem]
                    checked:ring-2 
                    checked:ring-blue-400
                    checked:bg-blue-400
                    checked:border-blue-400 
                    ring-inset
                    ring-offset-2
                    ring-offset-white
                    transition-all duration-100
                "
            />

        )
}

//------- Mobile input date with standart options-------
function inputMobile({notification, handleUpdate}){
    const [dateStrings, setLocalDateString] = useState (notification.dates.map((x)=>dateToYYYYMMDDHHMM(x)));
    return(
    // regular input on mobile
    <input
        className="border-gray-400 border-[2px] w-[160px] text-gray-500 rounded-md focus:outline-none focus:border-blue-400 focus:text-black"
        type="datetime-local"
        value={dateStrings[j]}
        onChange={(e)=>{
                //set local dateString values (we need this to enter year by hand)
                setLocalDateString(dateStrings.map((x,i) => i === j ? e.target.value: x))
                //create "Date object" array from datesStirng "YYYY-mm-dd"
                const newDates = dates.map((x,i)=> i === j ? new Date(e.target.value) : x)
                setDates(newDates) 
                handleUpdate({...notification, dates: newDates})
            }
        }
        onBlur={()=>{handleUpdate({...notification, dates: dates})}}
    />
    )
    
}


// -------User notification-------
function UserNotification({notification, selected, setSelected, updateNotificationList, isEditingState}){
    const [title, setTitle] = useState(notification.title);
    const [dates, setDates] = useState(notification.dates);
    const [isEditing, setIsEditing] = useState(isEditingState);
    const [dateStrings, setLocalDateString] = useState (notification.dates.map((x)=>dateToYYYYMMDDHHMM(x)));
    const isMobile = useIsMobile();
    const [repeat, setRepeat] = useState(notification.repeatNumbers)

    //tests
    // useEffect(()=>{
    //     const newDateSet = generateDates(repeat);
    //     setDates(newDateSet);
    // },[repeat])

    // useEffect(()=>{
    //     console.log()
    // },[dates])

    //HANDLERS

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
        <ContentWrapperTask className={clsx("flex flex-col gap-3")}>
            {isEditing ?(
                // this "notification block" shows in editing mode only
                <>
                        {/* first row*/}
                        <div className="flex flex-row w-full justify-between gap-2 items-center relative">
                            
                            {/* radiobutton */}
                            <RadioButtonV1 selected={selected} setSelected={setSelected} notification={notification}/>
                            
                            {/* hashtag */}
                            <HashTagButton text={notification.hashTag} color={notification.color} />

                            {/* notification title */}
                            <input
                                type="text"
                                value = {title}
                                onChange={(e)=>setTitle(e.target.value)}
                                onKeyDown={(e)=>{
                                        if (e.key === "Enter") {
                                            handleUpdate({...notification, title: title});
                                        }
                                    }
                                }
                                onBlur={()=>{handleUpdate({...notification, title: title})}}
                                className="
                                    text-sm font-semibold
                                    text-gray-600
                                    bg-transparent
                                    rounded-md
                                    m-0 p-0 px-1
                                    h-[1.5rem] leading-[1.5rem]
                                    w-full
                                    border-2 border-gray-400
                                    outline-none
                                    focus:border-blue-400 focus:text-black
                                "
                            />
                            {/* three point button */}
                            <ThreePointButtonWithMenu  isEditing={isEditing} setIsEditing={setIsEditing}/>
                        </div>
                        {/* start date and repeat times row */}
                        <div className="flex flex-row justtify-start w-full gap-2">
                            {isMobile
                                // regular input on mobile for start date
                                ?<input
                                        className="border-gray-400 border-[2px] w-[160px] text-gray-500 rounded-md focus:outline-none focus:border-blue-400 focus:text-black"
                                        type="datetime-local"
                                        value={dateStrings[0]}
                                        onChange={(e)=>{
                                                //set local dateString values (we need this to enter year by hand)
                                                setLocalDateString(dateStrings.map((x,i) => i === 0 ? e.target.value: x))
                                                //create "Date object" array from datesStirng "YYYY-mm-dd"
                                                const newDates = dates.map((x,i)=> i === 0 ? new Date(e.target.value) : x)
                                                setDates(newDates) 
                                                handleUpdate({...notification, dates: newDates})
                                            }
                                        }
                                        onBlur={()=>{handleUpdate({...notification, dates: dates})}}
                                />
                                // custom input on desktop for start date
                                :<CustomDateInput
                                    value={dates[0]}
                                    onChange={(newDate) => {
                                        const newDates = dates.map((x,i) => i === 0 ? newDate : x);
                                        setDates(newDates);
                                        handleUpdate({...notification, dates: newDates});
                                    }}
                                />
                            }
                            <label htmlFor="repeatNumberSelector">Repeat numbers</label>
                            <select 
                                name=""
                                id=""
                                value={repeat}
                                onChange={
                                    (e)=>{
                                        setRepeat(e.target.value);
                                        const repeatNumbers = parseInt(e.target.value);
                                        const newDateSet = generateDates(dates[0], repeatNumbers);
                                        // console.log(dates[0]);
                                        setDates(newDateSet)
                                    }
                                }
                            >
                                <option value={2}>2</option>
                                <option value={3}>3</option>
                                <option value={4}>4 - optimal</option>
                                <option value={5}>5</option>
                            </select>

                        </div>
                        {/* date pattern row */}
                        <div className="flex flex-row flex-wrap justify-start w-full gap-2">
                            {/* dates row */}
                            {dates.map((date,j)=>(
                                <div className="opacity-100 text-xs font-normal flex flex-row items-center ">
                                    <img
                                        src="/src/assets/icons/ico-timer.png"
                                        alt="ico-timer.png"
                                        className="h-3 w-3"
                                        />

                                    {/* there are two input types: regular type is on mobile, and custom picker on desktop */}
                                    {isMobile
                                        // regular input on mobile
                                        ? <input
                                            className="border-gray-400 border-[2px] w-[160px] text-gray-500 rounded-md focus:outline-none focus:border-blue-400 focus:text-black"
                                            type="datetime-local"
                                            value={dateStrings[j]}
                                            onChange={(e)=>{
                                                    //set local dateString values (we need this to enter year by hand)
                                                    setLocalDateString(dateStrings.map((x,i) => i === j ? e.target.value: x))
                                                    //create "Date object" array from datesStirng "YYYY-mm-dd"
                                                    const newDates = dates.map((x,i)=> i === j ? new Date(e.target.value) : x)
                                                    setDates(newDates) 
                                                    handleUpdate({...notification, dates: newDates})
                                                }
                                            }
                                            onBlur={()=>{handleUpdate({...notification, dates: dates})}}
                                        />
                                        // custom input on desktop
                                        : <CustomDateInput
                                        value={dates[j]}
                                        onChange={(newDate) => {
                                            const newDates = dates.map((x,i) => i === j ? newDate : x);
                                            setDates(newDates);
                                            handleUpdate({...notification, dates: newDates});
                                        }}
                                    />
                            } 
                                </div>
                            ))}
                        </div>

                        {/* progressbar row */}
                        <div className="flex flex-row self-stretch">
                            <ProgressBar ready={notification.repeated} />
                        </div>
                    </>
                ):(
                    //this "notification block" shows in NOT editing mode only
                    <>

                        {/* first row*/}
                        <div className="flex flex-row w-full justify-between gap-2 items-center relative">
                            
                            {/* radiobutton */}
                            <RadioButtonV1 selected={selected} setSelected={setSelected} notification={notification}/>

                            {/* hashtag */}
                             <HashTagButton text={notification.hashTag} color={notification.color} />

                            {/* notification title */}
                             <p 
                                className="
                                text-sm font-semibold
                                m-0 p-0 px-1
                                h-[1.5rem] leading-[1.5rem]
                                w-full
                                border-2 border-[#fff0]
                                box-border
                                rounded-md
                                flex items-center
                                  
                            "
                            >
                                {notification.title}
                            </p>
                            <ThreePointButtonWithMenu  isEditing={isEditing} setIsEditing={setIsEditing}/>
                        </div>

                        {/* second row */}
                        {isMobile
                        // two types of "dates" rows, one for mobile and second for desktop
                            ?
                            //"dates" row shows on mobile
                                <div className="flex flex-row flex-wrap justify-start w-full gap-2">
                                    {dates.map((date,j)=>(
                                        <div className="opacity-100 text-xs font-normal flex flex-row items-center">
                                            <img
                                                src="/src/assets/icons/ico-timer.png"
                                                alt="ico-timer.png"
                                                className="h-3 w-3"
                                                /> 
                                            <p
                                                className="
                                                whitespace-pre rounded-md
                                                border-[2px] border-transparent 
                                                px-1 py-0 w-[160px] text-xs
                                                bg-[#F3F4F6] text-gray-600
                                                focus:outline-none  focus:border-blue-400
                                                "
                                            >{dateToYYYYMMDDHHMMV3(date)}</p>
                                        </div>
                                    ))}
                                </div>
                            :
                            //"dates" row shows on desktop
                                <div className="flex flex-row flex-wrap justify-start w-full gap-2">
                                    {dates.map((date,j)=>(
                                        <div className="opacity-100 text-xs font-normal flex flex-row items-center">
                                            <img
                                                src="/src/assets/icons/ico-timer.png"
                                                alt="ico-timer.png"
                                                className="h-3 w-3"
                                                /> 
                                            <p
                                                className="
                                                whitespace-pre rounded-md
                                                border-[2px] border-transparent 
                                                px-1 py-0 w-[135px] text-xs
                                                bg-[#F3F4F6] text-gray-600
                                                focus:outline-none  focus:border-blue-400
                                                "
                                            >{dateToYYYYMMDDHHMMV3(date)}</p>
                                        </div>
                                    ))}
                                </div>
                        }

                        {/* progressbar row */}
                        <div className="flex flex-row self-stretch">
                            <ProgressBar ready={notification.repeated} />
                        </div>
                    </>
                )
            }
        </ContentWrapperTask>
    )      
}

// -------Notification block-------
function NotificationBlock({title = "", notificationList, selected, setSelected, updateNotificationList}){
    //handler to 
    const handleDeleteSelected = ()=>{
            updateNotificationList(
                notificationList.filter((notification)=> !selected.includes(notification.id))
            )
        }
    
    //handler to create new notification
    const handleCreateNewNotification = (notification)=>{
        //new notification with default parameters
        //todo generate ID for notification
        const newId = Date.now();
        const newNotification = {
            id: newId,
            title: "New notification",
            hashTag: "Main",
            color: "#3F98E1",
            dates: generateDates(new Date(),3),
            repeated: 0,
            attachment: ""
        }
        updateNotificationList((prevList)=>
            [...prevList,newNotification ]    
        )
    }
    return(
        <div className={"flex flex-col gap-2 px-[0rem] py-4 rounded-lg w-full items-start transition-all duration-300"}>

            {/* block title */}
            {/* <p className="font-semibold text-lg">{title}</p> */}

            {/* notifications list with AnimatePresence for transition smooth animation */}
            <div className="flex flex-col gap-2 w-full">
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
                                isEditingState={false}
                            >
                            </UserNotification>
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


// -------Task Manager Section-------
function TaskManagerSectionV2({notificationList, updateNotificationList}){
    
    const [selected, setSelected] = useState([1000,2000]);

    return (
        <ContentWrapperBlock 
            className={"flex flex-col gap-2 rounded-lg items-start px-[0.5rem] flex-1 w-full bg-[#F8FAFC]"}
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
        </ContentWrapperBlock>
    )
}

export default TaskManagerSectionV2;



