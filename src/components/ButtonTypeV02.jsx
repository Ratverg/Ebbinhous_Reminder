import clsx from "clsx";

function ButtonType02({text = "btn", active = false, onClick}){
    return(
        <button
        onClick={onClick}
        className={clsx(
            "bg-[#2EA5DC] text-white ",
            "h-[2.5rem] w-[10rem] text-lg rounded-full relative duration-500",
            "md:h-[2.5rem] md:w-[12rem] md:text-xl",
       
            "after:absolute after:bottom-2 after:left-1/2 after:h-[2px] after:bg-[#ffffff] after:translate-x-[-50%]",
            "after:transition-all after:duration-300 ",
            active
                ? "after:w-full text-[#ffffff]" //active button
                : "after:w-0 text-[#ffffff] hover:text-[#ffffff] hover:after:w-[80%]" //inactive button
        )}>
            {text}
        </button> 
    )
}

export default ButtonType02;