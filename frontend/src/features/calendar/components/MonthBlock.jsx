import { useState, useEffect } from "react";
import { DateRow } from "./DateRow";
import { WeekDayRow } from "./WeekDayRow";



//creating MONTH block, with 6 ROWS each ROW with 7 "DAY-BRICKS"
export function MonthBlock({
    monthOffset = 0,
    notificationList
}) {
    const [rowArray, setRowArray] = useState([]);
    const [blockDate, setBlockDate] = useState([]);

    useEffect(() => {
        //calculating parameters of the current date
        const currentDate = new Date();
        const currentMonth = currentDate.getMonth();
        const currentYear = currentDate.getFullYear();

        //calculating start day of the dates array
        const firstDayInMonth = new Date(currentYear, currentMonth + monthOffset, 1, 11, 11);
        // (day - 1 + 7) % 7 ensures the range is 0 to 6, with Monday (1) -> 0, Sunday (0) -> 6
        const firstDayInMonthWeekDay = (firstDayInMonth.getDay() - 1 + 7) % 7;
        const startDay = new Date(firstDayInMonth);
        startDay.setDate(firstDayInMonth.getDate() - firstDayInMonthWeekDay);

        //creating dates array for 6 rows with 7 days in each for the current month
        const rowArray = [];
        for (let j = 0; j < 42; j = j + 7) {
            const curRow = [];
            // console.log(j);
            for (let i = j; i < j + 7; i++) {
                const tempDate = new Date(startDay);
                tempDate.setDate(tempDate.getDate() + i);
                curRow.push(tempDate);
            }
            rowArray.push(curRow)
        }
        setRowArray(rowArray);

        // generate title block "month" + "year"
        let blockDate = new Date();
        blockDate.setMonth(blockDate.getMonth() + monthOffset);
        const blockDateOptions = {
            month: "long",
            year: "numeric"
        }
        const curLocale = navigator.language;
        const monthAndYear = new Intl.DateTimeFormat(curLocale, blockDateOptions).format(blockDate);
        setBlockDate(monthAndYear);
    }, [monthOffset]);

    return (
        <div
            className="flex flex-col bg-surface"
        >
            <p className="text-center ">{blockDate}</p>
            <WeekDayRow />
            {rowArray.map((row, i) =>
                <DateRow row={row} key={i} notificationList={notificationList} monthOffset={monthOffset} />
            )}
        </div>
    )
}