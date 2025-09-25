
import ContentWrapper from "./ContentWrapper";

function ContentSection02(){
    return(
        <div className="flex flex-col gap-4 md:gap-8 md:flex-row text-start md:text-center">
            <ContentWrapper className="flex flex-row md:flex-col flex-1 justify-start">

                {/* icon 01 */}
                <img
                    src="/src/assets/icons/ico-telegram-connection.png"
                    alt="ico-telegram-connection.png"
                    className="h-16 "
                />
                {/* text 01 */}
                <div className="
                    flex flex-col gap-8
                ">
                    <p>
                        Telegram connection
                        <br />
                        <span className="opacity-60">Simple telegram connection for all notification</span>
                    </p>
                </div>

            </ContentWrapper>

            <ContentWrapper className="flex flex-row md:flex-col flex-1 justify-start">

                {/* icon 02 */}
                <img
                    src="/src/assets/icons/ico-smart-notifications.png"
                    alt="ico-smart-notifications.png"
                    className="h-16"
                />
                {/* text 02 */}
                <div className="
                    flex flex-col gap-8
                ">
                    <p>
                        Smart notifications
                        <br />
                        <span className="opacity-60">Customize your notification time and text as you want. Add documents as ports of your notifications</span>
                    </p>
                </div>

            </ContentWrapper>

            <ContentWrapper className="flex flex-row md:flex-col flex-1 justify-start">

                {/* icon 03 */}
                <img
                    src="/src/assets/icons/ico-progress.png"
                    alt="ico-progress.png"
                    className="h-16"
                />
                {/* text 03 */}
                <div className="
                    flex flex-col gap-8
                ">
                    <p>
                        Progress
                        <br />
                        <span className="opacity-60">Get analyse of your overall  progress in simple way</span>
                    </p>
                </div>

            </ContentWrapper>
            
        </div>

    )
}
export default ContentSection02;
