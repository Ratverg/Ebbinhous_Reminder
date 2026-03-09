import { useState, useRef, useEffect, useContext } from "react"
import { HashTagButton } from "../../../components/ui/HashTagButton"
import { ButtonType03 } from "../../../components/ui/ButtonTypeV03";
import { NotificationContext } from "../context/NotificationProvider";
import { UserContext } from "../../auth/context/UserProvider";
// 1. Import your images as variables
import icoApply from "../../../assets/icons/ico-apply.png";
import clsx from "clsx";

//-------COLOR SELECTOR-------
function ColorSelector({ color, setColor }) {
    const colors = [
        "#ff5f5f", "#ffa45f", "#ffe45f",
        "#a0e85f", "#5fe8a3", "#5fd5e8",
        "#5f8ae8", "#a45fe8"
    ];
    const [open, setOpen] = useState(false);

    return (
        <div>
            {/* Immitation of the button, filled with color */}
            <div
                className="w-6 h-6 rounded-lg cursor-pointer ml-2 hover:brightness-110 transition-all duration-300"
                style={{ backgroundColor: color }}
                onClick={() => setOpen(!open)}
                title="Select color"
            ></div>

            {open && (
                <div
                    className="
                        absolute z-50 bottom-full p-2 
                        bg-surface shadow-lg rounded-lg
                        grid grid-cols-8 gap-2
                        w-max
                    "
                >
                    {colors.map((c) => (
                        <div
                            key={c}
                            onClick={() => { setColor(c); setOpen(false); }}
                            className="w-5 h-5 rounded-full cursor-pointer hover:brightness-110 transition-all duration-300"
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
    menuVisible,
    setMenuVisible
}) {
    const {currentUser} = useContext(UserContext);
    const {updateNotification, hashtagList} = useContext(NotificationContext);
    const [currHT, setCurrHT] = useState({
        hashtag: notification.hashTag,
        color: notification.color || "#767676"
    });

    const containerRef = useRef(null);

    //-------UPDATE NOTIFICATION-------
    const handleUpdateNotificationList = (updatedNotification) => {
        updateNotification(currentUser.id, updatedNotification);
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
                opacity-98 bg-surface
                absolute flex flex-col items-start z-50
                bottom-7 left-0 p-2 rounded-md
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
                    className={clsx(
                        "px-2 py-1 w-[10rem] rounded-md",
                        "bg-inputForm text-textMuted outline-none ",
                        "focus:text-text focus:bg-transparent"
                    )}
                />
                <ButtonType03
                    src={icoApply}
                    alt={"ico-apply.png"}
                    onClick={() => {
                        handleUpdateNotificationList({
                            ...notification,
                            hashTag: currHT.hashtag,
                            color: currHT.color
                        })
                        setMenuVisible(false);
                    }}
                />
            </div>

            {/* hashtag list */}
            <div className="flex flex-col">
                <p className="mb-1">Used hashtag list:</p>
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
                        menuVisible,
                        setMenuVisible,
                    }}
                />
            }
        </div>
    )
}
