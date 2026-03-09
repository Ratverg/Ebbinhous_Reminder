// 1. Import your images as variables
// import heroBack from "../../assets/images/hero-back-v001.jpg";
// import heroBack from "../../assets/images/hero-back-v004.jpg";
// import heroBack from "../../assets/images/hero-back-v006.jpg";
// import heroBack from "../../assets/images/hero-back-v007.jpg";
// import heroBack from "../../assets/images/hero-back-v008.jpg";
import heroBack from "../../assets/images/hero-back-v015.jpg";
// import heroBack from "../../assets/images/hero-back-v003.jpg";
// import heroBack from "../../assets/images/hero-back-v002.png";


// Hero background image with gradient filling

function HeroBackground(){
    return (
        <img
            src={heroBack}
            alt="hero-back"
            className="absolute  w-full h-[40rem] object-cover"
            style={{
                    // Webkit for  Safari
                    WebkitMaskImage: 'linear-gradient(to bottom, black 0%, black 60%, transparent 100%)',
                    //normal
                    maskImage: 'linear-gradient(to bottom, black 0%, black 60%, transparent 100%)'
            }}
        />
    )
}
export default HeroBackground;








// function HeroBackground(){
//     return (
//         <>
//             {/* background image */}
//             <img
//                 src="/src/assets/images/hero-back-v001.jpg"
//                 alt="hero-back"
//                 className="
//                     absolute w-100% h-full right-0
//                 "
//             /> 

//             {/* gradient for the background from the center of the  */}
//             <div
//                 className="absolute inset-0"
//                 style={{
//                     background: "linear-gradient(to right, rgba(36,56,80,1) 50%, transparent 100%)"
//             }}>
//             </div>
//         </>
//     )
// }
// export default HeroBackground;