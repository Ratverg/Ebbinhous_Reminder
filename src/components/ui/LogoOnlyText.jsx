// 1. Import your images as variables
import logoOnlyText from "../../assets/images/logo-only-text.png";

function LogoOnlyText({className=''}){
    return(
        <img
            src={logoOnlyText}
            alt="logo-only-text"
            className={`
                h-[2rem] ${className}
                md:h-[8rem]
            `}
        />

    )
}
export default LogoOnlyText;