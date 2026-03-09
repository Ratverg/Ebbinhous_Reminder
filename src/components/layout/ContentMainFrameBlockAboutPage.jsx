import HeroBlock from "./HeroBlock";
import ContentSection01 from "../../features/content/components/ContentSection01";
import ContentSection02 from "../../features/content/components/ContentSection02";
import ContentSection03 from "../../features/content/components/ContentSection03";
import ContentSection05 from "../../features/content/components/ContentSection05";
import ContentSection06 from "../../features/content/components/ContentSection06";
import ContentWrapper from "./ContentWrapper";
// Импорт изображений
import ebbinghausImage from "../../assets/images/ebbinghaus-image.jpg";
import graphEbbinghausCurve03 from "../../assets/images/graph-ebbynghous-curve-003.png";
import graphEbbinghausCurve02 from "../../assets/images/graph-ebbynghous-curve-002.png";
import clsx from "clsx";


function Title({ text }) {
    return (
        <div className="title-lg">
            <h1>{text}</h1>
        </div>
    )
}

function InfoCard({ title, text, image, imageWidth = "w-48", className=''}) {
    return (
        <ContentWrapper className={className}>
            {/* image */}
            <div className={`flex-shrink-0 ${imageWidth}`}>
                <img
                    src={image}
                    alt={title}
                    className="object-contain rounded-lg"
                />
            </div>

            {/* Блок текста */}
            <div className="flex flex-col gap-3">
                <h3 className="title-lg text-text leading-tight">
                    {title}
                </h3>
                <p className="text-textSecondary leading-relaxed font-normal text-base">
                    {text}
                </p>
            </div>
        </ContentWrapper>
    );
}


function ContentMainFrameAboutBlock() {
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

                <Title text={"About the method"} />
                <InfoCard
                    className="flex flex-row-reverse gap-4 items-start"
                    title="About the Ebbinghaus Method"
                    image={ebbinghausImage}
                    imageWidth="w-[6rem] md:w-[10rem]"
                    text="The method is based on the research of Hermann Ebbinghaus, one of the first scientists to study human memory using experimental methods. In 1885, he described how information is forgotten over time and introduced the forgetting curve."
                    />

                <InfoCard
                    className="flex flex-row gap-4 items-start"
                    title="The Forgetting Curve"
                    image={graphEbbinghausCurve03}
                    imageWidth="w-[10rem] md:w-[15rem]"
                    text="Shows that memory retention decreases rapidly after learning. Most information is lost within the first hours or days. Without repetition, newly learned information is typically forgotten almost entirely within a week."
                    />

                <InfoCard
                    className="flex flex-row gap-4 items-start"
                    title="Spaced Repetition"
                    image={graphEbbinghausCurve02}
                    imageWidth="w-[10rem] md:w-[15rem]"
                    text="Based on reviewing information at gradually increasing intervals. Each review strengthens memory and slows the forgetting process. This is significantly more effective than 'cramming' in a single session."
                />

                <Title text={"How it works"} />
                <ContentSection03 />
            </div>
        </>
    )
}
export default ContentMainFrameAboutBlock;
