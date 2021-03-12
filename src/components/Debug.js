import React from "react"
import {getRegister, setRegister, interpretCommand, flagMap, getFlag, setFlag} from "../helperFunctions/VM_Helper"
const Debug = (memoryDV, stackValues) => {
    
    const code1 = [
        "mov $1, %eax",
        "mov $2, %edi",
        "add %edi, %eax"
    ]

    const instr_list = 
        code1.map((instruction, i) => <li key={i} >{1000 + i * 100}: {instruction}</li>)
    
        //ALL instruction starts with 1000 and increment upward.    
    const init_debugger = () => {
        setRegister('%eip', 1000)
    }

    const next_step = () => {
        
    }
    return(
        <div className='debugger'>
            {instr_list}
        </div>
        )

}

export default Debug