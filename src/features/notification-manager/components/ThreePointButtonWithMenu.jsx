import { useState, useRef, useEffect } from "react";

//Description: "⋮" menu with pop-up window "edit, delete". Used in notification block 

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


// -------Three point button with POP UP menu-------
export function ThreePointButtonWithMenu ({
    currentUser,
    notification,
    notificationList,
    updateNotification,
    dates,
    setDates,
    repeat,
    setRepeat
})
{
    const [menuVisible, setMenuVisible] = useState(false);
    const containerRef = useRef(null);

    // console.log("ThreePointButtonWithMenu notification:", notification);

    //Handlers

    //start editing notification
    const handleUpdateNotificationStart = () => {
        //set editing to true
        const updatedNotification = {...notification, editing: true}
        updateNotification(currentUser.id, updatedNotification);
    };

    // - finish editing notification
    // - save actual information from "dates" and "repeat"
    const handleUpdateNotificationFinish = () => {
        //conveert [dates] to dateObject {repeatDates: "date"}
        // console.log(repeat);
        const newDatesObjectList = dates.map (x=>{
            return {repeatDate: x.toISOString()};
        })
        //set editing to false, dates to actual dates object, repeat to repeat
        const updatedNotification = {...notification, editing: false, dates: newDatesObjectList, repeatNumbers: repeat}
        // console.log({...notification, editing: false, dates: newDatesObjectList, repeatNumbers: repeat});
        updateNotification(currentUser.id, updatedNotification);
    };

    //Show menu handler
    const showMenuToggle = ()=>{
        setMenuVisible(!menuVisible);
    }

    //handle clicks outisde menu and button (they both in one div container)
    const clickOutSide = (e)=>{
        // Checks: Does the containerRef exist AND is the clicked target NOT inside the container?
        if (containerRef.current && !containerRef.current.contains(e.target)) {
            setMenuVisible(false)
        }
    }

    //dynamically add clickOutSide handler to the whole document, only when menu is visible
    useEffect(()=>{
        if (menuVisible){
            //add event listener when menu is visible
            document.addEventListener("mousedown",clickOutSide)
        }
        return () => {
            //remove event listener, when menu is hidden
            // console.log("removeddd")
            document.removeEventListener("mousedown", clickOutSide)
        }
    },[menuVisible, clickOutSide]);

    return(
        <div ref={containerRef} className="flex flex-col ml-auto relative">
            <button className="text-base" onClick={showMenuToggle}>
                ⋮
            </button>
            {menuVisible &&
                <div
                    className="
                    opacity-95 bg-[#fff]
                    absolute flex flex-col items-start z-50
                    bottom-4 right-1 p-2 rounded-md
                    shadow-[0_0_10px_10px_rgba(0,0,0,0.05)]
                ">
                    <SmallActionButton text="Deleteeeee" onClick={()=>console.log("hello")} />
                    {notification.editing
                        ? <SmallActionButton text="Finish" onClick={()=>handleUpdateNotificationFinish()} />
                        : <SmallActionButton text="Edit" onClick={()=>handleUpdateNotificationStart()} />
                    }
                </div>
            }   

        </div>
    )
}