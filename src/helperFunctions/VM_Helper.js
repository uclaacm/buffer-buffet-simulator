//14 Registers
const registerList = [
    'flagRegister',
    '%ebp', '%esp', '%eip',
    '%eax',
    '%edi', '%esi', '%edx', '%ecx', '%r8D', '%r9D',
    '%r10D', '%r11D', '%r12D', '%r13D'
]


const STACK_SIZE = 256
export const registerMap = registerList.reduce((map, name, i) => {
    map[name] = i * 4
    return map
}, {})

//for internal use only
export const getRegisterID = (name) => {
    if(!(name in registerMap)){
        throw new Error(`getRegisterID: No such register ${name}`)
    }

    return registerMap[name]
}

//get the value inside a register
export const getRegister = (name, memoryDV) =>
{   
    return memoryDV.getUint32(getRegisterID(name))
}

//move the value into the name register
//stores signed value if the value is negative
//stores float value if the value is float
//otherwise store the unsigned value
export const setRegister = (name, value, memoryDV) => {
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

export const dec2bin = (dec) => {
    return (dec >>> 0).toString(2)
}

  /////////////////////////
 //// FLAG REG OPS ///////
/////////////////////////
//src - https://en.wikipedia.org/wiki/FLAGS_register
//CF - Carry Flag - mask 0x0001
//PF - Parity flag - mask 0x0002
//ZF - Zero flag - mask 0x0004
//SF - Sign flag - mask 0x0008
//OF - Overflow Flag - 0x0010
//AF - Adjust flag - 0x0020

const flagList = [
    'CF', 'PF', 'ZF','SF', 'OF', 'AF'
]

// stores the position and the mask
export const flagMap = flagList.reduce((map, name, i) => {
    map[name] = i
    return map
}, {})

export const getFlag = (flagName, memoryDV) => {

    if(!(flagName in flagMap)) {
        throw new Error(`getFlag: No such flag ${flagName}`)
    }

    const flagRegID = 'flagRegister'
    const flagRegister = getRegister(flagRegID,memoryDV)

    const flagID = flagMap[flagName]
    const flagMask = 2 ** flagID

    return (flagRegister & flagMask) >>> flagID

}

export const setFlag = (flagName, value, memoryDV) => {
    if(!(flagName in flagMap)) {
        throw new Error(`getFlag: No such flag ${flagName}`)
    }

    const flagRegID = 'flagRegister'
    const flagRegister = getRegister(flagRegID,memoryDV)

    const flagID = flagMap[flagName]
    const flagMask = 2 ** flagID

    //setting the flag to 1
    if(value){
        setRegister(flagRegID, (flagRegister | flagMask), memoryDV)
    }
    //else set it to 0
    else{
        setRegister(flagRegID, ~(~flagRegister | flagMask), memoryDV)
    }
    
    return 
}
const check2Param = (argList) => argList[2].length !== 0;

// const checkArgType = (param) => {
//     const registerList = ["%eax", "%ebx", "%rsp", "%r1", "%r2", "%r3", "%r4", "%r5", "%r6", "%r7", "%r8"];

//     // is register
//     if (registerList.includes(param))
//         return "register";
//     // is hex #
//     else if (/^\$0x/.test(param))
//         return "hex";
//     else if (/^\$/.test(param))
//         return "decimal";
//     else if (param === 0)
//         return "zero";
//     else
//         return "unknown param";   
// }

const parseNoParentheses = (argString) => {
    let arg = [];
    arg[0] = "";
    for (let i = 0; i < argString.length && argString[i] !== ','; i++) {
        arg[0] += argString[i];
    }
    return arg;
}

const parseParentheses = (argString) => {
    let arg = [];
    arg.push(argString.match(/(.*)(?=\()/)[0]);                                                           // add this arg
    if (!arg[0] || arg[0] === "")
        arg[0] = ('0');
    argString = argString.replace(/(.*)(?=\()/,"");

    arg[1]="";
    let i = argString.search(/\(/)+1;
    for (; i < argString.length && argString[i].match(/([^, | )])/); i++) {                               // first arg in parentheses
        arg[1] += argString[i];
    }
    if (argString[i] === ')') {
        return arg;
    }
    else {
        arg[2]="";
        for (i+=1; i < argString.length && argString[i].match(/([^,|)])/); i++) {                         // second arg in parentheses
            if ((argString[i]) !== ' ')
                arg[2] += argString[i]; 
        }
        if (argString[i] === ')') {
            return arg;
        }
        else {
            arg[3]="";
            for (i+=1; i < argString.length && argString[i].match(/([^,|)])/); i++) {                     // third arg in parentheses (multiply)
                if ((argString[i]) !== ' ')
                    arg[3] += argString[i]; 
            }
        }
    }
    return arg;
}

const paramToDeci = (param, memoryDV) => {
    for (let i = 0; i < param.length; i++) {
        // is register
        if (registerList.includes(param[i]))
            param[i] = getRegister(param[i], memoryDV)
        else if (/^\$0x/.test(param[i])) {
            const hexNum = param[i].match(/(?<=\$).*/)[0]
            param[i] = parseInt(hexNum, 16);
        }
        // is decimal #
        else if (/^\$/.test(param[i])) {
            const deciNum = param[i].match(/(?<=\$).*/)[0]
            param[i] = parseInt(deciNum)
        }
        // is hex # (in parentheses no $ in front)
        else if (/^0x/.test(param[i])) {
            const hexNum = param[i]
            param[i] = parseInt(hexNum, 16);
        }
        // is decimal # (in parentheses no $ in front)
        else if (!isNaN(param[i])) {
            const deciNum = param[i]
            param[i] = parseInt(deciNum)
        }
        else
            return "unknown param";
    }
    return param
}

//makes sure the reference address is within range or else return -1
const verifyAddress = (refAddress, memoryDV) => {
    if(1 <= refAddress  && refAddress <= STACK_SIZE){

        const tempAddress = memoryDV.getUint32(refAddress)
        
        if( 1 <= tempAddress && tempAddress <= STACK_SIZE){
            console.log(tempAddress)
            return tempAddress
        }
    }
    else{
        return -1
    }
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

export const interpretCommand = (codeString, memoryDV, stackValues, setStack) => {
    let argList = parseCode(codeString)
    let payload = 0;
    let dstAddress = 0;
    console.log("Command name: ", argList[0])
    console.log("First argument: ", argList[1])
    console.log("Second argument: ",argList[2])

    console.log(stackValues)
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
            
            //initialize place holder value
            
            payload = 0;
            dstAddress = 0;
            //check if the payload needs to be dereferenced
            if(argList[1].length === 1){
                //evalulate the value in deci or grab the value inside the register
                payload = interpretParam(paramToDeci(argList[1], memoryDV))
            }
            else{
                const refAddress = interpretParam(paramToDeci(argList[1], memoryDV))
                payload = verifyAddress(refAddress, memoryDV)
            }   
            
            //need to check that it's a valid address
            if (argList[2].length === 1 && registerList.includes(argList[2][0])) {
                dstAddress = getRegisterID(argList[2][0])
            }
            else{
                const refAddress = interpretParam(paramToDeci(argList[2], memoryDV))
                if(1 <= refAddress && refAddress <= STACK_SIZE){
                    dstAddress = refAddress
                }
                else{
                    dstAddress = -1
                }
            }
            
            if(payload === -1 || dstAddress === -1){
                console.error("Unable to execute mov command due to invalid src or dst")
            }
            else{
                memoryDV.setUint32(dstAddress,payload)
            }
            break
        // leaq Source, Dest
        // NOT IMPLEMENTED YET
        case "leaq":
            if (!check2Param(argList)) {
                console.log("Needs two parameters")
                return
            }
            payload = 0;
            dstAddress = 0;
            payload = interpretParam(paramToDeci(argList[1], memoryDV))

            if (argList[2].length === 1 && registerList.includes(argList[2][0])) {
                dstAddress = getRegisterID(argList[2][0])
            }
            else{
                const refAddress = interpretParam(paramToDeci(argList[2], memoryDV))
                if(1 <= refAddress && refAddress <= STACK_SIZE){
                    dstAddress = refAddress
                }
                else{
                    dstAddress = -1
                }
            }

            if(dstAddress === -1){
                console.error("Unable to execute leaq command due to invalid dst")
            }
            else{
                memoryDV.setUint32(dstAddress, payload)
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
            let s1 = parseInt(interpretParam(paramToDeci(argList[2], memoryDV)), 10)
            let s2 = parseInt(interpretParam(paramToDeci(argList[1], memoryDV)), 10)
            let diff = s1 - s2

            setFlag('ZF', diff === 0, memoryDV)
            setFlag('SF', diff < 0, memoryDV)
            setFlag('OF', (s1 > 0 && s2 < 0 && diff < 0) || (s1 < 0 && s2 > 0 && diff > 0), memoryDV)                                               // need to convert to 32 bit?
            console.log('ZF',getFlag('ZF', memoryDV))
            console.log('SF', getFlag('SF', memoryDV))
            console.log(diff)

            console.log("compare " + interpretParam(argList[1]) + " with " + interpretParam(argList[2]))
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
                s1 = parseInt(getRegister(argList[2][0], memoryDV), 10)
                s2 = parseInt(interpretParam(paramToDeci(argList[1], memoryDV)), 10)
                let sum =  s1 + s2
                memoryDV.setUint32(getRegisterID(argList[2][0]), sum)

                setFlag('ZF', sum === 0, memoryDV)
                setFlag('SF', sum < 0, memoryDV)
                setFlag('OF', (s1 > 0 && s2 > 0 && sum < 0) || (s1 < 0 && s2 < 0 && sum > 0), memoryDV)
                console.log('ZF',getFlag('ZF', memoryDV))
                console.log('SF', getFlag('SF', memoryDV))
            }
            console.log("add " + interpretParam(argList[1]) + " to " + interpretParam(argList[2]))
            break

        // subtract source from dest
        // sub Source, Dest
        case "sub" :
            if (!check2Param(argList)) {
                console.log("Needs two parameters")
                return
            }
            // Dest is register
            if (argList[2].length === 1 && registerList.includes(argList[2][0])) {
                let s1 = parseInt(interpretParam(paramToDeci(argList[2], memoryDV)), 10)
                let s2 = parseInt(interpretParam(paramToDeci(argList[1], memoryDV)), 10)
                let diff =  s1 - s2
                memoryDV.setUint32(getRegisterID(argList[2][0]), diff)

                setFlag('ZF', diff === 0, memoryDV)
                setFlag('SF', diff < 0, memoryDV)
                setFlag('OF', (s1 > 0 && s2 < 0 && diff < 0) || (s1 < 0 && s2 > 0 && diff > 0), memoryDV)

                console.log('ZF',getFlag('ZF', memoryDV))
                console.log('SF', getFlag('SF', memoryDV))
            }
            console.log("subtract " + interpretParam(argList[1]) + " from " + interpretParam(argList[2]))
            break;
        
        // jump to dest
        // jmp Dest
        case "jmp" :
            if (check2Param(argList)) {
                console.log("Needs only one parameter")
                return
            }
            setRegister('%eip', interpretParam(paramToDeci(argList[1], memoryDV)), memoryDV)
            console.log("jump to " + interpretParam(argList[1]))
            break

        // jump if equal/zero
        case "je" :
            if (check2Param(argList)) {
                console.log("Needs only one parameter")
                return
            }
            if (getFlag("ZF", memoryDV))
                setRegister('%eip', interpretParam(paramToDeci(argList[1], memoryDV)), memoryDV)
            break
        
        // jump if not equal
        case "jne" :
            if (check2Param(argList)) {
                console.log("Needs only one parameter")
                return
            }
            if (!getFlag("ZF", memoryDV)) 
                setRegister('%eip', interpretParam(paramToDeci(argList[1], memoryDV)), memoryDV)
            break

        // jump if greater
        case "jg" :
            if (check2Param(argList)) {
                console.log("Needs only one parameter")
                return
            }
            if (!(getFlag("SF", memoryDV) ^ (getFlag("OF", memoryDV))) && !getFlag("ZF", memoryDV))    // ~(SF^OF) & ~ZF
                setRegister('%eip', interpretParam(paramToDeci(argList[1], memoryDV)), memoryDV)
            break

        // jump if greater or equal
        case "jge" :
            if (check2Param(argList)) {
                console.log("Needs only one parameter")
                return
            }
            if (!(getFlag("SF", memoryDV) ^ getFlag("OF", memoryDV)))                                  // ~(SF^OF) 
                setRegister('%eip', interpretParam(paramToDeci(argList[1], memoryDV)), memoryDV)                     
            break

        // jump if less
        case "jl" :
            if (check2Param(argList)) {
                console.log("Needs only one parameter")
                return
            }
            if ((getFlag("SF", memoryDV) ^ (getFlag("OF", memoryDV))))                                 // (SF^OF)
                setRegister('%eip', interpretParam(paramToDeci(argList[1], memoryDV)), memoryDV)
            break

        // jump if greater or equal
        case "jle" :
            if (check2Param(argList)) {
                console.log("Needs only one parameter")
                return
            }
            if ((getFlag("SF", memoryDV) ^ getFlag("OF", memoryDV)) || getFlag("ZF", memoryDV))                                  //(SF^OF) | ZF 
                setRegister('%eip', interpretParam(paramToDeci(argList[1], memoryDV)), memoryDV)                     
            break

        // pop top of stack into destination
        // pop Dest
        case "pop" :
            if (check2Param(argList)) {
                console.log("Needs only one parameter")
                return
            }
            
            if (argList[1].length === 1 && registerList.includes(argList[1][0])) {
                dstAddress = getRegisterID(argList[1][0])
            }
            else{
                const refAddress = interpretParam(paramToDeci(argList[1], memoryDV))
                if(1 <= refAddress && refAddress <= STACK_SIZE){
                    dstAddress = refAddress
                }
                else{
                    dstAddress = -1
                }
            }

            if(dstAddress !== -1){
                payload = stackValues.pop()
               
                memoryDV.setUint32(dstAddress, payload)
                console.log(stackValues)
            }

            //console.log("pop top of stack to " + interpretParam(argList[1]))
            break;

        // push source onto top of stack
        // push Source
        case "push" :
            if (check2Param(argList)) {
                console.log("Needs only one parameter")
                return
            }

            payload = interpretParam(paramToDeci(argList[1], memoryDV))
            if(argList[1].length === 1){
                stackValues.push(payload)
            }
            else{
                payload = verifyAddress(payload, memoryDV)
                if(payload !== -1){
                    stackValues.push(payload)
                }
                else{
                    console.error("Memory Address out of bounds")
                }
            }
            console.log(stackValues)
            break;
        default :
            console.log("Unsupported command")
            break
    }

}

// currently takes command from an input element and parses it
export const parseCode = (codeString) => {
    
    
    let command = "";
    let arg1 = [];
    let arg2 = [];
    let arg1String, arg2String;
    let charNum = 0;
    for (; charNum < codeString.length && codeString[charNum] !== ' '; charNum++) {
        command += codeString[charNum];
    }
    let isTwoArgs = true;
    codeString = codeString.substring(charNum+1);

    // 1st arg has parentheses
    if (codeString.match(/(?<!,.*)(\S*\(.*?\))(?=,|$)/)) {
        // 2 Params
        if (codeString.match(/(\S*\(.*?\))(?=,)/))
            arg1String = codeString.match(/(\S*\(.*?\))(?=,)/)[0];          

        // 1 Param
        else {
            arg1String = codeString.match(/(\S*\(.*?\))(?=$)/)[0];                                      
            isTwoArgs = false 
        }
        arg1 = parseParentheses(arg1String);
    }
    // 1st arg has no parentheses
    else {
        // 2 Params
        if (codeString.match(/(.*?)(?=,)/))
            arg1String = codeString.match(/(.*?)(?=,)/)[0];     
        
        // 1 Param
        else {
            isTwoArgs = false;
            arg1String = codeString.match(/(.*?)(?=$)/)[0];                                           
        }
        arg1 = parseNoParentheses(arg1String);                                                              
    }

    codeString = codeString.substring(arg1String.length);
    // parse 2nd argument
    if (isTwoArgs) {                                                                                                    
        if (codeString.match(/(?<=, )(.*)/))
            arg2String = codeString.match(/(?<=, )(.*)/)[0];
        else if (codeString.match(/(?<=,)(.*)/))
            arg2String = codeString.match(/(?<=,)(.*)/)[0];
        else {
            console.log('Something went wrong');
            return;
        }
        // 2nd Param has parentheses
        if (arg2String.match(/(.*)\((.*)\)/))                                                                           
            arg2 = parseParentheses(arg2String);
        // 2nd Param doesn't have parentheses
        else
            arg2 = parseNoParentheses(arg2String);
    }
    console.log([command, arg1, arg2])
    return([command, arg1, arg2]);
}
