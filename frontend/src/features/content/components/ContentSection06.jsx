import ContentWrapper from "../../../components/layout/ContentWrapper";
// Импорт изображений
import ebbinghausImage from "../../../assets/images/ebbinghaus-image.jpg";
import graphEbbinghausCurve03 from "../../../assets/images/graph-ebbynghous-curve-003.png";
import graphEbbinghausCurve02 from "../../../assets/images/graph-ebbynghous-curve-002.png";

function InfoCard({ title, text, image, imageWidth = "w-48", reverse = false }) {
    return (
        <div className={`flex flex-col md:flex-row ${reverse ? 'md:flex-row-reverse' : ''} items-center gap-10 p-8 bg-white rounded-2xl border border-slate-100 shadow-sm transition-hover hover:shadow-md`}>
            {/* Блок изображения */}
            <div className={`flex-shrink-0 ${imageWidth} flex justify-center`}>
                <img 
                    src={image} 
                    alt={title} 
                    className="h-auto w-full object-contain rounded-lg"
                />
            </div>

            {/* Блок текста */}
            <div className="flex flex-col gap-3">
                <h3 className="title-lg text-eightFont leading-tight">
                    {title}
                </h3>
                <p className="text-eightFont leading-relaxed font-normal text-base">
                    {text}
                </p>
            </div>
        </div>
    );
}

function ContentSection06() {
    return (
        <ContentWrapper className="py-12 bg-slate-50/30">
            <div className="max-w-5xl mx-auto flex flex-col gap-6">
                
                <InfoCard 
                    title="About the Ebbinghaus Method"
                    image={ebbinghausImage}
                    imageWidth="w-40"
                    text="The method is based on the research of Hermann Ebbinghaus, one of the first scientists to study human memory using experimental methods. In 1885, he described how information is forgotten over time and introduced the forgetting curve."
                />

                <InfoCard 
                    title="The Forgetting Curve"
                    image={graphEbbinghausCurve03}
                    imageWidth="w-64"
                    reverse={true} // Чередование сторон для лучшего ритма
                    text="Shows that memory retention decreases rapidly after learning. Most information is lost within the first hours or days. Without repetition, newly learned information is typically forgotten almost entirely within a week."
                />

                <InfoCard 
                    title="Spaced Repetition"
                    image={graphEbbinghausCurve02}
                    imageWidth="w-64"
                    text="Based on reviewing information at gradually increasing intervals. Each review strengthens memory and slows the forgetting process. This is significantly more effective than 'cramming' in a single session."
                />

            </div>
        </ContentWrapper>
    );
}

export default ContentSection06;











// import ContentWrapper from "../../../components/layout/ContentWrapper";
// // 1. Import your images as variables
// import ebbinghausImage from "../../../assets/images/ebbinghaus-image.jpg";
// import graphEbbinghausCurve03 from "../../../assets/images/graph-ebbynghous-curve-003.png";
// import graphEbbinghausCurve02 from "../../../assets/images/graph-ebbynghous-curve-002.png";


// function TextInfoBlock({ titleAndText }) {
//     return (
//         <div className="flex flex-col gap-8">
//                 <p>
//                     {titleAndText.title}
//                 <br />
//                     <span className="opacity-60">{titleAndText.text}</span>
//                 </p>
//         </div>
//     )
// }


// function ContentSection06() {
//     return (
//         <ContentWrapper className="flex flex-col  gap-4">
//             {/* image+text block*/}
//             <div
//                 className="flex flex-row items-center gap-8"
//                 >
//                 <img
//                 src={ebbinghausImage}
//                 alt="ico-fast-decline"
//                 className="h-auto w-[10rem] mx-[5rem]"
//                 />
//                 <TextInfoBlock
//                     titleAndText={{
//                         title: `About the Ebbinghaus Method:`,
//                         text: `
//                         The method is based on the research of Hermann Ebbinghaus,one of the first scientists to study human memory using experimental methods.
//                         In 1885, he described how information is forgotten over time and introduced the concept known as the forgetting curve.
//                         His work became the foundation of modern memory research and learning optimization methods.
//                         ` }}
//                 />
//             </div>

//             {/* image+text block*/}
//             <div
//                 className="flex flex-row items-center gap-8"
//             >
//                 <img
//                 src={graphEbbinghausCurve03}
//                 alt="ico-fast-decline"
//                 className="h-auto w-[20rem]"
//                  />
//                 <TextInfoBlock
//                     titleAndText={{
//                         title: `The Forgetting Curve:`,
//                         text: `
//                             The forgetting curve, first described by Hermann Ebbinghaus, shows that memory retention decreases rapidly after learning and then declines more slowly over time.
//                             Most information is lost within the first hours or days, while a small portion can remain stored in long-term memory.
//                             Without repetition, newly learned information is typically forgotten within the first few days.
                            
//                         ` }}
//                 />

//             </div>

//             {/* image+text block*/}
//             <div
//                 className="flex flex-row items-center gap-8"
//             >
//                 <img
//                 src={graphEbbinghausCurve02}
//                 alt="ico-fast-decline"
//                 className="h-auto w-[20rem]"
//                  />
//                 <TextInfoBlock
//                     titleAndText={{
//                         title: `Spaced Repetition:`,
//                         text: `
//                             Spaced repetition is based on reviewing information at gradually increasing time intervals.
//                             Each review strengthens memory, slows the forgetting process, and extends how long information can be retained.
//                             This method is significantly more effective than memorizing information in a single study session because it reinforces knowledge at the moments when memory begins to fade.
//                         ` }}
//                 />
//             </div>

//         </ContentWrapper>
//     )
// }
// export default ContentSection06;
