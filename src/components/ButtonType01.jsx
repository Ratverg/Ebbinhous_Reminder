import clsx from "clsx";

function ButtonType01({text = "btn", active = false, onClick}){
    return(
        <button
        onClick={onClick}
        className={clsx(
            "h-[2rem] text-lg relative duration-500",
            "md:h-[2rem] md:text-xl",
            "after:absolute after:bottom-1 after:left-1/2 after:h-[2px] after:bg-[#243850] after:translate-x-[-50%]",
            "after:transition-all after:duration-300 ",
            active
                ? "after:w-full text-[#3a5066]" //active button
                : "after:w-0 text-[#abb4be] hover:text-[#3a5066] hover:after:w-full" //inactive button
        )}>
            {text}
        </button> 
    )
}

export default ButtonType01;