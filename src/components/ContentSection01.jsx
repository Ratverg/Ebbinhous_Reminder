
import ContentWrapper from "./ContentWrapper";

function ContentSection01(){
    return(
        <ContentWrapper className="flex flex-col md:flex-row">

            {/* text information block */}
            <div className="
                flex flex-col gap-8
            ">
                <p>
                    Sharp decline in the first hours:
                    <br />
                    <span className="opacity-60">Right after learning, information is quickly forgotten — about 60–70% can be lost within the first day.</span>
                </p>
                <p>
                    Law of repetition:
                    <br />
                    <span className="opacity-60">Each repetition strengthens memory and “raises” the curve, slowing down forgetting.</span>
                </p>
                <p>
                    Optimal intervals:
                    <br />
                    <span className="opacity-60">After each repetition you forget information slower. And there are statistically proven optimal intervals for remember information forever</span>
                </p>
            </div>
    
            {/* graphic info*/}
            <img
                src="/src/assets/images/graph-ebbynghous-curve-001.png" alt="graph-ebbynghous-curve-001"
                className="
                    h-40
                    md:h-56
                "
             />
        </ContentWrapper>
    )
}
export default ContentSection01;
