import {compareDates, dateToYYYYMMDDHHMMV2, getDaysLeftString} from "../../../utils/DatesUtils";
import { useIsMobile } from "../../../utils/CustomHooks";
import clsx from "clsx";

// 1. Import your images as variables
import icoCalendar from "../../../assets/icons/ico-calendar.png";

export function NotificationDateView({
    notification,
    datesObj,
    setDates,
    repeat,
    setRepeat
}){
    const isMobile = useIsMobile();
    const currentDate = new Date();

    // -------MAIN FUNCTION-------
    return (
        <>
                <p className="pt-2 font-medium">
                    Repeat intervals:
                </p>
                {/*-------GENERATED DATES ROW-------*/}
                <div className="flex flex-col md:flex-row flex-wrap justify-start w-full gap-0 md:gap-4">

                    {datesObj.map((dateObj,j)=>(
                        <div
                            key={j}
                            className={clsx(
                                "flex flex-row md:flex-col gap-0 p-1 md:p-2",
                                "bg-surface text-sm rounded-lg",
                                "hover:bg-surfaceMuted hover:shadow-sm transition-all"
                            )}
                        >
                            <div
                                className="flex flex-row"
                            >

                                {/* CALENDAR ICO */}
                                <img
                                    src={icoCalendar}
                                    alt="ico-calendar"
                                    className="h-4 w-4"
                                />

                                {/*MOBILE AND DESKTOP VIEW*/}
                                <div
                                    className={clsx(
                                        "w-[120px] rounded-md focus:text-text",
                                        currentDate > new Date(dateObj.repeatDate)
                                            ?"text-textMuted line-through"
                                            :"text-textSecondary" 
                                        )
                                    }
                                    key={notification.id}
                                    >
                                        <p>{dateToYYYYMMDDHHMMV2(dateObj.repeatDate)}</p>
                                </div>
                            </div>
                            <hr className="hidden md:block border-border" />
                            <p className="block md:hidden text-textSecondary px-3">—</p>
                            {/* DAYS LEFT */}
                            <div
                                className={clsx(
                                    "px-1 py-0 w-auto rounded-md",
                                    "bg-transparent  text-textSecondary outline-none ",
                                    "focus:text-text"
                                )}
                            >
                                <p>{getDaysLeftString(dateObj.repeatDate)}</p>
                            </div>
                        </div>
                    ))}
                </div>
        </>                
    )
}















// import {compareDates, dateToYYYYMMDDHHMMV2, getDaysLeftString} from "../../../utils/DatesUtils";
// import { useIsMobile } from "../../../utils/CustomHooks";
// import clsx from "clsx";

// // 1. Import your images as variables
// import icoCalendar from "../../../assets/icons/ico-calendar.png";

// export function NotificationDateView({
//     notification,
//     datesObj,
//     setDates,
//     repeat,
//     setRepeat
// }){
//     const isMobile = useIsMobile();
//     const currentDate = new Date();

//     // -------MAIN FUNCTION-------
//     return (
//         <>
//                 <p className="pt-2">
//                     Repeat intervals:
//                 </p>
//                 {/*-------GENERATED DATES ROW-------*/}
//                 <div className="flex flex-row flex-wrap justify-start w-full gap-4">

//                     {datesObj.map((dateObj,j)=>(
//                         <div
//                             key={j}
//                             className={clsx(
//                                 "flex flex-col gap-2 p-2",
//                                 "text-xs",
//                                 "bg-white border border-slate-200 rounded-lg",
//                                 "hover:bg-slate-50 hover:shadow-sm hover:border-indigo-100 transition-all"
//                             )}
//                         >
//                             <div
//                                 className="flex flex-row"
//                             >

//                                 {/* CALENDAR ICO */}
//                                 <img
//                                     src={icoCalendar}
//                                     alt="ico-calendar"
//                                     className="h-4 w-4"
//                                 />

//                                 {/*MOBILE AND DESKTOP INPUT*/}
//                                 {isMobile

//                                     // DATES ROW ON MOBILE
//                                     ? <div
//                                         className="border-gray-400 border-[2px] w-[125px] text-gray-500 rounded-md focus:outline-none focus:border-blue-400 focus:text-black"
//                                         key={notification.id}
//                                         >
//                                             <p>{dateToYYYYMMDDHHMMV2(dateObj.repeatDate)}</p>
//                                         </div>

//                                     // DATES ROW ON DESKTOP
//                                     : <div
//                                         className={clsx(
//                                             "border-transparent border-[2px] w-[125px] rounded-md focus:outline-none focus:border-blue-400 focus:text-black",
//                                             currentDate > new Date(dateObj.repeatDate)
//                                                 ?"text-gray-300 line-through"
//                                                 :"text-gray-500" 
//                                             )
//                                         }
//                                         key={notification.id}
//                                         >
//                                             <p>{dateToYYYYMMDDHHMMV2(dateObj.repeatDate)}</p>
//                                         </div>
//                                 } 
//                             </div>
//                             <hr />
//                             {/* DAYS LEFT */}
//                             <div
//                                 className={clsx(
//                                     "px-1 py-0 w-auto text-xs rounded-md",
//                                     "bg-transparent  text-gray-500 outline-none ",
//                                     "focus:text-black"
//                                 )}
//                             >
//                                 <p>{getDaysLeftString(dateObj.repeatDate)}</p>
//                             </div>
//                         </div>
//                     ))}
//                 </div>
//         </>                
//     )
// }
