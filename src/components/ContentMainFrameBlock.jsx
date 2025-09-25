import ContentSection01 from "./ContentSection01";
import ContentSection02 from "./ContentSection02";


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
            {/* title */}
            <div className="text-base font-semibold md:text-2xl">
                <h1>Science behind the scene</h1>
            </div>
            <ContentSection01 />

            {/* title */}
            <div className="text-base font-semibold md:text-2xl">
                <h1>Key features</h1>
            </div>
            <ContentSection02 />
            
        </div>
    )
}
export default ContentMainFrameBlock;
