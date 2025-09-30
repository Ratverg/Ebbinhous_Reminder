import clsx from "clsx";
import ContentWrapper from "./ContentWrapper"
import { useEffect, useState } from "react";



function ShowNotifications({notificationList}){
    return(
        <div className="opacity-95 absolute flex flex-col z-50 bg-slate-50 w-max pointer-events-none bottom-5 right-5 p-4 rounded-lg shadow-[0_0_10px_10px_rgba(0,0,0,0.15)]">
            {notificationList.map((notification, i)=>
                <p key={i}>{notification}</p>
            )}
                <svg className="absolute w-10 h-10 right-0 top-0 ">
                    <polygon points="0,0 10,1 20,2" fill="#000000" />
                </svg>
        </div>
    )
}

function WeekDayBlock({weekDay, className}){
    return(
        <div
            className={clsx(
                "flex flex-col h-6 w-6 m-1 justify-center rounded-md relative",
                className
            )}
        >
            <p className="text-center">{weekDay}</p>
        </div> 
    )
}

function DateBlock({day, hasTasks}) {
    const [visible, setVisible] = useState(false);
    return(
        <div
            className={clsx(
                "flex flex-col h-6 w-6 m-1 justify-center rounded-md relative",
                hasTasks
                    ? "border-[2px] border-[#4681bc]"
                    : "bg-[#ffffff]"
            )}
            onMouseEnter={()=>setVisible(true)}
            onMouseLeave={()=>setVisible(false)}
        >
            <p className="text-center">{day}</p>
            {visible && (
                <ShowNotifications notificationList={["Git basic","Java lesson8", "8 pushups"]} />
            )}
        </div>
    )
}

function DateRow({row}){
    return(
        <div className="flex flex-row">
            {row.map((date,i)=>
                <DateBlock day={date.getDate()} hasTasks={date.getDate()>10} key={i}/>
            )}
        </div>
    )
}

function WeekDayRow(){
    const weekDays = [
        "mo", "tu", "we", "th","fr","sa","su"
    ]
    return(
        <div className="flex flex-row">
            {weekDays.map((day,i)=>
                <WeekDayBlock weekDay={day} key={i}
                className={clsx(i>4
                    ?"bg-[#9dceff]"
                    :"bg-[#fff]"
                )} />
            )}
        </div>
    )
}

function MonthBlock({date}){
    const [rowArray, setRowArray] = useState([]);
    
    useEffect(()=>{
            //calculating parameters of the current date
            const currentDate = new Date();
            const currentMonth = currentDate.getMonth();
            const currentYear = currentDate.getFullYear();
            
            //calculating start day of the dates array
            const firstDayInMonth = new Date(currentYear,currentMonth,1, 11,11);
            const firstDayInMonthWeekDay = firstDayInMonth.getDay();
            const startDay =new Date (firstDayInMonth.setDate(-firstDayInMonthWeekDay+2)) ;

            //creating dates array for 6 rows with 7 days in each for the current month
            const rowArray = [];
            for (let j = 0; j < 42 ; j = j+7) {
                const curRow = [];
                console.log(j);
                for (let i = j; i < j+7; i++) {
                    const tempDate = new Date(startDay);
                    tempDate.setDate(tempDate.getDate() + i);
                    curRow.push(tempDate);
                }
                rowArray.push(curRow)
            }
            setRowArray(rowArray); 
    },[]);

    return (
        <div 
            className="flex flex-col bg-[#fff]"
        >
            <WeekDayRow />
            {rowArray.map((row, i)=>
                <DateRow row={row} key={i} />
            )}
            {/* <p>{currentDate.getMonth()}</p> */}
        </div>
    )
}


function CalendarSection(){
        const [date, setCurrentDate] = useState(null);
        useEffect(()=>{
            const currentDate = new Date();
            const options = {
                // hour: "numeric",
                // minute: "numeric",
                day: "numeric",
                month: "short",//"2-digit"
                year: "numeric",
                weekday: "short"
            }
            const locale = navigator.language;
            const localizedDate = (date) => new Intl.DateTimeFormat(locale, options).format(date);

            setCurrentDate(localizedDate(currentDate));
        },[]);

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


    const title = `Today is: ${date === null ? "": date.toString()}`
    return(
        <ContentWrapper
            className={"flex flex-col flex-none"}
        >
            {/* Title */}
            <p>{title}</p>
            <MonthBlock />
        </ContentWrapper>
    )
}

export default CalendarSection;