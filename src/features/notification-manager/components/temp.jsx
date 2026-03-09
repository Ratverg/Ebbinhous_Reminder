
// import React, { useState } from "react";
// import { AnimatePresence, motion } from "framer-motion";
// import { Calendar, RefreshCw, Clock, Info } from "lucide-react";
// import clsx from "clsx";

// // --- Utils ---
// const getStatusString = (targetDate) => {
//   if (!targetDate) return "No date";
//   const now = new Date();
//   const diffInMs = targetDate - now;
//   const diffInDays = diffInMs / 86400000;

//   if (diffInDays < 0) return "Expired";
//   if (diffInDays < 1) return "Today";
//   if (diffInDays < 2) return "Tomorrow";
//   return `${Math.ceil(diffInDays)} days left`;
// };

// const dateToDateObj = (date) => ({
//   repeatDate: date,
//   sentAt: null,
//   status: date > new Date() ? null : "outdated_on_creation",
// });

// // --- Component ---
// export function NotificationDateInput({
//   notification,
//   datesObj,
//   setDates,
//   repeat,
//   setRepeat,
//   isMobile, // Предполагаем пропс или контекст
// }) {
//   const [dateStrings, setLocalDateString] = useState(
//     datesObj.map((d) => new Date(d.repeatDate).toISOString().slice(0, 16))
//   );

//   // Обработчики вынесены для чистоты (аналогичны вашим, но с рефакторингом)
//   const handleMainDateChange = (val) => {
//     const newDate = new Date(val);
//     if (isNaN(newDate)) return;

//     // Генерируем даты (предполагаем наличие generateDates в области видимости)
//     // const tempDates = generateDates(newDate, repeat); 
//     // ... логика обновления
//   };

//   return (
//     <div className="w-full space-y-6 p-1">
//       {/* Header Section */}
//       <section className="space-y-3">
//         <header className="flex items-center gap-2 text-slate-700 font-medium text-sm">
//           <Info size={16} className="text-indigo-500" />
//           <h3>Schedule Configuration</h3>
//         </header>

//         <div className="flex flex-col sm:flex-row gap-4 items-end sm:items-center bg-slate-50/50 p-4 rounded-xl border border-slate-100">
//           {/* Start Date */}
//           <div className="flex flex-col gap-1.5 flex-1">
//             <label className="text-[11px] uppercase tracking-wider text-slate-400 font-bold px-1">
//               Start Date & Time
//             </label>
//             <div className="relative group w-full">
//               <Clock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-500 transition-colors" size={16} />
//               <input
//                 type="datetime-local"
//                 value={dateStrings[0]}
//                 onChange={(e) => handleMainDateChange(e.target.value)}
//                 className="w-full pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-lg text-sm transition-all focus:outline-none focus:ring-2 focus:ring-indigo-500/10 focus:border-indigo-500 hover:border-slate-300"
//               />
//             </div>
//           </div>

//           {/* Repeat Selector */}
//           <div className="flex flex-col gap-1.5 w-full sm:w-32">
//             <label className="text-[11px] uppercase tracking-wider text-slate-400 font-bold px-1">
//               Repeats
//             </label>
//             <div className="relative group">
//               <RefreshCw className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-500 transition-colors" size={16} />
//               <select
//                 value={repeat}
//                 onChange={(e) => setRepeat(parseInt(e.target.value))}
//                 className="w-full pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-lg text-sm appearance-none focus:outline-none focus:ring-2 focus:ring-indigo-500/10 focus:border-indigo-500 cursor-pointer"
//               >
//                 {[1, 2, 3, 4, 5].map((v) => (
//                   <option key={v} value={v}>{v} times</option>
//                 ))}
//               </select>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Calculated Intervals */}
//       <section className="space-y-3">
//         <div className="flex items-center justify-between px-1">
//           <p className="text-xs font-semibold text-slate-500 uppercase tracking-tight">
//             Generated Intervals
//           </p>
//           <span className="text-[10px] bg-indigo-100 text-indigo-600 px-2 py-0.5 rounded-full font-bold">
//             {datesObj.length} slots
//           </span>
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-3">
//           <AnimatePresence mode="popLayout">
//             {datesObj.map((dateObj, j) => {
//               const status = getStatusString(dateObj.repeatDate);
//               const isToday = status === "Today";

//               return (
//                 <motion.div
//                   key={dateObj.repeatDate.getTime()}
//                   initial={{ opacity: 0, y: 10 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   exit={{ opacity: 0, scale: 0.95 }}
//                   transition={{ duration: 0.2, delay: j * 0.05 }}
//                   className="group relative flex flex-col p-3 bg-white border border-slate-200 rounded-xl hover:shadow-md hover:border-indigo-100 transition-all"
//                 >
//                   <div className="flex items-center gap-3 mb-2">
//                     <div className={clsx(
//                       "p-2 rounded-lg transition-colors",
//                       isToday ? "bg-emerald-50 text-emerald-600" : "bg-slate-50 text-slate-400 group-hover:bg-indigo-50 group-hover:text-indigo-500"
//                     )}>
//                       <Calendar size={18} />
//                     </div>
                    
//                     <input
//                       type="datetime-local"
//                       value={dateStrings[j]}
//                       onChange={(e) => {/* аналогично single change */}}
//                       className="flex-1 bg-transparent text-sm font-medium text-slate-700 focus:outline-none"
//                     />
//                   </div>

//                   <div className="flex items-center justify-between mt-auto pt-2 border-t border-slate-50">
//                     <span className={clsx(
//                       "text-[10px] font-bold px-2 py-0.5 rounded-md uppercase tracking-tighter",
//                       isToday ? "bg-emerald-100 text-emerald-700" : "bg-slate-100 text-slate-500"
//                     )}>
//                       {status}
//                     </span>
//                     <span className="text-[10px] text-slate-300 font-mono">
//                       SLOT 0{j + 1}
//                     </span>
//                   </div>
//                 </motion.div>
//               );
//             })}
//           </AnimatePresence>
//         </div>
//       </section>
//     </div>
//   );
// }