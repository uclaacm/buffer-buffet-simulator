import React from "react";
import {parseCode} from "../helperFunctions/VM_Helper"

const VM_Instance = () => {

    //specify the initial memory array buffer (size in bytes)
    const currMemory = new ArrayBuffer(256)
    const memoryDV = new DataView(currMemory)

    //14 Registers
    const registerList = [
        'ebp', 'esp', 'eip',
        'eax',
        'edi', 'esi', 'edx', 'ecx', 'r8D', 'r9D',
        'r10D', 'r11D', 'r12D', 'r13D'
    ]

    const registerMap = registerList.reduce((map, name, i) => {
        map[name] = i * 4
        return map
    }, {})

    //for internal use only
    const getRegisterID = (name) => {
        if(!(name in registerMap)){
            throw new Error(`getRegisterID: No such register ${name}`)
        }

        return registerMap[name]
    }
    
    //get the value inside a register
    const getRegister = (name) =>
    {   
        return memoryDV.getUint32(getRegisterID(name))
    }
    
    const setRegister = (name, value) => {
        //type check the value input
        if(typeof value === 'number'){
            if (Math.round(value) === value ){
                if(value <0){
                    memoryDV.setInt32(getRegisterID(name), value)
                }
                memoryDV.setUint32(getRegisterID(name), value)
            }
            else{
                memoryDV.setFloat32(getRegisterID(name), value)
            }
        }
        else{
            throw new Error(`setRegister: Only input int and floats`)
        }
    }

    console.log(registerMap)
    setRegister('eax', 905)
    console.log(getRegister('eax'))
    setRegister('eax', 10.111)
    console.log(getRegister('eax'))




    return(
        <div className="page-view">
            <div>
                <form id="insertCode" onSubmit={parseCode}>
                    <input type="text" placeholder="Enter Assembly Code" id="codeInput"/>
                    <button type="submit">Submit</button>
                </form>
            </div>
            <h3>Note: The registers are 32 bits and little endian.</h3>
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