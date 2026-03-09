import ContentWrapper from "../../../components/layout/ContentWrapper";
// 1. Import your images as variables
import icoFastDecline from "../../../assets/icons/ico-fast-decline.png";
import icoRepetitionLaw from "../../../assets/icons/ico-repetition-law.png";
import icoOptimalInterval from "../../../assets/icons/ico-optimal-intervals.png";



function TextInfoBlock({ titleAndText }) {
    return (
        <div className="flex flex-col gap-8">
                <p className="text-text">
                    {titleAndText.title}
                <br />
                    <span className="text-textSecondary">{titleAndText.text}</span>
                </p>
        </div>
    )
}


function ContentSection01() {
    return (
        <ContentWrapper className="flex flex-col  gap-4">
            {/* image+text block*/}
            <div
                className="flex flex-row items-center gap-8"
            >
                <img
                src={icoFastDecline}
                alt="ico-fast-decline"
                className="h-[5rem] w-[5rem]"
                 />
                <TextInfoBlock
                    titleAndText={{ title: "Sharp decline in the first hours:", text: "Right after learning, information is quickly forgotten — about 60–70% can be lost within the first day" }}
                />
            </div>
            {/* image+text block*/}
            <div
                className="flex flex-row items-center gap-8"
            >
                <img
                src={icoRepetitionLaw}
                alt="ico-repetition-law"
                className="h-[5rem] w-[5rem]"
                 />
                <TextInfoBlock
                    titleAndText={{ title: "Law of repetition:", text: "Each repetition strengthens memory and “raises” the curve, slowing down forgetting." }}
                />
            </div>
            {/* image+text block*/}
            <div
                className="flex flex-row items-center gap-8"
            >
                <img
                src={icoOptimalInterval}
                alt="ico-optimal-intervals"
                className="h-[5rem] w-[5rem]"
                 />
                <TextInfoBlock
                    titleAndText={{ title: "Optimal intervals:", text: "After each repetition you forget information slower. And there are statistically proven optimal intervals for remember information forever" }}
                />
            </div>
        </ContentWrapper>
    )
}
export default ContentSection01;
