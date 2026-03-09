// generate dates array from start day and repeat numbers
export function generateDates(date = null, repeatNumbers = 4){

            //calculating parameters of the "first time learned day"
            const startDate = date ? new Date(date) : new Date();
            //switch to select curves variats, according to prefered repeat times
            
            function getRepeatPattern (repeatNumbers){
                switch (repeatNumbers) {
                    case 1:
                        return [0];
                    case 2:
                        return [0,7];
                    case 3:
                        return [0,3,7];
                    case 4:
                        return [0,3,7,30];
                    case 5:
                        return [0,3,7,30,60]
                    default:
                        return []
                }
            }
            const repeatPattern = getRepeatPattern(repeatNumbers);
            
            //calculating dates array according to Ebbighouse curve repeat pattern
            const dates = repeatPattern.map((daysOffset, i) => {
                const tempDate = new Date(startDate);
                tempDate.setDate(tempDate.getDate() + daysOffset);
                return tempDate
            })
            return dates;
}

//function to get date in YYYYY/MM/DD from date object
export function dateToYYYYMMDD(date){
    if (!date) return '';
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
}

//function to get date in YYYY/MM/DD/hh/mm from date object
export function dateToYYYYMMDDHHMM(date){
    if (!date) return '';
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, '0');
    const d = String(date.getDate()).padStart(2, '0');
    const h = String(date.getHours()).padStart(2, '0');
    const min = String(date.getMinutes()).padStart(2, '0');
    // Формат: YYYY-MM-DDTHH:MM
    return `${y}-${m}-${d}T${h}:${min}`;
}

//function to get date in YYYY/MM/DD/hh/mm from date object
export function dateToYYYYMMDDHHMMV2 (date){
    if (date === null) return '';
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, '0');
    const d = String(date.getDate()).padStart(2, '0');
    const h = String(date.getHours()).padStart(2, '0');
    const min = String(date.getMinutes()).padStart(2, '0');
    // Формат: YYYY-MM-DDTHH:MM
    return `${d}/${m}/${y}   ${h}:${min}`;
}

//function to get date in YYYY/MM/DD/hh/mm from date object
export function dateToYYYYMMDDHHMMV3 (dateObject){
    //in DB we have {id: 1, date: '2025-10-07T10:30:00Z'}
    //so we convert 2025-10-07T10:30:00Z to Date object
    const date = new Date(dateObject.repeatDate);
    if (!date) return '';
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, '0');
    const d = String(date.getDate()).padStart(2, '0');
    let hours = date.getHours();
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12 || 12; // convert 0 -> 12 and 13–23 -> 1–11

    return `${m}/${d}/${y}, ${hours}:${minutes} ${ampm}`;
};

//generate date-time format that <input type="date" value={x}> can accept

export function dateToLocalString(date){
if (!date) return "";
    if (!date) return "";

    const d = new Date(date);
    d.setMinutes(d.getMinutes() - d.getTimezoneOffset());

    return d.toISOString().slice(0, 16);
}

//compare two dates by DAY MONTH YEAR only
export function compareDates(date1, date2) {
    return (
        date1.getFullYear() === date2.getFullYear() &&
        date1.getMonth() === date2.getMonth() &&
        date1.getDate() === date2.getDate()
    );
}

//------------------------------------
//Utils
//------------------------------------
//"Days left" string
export function getDaysLeftString(targetDate) {
    if (!targetDate) return "No date";

    const now = new Date();

    // 1. Immediate check: If target time has passed
    if (targetDate < now) return "Done";

    // 2. Normalize dates to midnight to compare "calendar days"
    const start = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const end = new Date(targetDate.getFullYear(), targetDate.getMonth(), targetDate.getDate());

    // Calculate difference in whole days
    const diffInDays = Math.round((end - start) / 86400000);

    // 3. Logic based on calendar days
    if (diffInDays === 0) return "Today";
    if (diffInDays === 1) return "1 day left";
    return `${diffInDays} days left`;
}

