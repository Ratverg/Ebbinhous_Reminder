import clsx from "clsx";


// -------Progress bar-------


export function NotificationProgressBar({notification}){

    //create array, to use later for ".map"
    const barsArray = Array.from({length: notification.dates.length}, (_, i) => i);

    return(
        <div className="flex flex-row w-50 gap-1 md:gap-[2px] flex-1 bg-[#ffffff] rounded-full overflow-hidden">
            {barsArray.map((element, i)=>
                <div
                key={i}
                className={clsx(
                    "flex-1 w-auto h-1.5 rounded-none",
                    "",
                    (notification.repeated <= i)
                    ? "bg-[#d3dce0]"
                    : "bg-[#2EA5DC]"
                )}
                />      
            )
        }
        </div>
    );
}