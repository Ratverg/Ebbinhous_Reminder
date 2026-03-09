//Description: Square "radio-button" with rounded corners. Blue "dot" at the enter when active
//How it works:
//- list of the selected ids stored in the "selected list"
//- "onChange" when radio button clicked - id of passed notification add ar delete from the "selected"  
export function RadioButtonV1({
    selected,
    setSelected,
    notification
}){
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
                    border-2 border-border
                    bg-surface 
                    rounded-[0.3rem]
                    checked:ring-2 
                    checked:ring-borderFocus
                    checked:bg-borderFocus
                    checked:border-borderFocus 
                    ring-inset
                    ring-offset-2
                    ring-offset-surface
                    transition-all duration-100
                "
            />

        )
}
