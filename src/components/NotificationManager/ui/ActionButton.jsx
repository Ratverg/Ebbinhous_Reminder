import clsx from "clsx"
// -------Action buttons-------
export function ActionButton({text = "btn", active = false, onClick, color = "#ffffff"}){
    return(
        <button
        onClick={onClick}
        style={{ backgroundColor: color }}
        className={clsx(
            "text-white",
            "h-[1.3rem] text-xs px-3 rounded-full relative duration-500",
            "md:h-[1.5rem] md:text-xs",
            
            "after:absolute after:bottom-1 after:left-1/2 after:h-[2px] after:bg-[#ffffff] after:translate-x-[-50%]",
            "after:transition-all after:duration-300 ",
            active
            ? "after:w-full text-[#ffffff]" //active button
            : "after:w-0 text-[#ffffff] hover:text-[#ffffff] hover:after:w-[80%]" //inactive button
        )}>
            {text}
        </button> 
    )
}