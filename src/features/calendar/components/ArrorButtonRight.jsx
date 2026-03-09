// 1. Import your images as variables
import arrowRight from "../../../assets/icons/arrow-right-03.png";


//Button to change MONTH
export function ArrowButtonRight({ onClick }) {
    return (
        <button
            onClick={onClick} className="absolute right-[5%] top-[15%] z-0 -translate-y-1/2"
        >
            <img
                src={arrowRight} alt="arrow-right-03.png"
                className="w-3 opacity-40 hover:opacity-100 hover:scale-110 active:scale-100 transition-all duration-200"
            />
        </button>
    )
}