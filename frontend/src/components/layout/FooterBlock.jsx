import { useContext, useState } from "react";
import { UserContext } from "../../features/auth/context/UserProvider";
import ButtonType01 from "../ui/ButtonType01";
import { useLocation, useNavigate } from "react-router-dom";
import LogoWithText from "../ui/LogoWithText";
// 1. Import your images as variables
import icoInsta from "../../assets/icons/ico-insta.png";
import icoTwitter from "../../assets/icons/ico-twitter.png";
import icoFb from "../../assets/icons/ico-fb.png";
import LogoWithoutText from "../ui/LogoWithoutText";
import LogoOnlyText from "../ui/LogoOnlyText";

function LogoLink({ logoImage, logoAlt, logoHref }) {
    return (
        <a href={logoHref}>
            <img
                src={logoImage} alt={logoAlt}
                className="
                    h-5
                    md:h-6
                    hover:scale-110
                    transition-all duration-200
                "
                style={{
                    filter: "drop-shadow(2px 2px 3px rgba(0,0,0,1))"
                }}
            />
        </a>
    )
}

function FooterBlock() {
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
            bg-footer
            px-6 md:px-16 lg:px-32
            pt-8 pb-8
            w-full
            flex flex-row justify-between
            title-xs md:title-base
        ">
            {/* Logo */}
            <div className="flex flex-col">
                <div className="hidden md:flex md:flex-col md:items-start">
                    <LogoWithText/>
                    <p className="text-textInverse mb-3 opacity-50">© Copyright 2026</p>
                </div>
                <div className="flex flex-col md:hidden items-start gap-2">
                    <LogoWithoutText/>
                    <LogoOnlyText/>
                    <p className="text-textInverse mb-3 opacity-50 text-xs">© 2026</p>
                </div>
            </div>
            {/* MENU */}
            <div className="flex flex-col items-start">
                <p className="text-textInverse mb-3">
                    Menu:
                </p>
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
            </div>

            {/* INFO */}
            <div className="flex flex-col items-start">
                <p className="text-textInverse mb-3">
                    Info:
                </p>
                <ButtonType01
                    id = "Privacy policy"
                    text="Privacy policy"
                    active={location.pathname === 'privacy-policy'}
                    onClick={()=> {
                        navigate('privacy-policy');
                    }} 
                />
                <ButtonType01
                    id = "Terms of service"
                    text="Terms of service"
                    active={location.pathname === 'terms-of-service'}
                    onClick={()=> {
                        navigate('terms-of-service');
                    }} 
                />
            </div>

            <div className="flex flex-col">
                    {/* CONTACTS */}
                    <div className="flex flex-col items-start">
                        <p className="text-textInverse mb-3">
                            Contacts:
                        </p>
                        <a className="text-textInverse" href="mailto:rat3d@mail.ru">
                            <ButtonType01
                                id="email"
                                text="rat3d@mail.ru"
                                active={false}
                            />
                        </a>
                    </div>

                    {/* FOLLOW US */}
                    <div className="flex flex-col items-start">
                        <p className="text-textInverse  mb-3">
                            Follow us:
                        </p>
                        <div className="flex flex-row gap-4">
                        <LogoLink
                            logoImage={icoInsta}
                            logoAlt={"ico-insta.png"}
                            logoHref={"http://rat.ru"}
                        />
                        <LogoLink
                            logoImage={icoTwitter}
                            logoAlt={"ico-twitter.png"}
                            logoHref={"http://rat.ru"}
                        />
                        <LogoLink
                            logoImage={icoFb}
                            logoAlt={"ico-fb.png"}
                            logoHref={"http://rat.ru"}
                        />
                        </div>
                    </div>
                </div>
            </div>
    )
}
export default FooterBlock;