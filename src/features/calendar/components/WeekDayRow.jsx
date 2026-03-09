import clsx from "clsx"
import { WeekDayBlock } from "./WeekDayBlock"


//row with week days
export function WeekDayRow() {
    const weekDays = [
        "mo", "tu", "we", "th", "fr", "sa", "su"
    ]
    return (
        <div className="flex flex-row">
            {weekDays.map((day, i) =>
                <WeekDayBlock weekDay={day} key={i}
                    className={clsx(i > 4
                        ? "bg-background"
                        : "bg-surfaceMuted"
                    )} />
            )}
        </div>
    )
}

