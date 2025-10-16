import clsx from "clsx"

export function HashTagButton({text = "btn", color = "#1f6e93" }){
    return(
        <button
        style={{ backgroundColor: color }}
        className={clsx(
            "text-white",
            "h-[1.3rem] text-xs px-3 rounded-full relative duration-500",
            "md:h-[1.5rem] md:text-xs",
            "hover:opacity-50"
        )}
        
        >
            {text}
        </button> 
    )
}

