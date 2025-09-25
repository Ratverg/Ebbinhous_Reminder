
// Hero background image with gradient filling

function HeroBackground(){
    return (
        <>
            {/* background image */}
            <img
                src="/src/assets/images/hero-back-v001.jpg"
                alt="hero-back"
                className="
                    absolute w-100% h-full right-0
                "
            /> 

            {/* gradient for the background from the center of the  */}
            <div
                className="absolute inset-0"
                style={{
                    background: "linear-gradient(to right, rgba(36,56,80,1) 50%, transparent 100%)"
            }}>
            </div>
        </>
    )
}
export default HeroBackground;