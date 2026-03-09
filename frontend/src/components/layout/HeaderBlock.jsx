import { useContext, useState } from "react";
import { UserLoginPopUp } from "../../features/auth/components/UserLoginPopUp";
import { UserContext } from "../../features/auth/context/UserProvider";
import ButtonType01 from "../ui/ButtonType01";
import LogoWithText from "../ui/LogoWithText";
import UserLogo from "../ui/UserLogo";
import BurgerMenu from "./BurgerMenu";
import { AnimatePresence, motion } from "framer-motion";
import { useLocation, useNavigate } from "react-router-dom";



function HeaderBlock() {
    const {
        currentUser,
        getCurrentUser,
        authenticateUser,
        logoutUser,
        loginFormVisible,
        setLoginFormVisible
    } = useContext(UserContext);

    const navigate = useNavigate();
    const location = useLocation()

    const showFormHandle = () => {
        setLoginFormVisible((prev) => !prev);
    }
    return (
            <div className="
                sticky top-2        
                z-30                
                
                w-auto h-auto
                mb-[1.3rem]
                mx-0 md:mx-5 lg:mx-32
                px-4 md:px-16
                py-1 md:py-1   
                
                font-medium
                
                bg-header/40 
                backdrop-blur-xl 
                rounded-2xl 
                
                flex items-center justify-between                      
            ">
            <LogoWithText />
            {/* Navigation container with User logo */}
            <div className="flex flex-row items-center gap-[1rem] relative z-10 ">
                <div className="relative hidden md:flex flex-row gap-6 ">
                    <ButtonType01
                        id = "Home"
                        text="Home"
                        active={location.pathname === '/'}
                        onClick={()=> {
                            navigate('/');
                        }} 
                    />
                    <ButtonType01
                        id = "About" 
                        text="About"
                        active={location.pathname === '/about'}
                        onClick={()=> {
                            navigate('/about');
                        }} 
                    />
                    {currentUser === null ? (
                            <ButtonType01 
                                id= "Login"
                                text="Login"
                                active={false}
                                onClick={()=> {
                                    showFormHandle();
                                }}
                            />
                        ):(
                            <>
                            <ButtonType01 
                                id= "Logout"
                                text="Logout"
                                active={false}
                                onClick={()=> {
                                    showFormHandle();
                                }}
                            />
                            <ButtonType01
                                id = "Userpage" 
                                text={currentUser !== null ? currentUser.username : "User"}
                                active={location.pathname === '/userpage'}
                                onClick={()=> {
                                    navigate('/userpage');
                                }} 
                            /> 
                            </>
                    )}
                    <AnimatePresence>
                        {loginFormVisible &&
                            <motion.nav
                                className="absolute -right-[1rem] top-[4.0rem]"
                                initial={{ opacity: 0, y: -20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 0.3 }}
                            >
                                <UserLoginPopUp {...{
                                    loginFormVisible,
                                    setLoginFormVisible
                                }} />
                            </motion.nav>
                        }
                    </AnimatePresence>
                </div>
                {/* {currentUser && (<UserLogo />)} */}
                <BurgerMenu />
            </div>
        </div>
    )
}
export default HeaderBlock;