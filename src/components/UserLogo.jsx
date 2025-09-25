function UserLogo({path = "/src/assets/user-logos/user-000001.jpg"}){
    return (
        <img
            src={path}
            alt="user-image"
            className="
                rounded-full h-[4rem] md:h-[6rem] shrink-0
            "
        />
    )
}

export default UserLogo;