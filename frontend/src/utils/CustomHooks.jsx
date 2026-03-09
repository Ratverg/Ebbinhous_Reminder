import { useState, useEffect } from "react";
import { generateDates } from "./DatesUtils";

//-------function to detect desktop/mobile -------
export function useIsMobile(breakpoint = 768) {
  const [isMobile, setIsMobile] = useState(window.innerWidth < breakpoint);
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < breakpoint;
      setIsMobile(mobile);
    };

    window.addEventListener("resize", handleResize);

    //check ones after mount 
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, [breakpoint]);

  return isMobile;
}

// ----------CREATE NEW DEFAULT MOTIFICATION------------
export function createDefaultNotification(notificationList) {
  //new notification with default parameters
  const defaultDate = (new Date());
  defaultDate.setDate(defaultDate.getDate()+1);
  defaultDate.setHours(12,0,0,0);
  const defaultDatesList = generateDates(defaultDate, 3);
  const defaultDateObjectList = defaultDatesList.map((x) => { return { repeatDate: x } });
  const defaultNotification = {
      "dates": defaultDateObjectList,
      "title": "write title",
      "hashTag": "main",
      "color": notificationList.some(curr=>curr.hashTag === "main") 
          ? notificationList.find(curr => curr.hashTag === "main").color
          : "#344F6A",
      "repeated": 0,
      "repeatNumbers": 3,
      "attachment": "",
      "editing": true
  }
  return defaultNotification;
}

//-------GET HASHTAG LIST FUNCTION-------
export function getHashtagList(notificationList) {
    const tempList = [{ hashtag: "All", color: "#123" }];

    notificationList.forEach((notification) => {
        //".some" returns true if correct for even for one.
        //So this checks, if this hashTag is NOT in tempList
        if (!tempList.some((x) => x.hashtag === notification.hashTag)) {
            //then push it to this tempList
            tempList.push({ hashtag: notification.hashTag, color: notification.color })
        }
    })

    return tempList;
}