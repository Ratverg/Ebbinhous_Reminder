import ContentWrapper from "../../../components/layout/ContentWrapper";
// 1. Import your images as variables
import icoImageUser01 from "../../../assets/user-images/user-000001.jpg";

function generateStars(numberOfStars) {
    let stars = "";
    for (let i = 0; i < numberOfStars; i++) {
        stars = stars + "★";
    }
    return stars;
}

function ReviewBlock({ userReviews }) {
    return (
        <div className="flex flex-col gap-4 md:gap-8 md:flex-row">
            {userReviews.map((review, i) =>
                <ContentWrapper
                    key={i}
                    className="flex flex-row md:flex-row flex-1 justify-start"
                >
                    <div className="flex flex-col items-end">
                        <img src={review.userImage} alt={review.userImageAlt} className="rounded-full w-32" />
                    </div>
                    <div className="flex flex-col">
                        <p className="font-semibold text-xl">{review.userName}</p>
                        <p className="font-semibold text-s opacity-60" >{review.userDescription}</p>
                        <p>{generateStars(review.userRating)}</p>
                        <p className="font-semibold text-xs opacity-60 mt-4">{review.text}</p>
                    </div>
                </ContentWrapper>
            )}

        </div>
    )
}

function ContentSection04() {

    return (
        <div>

            <ReviewBlock
                userReviews={[
                    {
                        userName: "Ratty", userRating: 5, userDescription: "The biggest rat",
                        text: "Idk, i'm just a small rat, that whatnt just to leave it's best rat's life...",
                        userImage: {icoImageUser01},
                        userImageAlt: "user-000001.jpg"
                    },
                    {
                        userName: "Ratty", userRating: 5, userDescription: "The rat",
                        text: "Idk, i'm just a small rat, that whatnt just to leave it's best rat's life...",
                        userImage: {icoImageUser01},
                        userImageAlt: "user-000001.jpg"
                    },
                    {
                        userName: "Ratty", userRating: 5, userDescription: "Not rat",
                        text: "Idk, i'm just a small rat, that whatnt just to leave it's best rat's life...",
                        userImage: {icoImageUser01},
                        userImageAlt: "user-000001.jpg"
                    },
                ]}

            />
        </div>
    )
}
export default ContentSection04;