import clsx from "clsx"

//Description: for small buttons with image, like "edit" "delete" "apply"
export function ButtonType03({
    src,
    alt,
    onClick
}){
    return(
        <button
            className={clsx(
            "h-4 w-4 flex-shrink-0",
            "hover:opacity-50"
            )}
            onClick={onClick}
        >
            <img
                src={src}
                alt={alt}
            />
        </button> 
    )
}