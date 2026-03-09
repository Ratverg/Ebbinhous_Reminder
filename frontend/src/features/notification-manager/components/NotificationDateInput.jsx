






    import { useState } from "react";
    import { useIsMobile } from "../../../utils/CustomHooks";
    import { generateDates, dateToLocalString, getDaysLeftString } from "../../../utils/DatesUtils";
    import { CustomDateTimeInput } from "./CustomDateInput";
    import { AnimatePresence, motion } from "framer-motion";
    // 1. Import your images as variables
    import icoTimer from "../../../assets/icons/ico-timer.png";
    import icoRepeat from "../../../assets/icons/ico-repeat.png";
    import icoCalendar from "../../../assets/icons/ico-calendar.png";
    import clsx from "clsx";


    //Convert date to my "dateObject"
    const dateToDateObj = (date) =>{
        return {
            "repeatDate": date,
            "sentAt": null,
            "status": date > new Date()? null: "outdated_on_creation"
        }
    }


export function NotificationDateInput({
        notification,
        datesObj,
        setDates,
        repeat,
        setRepeat
    }){
        const isMobile = useIsMobile();
        const [dateStrings, setLocalDateString] = useState(notification.dates
            .map((dateObj)=>{
                return dateToLocalString(dateObj.repeatDate);
            })
        );
        //------------------------------------
        //MOBILE 
        //------------------------------------
        const mobileOnChange = (e)=>{
            //create a copy of STRINGS array, to modify locally, just to display what we print
            const tempDateStrings = [...dateStrings];
            tempDateStrings[0] = e.currentTarget.value;
            setLocalDateString(tempDateStrings);
        }
        const mobileOnChangeSingle = (e,j)=>{
            //create a copy of STRINGS array, to modify locally, just to display what we print
            const tempDateStrings = [...dateStrings];
            tempDateStrings[j] = e.currentTarget.value;
            setLocalDateString(tempDateStrings);
        }
        const mobileOnBlur = (e)=>{
            //if entered LOCALSTRING is incorrect - set LOCALSTRING from DATE object and return
            if (isNaN(new Date(e.currentTarget.value))){
                const tempDateStrings = [...dateStrings];
                tempDateStrings[0] = dateToLocalString(datesObj[0].repeatDate);
                setLocalDateString(tempDateStrings);
                return;   
            }
            //if date not changed - return
            if (new Date(e.currentTarget.value).getTime() === datesObj[0].repeatDate.getTime()) return;
            
            // creating new DATES array
            const tempDate = new Date(e.currentTarget.value);
            const tempDates = generateDates(tempDate, repeat);
            
            //creating new DATESTRINGS array
            const tempDateStrings = tempDates.map((x)=>dateToLocalString(x))
            
            //creating new DATEOBJ array
            const tempDatesObj = tempDates.map(dateToDateObj);
            
            //set DATESTRINGS and DATEOBJ arrays
            setLocalDateString(tempDateStrings);
            setDates(tempDatesObj);
        }
        const mobileOnBlurSingle = (e,j)=>{
            //if entered LOCALSTRING is incorrect - set LOCALSTRING from DATE object and return
            if (isNaN(new Date(e.currentTarget.value))){
                const tempDateStrings = [...dateStrings];
                tempDateStrings[j] = dateToLocalString(datesObj[j].repeatDate);
                setLocalDateString(tempDateStrings);
                return;   
            }
            
            //if unchanged - just return
            if (e.currentTarget.value === dateStrings[j]) return;
            
            //create copy of array DATES to save our entered date when click outside
            const tempDatesObj = [...datesObj];
            
            //modify the 'j' element of the created array
            tempDatesObj[j] = dateToDateObj(new Date(e.currentTarget.value));
            setDates(tempDatesObj);
        }
        
        //------------------------------------
        //DESKTOP
        //------------------------------------
        const desktopOnChange = (newDate) => {
            //check if newDate does not change, just return
            if (newDate.getTime() === datesObj[0].repeatDate.getTime()) return;

            // creating and set new dates array
            const tempDates = generateDates(newDate, repeat);
            const tempDatesObj = tempDates.map(dateToDateObj);
            setDates(tempDatesObj);
            
            //creating and set new array with  dateStrings 
            const newDateStrings = tempDates.map((x)=>dateToLocalString(x))
            setLocalDateString(newDateStrings)
        }
        const desktopOnChangeSingle= (newDate, j) => {
            //if unchanged - return
            if (newDate.getTime() === datesObj[j].repeatDate.getTime()) return;

            //creating new array with dates
            const tempDateObj = dateToDateObj(newDate);
            const tempDatesObj = datesObj.map((x,i) => i === j ? tempDateObj : x);
            setDates(tempDatesObj);

            //creating NEW  array with  dateStrings 
            const tempDateStrings = [...dateStrings]
            tempDateStrings[j] = dateToLocalString(newDate)
            setLocalDateString(tempDateStrings)
        }
        
        //------------------------------------
        //DESKTOP and MOBILE
        //------------------------------------
        //REPEAT
        const onChangeRepeat = (e)=>{
            //set repeatNumbers
            const repeatNumbers = parseInt(e.target.value);
            //check if repeat nubber unchanged - just return
            if (repeatNumbers === repeat) return;

            setRepeat(repeatNumbers);

            //generate and set new dates array
            const tempDates = generateDates(datesObj[0].repeatDate, repeatNumbers);
            const tempDateStrings = tempDates.map((x)=>dateToLocalString(x));
            const tempDatesObj = tempDates.map(dateToDateObj);
            setDates(tempDatesObj);
            setLocalDateString(tempDateStrings)
        }

    //main function
        return (
            <div className="flex flex-col justtify-start w-full gap-0 items-start">
                    {/* -------HR------- */}
                    <hr className="w-full border-[1px] my-2 border-border" />
                    {/*-------SET START DATE AND REPEAT NUMBER ROW-------*/}
                    <p className="font-medium">Set start date and repeat count:</p>
                    <div className="flex flex-row justify-start w-full gap-4 items-center text-sm">
                        <div className="opacity-100 flex flex-row items-center gap-0.5 ">
                            {/* TIMER ICO */}
                            <img
                                src={icoTimer}
                                alt="ico-timer"
                                className="h-4 w-4 flex-shrink-0"
                            />
                        {/*MOBILE AND DESKTOP INPUT */}
                        {isMobile
                            // MOBILE INPUT
                            ?<input
                                    type="datetime-local"
                                    value={dateStrings[0]}
                                    onChange={mobileOnChange}
                                    onBlur={mobileOnBlur}
                                    className={clsx(
                                        "px-1 py-1 w-[135px] rounded-md",
                                        "bg-surface text-textSecondary hover:text-text outline-none", 
                                        "color-scheme-dark", // Some environments prefer this over scheme-dark
                                        "[&::-webkit-calendar-picker-indicator]:invert", // Forces icon to white
                                        "cursor-pointer"
                                    )}
                            />
                            //DESKTOP INPUT
                            :<CustomDateTimeInput
                                value={datesObj[0].repeatDate}
                                onChange={desktopOnChange}
                            />
                        }
                        </div>
                        {/* REPEAT NUMBER SELECTOR */}
                        <div className="opacity-100 flex flex-row items-center gap-0.5">
                        {/* REPEAT ICO */}
                            <img
                                src={icoRepeat}
                                alt="ico-repeat"
                                className="h-4 w-4"
                            />
                            <select 
                                className={clsx(
                                    "px-1 py-0 w-[40px] rounded-md cursor-pointer",
                                    "bg-surface text-textSecondary text-sm outline-none ",
                                    "focus:text-text",
                                    "hover:text-text transition-all"
                                )}
                                name=""
                                id=""
                                value={repeat}
                                onChange={onChangeRepeat}
                            >
                                <option value={1}>1</option>
                                <option value={2}>2</option>
                                <option value={3}>3</option>
                                <option value={4}>4</option>
                            </select>
                        </div>
                    </div>
                    {/* -------HR------- */}
                    <hr className="w-full border-[1px] my-2 border-border" />
                    <p className="font-medium">Calculated repeat intervals:</p>
                    {/*-------GENERATED DATES ROW-------*/}
                    <div 
                        className="flex flex-col md:flex-row flex-wrap justify-start w-full gap-0 md:gap-4"
                    >
                        <AnimatePresence mode="popLayout">
                            {datesObj.map((dateObj,j)=>(
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.3 }}
                                    key={dateObj.repeatDate.getTime()}
                                    className={clsx(
                                        "flex flex-row md:flex-col items-center md:items-start gap-2 p-0",
                                        "bg-surface rounded-lg text-sm",
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
                                            {/*MOBILE AND DESKTOP INPUT*/}
                                            {isMobile
                                                // REGULAR INPUT ON MOBILE
                                                ?<input
                                                    key={notification.id}
                                                    type="datetime-local"
                                                    value={dateStrings[j]}
                                                    onChange={e => mobileOnChangeSingle(e,j)}
                                                    onBlur={e => mobileOnBlurSingle(e,j)}
                                                    className={clsx(
                                                        "px-1 py-0 w-[135px] rounded-md",
                                                        "bg-transparent text-textSecondary hover:text-text outline-none", 
                                                        "color-scheme-dark", // Some environments prefer this over scheme-dark
                                                        "[&::-webkit-calendar-picker-indicator]:invert", // Forces icon to white
                                                        "cursor-pointer"
                                                    )}
                                                />
                                                // CUSTOM INPUT ON DESKTOP
                                                : <CustomDateTimeInput
                                                    key={notification.id}
                                                    value={dateObj.repeatDate}
                                                    onChange={e =>desktopOnChangeSingle(e,j)}
                                                />
                                            }

                                        </div>
                                        <hr className="hidden md:block border-border" />
                                        <p className="block md:hidden text-textSecondary px-3">—</p>
                                        {/* DAYS LEFT */}
                                        <div
                                            className={clsx(
                                                "px-1 py-0 w-auto rounded-md",
                                                "bg-transparent  text-textSecondary outline-none "
                                            )}
                                        >
                                            <p>{getDaysLeftString(dateObj.repeatDate)}</p>
                                        </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>
            </div>
        )
    }