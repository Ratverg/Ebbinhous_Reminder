import clsx from "clsx"

export function NotificationManagerWrapper({children, className}){
    return(
            <div
            className={clsx(
                "bg-[#ffffff] text-[#243850] font-semibold",
                "shadow-[0_0_10px_10px_rgba(0,0,0,0.05)]",
                "lg:shadow-[0_0_5px_5px_rgba(0,0,0,0.05)]",
                "px-4 py-4 text-xs rounded-[1rem]",
                "lg:px-8 lg:py-8 lg:text-base lg:rounded-[1rem]",
                "flex",
                className
                )}>
                {children}
            </div>
    )
}