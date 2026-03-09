// 1. Import your images as variables
import icoArrow01 from "../../../assets/icons/arrow-01.png";
import icoArrow02 from "../../../assets/icons/arrow-02.png";
import icoAddTask from "../../../assets/icons/ico-add-task.png";
import icoCheckTime from "../../../assets/icons/ico-check-time.png";
import icoRecieveNorification from "../../../assets/icons/ico-recieve-notification.png";

function StepItem({icon, alt, text}){
    return (
        <div className="flex flex-col flex-1 items-center gap-2 md:gap-4">
            <img  src={icon} alt={alt}
                className="
                w-12 rounded-full bg-surface
                md:w-16
                shadow-[0_0_10px_5px_rgba(0,0,0,0.1)]
                md:shadow-[0_0_20px_5px_rgba(0,0,0,0.1)]
                "/>
            <p className="text-center text-textSecondary">{text}</p>
        </div>
    )
}

function StepArrow(){
    return (
        <>
            <div className="hidden md:flex flex-col flex-1">
                <img src={icoArrow01} alt="ico-add-task.png"
                    className="w-[30rem] mt-[1rem]"
                />
            </div>
            <div className="md:hidden flex flex-col">
                <img src={icoArrow02} alt="ico-add-task.png"
                    className="w-[1rem] mt-[1.5rem]"
                />
            </div>
        </>
    )
}



function ContentSection03(){
    return(
        <div className="flex flex-row gap-0">
           <StepItem icon={icoAddTask} alt={"ico-add-task.png"} text={"Add anything want to remember"} />
           <StepArrow />
           <StepItem icon={icoCheckTime} alt={"ico-check-time.png"} text={"Set time and date of your interval notifications"} />
           <StepArrow />
           <StepItem icon={icoRecieveNorification} alt={"ico-recieve-notification.png"} text={"Receive telegram notifications"} />
        </div>
    )
}
export default ContentSection03;