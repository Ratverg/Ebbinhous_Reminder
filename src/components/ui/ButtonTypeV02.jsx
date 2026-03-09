
import clsx from "clsx";

// Description: Neon "Get Started" style button with glassmorphism and glow
function ButtonType02({
    text = "Get started!",
    active = false,
    onClick
}) {
    return (
        <button
            onClick={onClick}
            className={clsx(
                // Base Shape & Layout
                "relative flex items-center justify-center transition-all duration-500 rounded-full font-medium",
                "h-[2.1rem] w-[10rem] text-lg md:h-[2.5rem] md:w-[12rem] md:text-xl",
                
                // Colors & Glassmorphism
                "text-[#C8DFFF] border-2 border-[#C8DFFF]",
                "bg-[#1e293b]/40 backdrop-blur-md",

                // The Glow Effect (Box Shadows)
                // Format: [outer-glow, inset-inner-glow]
                "shadow-[0_0_15px_rgba(123,179,255,0.4),inset_0_0_8px_rgba(123,179,255,0.3)]",
                
                // Hover & Active States
                " hover:bg-[#1e293b]/60 ho",
                "hover:shadow-[0_0_22px_rgba(123,179,255,0.7),inset_0_0_12px_rgba(123,179,255,0.5)]",

                // Logic for 'active' prop
                active 
                    ? "border-[#C8DFFF] shadow-[0_0_30px_rgba(123,179,255,0.8),inset_0_0_15px_rgba(123,179,255,0.6)] brightness-110" 
                    : "brightness-100"
            )}
        >
            {/* Using a span for text to ensure it sits above any potential backdrop filters */}
            <span className="relative z-10">{text}</span>
        </button>
    );
}

export default ButtonType02;







// import clsx from "clsx";
// //Description: Button with "underline".  
// function ButtonType02({
//     text = "btn",
//     active = false,
//     onClick
// }){
//     return(
//         <button
//         onClick={onClick}
//         className={clsx(
//             "bg-brand text-textInverse ",
//             "h-[2.5rem] w-[10rem] text-lg rounded-full relative duration-500",
//             "md:h-[2.5rem] md:w-[12rem] md:text-xl",
       
//             "after:absolute after:bottom-2 after:left-1/2 after:h-[2px] after:bg-textInverse after:translate-x-[-50%]",
//             "after:transition-all after:duration-300 ",
//             active
//                 ? "after:w-full text-textInverse brightness-100" //active button
//                 : "after:w-0 text-textInverse hover:brightness-125 hover:text-textInverse hover:after:w-[80%]" //inactive button
//         )}>
//             {text}
//         </button> 
//     )
// }

// export default ButtonType02;