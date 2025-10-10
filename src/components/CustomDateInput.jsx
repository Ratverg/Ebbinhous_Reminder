import { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function CustomDateTimeInput({value, onChange, className }) {
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
      {/* Поле даты */}
      <DatePicker
        selected={date}
        onChange={handleDateChange}
        dateFormat="MM/dd/yyyy"
        placeholderText="Date"
        calendarStartDay={1}
        className="rounded-md border-[2px] border-gray-400 px-1 py-0 w-[70px] text-xs bg-[#F3F4F6] text-gray-500 focus:outline-none  focus:border-blue-400 focus:text-black"
      />

      {/* Поле времени */}
      <DatePicker
        selected={time}
        onChange={handleTimeChange}
        showTimeSelect
        showTimeSelectOnly
        timeIntervals={15}
        timeCaption="Time"
        dateFormat="h:mm aa"
        placeholderText="Time"
        className="rounded-md border-[2px] border-gray-400 px-1 py-0 w-[65px] text-xs bg-[#F3F4F6] text-gray-500 focus:outline-none focus:border-blue-400 focus:text-black"
      />
    </div>
  );
}
