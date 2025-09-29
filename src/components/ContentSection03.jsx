
function StepItem({icon, alt, text}){
    return (
        <div className="flex flex-col flex-1 items-center gap-2 md:gap-4">
            <img  src={icon} alt={alt}
                className="
                w-12 rounded-full bg-[#ffffff]
                md:w-16
                shadow-[0_0_10px_5px_rgba(0,0,0,0.1)]
                md:shadow-[0_0_20px_5px_rgba(0,0,0,0.1)]
                "/>
            <p className="text-center opacity-60">{text}</p>
        </div>
    )
}

function StepArrow(){
    return (
        <>
            <div className="hidden md:flex flex-col flex-1">
                <img src="/src/assets/icons/arrow-01.png" alt="ico-add-task.png"
                    className="w-[30rem] mt-[1rem]"
                />
            </div>
            <div className="md:hidden flex flex-col">
                <img src="/src/assets/icons/arrow-02.png" alt="ico-add-task.png"
                    className="w-[1rem] mt-[1.5rem]"
                />
            </div>
        </>
    )
}



function ContentSection03(){
    return(
        <div className="flex flex-row gap-0">
           <StepItem icon={"/src/assets/icons/ico-add-task.png"} alt={"ico-add-task.png"} text={"Add task and optionally attach document you want to remember"} />
           <StepArrow />
           <StepItem icon={"/src/assets/icons/ico-check-time.png"} alt={"ico-check-time.png"} text={"Check time and date of your interval notifications"} />
           <StepArrow />
           <StepItem icon={"/src/assets/icons/ico-recieve-notification.png"} alt={"ico-recieve-notification.png"} text={"Receive notification with your telegram with best intervals for effective remember"} />
        </div>
    )
}
export default ContentSection03;