import ContentWrapper from "../../../components/layout/ContentWrapper";
// 1. Import your images as variables
import icoTelegramConnection from "../../../assets/icons/ico-telegram-connection.png";
import icoSmartNotification from "../../../assets/icons/ico-smart-notifications.png";
import icoProgress from "../../../assets/icons/ico-progress.png";

function Features({ features }) {
    return (
        <div className="flex flex-col gap-4 md:gap-8 md:flex-row text-start md:text-center">
            {features.map((feature, i) =>
                <ContentWrapper key={i} className="flex flex-row md:flex-col gap-4 flex-1 justify-start items-center">
                    <img
                        src={feature.image}
                        alt={feature.imageAlt}
                        className="h-14 "
                    />
                    <div className="flex flex-col gap-8 text-text">
                        <p> {feature.title}<br />{ } <span className="text-textSecondary">{feature.text}</span></p>
                    </div>
                </ContentWrapper>
            )}
        </div>
    )
}

function ContentSection02() {
    return (
        <Features features={[
            {
                image: icoTelegramConnection, imageAlt: "ico-telegram-connection.png",
                title: "Telegram connection", text: "TELEGRAM connection for all notification"
            },
            {
                image: icoSmartNotification, imageAlt: "ico-smart-notifications.png",
                title: "Smart notifications", text: "Get calculated optimal repeat intervals for best memory retention"
            },
            {
                image: icoProgress, imageAlt: "ico-progress.png",
                title: "Progress", text: "Get your best performance!"
            },
        ]}
        />
    )
}
export default ContentSection02;
