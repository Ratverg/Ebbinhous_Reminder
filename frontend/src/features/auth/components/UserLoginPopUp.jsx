import { useContext, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import ButtonType01 from "../../../components/ui/ButtonType01";
import { UserContext } from "../context/UserProvider";
import { useNavigate } from "react-router-dom";
import clsx from "clsx";

export function UserLoginPopUp({
    loginFormVisible,
    setLoginFormVisible
}){
    const {currentUser, getCurrentUser, authenticateUser, logoutUser, createNewUser} = useContext(UserContext);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");
    const [errorsList, setErrorList] = useState(null);
    const [registerFormVIsible, setRegisterFormVisibleMode] = useState(false);
    const navigate = useNavigate();

    const handleRegisterFormVisible = () => {
        setRegisterFormVisibleMode(true);
        setErrorList(null);
        setError("");
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
                setLoginFormVisible(false);
                setRegisterFormVisibleMode(false);
                //try to authenticate just created user
                const successAuth = await authenticateUser(cred);
                if (successAuth) {
                    setError("");
                    setUsername("");
                    setPassword("");
                    setEmail("")
                    getCurrentUser();
                    setLoginFormVisible(false);
                    setRegisterFormVisibleMode(false);
                    navigate('/userpage');
                } else {
                    throw new Error(`User or password not correct`);
                }
            }
        } catch (err){
            // This catches CORS, Server Down, and Throw errors!
            // console.error("Caught error in UI:", err.message);
            // Check if the error is JSON (from server) or a string (Network error)
            try {
                const parsedError = JSON.parse(err.message);
                setError(parsedError.message || "Something went wrong");
                if (parsedError.errors) setErrorList(parsedError.errors);
            } catch (e) {
                // This is likely a "Failed to fetch" or Network error
                setError("Connection failed");
            }
            

            // console.log(err.message)
            // console.log(JSON.parse(err.message).errors);
            // setErrorList(JSON.parse(err.message).errors);
            // setError(`${JSON.parse(err.message).message}`);
            // setUsername("");
            // setPassword("");
            // setEmail("");
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
                setError("");
                setUsername("");
                setPassword("");
                getCurrentUser();
                setLoginFormVisible(false);
                navigate('/userpage');
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
            await logoutUser();
            navigate('/');
        } catch (err) {
            console.log(`Error logout user: ${err}`)
        }
        setLoginFormVisible(false);        
    }


    //HIDE MENU when clicked outside
    //0. create a ref, using useRef to the menu
    //1. create eventListener that checks for the clicks outside the menu 
    //2. add this eventListener to the whole document, when menu is visible.
    //3. remove it when document is ummont

    //reference to the login <div>
    const loginFormRef = useRef(null);

    
    const handleClickOutside = (e)=>{
        // console.log(loginFormRef.current);
        if (!loginFormRef.current.contains(e.target)) setLoginFormVisible(false);
    }

    useEffect(()=>{
        if (loginFormVisible) {
            document.addEventListener("mousedown", handleClickOutside);
        }
        return (()=>{
            console.log("dismount")
            // 
            document.removeEventListener("mousedown", handleClickOutside);
        })
    },[loginFormVisible])

    return (
        <div
            ref={loginFormRef}
            className="
                bg-surface w-auto text-text
                shadow-[0_0_30px_15px_rgba(0,0,0,0.1)]
                rounded-2xl
                px-10 py-4 flex flex-col items-start gap-4"
        >
            {currentUser === null ?(
                //LOGIN POP_UP
                <AnimatePresence mode="wait">
                    {registerFormVIsible === false?(
                        <motion.form 
                            onSubmit={handleLogin} 
                            className="flex flex-col items-start"
                            key="login-form"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1}}
                            exit={{ opacity: 0}}
                            transition={{ duration: 0.3 }}
                        >
                            <label className="opacity-60">Username</label>
                            <input
                            className={clsx(
                                "px-2 py-1 rounded-md",
                                "bg-inputForm  text-textMuted outline-none ",
                                "focus:text-text focus:bg-transparent"
                            )}
                                type="text"
                                value={username}
                                onChange={(e)=>setUsername(e.target.value)}
                            />
                            <label className=" opacity-60">Password</label>
                            <input
                                className={clsx(
                                    "px-2 py-1 rounded-md",
                                    "bg-inputForm  text-textMuted outline-none ",
                                    "focus:text-text focus:bg-transparent"
                                )}
                                type="password"
                                value={password}
                                onChange={(e)=>setPassword(e.target.value)}
                            />
                            <ButtonType01 type="submit" text="Login" active={false}  />
                            <ButtonType01  type="button" text="Create new account" active={false} onClick={handleRegisterFormVisible} />
                            {error && <p className = "text-error">
                                        {error}
                                    </p>
                            }
                        </motion.form>
                        //CREATE NEW USER POP_UP
                    ):(
                        <motion.form
                            onSubmit={handleCreateUser}
                            className="flex flex-col items-start"
                            key="register-form"
                            initial={{ opacity: 0}}
                            animate={{ opacity: 1}}
                            exit={{ opacity: 0}}
                            transition={{ duration: 0.3 }}
                        >
                            <label className="text-base opacity-60"> Username</label>
                            {errorsList?.username && <p className = "text-error text-base">{errorsList.username}</p>}
                            <input
                                className={clsx(
                                    "px-2 py-1 rounded-md",
                                    "bg-inputForm  text-textMuted outline-none ",
                                    "focus:text-text focus:bg-transparent"
                                )}
                                type="text"
                                value={username}
                                onChange={(e)=>setUsername(e.target.value)}
                                />
                            <label className="text-base opacity-60">Password</label>
                            {errorsList?.password && <p className = "text-error text-base">{errorsList.password}</p>}
                            <input
                                className={clsx(
                                    "px-2 py-1 rounded-md",
                                    "bg-inputForm  text-textMuted outline-none ",
                                    "focus:text-text focus:bg-transparent"
                                )}
                                type="password"
                                value={password}
                                onChange={(e)=>setPassword(e.target.value)}
                                />
                            <label className="text-base opacity-60">Email</label>
                            {errorsList?.email && <p className = "text-error text-base">{errorsList.email}</p>}
                            <input
                                className={clsx(
                                    "px-2 py-1 rounded-md",
                                    "bg-inputForm  text-textMuted outline-none ",
                                    "focus:text-text focus:bg-transparent"
                                )}
                                type="text"
                                value={email}
                                onChange={(e)=>setEmail(e.target.value)}
                        />
                        <ButtonType01 text="Create new user" active={false} type="submit"/>
                        {error && <p className = "text-error">
                                    {error}
                                </p>
                        }
                        </motion.form>
                    )}
                </AnimatePresence>
                //LOGOUT POP_UP
            ):(
                <ButtonType01 text="Logout" onClick={handleLogout} active={false} />    
            )}
        </div>
    )
}