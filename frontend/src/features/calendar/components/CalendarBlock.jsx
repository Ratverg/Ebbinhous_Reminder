import { useState, useEffect } from "react";
import ContentWrapper from "../../../components/layout/ContentWrapper";
import { ArrowButtonRight } from "./ArrorButtonRight";
import { ArrowButtonLeft } from "./ArrowButtonLeft";
import { MonthBlock } from "./MonthBlock";
import { motion, AnimatePresence } from "framer-motion";


export function CalendarBlock({
    notificationList
}) {
    const [date, setCurrentDate] = useState(null);
    const [offset, setMonthOffset] = useState(0);
    // auto update current date
    useEffect(() => {
        const currentDate = new Date();
        const options = {
            // hour: "numeric",
            // minute: "numeric",
            day: "numeric",
            month: "short",//"2-digit"
            year: "numeric",
            weekday: "short"
        }
        const locale = navigator.language;
        const localizedDate = (date) => new Intl.DateTimeFormat(locale, options).format(date);

        setCurrentDate(localizedDate(currentDate));
    }, [])


    // const title = `Today is: ${date === null ? "": date.toString()}`
    return (
        <ContentWrapper className={"flex flex-col w-full items-center relative"}>
            <ArrowButtonLeft onClick={() => setMonthOffset(offset => offset - 1)} />
            <ArrowButtonRight onClick={() => setMonthOffset(offset => offset + 1)} />

            <AnimatePresence mode="wait"> 
                <motion.div
                    key={offset} // when "offset" changes - React will create new element
                    initial={{ opacity: 0}} // initial state
                    animate={{ opacity: 1}}  // how it at appering
                    exit={{ opacity: 0}}   // how it looks when disappearing
                    transition={{ duration: 0.2 }}  // duration of the animation
                >
                    <MonthBlock monthOffset={offset} notificationList={notificationList} />
                </motion.div>
            </AnimatePresence>
        </ContentWrapper>
    )
}