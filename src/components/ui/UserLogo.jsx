
// 1. Import your images as variables
import userImage from "../../assets/user-images/user-000001.jpg";

function UserLogo({path = userImage}){
    return (
        <img
            src={path}
            alt="user-image"
            className="
                rounded-full h-[2.5rem] md:h-[4rem] shrink-0
            "
        />
    )
}
export default UserLogo;