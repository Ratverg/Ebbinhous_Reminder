import clsx from "clsx";
import { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export function CustomDateTimeInput({value, onChange, className }) {
  const [date, setDate] = useState(value ? new Date(value) : null);
  const [time, setTime] = useState(value ? new Date(value) : null);

  // // sync of dates
  // useEffect(() => {
  //   console.log(`valuse is : ${value} date is: ${date}`)
  // }, [value]);

  // sync of dates
  useEffect(() => {
    setDate(value);
    setTime(value);
  }, [value]);

  //now onChange returns Date() object!!!
  const handleDateChange = (newDate) => {
    const merged = new Date(newDate);
    if (time) {
      merged.setHours(time.getHours(), time.getMinutes());
    }
    setDate(newDate);
    onChange(merged);
  };

  const handleTimeChange = (newTime) => {
    const merged = new Date(date || new Date());
    merged.setHours(newTime.getHours(), newTime.getMinutes());
    setTime(newTime);
    onChange(merged);
  };

  return (
    <div className="flex flex-row gap-0 items-center">
      {/* Date field */}
      <DatePicker
        selected={date}
        onChange={handleDateChange}
        dateFormat="dd/MM/yyyy"
        placeholderText="Date"
        calendarStartDay={1}
        className={clsx(
          "px-1 py-0 w-[72px] rounded-md",
          "bg-transparent text-textSecondary outline-none ",
          "focus:text-text",
          "hover:text-text transition-all",
          "cursor-pointer"
        )}
      />

      {/* Time picker */}
      <DatePicker
        selected={time}
        onChange={handleTimeChange}
        showTimeSelect
        showTimeSelectOnly
        timeIntervals={15}
        timeCaption="Time"
        dateFormat="HH:mm"
        timeFormat="HH:mm"
        placeholderText="Time"
        className={clsx(
          "px-1 py-0 w-[45px] rounded-md",
          "bg-transparent text-textSecondary outline-none ",
          "focus:text-text",
          "hover:text-text transition-all",
          "cursor-pointer"
        )}
      />
    </div>
  );
}
