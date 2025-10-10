import { useState } from "react"

// function CustomDatewrapper({value, onChange}){
//     return(
//         <input
//             type="date"
//             value={value}
//             onChange={onChange}
//         />
//     )
// }


// function InputBlock(){
// const [dates, setDates] = useState([new Date()]);
//   return(
//     <div>
//         <input
//             type="date"
//             value={dates[0].toISOString().slice(0, 10)}
//             onChange={(e)=>setDates (e.target.value)}
//         />

//     </div>
//   )  
// }

function TextWrapper({value, onChange}){
    return (
            <input
                value={value}
                type="text"
                onChange={onChange}
            />
    )
}

function InputBlock(){
    const[textInput, setText] = useState("")
    return(
        <div>
            <TextWrapper
                value={textInput}
                onChange={(e)=>setText(e.target.value)}
            />
            <TextWrapper
                value={textInput}
                onChange={(e)=>setText(e.target.value)}
            />
        </div>
    )
}

export default InputBlock;