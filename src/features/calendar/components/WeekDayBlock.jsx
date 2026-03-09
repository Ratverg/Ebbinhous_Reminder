import clsx from "clsx";


//simple square "brick" for row
export function WeekDayBlock({ weekDay, className }) {
    return (
        <div
            className={clsx(
                "flex flex-col h-6 w-6 m-1 justify-center rounded-md relative text-textSecondary",
                className
            )}
        >
            <p className="text-center">{weekDay}</p>
        </div>
    )
}
