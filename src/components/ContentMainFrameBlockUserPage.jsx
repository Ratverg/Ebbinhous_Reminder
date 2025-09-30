
import TaskManagerSection from "./TaskManagerSection";

function Title({text}){
    return (
            <div className="text-base font-semibold md:text-2xl">
                <h1>{text}</h1>
            </div>
    )
}

function ContentMainFrameBlockUserPage(){
    return(
        <div className="
            bg-[#F2F4F6] text-[#243850]
            font-semibold

            mx-0 px-4 py-5 text-xs
            md:mx-5 lg:mx-32 md:px-16 md:py-8 md:text-base
            
            flex flex-col gap-4
            md:gap-8
        "> 
            <Title text={"Science behind the scene"} />
            <TaskManagerSection />
        </div>
    )
}
export default ContentMainFrameBlockUserPage;
