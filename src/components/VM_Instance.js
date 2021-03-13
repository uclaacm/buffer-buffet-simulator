import React, { useState, useEffect, useReducer} from "react";
import {interpretCommand, updateRegisterDict} from "../helperFunctions/VM_Helper"

const VM_Instance = () => {

    //specify the initial memory array buffer (size in bytes)
    const STACK_SIZE = 256

    // initialize register/flag states
    const [registerDict, updateDict] = useState({})

    // interprets command, then updates ArrayBuffer
    const reducer = (memory, action) => {
        let newMemory = memory.slice()
        let memoryDV = new DataView(newMemory)
        interpretCommand(action, memoryDV)
        return newMemory
    }
    const [memory, changeMemory] = useReducer(reducer, new ArrayBuffer(STACK_SIZE))

    // updates register/flag dictionary state for rendering
    useEffect(() => {
        let tempMemoryDV = new DataView(memory)
        let tempDict = updateRegisterDict(tempMemoryDV)
        updateDict(tempDict)
        
    }, [memory])

    const inputCommand = (e) => {
        e.preventDefault()
        changeMemory(e.target[0].value)
    }


    return(
        <div className="page-view">
            <div>
                <form id="insertCode" onSubmit={(e) => inputCommand(e)}>
                    <input type="text" placeholder="Enter Assembly Code" id="codeInput"/>
                    <button type="submit">Submit</button>
                </form>
            </div>

            <h3>Basic format for commands: cmd arg1, arg2</h3>
            <h3>For example: mov %eax, %esp </h3>
            <h3> Available commands</h3>
            <ul>
                <li>mov SRC, DEST</li>
                <li>lea SRC, DEST</li>
                <li>cmp S1, S2</li>
                <li>add SRC, DEST</li>
                <li>sub SRC, DEST</li>
            </ul>
            <h3>Note: The registers are 32 bits and BIG endian.
            </h3>
            <h3>Register Values:</h3>
            <h4>Pointer registers</h4>
            <ul>
                <li>ebp (base pointer): {registerDict['%ebp']}</li>
                <li>esp (stack pointer): {registerDict['%esp']}</li>
                <li>eip (instruction pointer): {registerDict['%eip']}</li>
            </ul>
            <h4> Return Register </h4>
            <ul>
                <li>eax (result register): {registerDict['%eax']}</li>
            </ul> 
            <h4>Argument Registers (in order)</h4>
            <ul>
                <li>edi: {registerDict['%edi']}</li>
                <li>esi: {registerDict['%esi']}</li>
                <li>edx: {registerDict['%edx']}</li>
                <li>ecx: {registerDict['%ecx']}</li>
                <li>r8D: {registerDict['%r8D']}</li>
                <li>r9D: {registerDict['%r9D']}</li>
            </ul>
            <h4> General Purposes</h4>
            <ul>
                <li>r10D: {registerDict['%r10D']}</li>
                <li>r11D: {registerDict['%r11D']}</li>
                <li>r12D: {registerDict['%r12D']}</li>
                <li>r13D: {registerDict['%r13D']}</li>
            </ul>
            <h4> Flags</h4>
            <ul>
                <li>CF: {registerDict['CF']}</li>
                <li>PF: {registerDict['PF']}</li>
                <li>ZF: {registerDict['ZF']}</li>
                <li>SF: {registerDict['SF']}</li>
                <li>OF: {registerDict['OF']}</li>
                <li>AF: {registerDict['AF']}</li>
            </ul>
        </div>
    )
}

export default VM_Instance;