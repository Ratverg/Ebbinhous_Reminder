import { useState, useEffect } from "react";
import ContentWrapper from "./ContentWrapper";
import clsx from "clsx";


// custom hook to set visibleSlides, according to screen resolution
function useVisibleSlides(){
    //3 is default
    const [visibleSlides, setVisibleSlides] = useState(3);
    
    useEffect(()=>{
        const handleResize = () => {
            const windowWidth = window.innerWidth
            if(windowWidth > 640 ){
                setVisibleSlides(3)
            } else {
                setVisibleSlides(1)
            }
        }
        handleResize();
        window.addEventListener("resize", handleResize);
        return ()=> window.removeEventListener("resize", handleResize);
    },[]);
    return visibleSlides;
}

//Function to generate string with stars
function generateStars(numberOfStars){
    let stars = "";
    for (let i=0; i<numberOfStars; i++){
            stars = stars + "★";
        }
    return stars;
}

//main function of review block
function ReviewBlock( {nSlides = 5, currentSlide = 2, visibleSlides = 2, userReviews, className}){

    //setting translateX of slides and create useState hook
    const [transX, setTransX] = useState(-currentSlide*100);

    //callback to increment translateX parameter
    const increment = ()=>{
        if (transX < 0) {
            setTransX(transX+100);
        } else {
            setTransX(-(nSlides-visibleSlides)*100);
        }
    }

    //callback to decrement translateX parameter
    const decrement = ()=>{
        if (transX > -(nSlides-visibleSlides)*100) {
            setTransX(transX-100);
        } else {
            setTransX(0);
        }
    }

    return(
        //main container of slider and buttons
        <div className="flex flex-col relative">
            
            {/* button move slides right */}
            <button
                onClick={increment} className="absolute -right-[1%] top-[50%] z-10 -translate-y-1/2"
                >
                <img
                    src="/src/assets/icons/arrow-right-03.png" alt="arrow-right-03.png"
                    className="w-4 opacity-40 hover:opacity-100 hover:scale-110 active:scale-100 transition-all duration-200"
                    />
            </button>


            {/* button move slides left */}
            <button
                onClick={decrement} className="absolute -left-[1%] top-[50%] z-10 -translate-y-1/2"
            >
                <img
                    src="/src/assets/icons/arrow-left-03.png" alt="arrow-right-03.png"
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
                {userReviews.map((review, i)=>
                <div
                    key={i}
                    className={clsx("px-4 py-8 shrink-0 transition-transform duration-1000", className)}
                    style={{transform: `translateX(${transX}%)`, width: `${100/visibleSlides}%` }}
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
                                <p className="font-semibold text-lg">{review.userName}</p>
                                <p className="font-semibold text-s opacity-60" >{review.userDescription}</p>
                                <p>{generateStars(review.userRating)}</p>
                            </div>
                        </div>
                        <div>
                             <p className="font-semibold text-s opacity-60 mt-4">{review.text}</p>
                        </div>
                    </ContentWrapper>
                </div>
                )}

            </div>
        </div>
    )
}

function ContentSection05(){

    //custom hook to get visible slides
    const visibleSlides = useVisibleSlides();
    

    // array of user reviews objects
    const userReviewList = 
    [
        {
            userName: "Ratty", userRating: 5, userDescription: "The biggest rat",
            text: "Idk, i'm just a small rat, that whatnt just to leave it's best rat's life...",
            userImage: "/src/assets/user-images/user-000001.jpg",
            userImageAlt: "user-000001.jpg"
        },
        {
            userName: "Ratty", userRating: 5, userDescription: "The rat",
            text: "Idk, i'm just a small rat, that whatnt just to leave it's best rat's life...",
            userImage: "/src/assets/user-images/user-000001.jpg",
            userImageAlt: "user-000001.jpg"
        },
        {
            userName: "Ratty", userRating: 5, userDescription: "Not rat",
            text: "Idk, i'm just a small rat, that whatnt just to leave it's best rat's life...",
            userImage: "/src/assets/user-images/user-000001.jpg",
            userImageAlt: "user-000001.jpg"
        },
        {
            userName: "Ratty", userRating: 5, userDescription: "Not rat",
            text: "Idk, i'm just a small rat, that whatnt just to leave it's best rat's life...",
            userImage: "/src/assets/user-images/user-000001.jpg",
            userImageAlt: "user-000001.jpg"
        },
        {
            userName: "Ratty", userRating: 5, userDescription: "Not rat",
            text: "Idk, i'm just a small rat, that whatnt just to leave it's best rat's life...",
            userImage: "/src/assets/user-images/user-000001.jpg",
            userImageAlt: "user-000001.jpg"
        }
    ]
    return(
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





// import { useState } from "react";
// import ContentWrapper from "./ContentWrapper";
// import clsx from "clsx";

// // генерация звёздочек
// function generateStars(numberOfStars) {
//   return "★".repeat(numberOfStars);
// }

// function ReviewBlock({ userReviews, visibleSlides = 3, className }) {
//   const nSlides = userReviews.length;
//   const step = 100 ; // шаг в %
//   const [transX, setTransX] = useState(0);

//   const increment = () => {
//     if (transX > -(nSlides - visibleSlides) * step) {
//       setTransX(transX - step);
//     } else {
//       setTransX(0); // возвращаем в начало
//     }
//   };

//   const decrement = () => {
//     if (transX < 0) {
//       setTransX(transX + step);
//     } else {
//       setTransX(-(nSlides - visibleSlides) * step); // в конец
//     }
//   };

//   return (
//     <div className="flex flex-col relative">
//       {/* кнопка вправо */}
//       <button
//         onClick={increment}
//         className="absolute -right-3 top-1/2 z-10 -translate-y-1/2"
//       >
//         <img
//           src="/src/assets/icons/arrow-right-03.png"
//           alt="arrow-right"
//           className="w-5 opacity-40 hover:opacity-100 hover:scale-110 active:scale-95 transition-all duration-200"
//         />
//       </button>

//       {/* кнопка влево */}
//       <button
//         onClick={decrement}
//         className="absolute -left-3 top-1/2 z-10 -translate-y-1/2"
//       >
//         <img
//           src="/src/assets/icons/arrow-left-03.png"
//           alt="arrow-left"
//           className="w-5 opacity-40 hover:opacity-100 hover:scale-110 active:scale-95 transition-all duration-200"
//         />
//       </button>

//       {/* контейнер слайдов */}
//       <div
//         className="
//           flex flex-row overflow-hidden flex-nowrap -my-4
//           [mask-image:linear-gradient(to_right,transparent,black_2%,black_98%,transparent)]
//           [mask-repeat:no-repeat] [mask-size:100%_100%]
//         "
//       >
//         {userReviews.map((review, i) => (
//           <div
//             key={i}
//             className={clsx(
//               "px-4 py-8 shrink-0 transition-transform duration-700 ease-in-out",
//               className
//             )}
//             style={{
//               transform: `translateX(${transX}%)`,
//               flex: `0 0 ${100 / visibleSlides}%`,
//             }}
//           >
//             <ContentWrapper className="flex flex-col gap-2 h-full">
//               <div className="flex flex-row gap-4 items-center">
//                 <img
//                   src={review.userImage}
//                   alt={review.userImageAlt}
//                   className="w-16 h-16 rounded-full object-cover shrink-0"
//                 />
//                 <div className="flex flex-col flex-1">
//                   <p className="font-semibold text-lg">{review.userName}</p>
//                   <p className="text-sm opacity-60">{review.userDescription}</p>
//                   <p>{generateStars(review.userRating)}</p>
//                 </div>
//               </div>
//               <p className="text-sm opacity-70 mt-4">{review.text}</p>
//             </ContentWrapper>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// // секция с отзывами
// function ContentSection05() {
//   const userReviewList = [
//     {
//       userName: "Ratty",
//       userRating: 5,
//       userDescription: "The biggest rat",
//       text: "Idk, i'm just a small rat, that whatnt just to leave it's best rat's life...",
//       userImage: "/src/assets/user-images/user-000001.jpg",
//       userImageAlt: "user-000001.jpg",
//     },
//     {
//       userName: "Ratty",
//       userRating: 5,
//       userDescription: "The rat",
//       text: "Idk, i'm just a small rat, that whatnt just to leave it's best rat's life...",
//       userImage: "/src/assets/user-images/user-000001.jpg",
//       userImageAlt: "user-000001.jpg",
//     },
//     {
//       userName: "Ratty",
//       userRating: 5,
//       userDescription: "Not rat",
//       text: "Idk, i'm just a small rat, that whatnt just to leave it's best rat's life...",
//       userImage: "/src/assets/user-images/user-000001.jpg",
//       userImageAlt: "user-000001.jpg",
//     },
//     {
//       userName: "Ratty",
//       userRating: 5,
//       userDescription: "Not rat",
//       text: "Idk, i'm just a small rat, that whatnt just to leave it's best rat's life...",
//       userImage: "/src/assets/user-images/user-000001.jpg",
//       userImageAlt: "user-000001.jpg",
//     },
//     {
//       userName: "Ratty",
//       userRating: 5,
//       userDescription: "Not rat",
//       text: "Idk, i'm just a small rat, that whatnt just to leave it's best rat's life...",
//       userImage: "/src/assets/user-images/user-000001.jpg",
//       userImageAlt: "user-000001.jpg",
//     },
//   ];

//   return (
//     <div>
//       {/* можно менять visibleSlides */}
//       <ReviewBlock userReviews={userReviewList} visibleSlides={3} />
//     </div>
//   );
// }

// export default ContentSection05;
