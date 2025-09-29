
import ContentWrapper from "./ContentWrapper";

function TextInfoBlock({titleAndText}){
    return(
            <div className="
                flex flex-col gap-8 
            ">
                {titleAndText.map((item,i)=>{
                    return (
                        <p key={i}>
                            {item.title}
                            <br />
                            <span className="opacity-60">{item.text}</span>
                        </p>
                    )
                })}
            </div>
    )
}


function ContentSection01(){
    return(
        <ContentWrapper className="flex flex-col md:flex-row gap-4">
            {/* text block*/}
            <TextInfoBlock
                titleAndText={[
                    {title: "Sharp decline in the first hours:", text: "Right after learning, information is quickly forgotten — about 60–70% can be lost within the first day"},
                    {title: "Law of repetition:", text: "Each repetition strengthens memory and “raises” the curve, slowing down forgetting."},
                    {title: "Optimal intervals:", text: "After each repetition you forget information slower. And there are statistically proven optimal intervals for remember information forever"}
                ]} 
            />
    
            {/* graphic info*/}
            <img
                src="/src/assets/images/graph-ebbynghous-curve-001.png" alt="graph-ebbynghous-curve-001"
                className="w-[25rem] self-center

                "
             />
        </ContentWrapper>
    )
}
export default ContentSection01;
