import {dateToYYYYMMDDHHMMV3 } from "../../../utils/DatesUtils";
import { useIsMobile } from "../../../utils/CustomHooks";

export function NotificationDateView({notification}){
    const isMobile = useIsMobile();

    // -------MAIN FUNCTION-------
    return (
        <>
        
                <p>Repeat intervals:</p>
                {/*-------GENERATED DATES ROW-------*/}
                <div className="flex flex-row flex-wrap justify-start w-full gap-4">

                    {notification.dates.map((date,j)=>(
                        <div className="opacity-100 text-xs font-normal flex flex-row items-center gap-0.5 ">
                            {/* CALENDAR ICO */}
                            <img
                                src="/src/assets/icons/ico-calendar.png"
                                alt="ico-timer.png"
                                className="h-4 w-4"
                            />

                            {/*MOBILE AND DESKTOP INPUT*/}
                            {isMobile

                                // DATES ROW ON MOBILE
                                ? <div
                                    className="border-gray-400 border-[2px] w-[160px] text-gray-500 rounded-md focus:outline-none focus:border-blue-400 focus:text-black"
                                    key={notification.id}
                                    >
                                        <p>{dateToYYYYMMDDHHMMV3(date)}</p>
                                    </div>

                                // DATES ROW ON DESKTOP
                                : <div
                                    className="border-transparent border-[2px] w-[125px] text-gray-500 rounded-md focus:outline-none focus:border-blue-400 focus:text-black"
                                    key={notification.id}
                                    >
                                        <p>{dateToYYYYMMDDHHMMV3(date)}</p>
                                     </div>
                            } 
                        </div>
                    ))}
                </div>
        </>                
    )
}
