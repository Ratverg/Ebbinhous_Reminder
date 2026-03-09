import HeroBlock from "./HeroBlock";
import ContentSection01 from "../../features/content/components/ContentSection01";
import ContentSection02 from "../../features/content/components/ContentSection02";
import ContentSection03 from "../../features/content/components/ContentSection03";
import ContentSection05 from "../../features/content/components/ContentSection05";
import ContentSection07 from "../../features/content/components/ContentSection07";


function Title({ text }) {
    return (
        <div className="title-lg">
            <h1>{text}</h1>
        </div>
    )
}

function ContentMainFrameBlock() {
    return (
        <>
            <div className="
                z-20
                bg-surfaceMuted/70 text-text
                rounded-2xl

                mx-0 px-4 py-5 
                md:mx-5 lg:mx-32 md:px-16 md:py-8 

                flex flex-col gap-4
                md:gap-8
            ">

                <Title text={"Behind the scene"} />
                <ContentSection01 />

                <Title text={"Key features"} />
                <ContentSection02 />

                <Title text={"Userpage example"} />
                <ContentSection07 />
            </div>
        </>
    )
}
export default ContentMainFrameBlock;
