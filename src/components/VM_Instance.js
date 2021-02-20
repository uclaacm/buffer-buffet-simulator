import React from "react";
import {parseCode, check2Param} from "../helperFunctions/VM_Helper"

const VM_Instance = () => {

    //specify the initial memory array buffer (size in bytes)
    const currMemory = new ArrayBuffer(256)
    const memoryDV = new DataView(currMemory)

    //14 Registers
    const registerList = [
        '%ebp', '%esp', '%eip',
        '%eax',
        '%edi', '%esi', '%edx', '%ecx', '%r8D', '%r9D',
        '%r10D', '%r11D', '%r12D', '%r13D'
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
        //check that it is a valid register
        if(!(name in registerMap)){
            throw new Error(`setRegister: No such register ${name}`)
        }
        
        //type check the value input
        if(typeof value === 'number'){
            if (Math.round(value) === value ){
                console.log("Commencing operation for integers")
            }
            else{
                console.log("commencing operation for float values")
            }
        }

        else if(typeof value === "string"){
            console.log("commencing operation for string")
        }
        else{
            console.log(`Unrecognized type: ${typeof value}`)
        }
    }

    const paramToDeci = (param) => {
        for (let i = 0; i < param.length; i++) {
            // is register
            if (registerList.includes(param[i]))
                param[i] = getRegister(param[i])
            // is hex #
            else if (/^\$0x/.test(param[i])) {
                const hexNum = param[i].match(/(?<=\$).*/)[0]
                param[i] = parseInt(hexNum, 16);
            }
            // is decimal #
            else if (/^\$/.test(param[i])) {
                const deciNum = param[i].match(/(?<=\$).*/)[0]
                param[i] = parseInt(deciNum)
            }
            // else if (param[i] === 0)
            //     ;
            else
                return "unknown param";
        }
        return param
    }

    // takes in parsed param array 
    // does math from given param array
    const interpretParam = (param) => {
        let resString = ""
        let resSum
        switch (param.length) {
            // no parentheses
            case 1 :
                return param[0]

            // parentheses case
            case 4 :
                resString += "*" + param[3]
                resString = " + " + param[2] + resString
                resString = param[1] + resString
                if (param[0] !== "0")
                    resString = param[0] + " + " + resString

                resSum = param[0] + param[1] + (param[2]*param[3])
                break;
            case 3:     
                resString = " + " + param[2] + resString
                resString = param[1] + resString
                if (param[0] !== "0")
                    resString = param[0] + " + " + resString

                resSum = param[0] + param[1] + param[2]
                break;
            case 2:
                resString = param[1] + resString
                if (param[0] !== "0")
                    resString = param[0] + " + " + resString
                
                resSum = param[0] + param[1]
                break;
            default : 
                return "error"
        }
        resString = "contents of (" + resString + ")"
        console.log(resString)
        
        return resSum
    } 

    const interpretCommand = (event) => {
        event.preventDefault()
        let argList = parseCode()

        // argList[0] = command e.g "mov"
        // argList[1] = 1st Parameter, with separate arguments in order from left to right
        // argList[2] = 2nd Parameter, same as above
        switch(argList[0]) {
            // mov Source, Dest
            case "mov" :
                if (!check2Param(argList)) {
                    console.log("Needs two parameters")
                    return
                }

                // move into register
                if (argList[2].length === 1 && registerList.includes(argList[2][0]))
                    memoryDV.setUint32(getRegisterID(argList[2][0]),interpretParam(paramToDeci(argList[1])))
                    // setRegister(argList[2][0], interpretParam(paramToDeci(argList[1])))

                //TODO move into address

                // console.log("move " + interpretParam(paramToDeci(argList[1])) + " into " + interpretParam(argList[2]))
                break;
                
            // leaq Source, Dest
            case "leaq":
                if (!check2Param(argList)) {
                    console.log("Needs two parameters")
                    return
                }
                console.log("load " + interpretParam(argList[1]) + " into " + interpretParam(argList[2]))
                break
            
            // compares S1 - S2
            // sets compare flag for jumps
            // cmp S2, S1
            case "cmp" :
                if (!check2Param(argList)) {
                    console.log("Needs two parameters")
                    return
                }
                console.log("compare " + interpretParam(argList[1]) + " with " + interpretParam(argList[2]))
                // console.log("=> compare " + interpretParam(paramToDeci(argList[1])) + " with " + interpretParam(paramToDeci(argList[2])))
                break
    
            // add source to dest
            // add Source, Dest
            case "add" :
                if (!check2Param(argList)) {
                    console.log("Needs two parameters")
                    return
                }
                // Dest is register
                if (argList[2].length === 1 && registerList.includes(argList[2][0])) {
                    let sum = parseInt(getRegister(argList[2][0]), 10) + parseInt(interpretParam(paramToDeci(argList[1])), 10)
                    memoryDV.setUint32(getRegisterID(argList[2][0]), sum)
                }
                console.log("add " + interpretParam(argList[1]) + " to " + interpretParam(argList[2]))
                // console.log("=> add " + interpretParam(paramToDeci(argList[1])) + " to " + interpretParam(paramToDeci(argList[2])))
                break
    
            // subtrac source from dest
            // sub Source, Dest
            case "sub" :
                if (!check2Param(argList)) {
                    console.log("Needs two parameters")
                    return
                }
                // Dest is register
                if (argList[2].length === 1 && registerList.includes(argList[2][0])) {
                    let diff = parseInt(getRegister(argList[2][0]), 10) - parseInt(interpretParam(paramToDeci(argList[1])), 10)
                    memoryDV.setUint32(getRegisterID(argList[2][0]), diff)
                }
                console.log("subtract " + interpretParam(argList[1]) + " from " + interpretParam(argList[2]))
                // console.log("=> subtract " + interpretParam(paramToDeci(argList[1])) + " from " + interpretParam(paramToDeci(argList[2])))
                break;
            
            // jump to dest
            // jmp Dest
            // TODO - implement conditional jmp commands (jle)
            case "jmp" :
                if (check2Param(argList)) {
                    console.log("Needs only one parameters")
                    return
                }
                console.log("jump to " + interpretParam(argList[1]))
                // console.log("=> jump to " + interpretParam(paramToDeci(argList[1])))
                break
    
            // pop top of stack into destination
            // pop Dest
            case "pop" :
                if (check2Param(argList)) {
                    console.log("Needs only one parameters")
                    return
                }
                console.log("pop top of stack to " + interpretParam(argList[1]))
                console.log("=> pop top of stack to " + interpretParam(paramToDeci(argList[1])))
                break;
    
            // push source onto top of stack
            // push Source
            case "push" :
                if (check2Param(argList)) {
                    console.log("Needs only one parameters")
                    return
                }
                console.log("push " + interpretParam(argList[1]) + " to top of stack")
                console.log("push " + interpretParam(paramToDeci(argList[1])) + " to top of stack")
                break;
            default :
                console.log("Unsupported command")
                break
        }
        console.log(getRegister('%eax'))
    }

    console.log(registerMap)
    memoryDV.setUint32(getRegisterID('%eax'), 255, true)
    console.log(getRegisterID('%eax'))
    setRegister('%eax', 905)
    setRegister('%eax', "hello")
    setRegister('%eax', 'c')
    setRegister('%eax', 10.111)
    memoryDV.setUint32(getRegisterID('%eax'),4294967395 )
    console.log(getRegister('%eax'))

    return(
        <div className="page-view">
            <div>
                <form id="insertCode" onSubmit={interpretCommand}>
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