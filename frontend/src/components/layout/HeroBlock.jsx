import { useContext } from "react";
import ButtonType02 from "../ui/ButtonTypeV02";
import HeroBackground from "./HeroBackground";
import { useLocation, useNavigate } from "react-router-dom";
import { UserContext } from "../../features/auth/context/UserProvider";
// 1. Import your images as variables
// import graphEbbinghausCurve from "../../assets/images/graph-ebbynghous-curve-001.png";
import graphEbbinghausCurve from "../../assets/images/graph-ebbynghous-curve-001_v02.png";


function HeroBlock() {
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
            z-20
            text-textInverse
            my-0
            mx-0 md:mx-5 lg:mx-[12rem]
            flex flex-col md:flex-row gap-6
            relative
        ">

            {/* hero text block */}
            <div className="
                py-0 px-5 gap-5 w-full
                flex flex-col items-start justify-between 
            ">
                <p className="
                    relative title-xl
                ">
                    Remember anything forever
                    <br />
                    with Ebbinghous method.
                </p>
                <p className="
                    relative
                    title-lg 
                    opacity-60">
                    Add anything you want to remember and you will recieve telegram notification with intervals based on Ebbinghous forgeting curve.
                </p>
                <div className="
                   mt-auto     
                ">
                    {!currentUser && (<ButtonType02 text="Get started!" onClick={showFormHandle} />)}
                </div>
            </div>

            {/* graph block */}
            <div
                className="
                    flex flex-col items-center shrink-0 relative
                "
            >
                <p className="
                    absolute title-lg
                ">
                    Memory retention curve
                </p>
                <img
                    src={graphEbbinghausCurve}
                    alt="graph-ebbinghaus-curve"
                    className="
                        w-[25rem] h-auto
                    "
                />
            </div>

        </div>
    )
}
export default HeroBlock;
