import { AnimatePresence, motion } from "framer-motion";
import { useState, useRef, useEffect, useContext } from "react";
import ButtonType01 from "../ui/ButtonType01";
import { UserContext } from "../../features/auth/context/UserProvider";
import { useLocation, useNavigate } from "react-router-dom";
import clsx from "clsx";
import { UserLoginPopUp } from "../../features/auth/components/UserLoginPopUp";




function BurgerMenu() {
    const [mainMenuVisible, setMainMenuVisible] = useState(false);
    const [buttonsMenuVisible, setButtonsMenuVisible] = useState(true);
    const [registerFormVisible, setRegisterFormVisible] = useState(false);
    const [loginFormVisible, setLoginFormVisible] = useState(false);


    const {currentUser, getCurrentUser, authenticateUser, logoutUser, createNewUser} = useContext(UserContext);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");
    const [errorsList, setErrorList] = useState(null);
    



    const mainMenuRef = useRef(null);
    const burgerButtonRef = useRef(null);


    const navigate = useNavigate();
    const location = useLocation();


    const showFormHandle = () => {
        setLoginFormVisible((prev) => !prev);
        setButtonsMenuVisible((prev)=>!prev);
    }


    const handleCreateUser = async (e) =>{
        e.preventDefault();
        //create JSON with username, password and email
        const cred = {
            username: username,
            password: password,
            email:email
        }

        //try to create new user
        try {
            console.log(cred);
            const createdUser = await createNewUser(cred);
            if (createdUser) {
                console.log(`new user created: ${createdUser.username}`);
                setError("");
                setUsername("");
                setPassword("");
                setEmail("")
                setRegisterFormVisible(false);
                //try to authenticate just created user
                const successAuth = await authenticateUser(cred);
                if (successAuth) {
                    console.log("logged in");
                    setError("");
                    setUsername("");
                    setPassword("");
                    setEmail("")
                    await getCurrentUser();
                } else {
                    throw new Error(`User or password not correct`);
                }
            }
        } catch (err){
            console.log(JSON.parse(err.message).errors);
            setErrorList(JSON.parse(err.message).errors);
            setError(`${JSON.parse(err.message).message}`);
        }


    }
    const handleLogin = async (e)=>{
        e.preventDefault();

        //create JSON with username and password
        const cred = {
            username:username,
            password:password
        }

        //try to authenticate User with credential
        try {
            const successAuth = await authenticateUser(cred);
            if (successAuth) {
                console.log("logged in");
                setMainMenuVisible(false);
                setButtonsMenuVisible(true);
                setLoginFormVisible(false);
                setRegisterFormVisible(false);
                setError("");
                setUsername("");
                setPassword("");
                await getCurrentUser();
            } else {
                throw new Error(`User or password not correct`);
            }
        } catch (err) {
            console.log(`Auth error: ${err}`)
            setError(`${err}`);
            setUsername("");
            setPassword("");
        }
    }

    const handleLogout = async (e) =>{
        try {
            setMainMenuVisible(false);
            setButtonsMenuVisible(true);
            setLoginFormVisible(false);
            setRegisterFormVisible(false);
            setError("");
            setUsername("");
            setPassword("");
            await logoutUser();
            await getCurrentUser();
        } catch (err) {
            console.log(`Error logout user: ${err}`)
        }     
    }


    //HANDLERS

    //handle clicks outside menu (close only when menu not contans e.target)
    const handleClickOutside = (e) => {
        //first, check is menuRef and burgerButton is exists (it's could be absent,if click fast after page load)
        //then check if burgerButton does not contains e.target
        if (
            mainMenuRef.current &&
            (!mainMenuRef.current.contains(e.target) && !burgerButtonRef.current.contains(e.target))
        ) {
            console.log("clicked outside");
            setMainMenuVisible(false);
        }
    }

    //handler for toggle menu
    const handleBurgerButtonClick = async () => {
        setMainMenuVisible(prev => !prev);
        setButtonsMenuVisible(true);
        setLoginFormVisible(false);
        setRegisterFormVisible(false);
        setError("");
        setUsername("");
        setPassword("");
        await getCurrentUser();
    }

    //handler for closing menu, when cllicked on menu buttons
    const handleMenuButtonClick = () => {
        setMainMenuVisible(false);
    }
    
    //handler for opening register from, when cllicked on menu buttons
    const handleSignUpButtonClick = () => {
        setButtonsMenuVisible(false);
        setLoginFormVisible(true);
    }

    const handleRegisterFormVisible = () => {
        setButtonsMenuVisible(false);
        setLoginFormVisible(false);
        setRegisterFormVisible(true);
        setErrorList(null);
        setError("");
    }

    //ADD HANDLERS TO THE MENU

    // add handle for cliks outside of the menu ONLY when menu is opened
    useEffect(() => {
        if (mainMenuVisible) {
            document.addEventListener("mousedown", handleClickOutside);
            console.log("event listener added");
        }
        //remove event listener, when component dismounted
        return (() => {
            document.removeEventListener("mousedown", handleClickOutside);
            // console.log("event listener removed");
        });
    }, [mainMenuVisible]);


    return (
        <>
            {/* burger button */}
            <button
                ref={burgerButtonRef}
                onClick={handleBurgerButtonClick}
                className="w-6 flex md:hidden text-textMuted hover:text-text transition-all flex-row justify-center shrink-0 text-xl"
            >
                {mainMenuVisible ? "X" : "☰"}
            </button>
            {/* mobile menu with opacity animation*/}
            <AnimatePresence>
                {mainMenuVisible && (
                    <motion.nav
                        ref={mainMenuRef}
                        className="absolute"
                    >
                        {buttonsMenuVisible && (
                            <motion.nav
                                key="buttonsMenu"
                                initial={{ opacity: 0, y: -20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 0.3 }}
                                className="
                                    absolute bg-background right-[0rem] top-[2.0rem] w-[10rem]
                                    shadow-[0_0_30px_15px_rgba(0,0,0,0.1)]
                                    rounded-2xl
                                    px-10 py-4 flex flex-col items-start gap-4
                                "
                            >
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
                            </motion.nav>
                        )}
                        {loginFormVisible && (
                            <motion.nav
                                className="absolute right-[0rem] top-[2.0rem]"
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
                        )}

                    </motion.nav>
                )}
            </AnimatePresence>
        </>
    )
}

export default BurgerMenu;













// import { AnimatePresence, motion } from "framer-motion";
// import { useState, useRef, useEffect, useContext } from "react";
// import ButtonType01 from "../ui/ButtonType01";
// import { UserContext } from "../../features/auth/context/UserProvider";
// import { useLocation, useNavigate } from "react-router-dom";
// import clsx from "clsx";




// function BurgerMenu() {
//     const [mainMenuVisible, setMainMenuVisible] = useState(false);
//     const [buttonsMenuVisible, setButtonsMenuVisible] = useState(true);
//     const [registerFormVisible, setRegisterFormVisible] = useState(false);
//     const [loginFormVisible, setLoginFormVisible] = useState(false);


//     const {currentUser, getCurrentUser, authenticateUser, logoutUser, createNewUser} = useContext(UserContext);
//     const [username, setUsername] = useState("");
//     const [password, setPassword] = useState("");
//     const [email, setEmail] = useState("");
//     const [error, setError] = useState("");
//     const [errorsList, setErrorList] = useState(null);
    



//     const mainMenuRef = useRef(null);
//     const burgerButtonRef = useRef(null);


//     const navigate = useNavigate();
//     const location = useLocation();


//     const showFormHandle = () => {
//         setLoginFormVisible((prev) => !prev);
//         setButtonsMenuVisible((prev)=>!prev);
//     }


//     const handleCreateUser = async (e) =>{
//         e.preventDefault();
//         //create JSON with username, password and email
//         const cred = {
//             username: username,
//             password: password,
//             email:email
//         }

//         //try to create new user
//         try {
//             console.log(cred);
//             const createdUser = await createNewUser(cred);
//             if (createdUser) {
//                 console.log(`new user created: ${createdUser.username}`);
//                 setError("");
//                 setUsername("");
//                 setPassword("");
//                 setEmail("")
//                 setRegisterFormVisible(false);
//                 //try to authenticate just created user
//                 const successAuth = await authenticateUser(cred);
//                 if (successAuth) {
//                     console.log("logged in");
//                     setError("");
//                     setUsername("");
//                     setPassword("");
//                     setEmail("")
//                     await getCurrentUser();
//                 } else {
//                     throw new Error(`User or password not correct`);
//                 }
//             }
//         } catch (err){
//             console.log(JSON.parse(err.message).errors);
//             setErrorList(JSON.parse(err.message).errors);
//             setError(`${JSON.parse(err.message).message}`);
//         }


//     }
//     const handleLogin = async (e)=>{
//         e.preventDefault();

//         //create JSON with username and password
//         const cred = {
//             username:username,
//             password:password
//         }

//         //try to authenticate User with credential
//         try {
//             const successAuth = await authenticateUser(cred);
//             if (successAuth) {
//                 console.log("logged in");
//                 setMainMenuVisible(false);
//                 setButtonsMenuVisible(true);
//                 setLoginFormVisible(false);
//                 setRegisterFormVisible(false);
//                 setError("");
//                 setUsername("");
//                 setPassword("");
//                 await getCurrentUser();
//             } else {
//                 throw new Error(`User or password not correct`);
//             }
//         } catch (err) {
//             console.log(`Auth error: ${err}`)
//             setError(`${err}`);
//             setUsername("");
//             setPassword("");
//         }
//     }

//     const handleLogout = async (e) =>{
//         try {
//             setMainMenuVisible(false);
//             setButtonsMenuVisible(true);
//             setLoginFormVisible(false);
//             setRegisterFormVisible(false);
//             setError("");
//             setUsername("");
//             setPassword("");
//             await logoutUser();
//             await getCurrentUser();
//         } catch (err) {
//             console.log(`Error logout user: ${err}`)
//         }     
//     }


//     //HANDLERS

//     //handle clicks outside menu (close only when menu not contans e.target)
//     const handleClickOutside = (e) => {
//         //first, check is menuRef and burgerButton is exists (it's could be absent,if click fast after page load)
//         //then check if burgerButton does not contains e.target
//         if (
//             mainMenuRef.current &&
//             (!mainMenuRef.current.contains(e.target) && !burgerButtonRef.current.contains(e.target))
//         ) {
//             console.log("clicked outside");
//             setMainMenuVisible(false);
//         }
//     }

//     //handler for toggle menu
//     const handleBurgerButtonClick = async () => {
//         setMainMenuVisible(prev => !prev);
//         setButtonsMenuVisible(true);
//         setLoginFormVisible(false);
//         setRegisterFormVisible(false);
//         setError("");
//         setUsername("");
//         setPassword("");
//         await getCurrentUser();
//     }

//     //handler for closing menu, when cllicked on menu buttons
//     const handleMenuButtonClick = () => {
//         setMainMenuVisible(false);
//     }
    
//     //handler for opening register from, when cllicked on menu buttons
//     const handleSignUpButtonClick = () => {
//         setButtonsMenuVisible(false);
//         setLoginFormVisible(true);
//     }

//     const handleRegisterFormVisible = () => {
//         setButtonsMenuVisible(false);
//         setLoginFormVisible(false);
//         setRegisterFormVisible(true);
//         setErrorList(null);
//         setError("");
//     }

//     //ADD HANDLERS TO THE MENU

//     // add handle for cliks outside of the menu ONLY when menu is opened
//     useEffect(() => {
//         if (mainMenuVisible) {
//             document.addEventListener("mousedown", handleClickOutside);
//             console.log("event listener added");
//         }
//         //remove event listener, when component dismounted
//         return (() => {
//             document.removeEventListener("mousedown", handleClickOutside);
//             // console.log("event listener removed");
//         });
//     }, [mainMenuVisible]);


//     return (
//         <>
//             {/* burger button */}
//             <button
//                 ref={burgerButtonRef}
//                 onClick={handleBurgerButtonClick}
//                 className="w-6 flex md:hidden text-textMuted hover:text-text transition-all flex-row justify-center shrink-0 text-xl"
//             >
//                 {mainMenuVisible ? "X" : "☰"}
//             </button>
//             {/* mobile menu with opacity animation*/}
//             <AnimatePresence>
//                 {mainMenuVisible && (
//                     <motion.nav
//                         ref={mainMenuRef}
//                         className="absolute"
//                     >
//                         {buttonsMenuVisible && (
//                             <motion.nav
//                                 key="buttonsMenu"
//                                 initial={{ opacity: 0, y: -20 }}
//                                 animate={{ opacity: 1, y: 0 }}
//                                 exit={{ opacity: 0, y: -20 }}
//                                 transition={{ duration: 0.3 }}
//                                 className="
//                                     absolute bg-background right-[0rem] top-[2.0rem] w-[10rem]
//                                     shadow-[0_0_30px_15px_rgba(0,0,0,0.1)]
//                                     rounded-2xl
//                                     px-10 py-4 flex flex-col items-start gap-4
//                                 "
//                             >
//                                 <ButtonType01
//                                     id = "Home"
//                                     text="Home"
//                                     active={location.pathname === '/'}
//                                     onClick={()=> {
//                                         navigate('/');
//                                     }} 
//                                 />
//                                 <ButtonType01
//                                     id = "About" 
//                                     text="About"
//                                     active={location.pathname === '/about'}
//                                     onClick={()=> {
//                                         navigate('/about');
//                                     }} 
//                                 />
//                                 {currentUser === null ? (
//                                         <ButtonType01 
//                                             id= "Login"
//                                             text="Login"
//                                             active={false}
//                                             onClick={()=> {
//                                                 showFormHandle();
//                                             }}
//                                         />
//                                     ):(
//                                         <>
//                                         <ButtonType01 
//                                             id= "Logout"
//                                             text="Logout"
//                                             active={false}
//                                             onClick={()=> {
//                                                 showFormHandle();
//                                             }}
//                                         />
//                                         <ButtonType01
//                                             id = "Userpage" 
//                                             text={currentUser !== null ? currentUser.username : "User"}
//                                             active={location.pathname === '/userpage'}
//                                             onClick={()=> {
//                                                 navigate('/userpage');
//                                             }} 
//                                         /> 
//                                         </>
//                                 )}
//                             </motion.nav>
//                         )}
//                         {registerFormVisible && (
//                                 <motion.form
//                                     onSubmit={handleCreateUser}
//                                     className="
//                                         absolute bg-background right-[0rem] top-[2.0rem] w-[16rem]
//                                         shadow-[0_0_30px_15px_rgba(0,0,0,0.1)]
//                                         rounded-2xl
//                                         px-4 py-4 flex flex-col items-start gap-0
//                                     "
//                                     key="registerForm"
//                                     initial={{ opacity: 0}}
//                                     animate={{ opacity: 1}}
//                                     exit={{ opacity: 0}}
//                                     transition={{ duration: 0.3 }}
//                                 >
//                                         <label className="text-base opacity-60"> Username</label>
//                                         {errorsList?.username && <p className = "text-errorFont text-base">{errorsList.username}</p>}
//                                         <input
//                                             className={clsx(
//                                                 "px-2 py-1 rounded-md w-full text-base",
//                                                 "bg-inputForm  text-textMuted outline-none ",
//                                                 "focus:text-text focus:bg-transparent"
//                                             )}
//                                             type="text"
//                                             value={username}
//                                             onChange={(e)=>setUsername(e.target.value)}
//                                             />
//                                         <label className="text-base opacity-60">Password</label>
//                                         {errorsList?.password && <p className = "text-errorFont text-base">{errorsList.password}</p>}
//                                         <input
//                                             className={clsx(
//                                                 "px-2 py-1 rounded-md w-full text-base",
//                                                 "bg-inputForm  text-textMuted outline-none ",
//                                                 "focus:text-text focus:bg-transparent"
//                                             )}
//                                             type="password"
//                                             value={password}
//                                             onChange={(e)=>setPassword(e.target.value)}
//                                             />
//                                         <label className="text-base opacity-60">Email</label>
//                                         {errorsList?.email && <p className = "text-errorFont text-base">{errorsList.email}</p>}
//                                         <input
//                                             className={clsx(
//                                                 "px-2 py-1 rounded-md w-full text-base",
//                                                 "bg-inputForm  text-textMuted outline-none ",
//                                                 "focus:text-text focus:bg-transparent"
//                                             )}
//                                             type="text"
//                                             value={email}
//                                             onChange={(e)=>setEmail(e.target.value)}
//                                         />
//                                         <ButtonType01 text="Create new user" active={false} type="submit"/>
//                                         {error && <p className = "text-error text-base">
//                                                     {error}
//                                                 </p>
//                                     }
//                                 </motion.form>
//                         )}
//                         {loginFormVisible && (
//                                 <motion.form
//                                     onSubmit={handleLogin}
//                                     className="
//                                         absolute bg-background right-[0rem] top-[2.0rem] w-[16rem]
//                                         shadow-[0_0_30px_15px_rgba(0,0,0,0.1)]
//                                         rounded-2xl
//                                         px-4 py-4 flex flex-col items-start gap-0
//                                     "
//                                     key="loginForm"
//                                     initial={{ opacity: 0}}
//                                     animate={{ opacity: 1}}
//                                     exit={{ opacity: 0}}
//                                     transition={{ duration: 0.3 }}
//                                 >
//                                     <label className="text-base opacity-60">Username</label>
//                                     <input
//                                         className={clsx(
//                                             "px-2 py-1 rounded-md w-full text-base",
//                                             "bg-inputForm  text-textMuted outline-none ",
//                                             "focus:text-text focus:bg-transparent"
//                                         )}
//                                         type="text"
//                                         value={username}
//                                         onChange={(e)=>setUsername(e.target.value)}
//                                     />
//                                     <label className="text-base opacity-60">Password</label>
//                                     <input
//                                         className={clsx(
//                                             "px-2 py-1 rounded-md w-full text-base",
//                                             "bg-inputForm  text-textMuted outline-none ",
//                                             "focus:text-text focus:bg-transparent"
//                                         )}
//                                         type="password"
//                                         value={password}
//                                         onChange={(e)=>setPassword(e.target.value)}
//                                     />
//                                     <ButtonType01 type="submit" text="Login" active={false}  />
//                                     <ButtonType01  type="button" text="Create new account" active={false} onClick={handleRegisterFormVisible} />
//                                     {error && <p className = "text-base text-error">
//                                                 {error}
//                                             </p>
//                                     }
//                                 </motion.form>
//                         )}

//                     </motion.nav>
//                 )}
//             </AnimatePresence>
//         </>
//     )
// }

// export default BurgerMenu;