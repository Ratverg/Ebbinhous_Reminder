import ContentSection01 from "./ContentSection01";
import ContentSection02 from "./ContentSection02";
import ContentSection03 from "./ContentSection03";
import ContentSection04 from "./ContentSection04";
import ContentSection05 from "./ContentSection05";

function Title({text}){
    return (
            <div className="text-base font-semibold md:text-2xl">
                <h1>{text}</h1>
            </div>
    )
}

function ContentMainFrameBlock(){
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
            <ContentSection01 />

            <Title text={"Key features"} />
            <ContentSection02 />

            <Title text={"How it works"} />
            <ContentSection03 />

            <Title text={"Users reviews"} />
            <ContentSection05 />
        </div>
    )
}
export default ContentMainFrameBlock;
