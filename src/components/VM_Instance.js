import React, { useState, useEffect } from "react";
import {getRegister, setRegister, interpretCommand, flagMap, getFlag, setFlag} from "../helperFunctions/VM_Helper"
import Debug from './Debug'
const VM_Instance = () => {

    //specify the initial memory array buffer (size in bytes)
    const STACK_SIZE = 256
    const currMemory = new ArrayBuffer(STACK_SIZE)
    const memoryDV = new DataView(currMemory)

    const [stack, setStack] = useState([])

    const [currInstr, setInstr] = useState("")
    // const [stack, setStack] = useState([])

    const [eip, setEip] = useState(0)

    const handleInput = (event) => {
        setInstr(event.target.value)
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        console.log("Current Instruction: ", currInstr)
        interpretCommand(currInstr, memoryDV, stack)
    }

    const refresh = () => {
        setStack(stack)
    }
    setRegister('%edi', 40, memoryDV)
    memoryDV.setUint32(40, 134)
    return(
        <div className="page-view">
            
            <div>
                <form id="insertCode" onSubmit={handleSubmit}>
                    <input type="text" value={currInstr} placeholder="Enter Assembly Code" onChange={handleInput} id="codeInput"/>
                    <button type="submit">Submit</button>
                </form>
            </div>

            {/* <Debug memoryDV={memoryDV} stackValues={stackValues} /> */}
            <p>{stack}</p>
            <button onClick={refresh}>REFRESH</button>
            <h3>Basic format for commands: cmd arg1, arg2</h3>
            <h3>For example: mov %eax, %esp </h3>
            <h3> Available commands</h3>
            <ul>
                <li>mov src, </li>
            </ul>
            <h3>Note: The registers are 32 bits and BIG endian.
            </h3>
            <h3>Register Values:</h3>
            <h4>Pointer registers</h4>
            <ul>
                <li>ebp (base pointer):</li>
                <li>esp (stack pointer):</li>
                <li>eip (instruction pointer):</li>
            </ul>
            <h4> Return Register </h4>
            <ul>
                <li>eax (result register):</li>
            </ul> 
            <h4>Argument Registers (in order)</h4>
            <ul>
                <li>edi: </li>
                <li>esi: </li>
                <li>edx: </li>
                <li>ecx: </li>
                <li>r8D: </li>
                <li>r9D: </li>
            </ul>
            <h4> General Purposes</h4>
            <ul>
                <li>r10D: </li>
                <li>r11D: </li>
                <li>r12D: </li>
                <li>r13D: </li>
            </ul>
        </div>
    )
}

export default VM_Instance;