import ContentWrapper from "./ContentWrapper";
import clsx from "clsx";

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
function ThreePointButton (){
    return(
        <button className="text-base">
            ⋮
        </button>
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


// -------User notification-------
function UserNotification({notification}){
    return(
        // main container, have 4 main columns
        <div className="flex flex-row bg-[#ffffff] hover:bg-[#F2F4F6] rounded-md border-[2px] border-[#a7a7a744] gap-2 items-center h-12 px-2 py-1">
            {/* select radiobutton */}
            <div className="flex flex-col">
                <input type="radio" className="active:ring-blue-300"
                />
            </div>
            {/* task name and task info */}
            <div className="flex flex-col justify-between h-full">
                <p className="text-sm font-semibold">{notification.title}</p>
                <p className="opacity-60 text-xs font-normal">
                    <img
                        src="/src/assets/icons/ico-timer.png"
                        alt="ico-timer.png"
                        className="inline h-2 w-2 align-middle"
                        /> 
                    {notification.nextRepeat[0]}
                </p>
            </div>
            {/* task hashtag and task progressBar */}
            <div className="flex flex-col justify-between h-full items-end ml-auto">
                <HashTagButton text={notification.hashTag} color={notification.color} />
                <ProgressBar ready={notification.repeated} />
            </div>
            {/* "three point" section */}
            <ThreePointButton />
        </div>
    )
}

// -------Notification block-------
function NotificationBlock({title = "", actionButtons, notificationList}){
    return(
        <ContentWrapper className={"flex flex-col gap-2 px-[0.5rem] py-4 rounded-lg w-full items-start"}>

            {/* block title */}
            <p className="font-semibold text-lg">{title}</p>

            {/* notifications list */}
            <div className="flex flex-col gap-1 w-full">
                {notificationList.map((notification,i)=>
                    <UserNotification notification={notification} />
                )}
            </div>

            {/* notification buttons */}
            <div className="flex flex-row gap-2">
                {actionButtons.map((button, i)=>
                    <ActionButton key={i} text={button.text} color={button.color}/>
                )}
            </div>
        </ContentWrapper>
    )
}


// -------Task Manager Section-------
function TaskManagerSection(){
    
    
    const notificationList = [
        {
            title: "Git basics1",
            hashTag: "Study",
            color: "#3F98E1 ",
            nextRepeat: ["10.10.2025","11.12.2027"],
            repeated: 1,
            attachment: "/src/assets/icons/ico-timer.png"
        },
        {
            title: "Revit lesson 2",
            hashTag: "Work",
            color: "#ECC94B",
            nextRepeat: ["10.10.2025","11.12.2027"],
            repeated: 3,
            attachment: "/src/assets/icons/ico-timer.png"
        },
        {
            title: "Rollerblading",
            hashTag: "Health",
            color: "#48BB78",
            nextRepeat: ["10.10.2025","11.12.2027"],
            repeated: 0,
            attachment: "/src/assets/icons/ico-timer.png"
        }
        
    ]

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
                actionButtons={[
                    {text: "Add", color: "#48BB78"},
                    {text: "Delete", color: "#BB4848"},
                ]}
                notificationList={notificationList}
            />
            
            {/* block with compleated notifications */}
            <NotificationBlock
                title="Compleated notifications"
                actionButtons={[
                    {text: "Add", color: "#48BB78"},
                    {text: "Delete", color: "#BB4848"},
                ]}
                notificationList={notificationList}
            />
        </ContentWrapper>
    )
}

export default TaskManagerSection;



