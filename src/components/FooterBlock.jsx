
import ButtonType01 from "./ButtonType01";


function LogoLink({logoImage, logoAlt, logoHref}){
    return (
        <a href={logoHref}>
            <img
                src={logoImage} alt={logoAlt}
                className="
                    h-5
                    md:h-8
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



function FooterBlock(){
    return(
        <div className="
            bg-[#ffffff] text-[#243850] border-0 
            text-2xl font-semibold 
            mx-0 md:mx-5 lg:mx-32 mb-1 md:mb-8 px-4 md:px-8 
            rounded-b-[2rem]
            md:rounded-b[1rem]
            h-[5rem]
            md:h-[7.5rem]
            flex flex-row justify-between
        ">
            <div className="flex flex-row justify-center items-center gap-2 md:gap-8">
                <ButtonType01 text="Privacy policy"></ButtonType01>
                <ButtonType01 text="Terms of service"></ButtonType01>
                <ButtonType01 text="Contact us"></ButtonType01>
            </div>
            <div className="flex flex-row justify-center items-center gap-2 md:gap-8">
                <LogoLink
                    logoImage={"/src/assets/icons/ico-insta.png"}
                    logoAlt={"ico-insta.png"}
                    logoHref={"http://rat.ru"}
                /> 
                <LogoLink
                    logoImage={"/src/assets/icons/ico-twitter.png"}
                    logoAlt={"ico-twitter.png"}
                    logoHref={"http://rat.ru"}
                /> 
                <LogoLink
                    logoImage={"/src/assets/icons/ico-fb.png"}
                    logoAlt={"ico-fb.png"}
                    logoHref={"http://rat.ru"}
                /> 
            </div>
        </div>
    )
}
export default FooterBlock;