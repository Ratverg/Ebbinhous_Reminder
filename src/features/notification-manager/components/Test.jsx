// import { useState, useRef } from "react";
// import { motion, AnimatePresence } from "framer-motion";

// export function Test() {
//   const [messages, setMessages] = useState([
//     { id: 1, text: "Message 1" },
//     { id: 2, text: "Message 2" },
//   ]);

//   const counter = useRef(3);

//   const addMessage = () => {
//     const id = counter.current++;
//     setMessages((prev) => [...prev, { id, text: `Message ${id}` }]);
//   };

//   const removeMessage = (id) => {
//     setMessages((prev) => prev.filter((m) => m.id !== id));
//   };

//   return (
//     <div className="p-6">


//       <div className="space-y-0">
//         <AnimatePresence  >
//           {messages.map((m) => (
//             <motion.div
//               key={m.id}
//               layout
              
//               // initial={{ rotate: 180}}
//               // animate={{ rotate: 360}}
//               // exit={{ rotate: 0}}

              
//               initial={{ opacity: 0}}
//               animate={{ opacity: 1}}
//               exit={{ opacity: 0}}
              
//               // initial={{ height: 0, opacity: 0}}
//               // animate={{ height: "auto", opacity: 1}}
//               // exit={{ height:0, opacity: 0}}

//               transition={{ duration: 1 }}
//               className="bg-gray-200 rounded p-0 flex justify-between"
//             >
//               <div 
//               className="p-0"
//               >
//                 <div
//                 className="p-1"
//                 >
//                     <span>{m.text}</span>
//                     <button
//                       onClick={() => removeMessage(m.id)}
//                       className="px-3 py-3 bg-main rounded"
//                     >
//                       X
//                     </button>
//                 </div>
//               </div>
//             </motion.div>
//           ))}
//         </AnimatePresence>
//       </div>
//             <button
//         onClick={addMessage}
//         className="mb-4 px-4 py-2 bg-gray-800 text-white rounded"
//       >
//         Add
//       </button>
//     </div>
//   );
// }
