import { useState, useEffect } from "react";
import clsx from "clsx";
import ContentWrapper from "../../../components/layout/ContentWrapper";
// 1. Import your images as variables
import arrowRight from "../../../assets/icons/arrow-right-03.png";
import arrowLeft from "../../../assets/icons/arrow-left-03.png";
import icoImageUser01 from "../../../assets/user-images/user-000001.jpg";



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
function ReviewBlock({ nSlides = 5, currentSlide = 2, visibleSlides = 2, userReviews, className }) {

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
                {userReviews.map((review, i) =>
                    <div
                        key={i}
                        className={clsx("px-4 py-8 shrink-0 transition-transform duration-1000", className)}
                        style={{ transform: `translateX(${transX}%)`, width: `${100 / visibleSlides}%` }}
                    >
                        <ContentWrapper
                            key={i}
                            className="flex flex-col gap-0"
                        >
                            <div className="flex flex-row gap-4">
                                <div className="flex flex-col items-center shrink-0 ">
                                    <img src={review.userImage} alt={review.userImageAlt} className="w-16 h-16 rounded-full  object-cover" />
                                </div>
                                <div className="flex flex-col basis-3/4 items-Left">
                                    <p className="title-lg">{review.userName}</p>
                                    <p className="opacity-60" >{review.userDescription}</p>
                                    <p>{generateStars(review.userRating)}</p>
                                </div>
                            </div>
                            <div>
                                <p className="opacity-60 mt-4">{review.text}</p>
                            </div>
                        </ContentWrapper>
                    </div>
                )}

            </div>
        </div>
    )
}

function ContentSection05() {

    //custom hook to get visible slides
    const visibleSlides = useVisibleSlides();


    // array of user reviews objects
    const userReviewList =
        [
            {
                userName: "Ratty", userRating: 5, userDescription: "The biggest rat",
                text: "Idk, i'm just a small rat, that whatnt just to leave it's best rat's life...",
                userImage: icoImageUser01,
                userImageAlt: "user-000001.jpg"
            },
            {
                userName: "Ratty", userRating: 5, userDescription: "The rat",
                text: "Idk, i'm just a small rat, that whatnt just to leave it's best rat's life...",
                userImage: icoImageUser01,
                userImageAlt: "user-000001.jpg"
            },
            {
                userName: "Ratty", userRating: 5, userDescription: "Not rat",
                text: "Idk, i'm just a small rat, that whatnt just to leave it's best rat's life...",
                userImage: icoImageUser01,
                userImageAlt: "user-000001.jpg"
            },
            {
                userName: "Ratty", userRating: 5, userDescription: "Not rat",
                text: "Idk, i'm just a small rat, that whatnt just to leave it's best rat's life...",
                userImage: icoImageUser01,
                userImageAlt: "user-000001.jpg"
            },
            {
                userName: "Ratty", userRating: 5, userDescription: "Not rat",
                text: "Idk, i'm just a small rat, that whatnt just to leave it's best rat's life...",
                userImage: icoImageUser01,
                userImageAlt: "user-000001.jpg"
            }
        ]
    return (
        <div>

            <ReviewBlock
                nSlides={5}
                visibleSlides={visibleSlides}
                currentSlide={0}
                userReviews={userReviewList}
            />
        </div>
    )
}
export default ContentSection05;