import {generateDates, dateToLocalString } from "../../../utils/DatesUtils";
import { useState, useEffect } from "react";
import { useIsMobile } from "../../../utils/CustomHooks";
import { CustomDateTimeInput } from "./CustomDateInput";

export function NotificationDateInput({notification, setNotificationList}){
    const isMobile = useIsMobile();
    const [dateStrings, setLocalDateString] = useState(notification.dates.map((x)=>dateToLocalString(x)));
    
    
    //this is MAIN DATA SOURCE when we change DATES or REPEAT - we change other react components
    const [dates, setDates] = useState(notification.dates);
    const [repeat, setRepeat] = useState(notification.repeatNumbers);
    

    //auto update notification list when DATES change
    useEffect(()=>{
        handleUpdateNotificationList({...notification, dates: dates})
    },[dates])


    //handlers
    const handleUpdateNotificationList = (updatedNotification) => {
        setNotificationList(prevList =>
            prevList.map(n =>
                n.id === updatedNotification.id ? updatedNotification : n
            )
        );
    };

    //main function
    return (
        <div className="flex flex-col justtify-start w-full gap-0.5 items-start">
                {/*-------SET START DATE AND REPEAT NUMBER ROW-------*/}
                <p>Set start date and repeat count:</p>
                <div className="flex flex-row justtify-start w-full gap-4 items-center">
                    <div className="opacity-100 text-xs font-normal flex flex-row items-center gap-0.5 ">
                        {/* TIMER ICO */}
                        <img
                            src="/src/assets/icons/ico-timer.png"
                            alt="ico-timer.png"
                            className="h-4 w-4"
                        />

                    {/*MOBILE AND DESKTOP INPUT */}
                    {isMobile

                        // MOBILE INPUT
                        ?<input
                                className="border-gray-400 border-[2px] w-[160px] text-gray-500 rounded-md focus:outline-none focus:border-blue-400 focus:text-black"
                                type="datetime-local"
                                value={dateStrings[0]}
                                onChange={(e)=>{
                                    //creating new array with only current date 
                                    const currentDate = new Date(e.target.value);
                                    //generate new dates array
                                    const newDates = generateDates(currentDate, repeat);
                                    //replace dates with new generated dates
                                    setDates(newDates);

                                    //update datesString manually

                                    //creating and set new array with  dateStrings 
                                    const newDateStrings = newDates.map((x)=>dateToLocalString(x))
                                    setLocalDateString(newDateStrings)
                                    }
                                }
                        />

                        //DESKTOP INPUT
                        :<CustomDateTimeInput
                            value={dates[0]}
                            onChange={(newDate) => {

                                // creating and set new dates array
                                const newDates = generateDates(newDate, repeat);
                                setDates(newDates);

                                //creating and set new array with  dateStrings 
                                const newDateStrings = newDates.map((x)=>dateToLocalString(x))
                                setLocalDateString(newDateStrings)
                            }}
                        />


                    }
                    </div>

                    {/* REPEAT NUMBER SELECTOR */}

                    <div className="opacity-100 text-xs font-normal flex flex-row items-center gap-0.5">
                    {/* REPEAT ICO */}
                        <img
                            src="/src/assets/icons/ico-repeat.png"
                            alt="ico-timer.png"
                            className="h-4 w-4"
                        />
                        <select 
                            className="
                                rounded-md border-[2px] border-gray-400
                                px-1 py-0 w-auto text-xs bg-[#F3F4F6] text-gray-500
                                focus:outline-none  focus:border-blue-400 focus:text-black
                                text-center
                            "
                            name=""
                            id=""
                            value={repeat}
                            onChange={
                                (e)=>{
                                    //set repeatNumbers
                                    const repeatNumbers = parseInt(e.target.value);
                                    setRepeat(repeatNumbers);

                                    //generate and set new dates array
                                    const newDates = generateDates(dates[0], repeatNumbers);
                                    setDates(newDates);

                                    //creating and set new array with  dateStrings 
                                    const newDateStrings = newDates.map((x)=>dateToLocalString(x))
                                    setLocalDateString(newDateStrings)
                                }
                            }
                        >
                            <option value={1}>1</option>
                            <option value={2}>2</option>
                            <option value={3}>3</option>
                            <option value={4}>4 - optimal</option>
                        </select>
                    </div>
                </div>

                {/* -------HR------- */}
                <hr className="w-full border-[1px] mt-1" />


                <p>Calculated repeat intervals:</p>
                {/*-------GENERATED DATES ROW-------*/}
                <div className="flex flex-row flex-wrap justify-start w-full gap-4">

                    {dates.map((date,j)=>(
                        <div className="opacity-100 text-xs font-normal flex flex-row items-center gap-0.5 ">
                            {/* CALENDAR ICO */}
                            <img
                                src="/src/assets/icons/ico-calendar.png"
                                alt="ico-timer.png"
                                className="h-4 w-4"
                            />

                            {/*MOBILE AND DESKTOP INPUT*/}
                            {isMobile

                                // REGULAR INPUT ON MOBILE
                                ? <input
                                    className="border-gray-400 border-[2px] w-[160px] text-gray-500 rounded-md focus:outline-none focus:border-blue-400 focus:text-black"
                                    key={notification.id}
                                    type="datetime-local"
                                    value={dateStrings[j]}
                                    onChange={(e)=>{
                                            //create copy of array "dates"
                                            const newDates = [...dates];
                                            //modify the 'j' element of the created array
                                            newDates[j] = new Date(e.currentTarget.value);
                                            setDates(newDates);

                                            //creating NEW  array with  dateStrings 
                                            const newDateStrings = [...dateStrings]
                                            newDateStrings[j] = e.currentTarget.value
                                            setLocalDateString(newDateStrings)
                                        }
                                    }
                                />

                                // CUSTOM INPUT ON DESKTOP
                                : <CustomDateTimeInput
                                key={notification.id}
                                value={dates[j]}
                                onChange={(newDate) => {

                                    //creating new array with dates
                                    const newDates = dates.map((x,i) => i === j ? newDate : x);
                                    setDates(newDates);

                                    //creating NEW  array with  dateStrings 
                                    const newDateStrings = [...dateStrings]
                                    newDateStrings[j] = dateToLocalString(newDate)
                                    setLocalDateString(newDateStrings)

                                }}
                            />
                    } 
                        </div>
                    ))}
                </div>
    </div>



                
    )
}
