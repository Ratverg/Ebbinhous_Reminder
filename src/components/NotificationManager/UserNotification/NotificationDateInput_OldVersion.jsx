// import { dateToYYYYMMDDHHMM, generateDates } from "../../../utils/DatesUtils";
// import { useState } from "react";
// import { useIsMobile } from "../../../utils/CustomHooks";
// import { CustomDateTimeInput } from "./CustomDateInput";

// export function NotificationDateInput({notification, setNotificationList}){
//     const [dateStrings, setLocalDateString] = useState (notification.dates.map((x)=>dateToYYYYMMDDHHMM(x)));
//     const isMobile = useIsMobile();


//     //this is MAIN DATA SOURCE when we change DATES or REPEAT - we change other react components
//     const [dates, setDates] = useState(notification.dates);
//     const [repeat, setRepeat] = useState(notification.repeat);

//     //components, that chaged 


//     const handleUpdateNotificationList = (updatedNotification) => {
//         setNotificationList(prevList =>
//             prevList.map(n =>
//                 n.id === updatedNotification.id ? updatedNotification : n
//             )
//         );
//     };
//     return (
//         <>
        
//                 {/* start date and repeat times row */}

//                 <div className="flex flex-row justtify-start w-full gap-2">
//                     {isMobile
//                         // regular input on mobile for start date
//                         ?<input
//                                 className="border-gray-400 border-[2px] w-[160px] text-gray-500 rounded-md focus:outline-none focus:border-blue-400 focus:text-black"
//                                 type="datetime-local"
//                                 value={dateStrings[0]}
//                                 onChange={(e)=>{
//                                         //set local dateString values (we need this to enter year by hand)
//                                         setLocalDateString(dateStrings.map((x,i) => i === 0 ? e.target.value: x))
//                                         //create "Date object" array from datesStirng "YYYY-mm-dd"
//                                         const newDates = dates.map((x,i)=> i === 0 ? new Date(e.target.value) : x)
//                                         // const newDates = generateDates(dates[0], repeatNumbers);
//                                         setDates(newDates)
//                                         setLocalDateString(newDates.map((x)=>dateToYYYYMMDDHHMM(x))); 
//                                         handleUpdateNotificationList({...notification, dates: newDates})
                                        
//                                     }
//                                 }
//                                 onBlur={()=>{handleUpdateNotificationList({...notification, dates: dates})}}
//                         />
//                         // custom input on desktop for start date
//                         :<CustomDateTimeInput
//                             value={dates[0]}
//                             onChange={(newDate) => {
//                                 // const newDates = dates.map((x,i) => i === 0 ? newDate : x);
//                                 const newDates = generateDates(newDate, repeat);
//                                 setDates(newDates);
//                                 setLocalDateString(newDates.map((x)=>dateToYYYYMMDDHHMM(x))); 
//                                 handleUpdateNotificationList({...notification, dates: newDates});
//                             }}
//                         />
//                     }
//                     <label htmlFor="repeatNumberSelector">Repeat numbers</label>
//                     <select 
//                         name=""
//                         id=""
//                         value={repeat}
//                         onChange={
//                             (e)=>{
//                                 const repeatNumbers = parseInt(e.target.value);
//                                 setRepeat(repeatNumbers);
//                                 const newDateSet = generateDates(dates[0], repeatNumbers);
//                                 console.log(dates[0]);
//                                 setDates(newDateSet);
//                                 setLocalDateString(newDateSet.map((x)=>dateToYYYYMMDDHHMM(x))); 
//                             }
//                         }
//                     >
//                         <option value={2}>2</option>
//                         <option value={3}>3</option>
//                         <option value={4}>4 - optimal</option>
//                         <option value={5}>5</option>
//                     </select>
//                 </div>


//                 {/* generated dates row */}


//                 <div className="flex flex-row flex-wrap justify-start w-full gap-2">
//                     {/* dates row */}
//                     {dates.map((date,j)=>(
//                         <div className="opacity-100 text-xs font-normal flex flex-row items-center ">
//                             <img
//                                 src="/src/assets/icons/ico-timer.png"
//                                 alt="ico-timer.png"
//                                 className="h-3 w-3"
//                                 />

//                             {/* there are two input types: regular type is on mobile, and custom picker on desktop */}
//                             {isMobile
//                                 // regular input on mobile
//                                 ? <input
//                                     className="border-gray-400 border-[2px] w-[160px] text-gray-500 rounded-md focus:outline-none focus:border-blue-400 focus:text-black"
//                                     type="datetime-local"
//                                     value={dateStrings[j]}
//                                     onChange={(e)=>{
//                                             //set local dateString values (we need this to enter year by hand)
//                                             setLocalDateString(dateStrings.map((x,i) => i === j ? e.target.value: x))
//                                             //create "Date object" array from datesStirng "YYYY-mm-dd"
//                                             const newDates = dates.map((x,i)=> i === j ? new Date(e.target.value) : x)
//                                             setDates(newDates)
//                                             setLocalDateString(newDates.map((x)=>dateToYYYYMMDDHHMM(x))); 
//                                             handleUpdateNotificationList({...notification, dates: newDates})
//                                         }
//                                     }
//                                     onBlur={()=>{handleUpdateNotificationList({...notification, dates: dates})}}
//                                 />
//                                 // custom input on desktop
//                                 : <CustomDateTimeInput
//                                 value={dates[j]}
//                                 onChange={(newDate) => {
//                                     const newDates = dates.map((x,i) => i === j ? newDate : x);
//                                     setDates(newDates);
//                                     setLocalDateString(newDates.map((x)=>dateToYYYYMMDDHHMM(x))); 
//                                     handleUpdateNotificationList({...notification, dates: newDates});
//                                 }}
//                             />
//                     } 
//                         </div>
//                     ))}
//                 </div>
//     </>



                
//     )
// }
