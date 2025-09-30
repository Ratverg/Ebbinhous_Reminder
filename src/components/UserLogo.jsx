function UserLogo({path = "/src/assets/user-images/user-000001.jpg"}){
    return (
        <img
            src={path}
            alt="user-image"
            className="
                rounded-full h-[3.5rem] md:h-[5rem] shrink-0
            "
        />
    )
}

export default UserLogo;