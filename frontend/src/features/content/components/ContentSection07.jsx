import { useState, useEffect } from "react";
import clsx from "clsx";
import ContentWrapper from "../../../components/layout/ContentWrapper";
// 1. Import your images as variables
import arrowRight from "../../../assets/icons/arrow-right-03.png";
import arrowLeft from "../../../assets/icons/arrow-left-03.png";
import userScreenshot00 from "../../../assets/images/userpage-screenshot_00_v1.jpg";
import userScreenshot01 from "../../../assets/images/userpage-screenshot_01_v1.jpg";
import userScreenshot02 from "../../../assets/images/userpage-screenshot_02_v1.jpg";
import userScreenshot03 from "../../../assets/images/userpage-screenshot_03_v1.jpg";
import userScreenshot04 from "../../../assets/images/userpage-screenshot_04_v1.jpg";



// custom hook to set visibleSlides, according to screen resolution
function useVisibleSlides() {
    //3 is default
    const [visibleSlides, setVisibleSlides] = useState(3);

    useEffect(() => {
        const handleResize = () => {
            const windowWidth = window.innerWidth
            if (windowWidth > 640) {
                setVisibleSlides(3)
            } else {
                setVisibleSlides(1)
            }
        }
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);
    return visibleSlides;
}

//Function to generate string with stars
function generateStars(numberOfStars) {
    let stars = "";
    for (let i = 0; i < numberOfStars; i++) {
        stars = stars + "★";
    }
    return stars;
}

//main function of review block
function ReviewBlock({ nSlides = 5, currentSlide = 2, visibleSlides = 2, slidesList, className }) {

    //setting translateX of slides and create useState hook
    const [transX, setTransX] = useState(-currentSlide * 100);

    //callback to increment translateX parameter
    const increment = () => {
        if (transX < 0) {
            setTransX(transX + 100);
        } else {
            setTransX(-(nSlides - visibleSlides) * 100);
        }
    }

    //callback to decrement translateX parameter
    const decrement = () => {
        if (transX > -(nSlides - visibleSlides) * 100) {
            setTransX(transX - 100);
        } else {
            setTransX(0);
        }
    }

    return (
        //main container of slider and buttons
        <div className="flex flex-col relative">

            {/* button move slides right */}
            <button
                onClick={increment} className="absolute -right-[1%] top-[50%] z-10 -translate-y-1/2"
            >
                <img
                    src={arrowRight} alt="arrow-right"
                    className="w-4 opacity-40 hover:opacity-100 hover:scale-110 active:scale-100 transition-all duration-200"
                />
            </button>


            {/* button move slides left */}
            <button
                onClick={decrement} className="absolute -left-[1%] top-[50%] z-10 -translate-y-1/2"
            >
                <img
                    src={arrowLeft} alt="arrow-right"
                    className="w-4 opacity-40 hover:opacity-100 hover:scale-110 active:scale-100 transition-all duration-200"
                />
            </button>

            {/* container for all slides ("-my-4" is for inverse margins, to make block "smaller", "mask" is to hide shadows) */}
            <div
                className="
                    flex flex-row overflow-hidden flex-nowrap -my-4
                    [mask-image:linear-gradient(to_right,transparent,black_2%,black_98%,transparent)] [mask-repeat:no-repeat] [mask-size:100%_100%]
                "
            >
                {/* generating review slides */}
                {/* "style=" used, because TW not calculations on the fly */}
                {slidesList.map((slide, i) =>
                    <div
                        key={i}
                        className={clsx("px-4 py-8 shrink-0 transition-transform duration-1000", className)}
                        style={{ transform: `translateX(${transX}%)`, width: `${100 / visibleSlides}%` }}
                    >
                        <ContentWrapper
                            key={i}
                            className="flex flex-col gap-0"
                        >
                            <div>
                                <p className="text-textSecondary mt-4 text-center mb-4">{slide.slideText}</p>
                            </div>
                            <div className="flex flex-row gap-4">
                                <div className="flex flex-col items-center ">
                                    <img 
                                        src={slide.slideImage}
                                        alt={slide.slideImageAlt}
                                        className={clsx(
                                            "shadow-[0_0_10px_10px_rgba(0,0,0,0.08)]",
                                            "lg:shadow-[0_0_5px_5px_rgba(0,0,0,0.08)]",
                                            "rounded-md"
                                        )}
                                    />
                                </div>
                            </div>
                        </ContentWrapper>
                    </div>
                )}

            </div>
        </div>
    )
}

function ContentSection07() {

    //custom hook to get visible slides
    const visibleSlides = useVisibleSlides();
    const slidesList = 
    [
        {
            slideText: "Main screen",
            slideImage: userScreenshot00,
            slideImageAlt: "userScreenshot00"
        },
        {
            slideText: "Editing notification",
            slideImage: userScreenshot01,
            slideImageAlt: "userScreenshot01"
        },
        {
            slideText: "Telegram connection",
            slideImage: userScreenshot02,
            slideImageAlt: "userScreenshot02"
        },
        {
            slideText: "Calendar hints",
            slideImage: userScreenshot03,
            slideImageAlt: "userScreenshot03"
        },
        {
            slideText: "Hashtags and filters    ",
            slideImage: userScreenshot04,
            slideImageAlt: "userScreenshot04"
        },
    ]


    return (
        <div>

            <ReviewBlock
                nSlides={5}
                visibleSlides={visibleSlides}
                currentSlide={0}
                slidesList={slidesList}
            />
        </div>
    )
}
export default ContentSection07;