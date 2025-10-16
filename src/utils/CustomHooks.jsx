import { useState, useEffect } from "react";

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