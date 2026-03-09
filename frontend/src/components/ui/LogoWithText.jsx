// 1. Import your images as variables
import logoWIthText from "../../assets/images/logo-with-text.png";

function LogoWithText({className=''}){
    return(
        <img
            src={logoWIthText}
            alt="logo-wIth-text"
            className={`
                h-[2.5rem] md:h-[4rem] w-auto 
                ${className}
            `}
        />

    )
}
export default LogoWithText;