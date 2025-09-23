import LogoWithText from "./LogoWithText";
import LogoWithoutText from "./LogoWithoutText";
import ButtonType01 from "./ButtonType01"

function HeaderBlock(){
    return(
        <div className="
            bg-[#ffffff] text-[#243850] border-0 
            text-2xl font-semibold 
            md:mx-0 lg:mx-32 mt-8 px-8 
            rounded-t-[2rem] 
            h-[7.5rem]
            flex flex-row  
            items-center justify-between gap-x-4 
        ">
            <div className="flex items-center shrink-0">
                <LogoWithText className="hidden md:block" />
                <LogoWithoutText className="block md:hidden" />
            </div>
            <div className="hidden md:flex flex-row gap-6">
                <ButtonType01 text="Home" active={true}/>
                <ButtonType01 text="About method" active={false} />
                <ButtonType01 text="Sing Up" active={false} />
            </div>
            <div className="md:hidden">
                <button className="text-2xl">☰</button>
            </div>
        </div>
    )
}
export default HeaderBlock;