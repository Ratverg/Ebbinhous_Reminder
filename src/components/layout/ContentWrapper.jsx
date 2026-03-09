import clsx from "clsx";


function ContentWrapper({children, className}){
    return(
            <div
            className={clsx(
                "bg-surface text-text",
                "shadow-[0_0_10px_10px_rgba(0,0,0,0.05)]",
                "lg:shadow-[0_0_5px_5px_rgba(0,0,0,0.05)]",
                "px-6 py-4 rounded-[1rem]",
                "lg:px-8 lg:py-8 lg:rounded-[1rem]",
                "flex",
                className
                )}>
                {children}
            </div>

    )
}

export default ContentWrapper;