import clsx from "clsx";

export function NotificationWrapper({children, className}){
    return(
            <div
            className={clsx(
                "border-2",
                "bg-[#ffffff] text-[#243850] font-semibold border-[#E6EBF2]",
                // "shadow-[0_0_10px_10px_rgba(0,0,0,0.05)]",
                // "lg:shadow-[0_0_5px_5px_rgba(0,0,0,0.05)]",
                "px-1 py-1 text-xs rounded-[0.5rem]",
                "lg:px-4 lg:py-2 lg:text-base lg:rounded-[0.5rem]",
                
                className
                )}>
                {children}
            </div>

    )
}