// 1. Import your images as variables
import logoWithoutText from "../../assets/images/logo-without-text.png";

function LogoWithoutText({className=''}){
    return(
        <img
            src={logoWithoutText}
            alt="logo-wIthout-text"
            className={`
                h-[3rem] ${className}
                md:h-[8rem]
            `}
        />

    )
}
export default LogoWithoutText;