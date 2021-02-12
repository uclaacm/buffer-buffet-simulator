import React from "react";


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

    const getRegisterID = (name) => {
        if(!(name in registerMap)){
            throw new Error(`getRegisterID: No such register ${name}`)
        }

        return registerMap[name]
    }

    console.log(registerMap)
    memoryDV.setUint32(getRegisterID('eax'), 255, true)
    console.log(getRegisterID('eax'))


    

    //get the 32 bit content inside a register
    // const getRegister = (name) =>
    // {
    //     if(!(name in registerMap)){
    //         throw new Error(`getRegister: No such register ${name}`)
    //     }
    //     return memoryDV.getUint32(registerMap[name])
    // }
    
    // const setRegister = (name, value) => {
    //     if(!(name in registerMap)){
    //         throw new Error(`setRegister: No such register ${name}`)
    //     }

    // }

    const getRax = () => {
        console.log(memoryDV.getUint32(getRegisterID('eax'),true))
        console.log(memoryDV.getUint32(11, true))
    }

    return(
        <div className="page-view">
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
            <button onClick={getRax}> GET RAX</button>
        </div>
    )
}

export default VM_Instance;