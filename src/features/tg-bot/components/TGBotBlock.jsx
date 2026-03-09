import { useState, useEffect } from "react";
import { QRCodeSVG } from "qrcode.react";
import ContentWrapper from "../../../components/layout/ContentWrapper";
import { ActionButton } from "../../../components/ui/ActionButton";
import { getTasksForDate } from "../../calendar/utils/CalendarUtils";
import clsx from "clsx";
// 1. Import your images as variables
import icoTelegramConnection from "../../../assets/icons/ico-telegram-connection.png";



export function TGBotBlock({
    notificationList,
    currentUser,
    tgUserInfo,
    getTGUserInfo,
    deepLink,
    getDeepLink,
    botHealth,
    getBotHealth,
    deleteCurrentTGAccount
}) {

    const [notificationListForDate, setNotificationListForDate] = useState([]);
    const [today, setToday] = useState(new Date());

    //Update current date just simple, by timer (60_000) 
    useEffect(()=>{
        const interval_1 = setInterval(()=>{
            setToday(new Date());
        }, 60_000)
        return ()=> clearInterval(interval_1);
    },[])

    //Update notification list for current date 
    useEffect(() => {
        setNotificationListForDate(getTasksForDate(today, notificationList));
    }, [notificationList, today]);

    useEffect(() => {
        getDeepLink(currentUser);
        getBotHealth();
        getTGUserInfo(currentUser);
        const interval_2 = setInterval(()=>{
            getDeepLink(currentUser)
            getBotHealth();
            getTGUserInfo(currentUser);
        }, 30_000)
        return ()=> clearInterval(interval_2);
    },[currentUser])

    const handleOpenDeepLink = async ()=>{
        if (deepLink) {
            // "_blank" — open in new window
            // "noopener,noreferrer" — idk =) for security
            window.open(deepLink.link, "_blank", "noopener,noreferrer");
        } else {
            console.log("pu pu puuu....")
        }
    }

    const handleOpenLink = (link)=>{
        window.open(link, "_blank", "noopener,noreferrer");
    }

    const handleUnlinkAccount = async ()=>{
        await deleteCurrentTGAccount(currentUser);
        //update info
        getDeepLink(currentUser);
        getBotHealth(currentUser);
        getTGUserInfo(currentUser);
    }

    return (
        <ContentWrapper
            className={"flex flex-col w-full items-center"}
        >
            {tgUserInfo === null ?(
                //------------------------
                // TGUser NOT connected block
                //------------------------
                <div className="flex flex-col items-center justify-center gap-1">

                    {/* USER info */}
                    <div className=" flex flex-col justify-start items-start w-full font-medium">
                        {currentUser ? (
                            <p className="justify-start">
                                <span className="opacity-60">Hello, </span> 
                                <span className="opacity-100">{currentUser.username}</span> 
                            </p>
                        ):(
                            <p className="justify-start">
                                <span className="opacity-60">Hello, </span> 
                                <span className="opacity-100">---</span> 
                            </p>
                        )}
                    </div>
                    {/* Notification list for today */}
                    <hr className="w-full border-[1px] mt-0 border-border" />

                    <div className="flex flex-col w-full items-start">
                        <p>Today notifications:</p>
                        <ol className="list-disc list-inside">
                            {notificationListForDate.length > 0 ? (
                                notificationListForDate?.map(n => (
                                    <li key={n.id} className="text opacity-60">
                                    {n.title}
                                    </li>
                                ))
                            ):(
                                <li className="opacity-60">
                                None!
                                </li>
                            )}
                        </ol>
                    </div>                                        
                    {/* QR-CODE BLOCK */}
                    {deepLink != null ? (
                        // DEEPLINK ready
                        <>
                            <p className="font-medium opacity-100">TELEGRAM bot connection:</p>
                            <hr className="w-full border-[1px] mt-0  border-border" />
                            <p className="opacity-60">scan to connect</p>
                            <div className="p-1 rounded-lg shadow-md mb-4">
                                    <QRCodeSVG 
                                            value={deepLink.link} 
                                            size={110}
                                            level="H"
                                            includeMargin={false} // Set to false to let your div handle padding
                                            
                                            /* 1. Change Colors */
                                            fgColor="var(--color-text-secondary)" // Your brand color (e.g., Indigo)
                                            bgColor="transparent" // Matches your bg-surface div
                                            
                                            /* 2. Rounding the corners (Advanced) */
                                            /* Note: Standard qrcode.react doesn't have a 'borderRadius' prop for modules.
                                            The best way to get a rounded look is to embed a small logo or 
                                            use a library like 'react-qr-code' or 'next-qrcode' if you need 
                                            perfectly circular dots. */
                                        />
                            </div>
                            <p className="opacity-60">press to connect</p>
                            <ActionButton
                                text={"Connect TELEGRAM account"}
                                color={"brand"}
                                onClick={handleOpenDeepLink}
                                className="w-full"
                            >
                            </ActionButton>
                        </>
                    ) : (
                        // DEEPLINK not ready
                        <div className="bg-surface p-3 rounded-lg shadow-md h-[110px] w-[110px] flex items-center justify-center">
                            <p>Waiting for QR...</p>
                        </div>
                    )}
                    {/* Telegram bot HEALTH status */}

                    <div className="flex flex-col w-full items-center">
                        {botHealth && botHealth.botOnline ? (
                            <p className="text-[#31A741] text-sm">● TELEGRAM bot online</p>
                        ):
                        (
                            <p className="text-[#BB4848] text-sm">● TELEGRAM bot offline!</p>
                        )}
                    </div>
                </div>
            ):(
                //------------------------
                // TGUser connected block
                //------------------------
                <div className="flex flex-col items-center justify-center gap-1">

                    {/* USER info */}
                    <div className="flex flex-col justify-start items-start w-full">
                        {currentUser ? (
                            <p className="justify-start">
                                <span className="opacity-60">Hello, </span> 
                                <span className="opacity-100">{currentUser.username}</span> 
                            </p>
                        ):(
                            <p className="justify-start">
                                <span className="opacity-60">Hello, </span> 
                                <span className="opacity-100">---</span> 
                            </p>
                        )}
                    </div>
                    {/* Notification list for today */}
                    <hr className="w-full border-[1px] mt-0  border-border" />

                    <div className="flex flex-col w-full items-start">
                        <p>Today notifications:</p>
                        <ol className="list-disc list-inside">
                            {notificationListForDate.length > 0 ? (
                                notificationListForDate?.map(n => (
                                    <li key={n.id} className="opacity-60">
                                    {n.title}
                                    </li>
                                ))
                            ):(
                                <li className="opacity-60">
                                None!
                                </li>
                            )}
                        </ol>
                    </div>                                        
                    {/* TG User main info (UserName, UserId) + tg ICON */}
                    <p className="w-full opacity-100">TELEGRAM account connected:</p>
                    <hr className="w-full border-[1px] mt-0  border-border" />
                    <div
                        className={clsx(
                            "flex flex-row gap-4 w-full rounded-lg",
                            "cursor-pointer",
                            "bg-background hover:opacity-60 transition-opacity duration-300"
                        )}
                        onClick={()=>handleOpenLink("https://t.me/Ebbinghaus_Reminder_main_bot")}
                    >
                        <div className="flex flex-col justify-center">
                            <img 
                                src={icoTelegramConnection}
                                alt="ico-telegram-connection"
                                className="w-10 h-10"
                            />
                        </div>
                        <div className="flex flex-col items-start justify-center gap-1">
                            <p>@{tgUserInfo.tgUsername}</p>
                            <p className="opacity-60">ID: {tgUserInfo.telegramId}</p>
                        </div>
                    </div>


                    <ActionButton
                        text={"Unlink TELEGRAM"}
                        color={"#BB4848"}
                        onClick={handleUnlinkAccount}
                        className="w-full"
                    >
                    </ActionButton>
                    {/* Telegram bot HEALTH status */}

                    <div className="flex flex-col w-full items-center">
                        {botHealth && botHealth.botOnline ? (
                            <p className="text-[#31A741] text-sm">● TELEGRAM bot online</p>
                        ):
                        (
                            <p className="text-[#BB4848] text-sm">● TELEGRAM bot offline!</p>
                        )}
                    </div>
                </div>
            )}
            {/* <a href={deepLink.link}>Connect TG account</a> */}

        </ContentWrapper>
    )
}