import { useState, useRef, useEffect } from "react";

//-------Small action menu buttons-------
function SmallActionButton({onChange, text, onClick}){
    return(
        <button
            className=" border-none rounded-none hover:bg-[#829cb6] text-sm"
            onClick={onClick}

        >
            {text}
        </button>
    )
}


// -------Three point button with POP UP menu-------
export function ThreePointButtonWithMenu ({editing, setEditing}){
    const [menuVisible, setMenuVisible] = useState(false);
    const containerRef = useRef(null);

    //Handlers

    //Show menu handler
    const showMenuToggle = ()=>{
        setMenuVisible(!menuVisible);
    }

    //handle clicks outisde menu and button (they both in one div container)
    const clickOutSide = (e)=>{
        // Checks: Does the containerRef exist AND is the clicked target NOT inside the container?
        if (containerRef.current && !containerRef.current.contains(e.target)) {
            setMenuVisible(false)
        }
    }

    //dynamically add clickOutSide handler to the whole document, only when menu is visible
    useEffect(()=>{
        if (menuVisible){
            //add event listener when menu is visible
            document.addEventListener("mousedown",clickOutSide)
        }
        return () => {
            //remove event listener, when menu is hidden
            console.log("removeddd")
            document.removeEventListener("mousedown", clickOutSide)
        }
    },[menuVisible, clickOutSide]);

    return(
        <div ref={containerRef} className="flex flex-col ml-auto relative">
            <button className="text-base" onClick={showMenuToggle}>
                ⋮
            </button>
            {menuVisible &&
                <div className="opacity-95 absolute flex flex-col items-start z-50 bg-[#fff]  bottom-4 right-1 p-2 rounded-md shadow-[0_0_10px_10px_rgba(0,0,0,0.05)]">
                    <SmallActionButton text="Deleteeeee" onClick={()=>console.log("hello")} />
                    {editing
                        ? <SmallActionButton text="Finish" onClick={()=>setEditing(false)} />
                        : <SmallActionButton text="Edit" onClick={()=>setEditing(true)} />
                    }
                </div>
            }   

        </div>
    )
}