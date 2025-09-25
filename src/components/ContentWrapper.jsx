import clsx from "clsx";

function ContentWrapper({children, className}){
    return(
            <div
            className={clsx(
                "bg-[#ffffff] text-[#243850] font-semibold",
                "shadow-[0_0_20px_10px_rgba(0,0,0,0.1)]",
                "md:shadow-[0_0_30px_15px_rgba(0,0,0,0.1)]",
                "px-4 py-4 text-xs rounded-[1rem]",
                "md:px-8 md:py-8 md:text-base md:rounded-[2rem]",
                "flex flex-row gap-4 items-center",
                "md:gap-4",
                className
                )}>
                {children}
            </div>

    )
}

export default ContentWrapper;