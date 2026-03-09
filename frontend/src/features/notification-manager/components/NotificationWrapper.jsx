import clsx from "clsx";
import { motion } from "framer-motion";

export function NotificationWrapper({children, className}){
    return(

            <div
                className="py-1"
            >
                <div
                className={clsx(
                    "px-1 py-1 rounded-[0.5rem] ",
                    "border-2 bg-surface",
                    "text-text",
                    "lg:px-4 lg:py-3 lg:rounded-[0.5rem]",
                    className
                    )}>
                    {children}
                 </div>
            </div>

    )
}

