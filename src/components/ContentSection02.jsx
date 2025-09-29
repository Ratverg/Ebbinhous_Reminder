
import ContentWrapper from "./ContentWrapper";


function Features({features}){
    return(
        <div className="flex flex-col gap-4 md:gap-8 md:flex-row text-start md:text-center">
            {features.map((feature, i)=>
                <ContentWrapper key={i} className="flex flex-row md:flex-col gap-4 flex-1 justify-start items-center">
                    <img
                        src={feature.image}
                        alt={feature.imageAlt}
                        className="h-14 "
                    />
                    <div className="flex flex-col gap-8">
                        <p> {feature.title}<br />{} <span className="opacity-60">{feature.text}</span></p>
                    </div>
                </ContentWrapper>
            )}
        </div>
    )
}

function ContentSection02(){
    return(
        <Features features={[
            {
                image: "/src/assets/icons/ico-telegram-connection.png", imageAlt: "ico-telegram-connection.png",
                title: "Telegram connection" , text:"Simple telegram connection for all notification"
            },
            {
                image: "/src/assets/icons/ico-smart-notifications.png", imageAlt: "ico-smart-notifications.png",
                title: "Smart notification" , text:"Customize your notification time and text as you want. Add documents as ports of your notifications"
            },
            {
                image: "/src/assets/icons/ico-progress.png", imageAlt: "ico-progress.png",
                title: "Progress" , text:"Get analyse of your overall  progress in simple way"
            },
        ]}
        />
    )
}
export default ContentSection02;
