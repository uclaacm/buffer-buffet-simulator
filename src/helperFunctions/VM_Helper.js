export const check2Param = (argList) => argList[2].length !== 0;

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

// currently takes command from an input element and parses it
export const parseCode = (event) => {
    let codeString = document.getElementById("codeInput").value;
    
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
