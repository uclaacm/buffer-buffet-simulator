import React from "react";
import {setRegister, interpretCommand} from "../helperFunctions/VM_Helper"

import info from "./info.svg";
// import { MdPlayArrow } from "react-icons/md";
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>
const VM_Instance = () => {

    //specify the initial memory array buffer (size in bytes)
    const STACK_SIZE = 256
    const currMemory = new ArrayBuffer(STACK_SIZE)
    const memoryDV = new DataView(currMemory)
    setRegister('%edi', 40, memoryDV)
    memoryDV.setUint32(40, 134)
    return(
        <div className="page-view">
            {/*
                <div>
                <form id="insertCode" onSubmit={(e) => interpretCommand(e, memoryDV)}>
                    <input type="text" placeholder="Enter Assembly Code" id="codeInput"/>
                    <button type="submit">Submit</button>
                </form>
            </div>

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
            */}
            <div className = "all grid-container">
                <div className = "stack">
                    <h2>Stack</h2>
                    <ul>
                    <li className = "stackHeader">Pointer registers</li>
                    <li>ebp (base pointer):</li>
                    <li>esp (stack pointer):</li>
                    <li>eip (instruction pointer):</li>
                    <br/>
                    <li className = "stackHeader">Return Register</li>
                    <li>eax (result register):</li>
                    <br/>
                    <li className = "stackHeader">Argument Registers</li>
                    <li>edi:</li>
                    <li>esi:</li>
                    <li>edx:</li>
                    <li>ecx:</li>
                    <li>r8D:</li>
                    <li>r9D:</li>
                    <br/>
                    <li className = "stackHeader">General Purposes</li>
                    <li>r10D:</li>
                    <li>r11D:</li>
                    <li>r12D:</li>
                    <li>r13D:</li>
                    </ul>
                </div>

                <div>
                <div className = "topNav grid-container">
                    <h1>Buffer Buffet</h1>
                    <img className = "info" src = {info}></img>
                </div>

                <div className = "content grid-container">
                    <div className = "section">
                    <div className = "header grid-container">
                            <h2>C</h2>
                            <select className = "program">
                                <option value="" selected disabled hidden>&nbsp;&nbsp;&nbsp;Select Program</option>
                                <option value="Hello World">&nbsp;&nbsp;&nbsp;Hello World</option>
                                <option value="For Loop">&nbsp;&nbsp;&nbsp;For Loop</option>
                                <option value="If-Else">&nbsp;&nbsp;&nbsp;If-Else</option>
                            </select>
                        </div>
                        <div className="code">
                            <p>
                                int main()
                                <br/>&#x0007B;
                                <br/>&emsp;&emsp;printf("Hello World");
                                <br/>&emsp;&emsp;return 0;
                                <br/>&#x0007D;
                            </p>
                        </div>
                    </div>
                    <div className = "section">
                        <div className = "header">
                            <h2>Assembly</h2>
                        </div>
                        
                        <div className="code">
                            <p>0000000000400502 &lt;main&gt;:</p>
                            {/* <img className = "temp" src = {temp}></img> */}
                        </div>
                    </div>
                </div>
                    <div className = "toolbar grid-container">
                        <h2>Toolbar</h2>
                        <button class="toolButton"> Run</button>
                        <button class="toolButton"> Stop</button>
                        <button class="toolButton"> Next</button>
                        <button class="toolButton"> Continue</button>
                    </div>
                </div>
                
            </div>
        </div>
    )
}

export default VM_Instance;