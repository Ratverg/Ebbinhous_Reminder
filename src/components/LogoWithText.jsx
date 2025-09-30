function LogoWithText({className=''}){
    return(
        <img
            src="/src/assets/images/logo-with-text.png"
            alt="logo"
            className={`
                h-[3.5rem] md:h-[5rem] w-auto shrink-0
                ${className}
            `}
        />

    )
}
export default LogoWithText;