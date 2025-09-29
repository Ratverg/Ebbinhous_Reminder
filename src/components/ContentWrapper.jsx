import clsx from "clsx";

function ContentWrapper({children, className}){
    return(
            <div
            className={clsx(
                "bg-[#ffffff] text-[#243850] font-semibold",
                "shadow-[0_0_20px_10px_rgba(0,0,0,0.1)]",
                "lg:shadow-[0_0_30px_15px_rgba(0,0,0,0.1)]",
                "px-4 py-4 text-xs rounded-[1rem]",
                "lg:px-8 lg:py-8 lg:text-base lg:rounded-[2rem]",
                "flex",
                className
                )}>
                {children}
            </div>

    )
}

export default ContentWrapper;