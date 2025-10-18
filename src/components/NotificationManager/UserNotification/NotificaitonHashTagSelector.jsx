import { useState, useRef, useEffect } from "react"
import { HashTagButton } from "../ui/HashtagButton"

// //-------GET HASHTAG LIST-------
// function getHashtagList(notificationList) {
//     const tempList = []
//     notificationList.forEach((x) => {
//         if (!tempList.find(item => item.hashtag === x.hashTag)) {
//             tempList.push({ hashtag: x.hashTag, color: x.color || "#767676" })
//         }
//     })
//     return tempList;
// }

//-------COLOR SELECTOR-------
function ColorSelector({ color, setColor }) {
    const colors = [
        "#ff5f5f", "#ffa45f", "#ffe45f",
        "#a0e85f", "#5fe8a3", "#5fd5e8",
        "#5f8ae8", "#a45fe8", "#e85fe0",
        "#767676"
    ];
    const [open, setOpen] = useState(false);

    return (
        <div className="relative">
            <div
                className="w-6 h-6 rounded-lg border-2 border-gray-400 cursor-pointer ml-2"
                style={{ backgroundColor: color }}
                onClick={() => setOpen(!open)}
                title="Select color"
            ></div>

            {open && (
                <div
                    className="
                        absolute z-50 bottom-8 -left-2 p-2 
                        bg-white shadow-lg rounded-lg
                        grid grid-cols-5 gap-2
                        w-max
                    "
                >
                    {colors.map((c) => (
                        <div
                            key={c}
                            onClick={() => { setColor(c); setOpen(false); }}
                            className="w-5 h-5 rounded-full cursor-pointer border"
                            style={{ backgroundColor: c }}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}

function HashTagMenu({
    notification,
    notificationList,
    setNotificationList,
    menuVisible,
    setMenuVisible,
    hashtagList,
    setHashtagList
}) {
    const [currHT, setCurrHT] = useState({
        hashtag: notification.hashTag,
        color: notification.color || "#767676"
    });

    const containerRef = useRef(null);

    //-------UPDATE NOTIFICATION-------
    const handleUpdateNotificationList = (updatedNotification) => {
        setNotificationList(prevList =>

            //1.take existing list and if ID of element === ID of updatedNotification take it
            prevList.map(n =>
                n.id === updatedNotification.id ? updatedNotification : n
            )
            //2.set the color of this notifications to our update notification color
            .map( n=>
                n.hashTag === updatedNotification.hashTag ? {...n, color: updatedNotification.color} : n
            )
        );
    };

    //-------CLICK OUTSIDE-------
    const clickOutSide = (e) => {
        if (containerRef.current && !containerRef.current.contains(e.target)) {
            setMenuVisible(false)
        }
    }

    useEffect(() => {
        if (menuVisible) {
            document.addEventListener("mousedown", clickOutSide)
        }
        return () => {
            document.removeEventListener("mousedown", clickOutSide)
        }
    }, [menuVisible]);

    return (
        <div
            ref={containerRef}
            className="
                opacity-98 bg-[#fff]
                absolute flex flex-col items-start z-50
                bottom-10 left-0 p-2 rounded-md
                shadow-[0_0_10px_10px_rgba(0,0,0,0.05)]
            "
        >
            {/* hashtag input + color selector + save */}
            <div className="flex flex-row items-center mb-2 gap-1">
                <ColorSelector
                    color={currHT.color}
                    setColor={(color) => setCurrHT({ ...currHT, color })}
                />
                <p>#</p>
                <input
                    type="text"
                    value={currHT.hashtag}
                    onChange={(e) => setCurrHT({ ...currHT, hashtag: e.target.value })}
                    className="
                        text-sm font-semibold text-gray-600
                        bg-transparent rounded-md
                        m-0 p-0 px-1
                        h-[1.5rem] leading-[1.5rem] w-[10rem]
                        border-2 border-gray-400
                        outline-none
                        focus:border-blue-400 focus:text-black
                    "
                />

                <HashTagButton
                    text="✔"
                    color="#48BB78"
                    onClick={() => {
                        handleUpdateNotificationList({
                            ...notification,
                            hashTag: currHT.hashtag,
                            color: currHT.color
                        })
                    }}
                />
            </div>

            {/* hashtag list */}
            <div className="flex flex-col">
                <p className="text-sm mb-1">Used hashtag list:</p>
                <div className="flex flex-row flex-wrap gap-1">
                    {hashtagList && hashtagList.map((x) =>
                        <HashTagButton
                            key={x.hashtag}
                            text={x.hashtag}
                            color={x.color}
                            onClick={() =>
                                setCurrHT({ hashtag: x.hashtag, color: x.color })
                            }
                        />
                    )}
                </div>
            </div>
        </div>
    )
}

export function NotificationHashTagSelector({
    notification,
    notificationList,
    setNotificationList,
    hashtagList,
    setHashtagList
}) {
    const [menuVisible, setMenuVisible] = useState(false);

    return (
        <div className="relative">
            <HashTagButton
                text={`#${notification.hashTag}`}
                color={notification.color}
                onClick={() => setMenuVisible(!menuVisible)}
            />
            {menuVisible &&
                <HashTagMenu
                    {...{
                        notification,
                        notificationList,
                        setNotificationList,
                        menuVisible,
                        setMenuVisible,
                        hashtagList,
                        setHashtagList
                    }}
                />
            }
        </div>
    )
}
