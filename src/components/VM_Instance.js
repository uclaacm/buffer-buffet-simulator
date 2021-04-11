import React, { useEffect, useRef, useState } from "react"
import {setRegister, interpretCommand} from "../helperFunctions/VM_Helper"

import info from "./info.svg"
import cont from "./continue.svg"
import next from "./next.svg"
import run from "./run.svg"
import stop from "./stop.svg"
import close from "./close.svg"
import hamburger from "./hamburger.svg"

// To Do: nav, jump table, stack functionality, color assembly, color stack

const VM_Instance = () => {
    //specify the initial memory array buffer (size in bytes)
    const STACK_SIZE = 256
    const currMemory = new ArrayBuffer(STACK_SIZE)
    const memoryDV = new DataView(currMemory)
    setRegister('%edi', 40, memoryDV)
    memoryDV.setUint32(40, 134)

    //COMPONENTS

    class Toolbar extends React.Component{
        constructor(props){
            super(props);
            this.state = {
                run: true,
                rest: false,
            }
            this.handleButton = this.handleButton.bind(this)
        }
    
        handleButton(event){
            var val =  event.target.id;
            console.log(val);
            console.log(this.state);
            if(run){
                this.setState({run: false, rest: true});
            }
            if(val === 'stop'){
                console.log("im pressing stop");
                this.setState({run: true, rest: false});
            }
            // console.log(this.state);
        }
        render(){
            return(
                <div className = "toolbar grid-container">
                    <h2>Toolbar</h2>
                    <button class="toolButton" disabled={!this.state.run} onClick={this.handleButton} id = "run"><img className = "btn" src = {run}></img> Run</button>
                    <button class="toolButton" disabled={!this.state.rest} onClick={this.handleButton} id = "stop"><img className = "btn" src = {stop}></img> Stop</button>
                    <button class="toolButton" disabled={!this.state.rest} onClick={this.handleButton} id = "next"><img className = "btn" src = {next}></img> Next</button>
                    <button class="toolButton" disabled={!this.state.rest} onClick={this.handleButton} id = "cont"><img className = "btn" src = {cont}></img> Continue</button>
                </div>
            );
        }
    }

    // class Dropdown extends React.Component {
    //     constructor(props) {
    //       super(props);
    //       this.handleSubmit = this.handleSubmit.bind(this);
    //       this.state = {options: [
    //         <option value="" selected disabled hidden>&nbsp;&nbsp;&nbsp;Select Program</option>,
    //         <option value="Sum">&nbsp;&nbsp;&nbsp;Sum</option>,
    //         <option value="If-Else">&nbsp;&nbsp;&nbsp;If-Else</option>,
    //         <option value="Switch Statement">&nbsp;&nbsp;&nbsp;Switch Statement</option>,
    //         <option value="For Loop">&nbsp;&nbsp;&nbsp;For Loop</option>,
    //         <option value="Recursion">&nbsp;&nbsp;&nbsp;Recursion</option>,
    //       ]}

    //     }
           
    //     handleSubmit(event) {
    //         var val = event.target.value;
    //         console.log('A program was submitted: ' + val);
    //         // event.preventDefault();
    //         if (val === 'Sum') {
    //             setSourceCode(
    //                 <p>
    //                     int addNum(int a, int b)
    //                     <br/>&#x0007B;
    //                     <br/>&emsp;&emsp;int sum = a + b;
    //                     <br/>&emsp;&emsp;return sum;
    //                     <br/>&#x0007D;
    //                 </p>                    
    //             )
    //             this.setState({options: 'gross'});
    //             console.log(this.state.options);
    //             setAssemblyCode(
    //                 <p>
    //                     0000000000400502 &lt;addNum&gt;:
    //                     <Row address = "400502" content = "b4 a4 05 40 00" command = "mov" parameters = "$0x4005a4, %edi"></Row>
    //                     <Row address = "400502" content = "b4 a4 05 40 00" command = "mov" parameters = "$0x4005a4, %edi"></Row>
    //                     <Row address = "400502" content = "b4 a4 05 40 00" command = "mov" parameters = "$0x4005a4, %edi"></Row>
    //                     <Row address = "400502" content = "b4 a4 05 40 00" command = "mov" parameters = "$0x4005a4, %edi"></Row>
    //                     <Row address = "400502" content = "b4 a4 05 40 00" command = "mov" parameters = "$0x4005a4, %edi"></Row>
    //                     <Row address = "400502" content = "b4 a4 05 40 00" command = "mov" parameters = "$0x4005a4, %edi"></Row>
    //                  </p>
    //             )
    //         }
    //         else if (val === 'For Loop'){
    //             setSourceCode(
    //                 <p>
    //                     int incrementAdd(int a)
    //                     <br/>&#x0007B;
    //                     <br/>&emsp;&emsp;int sum = 0;
    //                     <br/>&emsp;&emsp;for (int i = 0; i &#60; a&#44; i++) &#x0007B;
    //                     <br/>&emsp;&emsp;&emsp;&emsp;sum += i;
    //                     <br/>&emsp;&emsp;&#x0007D;
    //                     <br/>&emsp;&emsp;return sum;
    //                     <br/>&#x0007D;
    //                 </p>
    //             )
    //             setAssemblyCode(
    //                 <p>
    //                     0000000000400502 &lt;incrementAdd&gt;:
    //                     <Row address = "400502" content = "b4 a4 05 40 00" command = "mov" parameters = "$0x4005a4, %edi"></Row>
    //                     <Row address = "400502" content = "b4 a4 05 40 00" command = "mov" parameters = "$0x4005a4, %edi"></Row>
    //                     <Row address = "400502" content = "b4 a4 05 40 00" command = "mov" parameters = "$0x4005a4, %edi"></Row>
    //                     <Row address = "400502" content = "b4 a4 05 40 00" command = "mov" parameters = "$0x4005a4, %edi"></Row>
    //                     <Row address = "400502" content = "b4 a4 05 40 00" command = "mov" parameters = "$0x4005a4, %edi"></Row>
    //                     <Row address = "400502" content = "b4 a4 05 40 00" command = "mov" parameters = "$0x4005a4, %edi"></Row>
    //                  </p>
    //             )
    //         }
    //         else if (val === 'If-Else'){
    //             setSourceCode(
    //                 <p>
    //                     int getMax(int a, int b)
    //                     <br/>&#x0007B;
    //                     <br/>&emsp;&emsp;if (b &#62; a)
    //                     <br/>&emsp;&emsp;&emsp;&emsp;return b;
    //                     <br/>&emsp;&emsp;else
    //                     <br/>&emsp;&emsp;&emsp;&emsp;return a;
    //                     <br/>&#x0007D;
    //                 </p>
    //             )
    //             setAssemblyCode(
    //                 <p>
    //                     0000000000400502 &lt;getMax&gt;:
    //                     <Row address = "400502" content = "b4 a4 05 40 00" command = "mov" parameters = "$0x4005a4, %edi"></Row>
    //                     <Row address = "400502" content = "b4 a4 05 40 00" command = "mov" parameters = "$0x4005a4, %edi"></Row>
    //                     <Row address = "400502" content = "b4 a4 05 40 00" command = "mov" parameters = "$0x4005a4, %edi"></Row>
    //                     <Row address = "400502" content = "b4 a4 05 40 00" command = "mov" parameters = "$0x4005a4, %edi"></Row>
    //                     <Row address = "400502" content = "b4 a4 05 40 00" command = "mov" parameters = "$0x4005a4, %edi"></Row>
    //                     <Row address = "400502" content = "b4 a4 05 40 00" command = "mov" parameters = "$0x4005a4, %edi"></Row>
    //                  </p>
    //             )
    //         }
    //         else if (val === 'Switch Statement'){
    //             setSourceCode(
    //                 <p>
    //                     int switchTable(int n)
    //                     <br/>&#x0007B;
    //                     <br/>&emsp;&emsp;int sum = 3;
    //                     <br/>&emsp;&emsp;switch (n) &#x0007B;
    //                         <br/>&emsp;&emsp;&emsp;&emsp;case 1: 
    //                         <br/>&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;sum += n;
    //                         <br/>&emsp;&emsp;&emsp;&emsp;case 2: 
    //                         <br/>&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;sum -= 2;
    //                         <br/>&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;break;
    //                         <br/>&emsp;&emsp;&emsp;&emsp;case 3:
    //                         <br/>&emsp;&emsp;&emsp;&emsp;case 4:
    //                         <br/>&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;sum = 34 + n;
    //                         <br/>&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;break;
    //                         <br/>&emsp;&emsp;&emsp;&emsp;default:
    //                         <br/>&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;sum = 0;
    //                         <br/>&emsp;&emsp;&#x0007D;
    //                         <br/>&emsp;&emsp;return sum;
    //                     <br/>&#x0007D;
    //                 </p>
    //             )
    //             setAssemblyCode(
    //                 <p>
    //                     0000000000400502 &lt;switchTable&gt;:
    //                     <Row address = "400502" content = "b4 a4 05 40 00" command = "mov" parameters = "$0x4005a4, %edi"></Row>
    //                     <Row address = "400502" content = "b4 a4 05 40 00" command = "mov" parameters = "$0x4005a4, %edi"></Row>
    //                     <Row address = "400502" content = "b4 a4 05 40 00" command = "mov" parameters = "$0x4005a4, %edi"></Row>
    //                     <Row address = "400502" content = "b4 a4 05 40 00" command = "mov" parameters = "$0x4005a4, %edi"></Row>
    //                     <Row address = "400502" content = "b4 a4 05 40 00" command = "mov" parameters = "$0x4005a4, %edi"></Row>
    //                     <Row address = "400502" content = "b4 a4 05 40 00" command = "mov" parameters = "$0x4005a4, %edi"></Row>
    //                  </p>
    //             )
    //         }
    //         else if (val === 'Recursion'){
    //             setSourceCode(
    //                 <p>
    //                     int incrementAdd(int a)
    //                     <br/>&#x0007B;
    //                     <br/>&emsp;&emsp;if (n == 1)
    //                     <br/>&emsp;&emsp;&emsp;&emsp;return 1;
    //                     <br/>
    //                     <br/>&emsp;&emsp;return n * factorial(n-1);
    //                     <br/>&#x0007D;
    //                 </p>
    //             )
    //             setAssemblyCode(
    //                 <p>
    //                     0000000000400502 &lt;incrementAdd&gt;:
    //                     <Row address = "400502" content = "b4 a4 05 40 00" command = "mov" parameters = "$0x4005a4, %edi"></Row>
    //                     <Row address = "400502" content = "b4 a4 05 40 00" command = "mov" parameters = "$0x4005a4, %edi"></Row>
    //                     <Row address = "400502" content = "b4 a4 05 40 00" command = "mov" parameters = "$0x4005a4, %edi"></Row>
    //                     <Row address = "400502" content = "b4 a4 05 40 00" command = "mov" parameters = "$0x4005a4, %edi"></Row>
    //                     <Row address = "400502" content = "b4 a4 05 40 00" command = "mov" parameters = "$0x4005a4, %edi"></Row>
    //                     <Row address = "400502" content = "b4 a4 05 40 00" command = "mov" parameters = "$0x4005a4, %edi"></Row>
    //                  </p>
    //             )
    //         }
    //     }
      
    //     render() {
    //       return (
    //         <select className = "program" onChange={this.handleSubmit}>
    //             {/* <option value="" selected disabled hidden>&nbsp;&nbsp;&nbsp;Select Program</option>
    //             <option value="Sum">&nbsp;&nbsp;&nbsp;Sum</option>
    //             <option value="If-Else">&nbsp;&nbsp;&nbsp;If-Else</option>
    //             <option value="Switch Statement">&nbsp;&nbsp;&nbsp;Switch Statement</option>
    //             <option value="For Loop">&nbsp;&nbsp;&nbsp;For Loop</option>
    //             <option value="Recursion">&nbsp;&nbsp;&nbsp;Recursion</option> */}
    //             {this.state.options}
    //         </select>
    //       );
    //     }
    //   }

    class Nav extends React.Component{
        constructor(props){
             super(props);
             this.state = {show: false}
             this.open = this.open.bind(this)
             this.close = this.open.bind(this)
         }
     
         open(){
            this.setState({show: true});
         }
         close(){
            this.setState({show: false});
         }

         render(){
             if(this.state.show){
                 return(
                     <div className = "navContainer grid-container">
                        <div className = "menu" onClick = {console.log("clicking menu")}>
                            <ul>
                                <li>Description</li>
                                <li>
                                    <ul>
                                        <li>Welcome</li>
                                        <li>Intro</li>
                                        <li>An Analogy</li>
                                        <li>Make Some Orders: Normal</li>
                                        <li>Make Some Orders: Overflow</li>
                                    </ul>
                                </li>
                                <li>Simulation: Normal</li>
                                <li>Simulation: Overflow</li>
                            </ul>
                        </div>
                        <div className = "menuBG" onClick = {console.log("clicking black")}></div>                         
                     </div>
                 ); 
             }
             else{
                 return(<img className = "nav" src = {hamburger} onClick={this.open}></img>);
             }
            
         }
     }
    
    class Modal extends React.Component{
       constructor(props){
            super(props);
            this.handleClose = this.handleClose.bind(this)
        }
    
        handleClose(){
           setModal(false);
        }
        render(){
            if(showModal){
                return(
                    <div>
                        <div className = "black"></div>
                        <div className = "popupContainer">
                            <div className = "popup">
                                <div className = "closeContainer grid-container">
                                    <img className = "close" src = {close} onClick={this.handleClose}></img>
                                </div>
                                <h2 className = "instructions">Instructions</h2>
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Sit amet tellus cras adipiscing enim eu. Lacinia quis vel eros donec ac odio tempor orci dapibus. </p>
                            </div>
                        </div>
                    </div>
                ); 
            }
            else{
                return(<div></div>);
            }
           
        }
    }

    const [showModal, setModal] = useState(true);

    const [sourceCode, setSourceCode] = useState(
        <p>
            int addNum(int a, int b)
            <br/>&#x0007B;
            <br/>&emsp;&emsp;int sum = a + b;
            <br/>&emsp;&emsp;return sum;
            <br/>&#x0007D;
        </p>
    );

    //default state is 
    const [assemblyCode, setAssemblyCode] = useState(
        <p>
            <span className = "assemblyHeader">0000000000400502 &lt;addNum&gt;:</span>
            <Row address = "400502" content = "b4 a4 05 40 00" command = "mov" parameters = "$0x4005a4, %edi"></Row>
            <Row address = "400502" content = "b4 a4 05 40 00" command = "mov" parameters = "$0x4005a4, %edi"></Row>
            <Row address = "400502" content = "b4 a4 05 40 00" command = "mov" parameters = "$0x4005a4, %edi"></Row>
            <Row address = "400502" content = "b4 a4 05 40 00" command = "mov" parameters = "$0x4005a4, %edi"></Row>
            <Row address = "400502" content = "b4 a4 05 40 00" command = "mov" parameters = "$0x4005a4, %edi"></Row>
            <Row address = "400502" content = "b4 a4 05 40 00" command = "mov" parameters = "$0x4005a4, %edi"></Row>
        </p>
    );

    function Row (props) {
        return (
          <div className = {props.style || "row"}>
              <label class = "container">
                  <input type="checkbox" id="1"></input>
                  <span class="checkmark"></span>
              </label>
            <div>
                &emsp;&emsp;{props.address}:&emsp;&emsp;&emsp;&emsp;{props.content}&emsp;&emsp;&emsp;&emsp;{props.command}&emsp;&emsp;{props.parameters}
            </div>
          </div>
        )
    }
    
    //this function handles change of program
    function handleSubmit(event) {
        var val = event.target.value;
        console.log('A program was submitted: ' + val);
        // event.preventDefault();
        if (val === 'Sum') {
            setSourceCode(
                <p>
                    int addNum(int a, int b)
                    <br/>&#x0007B;
                    <br/>&emsp;&emsp;int sum = a + b;
                    <br/>&emsp;&emsp;return sum;
                    <br/>&#x0007D;
                </p>                    
            )
            setAssemblyCode(
                <p>
                    0000000000400502 &lt;addNum&gt;:
                    <Row address = "400502" content = "b4 a4 05 40 00" command = "mov" parameters = "$0x4005a4, %edi"></Row>
                    <Row address = "400502" content = "b4 a4 05 40 00" command = "mov" parameters = "$0x4005a4, %edi"></Row>
                    <Row address = "400502" content = "b4 a4 05 40 00" command = "mov" parameters = "$0x4005a4, %edi"></Row>
                    <Row address = "400502" content = "b4 a4 05 40 00" command = "mov" parameters = "$0x4005a4, %edi"></Row>
                    <Row address = "400502" content = "b4 a4 05 40 00" command = "mov" parameters = "$0x4005a4, %edi"></Row>
                    <Row address = "400502" content = "b4 a4 05 40 00" command = "mov" parameters = "$0x4005a4, %edi"></Row>
                 </p>
            )
        }
        else if (val === 'For Loop'){
            setSourceCode(
                <p>
                    int incrementAdd(int a)
                    <br/>&#x0007B;
                    <br/>&emsp;&emsp;int sum = 0;
                    <br/>&emsp;&emsp;for (int i = 0; i &#60; a&#44; i++) &#x0007B;
                    <br/>&emsp;&emsp;&emsp;&emsp;sum += i;
                    <br/>&emsp;&emsp;&#x0007D;
                    <br/>&emsp;&emsp;return sum;
                    <br/>&#x0007D;
                </p>
            )
            setAssemblyCode(
                <p>
                    0000000000400502 &lt;incrementAdd&gt;:
                    <Row address = "400502" content = "b4 a4 05 40 00" command = "mov" parameters = "$0x4005a4, %edi"></Row>
                    <Row address = "400502" content = "b4 a4 05 40 00" command = "mov" parameters = "$0x4005a4, %edi"></Row>
                    <Row address = "400502" content = "b4 a4 05 40 00" command = "mov" parameters = "$0x4005a4, %edi"></Row>
                    <Row address = "400502" content = "b4 a4 05 40 00" command = "mov" parameters = "$0x4005a4, %edi"></Row>
                    <Row address = "400502" content = "b4 a4 05 40 00" command = "mov" parameters = "$0x4005a4, %edi"></Row>
                    <Row address = "400502" content = "b4 a4 05 40 00" command = "mov" parameters = "$0x4005a4, %edi"></Row>
                 </p>
            )
        }
        else if (val === 'If-Else'){
            setSourceCode(
                <p>
                    int getMax(int a, int b)
                    <br/>&#x0007B;
                    <br/>&emsp;&emsp;if (b &#62; a)
                    <br/>&emsp;&emsp;&emsp;&emsp;return b;
                    <br/>&emsp;&emsp;else
                    <br/>&emsp;&emsp;&emsp;&emsp;return a;
                    <br/>&#x0007D;
                </p>
            )
            setAssemblyCode(
                <p>
                    0000000000400502 &lt;getMax&gt;:
                    <Row address = "400502" content = "b4 a4 05 40 00" command = "mov" parameters = "$0x4005a4, %edi"></Row>
                    <Row address = "400502" content = "b4 a4 05 40 00" command = "mov" parameters = "$0x4005a4, %edi"></Row>
                    <Row address = "400502" content = "b4 a4 05 40 00" command = "mov" parameters = "$0x4005a4, %edi"></Row>
                    <Row address = "400502" content = "b4 a4 05 40 00" command = "mov" parameters = "$0x4005a4, %edi"></Row>
                    <Row address = "400502" content = "b4 a4 05 40 00" command = "mov" parameters = "$0x4005a4, %edi"></Row>
                    <Row address = "400502" content = "b4 a4 05 40 00" command = "mov" parameters = "$0x4005a4, %edi"></Row>
                 </p>
            )
        }
        else if (val === 'Switch Statement'){
            setSourceCode(
                <p>
                    int switchTable(int n)
                    <br/>&#x0007B;
                    <br/>&emsp;&emsp;int sum = 3;
                    <br/>&emsp;&emsp;switch (n) &#x0007B;
                        <br/>&emsp;&emsp;&emsp;&emsp;case 1: 
                        <br/>&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;sum += n;
                        <br/>&emsp;&emsp;&emsp;&emsp;case 2: 
                        <br/>&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;sum -= 2;
                        <br/>&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;break;
                        <br/>&emsp;&emsp;&emsp;&emsp;case 3:
                        <br/>&emsp;&emsp;&emsp;&emsp;case 4:
                        <br/>&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;sum = 34 + n;
                        <br/>&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;break;
                        <br/>&emsp;&emsp;&emsp;&emsp;default:
                        <br/>&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;sum = 0;
                        <br/>&emsp;&emsp;&#x0007D;
                        <br/>&emsp;&emsp;return sum;
                    <br/>&#x0007D;
                </p>
            )
            setAssemblyCode(
                <p>
                    0000000000400502 &lt;switchTable&gt;:
                    <Row address = "400502" content = "b4 a4 05 40 00" command = "mov" parameters = "$0x4005a4, %edi"></Row>
                    <Row address = "400502" content = "b4 a4 05 40 00" command = "mov" parameters = "$0x4005a4, %edi"></Row>
                    <Row address = "400502" content = "b4 a4 05 40 00" command = "mov" parameters = "$0x4005a4, %edi"></Row>
                    <Row address = "400502" content = "b4 a4 05 40 00" command = "mov" parameters = "$0x4005a4, %edi"></Row>
                    <Row address = "400502" content = "b4 a4 05 40 00" command = "mov" parameters = "$0x4005a4, %edi"></Row>
                    <Row address = "400502" content = "b4 a4 05 40 00" command = "mov" parameters = "$0x4005a4, %edi"></Row>
                 </p>
            )
        }
        else if (val === 'Recursion'){
            setSourceCode(
                <p>
                    int incrementAdd(int a)
                    <br/>&#x0007B;
                    <br/>&emsp;&emsp;if (n == 1)
                    <br/>&emsp;&emsp;&emsp;&emsp;return 1;
                    <br/>
                    <br/>&emsp;&emsp;return n * factorial(n-1);
                    <br/>&#x0007D;
                </p>
            )
            setAssemblyCode(
                <p>
                    0000000000400502 &lt;incrementAdd&gt;:
                    <Row address = "400502" content = "b4 a4 05 40 00" command = "mov" parameters = "$0x4005a4, %edi"></Row>
                    <Row address = "400502" content = "b4 a4 05 40 00" command = "mov" parameters = "$0x4005a4, %edi"></Row>
                    <Row address = "400502" content = "b4 a4 05 40 00" command = "mov" parameters = "$0x4005a4, %edi"></Row>
                    <Row address = "400502" content = "b4 a4 05 40 00" command = "mov" parameters = "$0x4005a4, %edi"></Row>
                    <Row address = "400502" content = "b4 a4 05 40 00" command = "mov" parameters = "$0x4005a4, %edi"></Row>
                    <Row address = "400502" content = "b4 a4 05 40 00" command = "mov" parameters = "$0x4005a4, %edi"></Row>
                 </p>
            )
        }
    }

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

            {/* modal
            <div className = "black"></div>
            <div className = "popupContainer">
                <div className = "popup">
                    <div className = "closeContainer grid-container">
                        <img className = "close" src = {close}></img>
                    </div>
                    <h2 className = "instructions">Instructions</h2>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Sit amet tellus cras adipiscing enim eu. Lacinia quis vel eros donec ac odio tempor orci dapibus. </p>
                </div>
            </div> */}
            
            
            <Modal></Modal>
            {/* <Nav></Nav> */}

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
                    <div></div>
                    <h1>Buffer Buffet</h1>
                    <img className = "info" src = {info} onClick ={() => {
                        console.log("info");
                        setModal(true);
                    }}></img>
                </div>

                <div className = "content grid-container">
                    <div className = "section">
                    <div className = "header grid-container">
                            <h2>C</h2>
                            {/* <Dropdown></Dropdown> */}
                            <select className = "program" onChange={handleSubmit}>
                                <option value="" selected disabled hidden>&nbsp;&nbsp;&nbsp;Select Program</option>
                                <option value="Sum">&nbsp;&nbsp;&nbsp;Sum</option>
                                <option value="If-Else">&nbsp;&nbsp;&nbsp;If-Else</option>
                                <option value="Switch Statement">&nbsp;&nbsp;&nbsp;Switch Statement</option>
                                <option value="For Loop">&nbsp;&nbsp;&nbsp;For Loop</option>
                                <option value="Recursion">&nbsp;&nbsp;&nbsp;Recursion</option>
                            </select>
                        </div>
                        <div className="code source">
                            {sourceCode}
                        </div>
                    </div>
                    <div className = "section">
                        <div className = "header">
                            <h2>Assembly</h2>
                        </div>
                        
                        <div className="code">
                            {assemblyCode}
                        </div>
                    </div>
                </div>
                    <Toolbar></Toolbar>
                </div>
                
            </div>
        </div>
    )
}

export default VM_Instance;