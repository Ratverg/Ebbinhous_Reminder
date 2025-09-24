import LogoWithText from "./LogoWithText";
import LogoWithoutText from "./LogoWithoutText";
import ButtonType01 from "./ButtonType01"
import BurgerMenu from "./BurgerMenu";
import UserLogo from "./UserLogo";

function HeaderBlock(){
    return(
        <div className="
            bg-[#ffffff] text-[#243850] border-0 
            text-2xl font-semibold 
            md:mx-0 lg:mx-32 mt-1 md:mt-8 px-4 md:px-8 
            rounded-t-[2rem] 
            h-[5rem]
            md:h-[7.5rem]
            flex  
            items-center justify-between gap-x-4
        ">
            <LogoWithText />
            {/* Navigation container with User logo */}
            <div className="flex flex-row items-center gap-[1rem] relative">
                <div className="hidden md:flex flex-row gap-6 items-center">
                    <ButtonType01 text="Home" active={true}/>
                    <ButtonType01 text="About method" active={false} />
                    <ButtonType01 text="Sing Up" active={false} />
                </div>  
                <UserLogo />
                <BurgerMenu />
            </div>

        </div>
    )
}
export default HeaderBlock;