import ButtonType02 from "./ButtonTypeV02";
import HeroBackground from "./HeroBackground";

function HeroBlock(){
    return(
        <div className="
            bg-[rgba(36,56,80,1)] text-[#ffffff]
            font-semibold 
            mx-0 md:mx-5 lg:mx-32
            h-[15rem] md:h-[20rem]
            flex  
            items-start justify-between gap-x-4
            relative
        ">

            {/*Hero background image with gradient filling */}
            <HeroBackground />

            {/* hero text block */}
            <div className="
                py-4 px-5 gap-4 w-[50rem]
                md:py-8 md:px-16 md:gap-8 md:w-[50rem]
                flex flex-col
                
            ">
                <p className="
                    relative text-l
                    md:text-2xl
                ">
                    Remember anything forever
                    <br />
                    with Ebbinghous method.
                </p>
                <p className="
                    relative text-xs
                    md:text-base
                ">
                    - Ebbinghous method is scientifically proofed method of interval repeating for best information retention.
                    <br />
                    - Just add anything you want to remember and you will recieve telegram notification with intervals based on Ebbinghous forgeting curve.
                </p>
                <ButtonType02 text="Get started!" />
            </div>

        </div>
    )
}
export default HeroBlock;
