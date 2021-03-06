import React from "react"

const Debug = (message) => {
    //ALL instruction starts with 1000 and increment upward.
    console.log(message)
    const code1 = [
        "mov $1, %eax",
        "mov $2, %edi",
        "add %edi, %eax"
    ]

    const instr_list = 
        code1.map((instruction, i) => <li key={i} >{1000 + i * 100}: {instruction}</li>)
    return(
        <div className='debugger'>
            {instr_list}
        </div>
        )

}

export default Debug