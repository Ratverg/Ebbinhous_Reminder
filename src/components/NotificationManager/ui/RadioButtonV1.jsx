export function RadioButtonV1({selected, setSelected, notification}){
    // it takes 3 component
    // selected - list of selected notifications IDs
    // setSelected - useState to update this list
    // notification - notification object itself
    return (
            <input 
                type="checkbox"
                checked={selected.includes(notification.id)}
                // This toggle add/delete "notification.id" to "selected" list 
                onChange={() => 
                    setSelected(selected.includes(notification.id)
                        ? selected.filter(x => x !== notification.id)
                        : [...selected, notification.id])
                }
                className="
                    flex-shrink-0
                    appearance-none 
                    h-4 w-4 
                    border-2 border-[#D8DBE0]
                    bg-[#F3F4F6] 
                    rounded-[0.3rem]
                    checked:ring-2 
                    checked:ring-blue-400
                    checked:bg-blue-400
                    checked:border-blue-400 
                    ring-inset
                    ring-offset-2
                    ring-offset-white
                    transition-all duration-100
                "
            />

        )
}
