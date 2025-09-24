import { useState, useRef, useEffect } from "react"
import ButtonType01 from "./ButtonType01";

function BurgerMenu(){
    const [menuOpen, setMenuStatus] = useState(false);
    const menuRef = useRef(null);
    const burgerButtonRef = useRef(null);

    //HANDLERS
    
    //handle clicks outside menu (close only when menu not contans e.target)
    const handleClickOutside = (e) =>{
        //first, check is menuRef and burgerButton is exists (it's could be absent,if clik fast after page load)
        //then check if burgerButton does not contains e.target
        if (
            menuRef.current &&
            burgerButtonRef.current && 
            !burgerButtonRef.current.contains(e.target) && 
            !menuRef.current.contains(e.target)
        ) {
            console.log("clicked outside");
            setMenuStatus(false);
        }
        // console.log("clicked");
    }
    
    //handler for toggle menu
    const handleBurgerButtonClick = ()=>{
        setMenuStatus(!menuOpen);
    }

    //handler for closing menu, when cllicked on menu buttons
    const handleMenuButtonClick = ()=>{
        console.log("click");
        setMenuStatus(false);
    }

    //ADD HANDLERS TO THE MENU

    // add handle for cliks outside of the menu ONLY when menu is opened
    useEffect(()=>{
        if (menuOpen) {
            document.addEventListener("mousedown", handleClickOutside);
            console.log("event listener added");
        }
        //remove event listener, when component dismounted
        return (()=>{
            document.removeEventListener("mousedown", handleClickOutside);
            console.log("event listener removed");
        });
    },[menuOpen]);


    return(
        <>
            {/* burger button */}
            <button
                ref={burgerButtonRef}
                onClick={handleBurgerButtonClick}
                className="flex md:hidden text-[#3a5066] w-5 flex-row justify-center shrink-0"
            >
                {menuOpen ? "X" : "☰"}
            </button>
            {/* mobile menu */}
            {menuOpen && (
                <nav
                    ref={menuRef} 
                    className="
                        absolute bg-[#ffffff] right-0 top-[4.5rem] w-64
                        shadow-[0_0_30px_15px_rgba(0,0,0,0.1)]
                        rounded-2xl
                        px-10 py-4
                        flex flex-col items-start gap-4
                    ">
                    <ButtonType01 text="Home" onClick={handleMenuButtonClick} active={true} />
                    <ButtonType01 text="About method" onClick={handleMenuButtonClick} active={false} />
                    <ButtonType01 text="Sign up" onClick={handleMenuButtonClick} active={false} />
                </nav>
            )}
        </>
    )
}

export default BurgerMenu;