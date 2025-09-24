function LogoWithoutText({className=''}){
    return(
        <img
            src="/src/assets/images/logo-without-text.png"
            alt="logo"
            className={`
                h-[4rem] w-auto shrink-0 ${className}
                md:h-[8rem]
            `}
        />

    )
}
export default LogoWithoutText;