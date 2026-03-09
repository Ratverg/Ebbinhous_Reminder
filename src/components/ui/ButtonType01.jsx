import clsx from "clsx";
//Description: Used in "header". Button with "underline". 
function ButtonType01({
    text = "btn",
    active = false,
    onClick,
    type = "button"
}){
    return(
        <button
        type={type}
        onClick={onClick}
        className={clsx(
            "h-[2rem]  relative duration-500",
            "md:h-[2rem]  w-fit",
            "after:absolute after:bottom-1 after:left-1/2 after:h-[2px] after:bg-textSecondary after:translate-x-[-50%]",
            "after:transition-all after:duration-300 ",
            active
                ? "after:w-full text-textSecondary" //active button
                : "after:w-0 text-textMuted hover:text-textSecondary hover:after:w-full" //inactive button
        )}>
            {text}
        </button> 
    )
}

export default ButtonType01;