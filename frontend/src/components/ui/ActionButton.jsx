import clsx from "clsx"


//Description: button with __underscore__ 
export function ActionButton({
    text = "btn",
    active = false,
    onClick,
    color="brand",
    className
}){
    return(
        <button
        onClick={onClick}
        style={{ backgroundColor: color }}
        className={clsx(
            `bg-${color}`,
            "hover:brightness-110",
            "text-sm",
            "h-[1.3rem] px-3 rounded-full relative duration-500",
            "md:h-[1.5rem]",
            
            "after:absolute after:bottom-1 after:left-1/2 after:h-[1.5px] after:bg-textInverse after:rounded-full after:translate-x-[-50%]",
            "after:transition-all after:duration-300",
            className,
            active
            ? "after:w-[70%] text-textInverse brightness-100" //active button
            : "after:w-0 text-textInverse brightness-90 hover:brightness-100 hover:text-textInverse hover:after:w-[70%]" //inactive button
        )}>
            {text}
        </button> 
    )
}