import { getTasksForDate } from "../utils/CalendarUtils";
import { DateBlock } from "./DateBlock";


//creating ROW filled with dates
export function DateRow({
    row,
    notificationList,
    monthOffset
}) {
    return (
        <div className="flex flex-row">
            {row.map((date, i) => {
                const tasksForDate = getTasksForDate(date, notificationList);
                // console.log(notificationList[0].dates[0]);
                return (<DateBlock
                    monthOffset={monthOffset}
                    day={date}
                    hasTasks={tasksForDate.length > 0}
                    key={i}
                    notificationList={notificationList}
                />)
            }
            )}
        </div>
    )
}