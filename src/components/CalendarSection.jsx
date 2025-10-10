import clsx from "clsx";
import ContentWrapper from "./ContentWrapper"
import { useEffect, useState } from "react";

import { motion, AnimatePresence } from "framer-motion";
import { button, div } from "framer-motion/client";



//-------- Notification POP UP block -------

function ShowNotifications({notificationListForDate}){
    //returns absolute positioned DIV with "pointer-events-none" option, to see through
    return(
        
        notificationListForDate &&
            (
                <div className="opacity-95 absolute flex flex-col z-50 bg-[#fff] w-max pointer-events-none bottom-5 right-5 p-4 rounded-lg shadow-[0_0_10px_10px_rgba(0,0,0,0.15)]">
                    {notificationListForDate.map((notification, i)=>{
                        return(
                            <p key={i}>{notification.title}</p>
                        )
                    }
                    )}

                    {/* "Tail" of the pop-up findow */}
                    <svg
                        className="absolute -bottom-6 -right-2 w-8 h-8"
                        viewBox="0 0 24 24"
                    >
                        <polygon points="0,0 18,0 24,12" fill="#fff" />
                    </svg>
                </div>
            )
        
    )
}

// ------- Formin WEEK DAYS row -------
//simple square "brick" for row
function WeekDayBlock({weekDay, className}){
    return(
        <div
            className={clsx(
                "flex flex-col h-6 w-6 m-1 justify-center rounded-md relative opacity-60",
                className
            )}
        >
            <p className="text-center">{weekDay}</p>
        </div> 
    )
}

//row with week days
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


// -------- Forming MONTH BLOCK -----

//simplest square "brick" for day
function DateBlock({day, hasTasks, notificationList, monthOffset}) {
    const [visible, setVisible] = useState(false);
    const [notificationListForDate, setNotificationListForDate] = useState([]);

    //updates for notification list, that passed to ShowNotifications 
    useEffect(()=>{
        // console.log(monthOffset);
        setNotificationListForDate(getTasksForDate(day, notificationList));
    },[notificationList, monthOffset,day]);
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
            <p className="text-center">{day.getDate()}</p>

            {/* opacity animation of POP UP appe */}
            <AnimatePresence>
                {
                    visible &&
                    notificationListForDate.length>0 &&
                (
                    <motion.nav
                        initial={{ opacity: 0, y: 0 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        <ShowNotifications notificationListForDate={notificationListForDate} />
                    </motion.nav>
                )}
            </AnimatePresence>
        </div>
    )
}

//compare two dates by DAY MONTH YEAR
function compareDates(date1, date2)
{
    return(
        date1.getFullYear() === date2.getFullYear() &&
        date1.getMonth() === date2.getMonth() &&
        date1.getDate() === date2.getDate()
    );
}

//caltulate notifications list for given date  
function getTasksForDate(date, notificationList){
    // console.log(notificationList);
    return notificationList.filter((notification)=>compareDates(notification.dates[0], date))
}

//creating prerendered MAP date -> [notificationList]
function mapNotificationByDate(){

}

//--------------------------------------------------------

// Example pre-processing function (can be placed outside components)
// function mapTasksByDate(notificationList) {
//     const taskMap = new Map();
//     for (const notification of notificationList) {
//         // Assuming you only care about the first date in the `dates` array
//         const dateKey = notification.dates[0].toDateString(); 
        
//         if (!taskMap.has(dateKey)) {
//             taskMap.set(dateKey, []);
//         }
//         taskMap.get(dateKey).push(notification);
//     }
//     return taskMap;
// }
//--------------------------------------------------------


//creating ROW filled with dates
function DateRow({row, notificationList, monthOffset}){
    return(
        <div className="flex flex-row">
            {row.map((date,i)=>{
                const tasksForDate = getTasksForDate(date, notificationList);
                // console.log(notificationList[0].dates[0]);
                return(<DateBlock monthOffset={monthOffset} day={date} hasTasks={tasksForDate.length>0} key={i} notificationList={notificationList}/>)           
            }
            )}
        </div>
    )
}

//creating MONTH block, with 6 ROWS each ROW with 7 "DAY-BRICKS"
function MonthBlock({monthOffset = 0, notificationList}){
    const [rowArray, setRowArray] = useState([]);
    const [blockDate, setBlockDate] = useState([]);
    
    useEffect(()=>{
            //calculating parameters of the current date
            const currentDate = new Date();
            const currentMonth = currentDate.getMonth();
            const currentYear = currentDate.getFullYear();
            
            //calculating start day of the dates array
            const firstDayInMonth = new Date(currentYear,currentMonth + monthOffset,1, 11,11);
            // (day - 1 + 7) % 7 ensures the range is 0 to 6, with Monday (1) -> 0, Sunday (0) -> 6
            const firstDayInMonthWeekDay = (firstDayInMonth.getDay() - 1 + 7) % 7; 
            const startDay = new Date(firstDayInMonth);
            startDay.setDate(firstDayInMonth.getDate() - firstDayInMonthWeekDay);

            //creating dates array for 6 rows with 7 days in each for the current month
            const rowArray = [];
            for (let j = 0; j < 42 ; j = j+7) {
                const curRow = [];
                // console.log(j);
                for (let i = j; i < j+7; i++) {
                    const tempDate = new Date(startDay);
                    tempDate.setDate(tempDate.getDate() + i);
                    curRow.push(tempDate);
                }
                rowArray.push(curRow)
            }
            setRowArray(rowArray);

            // generate title block "month" + "year"
            let blockDate = new Date();
            blockDate.setMonth(blockDate.getMonth()+monthOffset);
            const blockDateOptions = {
                month: "long",
                year: "numeric"
            }
            const curLocale = navigator.language ;
            const monthAndYear = new Intl.DateTimeFormat(curLocale,blockDateOptions).format(blockDate);
            setBlockDate(monthAndYear) ;
    },[monthOffset]);

    return (
        <div 
            className="flex flex-col bg-[#fff]"
        >   
            <p className="text-center text-xl">{blockDate}</p>
            <WeekDayRow />
            {rowArray.map((row, i)=>
                <DateRow row={row} key={i} notificationList={notificationList} monthOffset={monthOffset} />
            )}
        </div>
    )
}

//Button to change MONTH
function ArrowButtonLeft({onClick}){
    return(
        <button
            onClick={onClick} className="absolute left-[5%] top-[15%] z-10 -translate-y-1/2"
        >
            <img
                src="/src/assets/icons/arrow-left-03.png" alt="arrow-left-03.png"
                className="w-3 opacity-40 hover:opacity-100 hover:scale-110 active:scale-100 transition-all duration-200"
            />
        </button>
    )
}

//Button to change MONTH
function ArrowButtonRight({onClick}){
    return(
        <button
            onClick={onClick} className="absolute right-[5%] top-[15%] z-10 -translate-y-1/2"
        >
            <img
                src="/src/assets/icons/arrow-right-03.png" alt="arrow-right-03.png"
                className="w-3 opacity-40 hover:opacity-100 hover:scale-110 active:scale-100 transition-all duration-200"
            />
        </button>
    )
}


function CalendarSection({notificationList}){
        const [date, setCurrentDate] = useState(null);
        const [offset, setMonthOffset] = useState(0);
        // const [notificationList, setNotificationList] = useState(notificationListFromBD);
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
        },[])


    // const title = `Today is: ${date === null ? "": date.toString()}`
    return(
        <ContentWrapper
            className={"flex flex-col flex-1 w-full items-center md:flex-none md:w-auto md:items-center relative"}
        >
            {/* Title */}
            <ArrowButtonLeft onClick={()=>setMonthOffset(offset => offset-1)} />
            <ArrowButtonRight onClick={()=>setMonthOffset(offset => offset+1)} />
            {/* <p>{title}</p> */}
            <MonthBlock monthOffset={offset} notificationList={notificationList} />
        </ContentWrapper>
    )
}

export default CalendarSection;