import clsx from "clsx"

//Description: simple colored button for notification hashtag, change opacity when hover "onClick" function is passed to it
export function HashTagButton({
    text = "btn",
    color = "#1f6e93",
    onClick
}){
    return(
        <button
        style={{ backgroundColor: color }}
        className={clsx(
            "text-nowrap cursor-default",
            "text-white text-sm brightness-90",
            "h-[1.3rem] px-3 rounded-full relative duration-300",
            "md:h-[1.5rem] ",
            "hover:brightness-100"
        )}
        onClick={onClick}
        
        >
            {text}
        </button> 
    )
}

