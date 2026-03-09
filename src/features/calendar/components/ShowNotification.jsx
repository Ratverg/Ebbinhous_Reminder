

export function ShowNotifications({ notificationListForDate }) {
    //returns absolute positioned DIV with "pointer-events-none" option, to see through
    return (

        notificationListForDate &&
        (
            <div className="opacity-95 absolute flex flex-col z-50 bg-surface w-max pointer-events-none bottom-5 right-5 p-4 rounded-lg shadow-[0_0_10px_10px_rgba(0,0,0,0.15)]">
                {notificationListForDate.map((notification, i) => {
                    return (
                        <p key={i}>{notification.title}</p>
                    )
                }
                )}

                {/* "Tail" of the pop-up findow */}
                <svg
                className="absolute -bottom-6 -right-2 w-8 h-8 text-surface" 
                viewBox="0 0 24 24"
                >
                {/* fill="currentColor" tells the SVG to use the 'text-mainBackGround' color */}
                <polygon points="0,0 18,0 24,12" fill="currentColor" />
                </svg>
            </div>
        )

    )
}