import { compareDates } from "../../../utils/DatesUtils";

//caltulate notifications list for given date  
export function getTasksForDate(date, notificationList) {
    return notificationList.filter((notification) => {
        const dateList = notification.dates.map(dateObj=>new Date(dateObj.repeatDate));
        // console.log(dateList.reduce((acc, curDate)=>acc||(compareDates(date, curDate)), false));
        return (dateList.reduce((acc, curDate)=>acc||(compareDates(date, curDate)), false));
    });
}
