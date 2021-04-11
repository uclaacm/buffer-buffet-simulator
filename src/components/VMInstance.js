import React, {useState, useEffect, useReducer} from 'react';
import {getRegister, interpretCommand, getFlag, setRegister} from '../helperFunctions/VMHelper';
import {Row, Toolbar, Modal} from './displayComponents';
// import Debug from './Debug';

import info from '../assets/info.svg';
import add from '../examplePrograms/add.json';
import forLoop from '../examplePrograms/forLoop.json';
import ifElse from '../examplePrograms/ifElse.json';
import switchStatement from '../examplePrograms/switchStatement.json';
import recursion from '../examplePrograms/recursion.json';
// import bufferOverflow from '../examplePrograms/bufferOverflow.json';

const VMInstance = () => {
  // specify the initial memory array buffer (size in bytes)
  const STACK_SIZE = 256;
  const currMemory = new ArrayBuffer(STACK_SIZE);
  let memoryDV = new DataView(currMemory);

  const [varStack] = useState([]);
  const [instrLength] = useState(3);
  // initialize register/flag states
  const [registerDict, updateDict] = useState(
      {
        '%ebp': getRegister('%ebp', memoryDV),
        '%esp': getRegister('%esp', memoryDV),
        '%eip': getRegister('%eip', memoryDV),
        '%eax': getRegister('%eax', memoryDV),
        '%edi': getRegister('%edi', memoryDV),
        '%esi': getRegister('%esi', memoryDV),
        '%edx': getRegister('%edx', memoryDV),
        '%ecx': getRegister('%ecx', memoryDV),
        '%r8D': getRegister('%r8D', memoryDV),
        '%r9D': getRegister('%r9D', memoryDV),
        '%r10D': getRegister('%r10D', memoryDV),
        '%r11D': getRegister('%r11D', memoryDV),
        '%r12D': getRegister('%r12D', memoryDV),
        '%r13D': getRegister('%r13D', memoryDV),
        'CF': getFlag('CF', memoryDV),
        'PF': getFlag('PF', memoryDV),
        'ZF': getFlag('ZF', memoryDV),
        'SF': getFlag('SF', memoryDV),
        'OF': getFlag('OF', memoryDV),
        'AF': getFlag('AF', memoryDV),
      });

  const reducer = (memory, action) => {
    switch (action.type) {
      case 'clear':
        const clearMemory = new ArrayBuffer(STACK_SIZE);
        memoryDV = new DataView(clearMemory);
        return clearMemory;
      case 'run':
        const newMemory = memory.slice();
        memoryDV = new DataView(newMemory);

        // Increment the instruction pointer
        const currentEip = parseInt(getRegister('%eip', memoryDV));

        if (currentEip < 0 || currentEip >= instrLength) {
          return newMemory;
        }
        setRegister('%eip', currentEip + 1, memoryDV);
        interpretCommand(action.payload, memoryDV, varStack);
        return newMemory;
      default:
        throw new Error();
    }
  };
  const [memory, changeMemory] = useReducer(reducer, new ArrayBuffer(STACK_SIZE));

  useEffect(() => {
    const tempMemoryDV = new DataView(memory);
    updateDict({
      '%ebp': getRegister('%ebp', tempMemoryDV),
      '%esp': getRegister('%esp', tempMemoryDV),
      '%eip': getRegister('%eip', tempMemoryDV),
      '%eax': getRegister('%eax', tempMemoryDV),
      '%edi': getRegister('%edi', tempMemoryDV),
      '%esi': getRegister('%esi', tempMemoryDV),
      '%edx': getRegister('%edx', tempMemoryDV),
      '%ecx': getRegister('%ecx', tempMemoryDV),
      '%r8D': getRegister('%r8D', tempMemoryDV),
      '%r9D': getRegister('%r9D', tempMemoryDV),
      '%r10D': getRegister('%r10D', tempMemoryDV),
      '%r11D': getRegister('%r11D', tempMemoryDV),
      '%r12D': getRegister('%r12D', tempMemoryDV),
      '%r13D': getRegister('%r13D', tempMemoryDV),
      'CF': getFlag('CF', tempMemoryDV),
      'PF': getFlag('PF', tempMemoryDV),
      'ZF': getFlag('ZF', tempMemoryDV),
      'SF': getFlag('SF', tempMemoryDV),
      'OF': getFlag('OF', tempMemoryDV),
      'AF': getFlag('AF', tempMemoryDV),
    });
  }, [memory]);

  /**
  * runs the following command and change the eip
  * @param {event} e event of the click
  * @param {string} codeInput instruction to execute
  */
  const runCommand = (e, codeInput) => {
    if (e) {
      e.preventDefault();
    }
    const codePayload = {
      type: 'run',
      payload: codeInput,
    };
    changeMemory(codePayload);
  };

  /**
  * Clears the memory
  * @param {event} e event of the click
  */
  const clearMemory = (e) => {
    e.preventDefault();
    const codePayload = {
      type: 'clear',
    };
    changeMemory(codePayload);
  };

  const [showModal, setModal] = useState(false);

  const [sourceCode, setSourceCode] = useState(
      <p>
        int addNum(int a, int b)
        <br/>&#x0007B;
        <br/>&emsp;&emsp;int sum = a + b;
        <br/>&emsp;&emsp;return sum;
        <br/>&#x0007D;
      </p>,
  );

  // default state is
  const [assemblyCode, setAssemblyCode] = useState(
      <p>
        0000000000400502 &lt;incrementAdd&gt;:
        {
          add.program.map((line) => {
            const command = line.assembly.split(/(?<=^.*) /)[0];
            const param = line.assembly.split(/(?<=^[^,]*) /)[1];
            return (
              <Row
                address={line.address}
                content={line.hex}
                command={command}
                parameters={param}
                key={line.address}>
              </Row>
            );
          })
        }
      </p>,
  );

  /**
  * handles change of programs
  * @param {event} event onClick
  */
  function handleSubmit(event) {
    const val = event.target.value;
    let example;
    // event.preventDefault();
    if (val === 'Sum') {
      setSourceCode(
          <p>
            int addNum(int a, int b)
            <br/>&#x0007B;
            <br/>&emsp;&emsp;int sum = a + b;
            <br/>&emsp;&emsp;return sum;
            <br/>&#x0007D;
          </p>,
      );
      example = add;
    } else if (val === 'For Loop') {
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
          </p>,
      );
      example = forLoop;
    } else if (val === 'If-Else') {
      setSourceCode(
          <p>
            int getMax(int a, int b)
            <br/>&#x0007B;
            <br/>&emsp;&emsp;if (b &#62; a)
            <br/>&emsp;&emsp;&emsp;&emsp;return b;
            <br/>&emsp;&emsp;else
            <br/>&emsp;&emsp;&emsp;&emsp;return a;
            <br/>&#x0007D;
          </p>,
      );
      example = ifElse;
    } else if (val === 'Switch Statement') {
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
          </p>,
      );
      example = switchStatement;
    } else if (val === 'Recursion') {
      setSourceCode(
          <p>
            int incrementAdd(int a)
            <br/>&#x0007B;
            <br/>&emsp;&emsp;if (n == 1)
            <br/>&emsp;&emsp;&emsp;&emsp;return 1;
            <br/>
            <br/>&emsp;&emsp;return n * factorial(n-1);
            <br/>&#x0007D;
          </p>,
      );
      example = recursion;
    }
    setAssemblyCode(
        <p>
          0000000000400502 &lt;incrementAdd&gt;:
          {
            example.program.map((line) => {
              const command = line.assembly.split(/(?<=^.*) /)[0];
              const param = line.assembly.split(/(?<=^[^,]*) /)[1];
              return (
                <Row
                  address={line.address}
                  content={line.hex}
                  command={command}
                  parameters={param}
                  key={line.address}>
                </Row>
              );
            })
          }
        </p>,
    );
  }

  return (
    <div className="page-view">
      <Modal showModal={showModal} setModal={setModal}></Modal>
      {/* <Nav></Nav> */}

      {/*
            <h4> Flags</h4>
            <ul>
              <li>CF: {registerDict['CF']}</li>
              <li>PF: {registerDict['PF']}</li>
              <li>ZF: {registerDict['ZF']}</li>
              <li>SF: {registerDict['SF']}</li>
              <li>OF: {registerDict['OF']}</li>
              <li>AF: {registerDict['AF']}</li>
            </ul> */}
      <div className = "all grid-container">
        <div className = "stack">
          <h2>Stack</h2>
          <ul>
            <li className = "stackHeader">Pointer registers</li>
            <li>ebp (base pointer): {registerDict['%ebp']}</li>
            <li>esp (stack pointer): {registerDict['%esp']}</li>
            <li>eip (instruction pointer): {registerDict['%eip']}</li>
            <br/>
            <li className = "stackHeader">Return Register</li>
            <li>eax (result register): {registerDict['%eax']}</li>
            <br/>
            <li className = "stackHeader">Argument Registers</li>
            <li>edi: {registerDict['%edi']}</li>
            <li>esi: {registerDict['%esi']}</li>
            <li>edx: {registerDict['%edx']}</li>
            <li>ecx: {registerDict['%ecx']}</li>
            <li>r8D: {registerDict['%r8D']}</li>
            <li>r9D: {registerDict['%r9D']}</li>
            <br/>
            <li className = "stackHeader">General Purposes</li>
            <li>r10D: {registerDict['%r10D']}</li>
            <li>r11D: {registerDict['%r11D']}</li>
            <li>r12D: {registerDict['%r12D']}</li>
            <li>r13D: {registerDict['%r13D']}</li>
          </ul>
        </div>

        <div>
          <div className = "topNav grid-container">
            <div></div>
            <h1>Buffer Buffet</h1>
            <img className = "info" alt = "info" src = {info} onClick ={() => {
              console.log('info');
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
          <Toolbar runCommand={runCommand} clearMemory={clearMemory}></Toolbar>
        </div>
      </div>
    </div>
  );
};


export default VMInstance;

// class Dropdown extends React.Component {
//   constructor(props) {
//     super(props);
//     this.handleSubmit = this.handleSubmit.bind(this);
//     this.state = {options: [
//     <option value="" selected disabled hidden>&nbsp;&nbsp;&nbsp;Select Program</option>,
//     <option value="Sum">&nbsp;&nbsp;&nbsp;Sum</option>,
//     <option value="If-Else">&nbsp;&nbsp;&nbsp;If-Else</option>,
//     <option value="Switch Statement">&nbsp;&nbsp;&nbsp;Switch Statement</option>,
//     <option value="For Loop">&nbsp;&nbsp;&nbsp;For Loop</option>,
//     <option value="Recursion">&nbsp;&nbsp;&nbsp;Recursion</option>,
//     ]}

//   }

//   handleSubmit(event) {
//     var val = event.target.value;
//     console.log('A program was submitted: ' + val);
//     // event.preventDefault();
//     if (val === 'Sum') {
//       setSourceCode(
//         <p>
//           int addNum(int a, int b)
//           <br/>&#x0007B;
//           <br/>&emsp;&emsp;int sum = a + b;
//           <br/>&emsp;&emsp;return sum;
//           <br/>&#x0007D;
//         </p>
//       )
//       this.setState({options: 'gross'});
//       console.log(this.state.options);
//       setAssemblyCode(
//         <p>
//           0000000000400502 &lt;addNum&gt;:
//           <Row address = "400502" content = "b4 a4 05 40 00" command = "mov" parameters = "$0x4005a4, %edi"></Row>
//           <Row address = "400502" content = "b4 a4 05 40 00" command = "mov" parameters = "$0x4005a4, %edi"></Row>
//           <Row address = "400502" content = "b4 a4 05 40 00" command = "mov" parameters = "$0x4005a4, %edi"></Row>
//           <Row address = "400502" content = "b4 a4 05 40 00" command = "mov" parameters = "$0x4005a4, %edi"></Row>
//           <Row address = "400502" content = "b4 a4 05 40 00" command = "mov" parameters = "$0x4005a4, %edi"></Row>
//           <Row address = "400502" content = "b4 a4 05 40 00" command = "mov" parameters = "$0x4005a4, %edi"></Row>
//          </p>
//       )
//     }
//     else if (val === 'For Loop'){
//       setSourceCode(
//         <p>
//           int incrementAdd(int a)
//           <br/>&#x0007B;
//           <br/>&emsp;&emsp;int sum = 0;
//           <br/>&emsp;&emsp;for (int i = 0; i &#60; a&#44; i++) &#x0007B;
//           <br/>&emsp;&emsp;&emsp;&emsp;sum += i;
//           <br/>&emsp;&emsp;&#x0007D;
//           <br/>&emsp;&emsp;return sum;
//           <br/>&#x0007D;
//         </p>
//       )
//       setAssemblyCode(
//         <p>
//           0000000000400502 &lt;incrementAdd&gt;:
//           <Row address = "400502" content = "b4 a4 05 40 00" command = "mov" parameters = "$0x4005a4, %edi"></Row>
//           <Row address = "400502" content = "b4 a4 05 40 00" command = "mov" parameters = "$0x4005a4, %edi"></Row>
//           <Row address = "400502" content = "b4 a4 05 40 00" command = "mov" parameters = "$0x4005a4, %edi"></Row>
//           <Row address = "400502" content = "b4 a4 05 40 00" command = "mov" parameters = "$0x4005a4, %edi"></Row>
//           <Row address = "400502" content = "b4 a4 05 40 00" command = "mov" parameters = "$0x4005a4, %edi"></Row>
//           <Row address = "400502" content = "b4 a4 05 40 00" command = "mov" parameters = "$0x4005a4, %edi"></Row>
//          </p>
//       )
//     }
//     else if (val === 'If-Else'){
//       setSourceCode(
//         <p>
//           int getMax(int a, int b)
//           <br/>&#x0007B;
//           <br/>&emsp;&emsp;if (b &#62; a)
//           <br/>&emsp;&emsp;&emsp;&emsp;return b;
//           <br/>&emsp;&emsp;else
//           <br/>&emsp;&emsp;&emsp;&emsp;return a;
//           <br/>&#x0007D;
//         </p>
//       )
//       setAssemblyCode(
//         <p>
//           0000000000400502 &lt;getMax&gt;:
//           <Row address = "400502" content = "b4 a4 05 40 00" command = "mov" parameters = "$0x4005a4, %edi"></Row>
//           <Row address = "400502" content = "b4 a4 05 40 00" command = "mov" parameters = "$0x4005a4, %edi"></Row>
//           <Row address = "400502" content = "b4 a4 05 40 00" command = "mov" parameters = "$0x4005a4, %edi"></Row>
//           <Row address = "400502" content = "b4 a4 05 40 00" command = "mov" parameters = "$0x4005a4, %edi"></Row>
//           <Row address = "400502" content = "b4 a4 05 40 00" command = "mov" parameters = "$0x4005a4, %edi"></Row>
//           <Row address = "400502" content = "b4 a4 05 40 00" command = "mov" parameters = "$0x4005a4, %edi"></Row>
//          </p>
//       )
//     }
//     else if (val === 'Switch Statement'){
//       setSourceCode(
//         <p>
//           int switchTable(int n)
//           <br/>&#x0007B;
//           <br/>&emsp;&emsp;int sum = 3;
//           <br/>&emsp;&emsp;switch (n) &#x0007B;
//             <br/>&emsp;&emsp;&emsp;&emsp;case 1:
//             <br/>&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;sum += n;
//             <br/>&emsp;&emsp;&emsp;&emsp;case 2:
//             <br/>&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;sum -= 2;
//             <br/>&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;break;
//             <br/>&emsp;&emsp;&emsp;&emsp;case 3:
//             <br/>&emsp;&emsp;&emsp;&emsp;case 4:
//             <br/>&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;sum = 34 + n;
//             <br/>&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;break;
//             <br/>&emsp;&emsp;&emsp;&emsp;default:
//             <br/>&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;sum = 0;
//             <br/>&emsp;&emsp;&#x0007D;
//             <br/>&emsp;&emsp;return sum;
//           <br/>&#x0007D;
//         </p>
//       )
//       setAssemblyCode(
//         <p>
//           0000000000400502 &lt;switchTable&gt;:
//           <Row address = "400502" content = "b4 a4 05 40 00" command = "mov" parameters = "$0x4005a4, %edi"></Row>
//           <Row address = "400502" content = "b4 a4 05 40 00" command = "mov" parameters = "$0x4005a4, %edi"></Row>
//           <Row address = "400502" content = "b4 a4 05 40 00" command = "mov" parameters = "$0x4005a4, %edi"></Row>
//           <Row address = "400502" content = "b4 a4 05 40 00" command = "mov" parameters = "$0x4005a4, %edi"></Row>
//           <Row address = "400502" content = "b4 a4 05 40 00" command = "mov" parameters = "$0x4005a4, %edi"></Row>
//           <Row address = "400502" content = "b4 a4 05 40 00" command = "mov" parameters = "$0x4005a4, %edi"></Row>
//          </p>
//       )
//     }
//     else if (val === 'Recursion'){
//       setSourceCode(
//         <p>
//           int incrementAdd(int a)
//           <br/>&#x0007B;
//           <br/>&emsp;&emsp;if (n == 1)
//           <br/>&emsp;&emsp;&emsp;&emsp;return 1;
//           <br/>
//           <br/>&emsp;&emsp;return n * factorial(n-1);
//           <br/>&#x0007D;
//         </p>
//       )
//       setAssemblyCode(
//         <p>
//           0000000000400502 &lt;incrementAdd&gt;:
//           <Row address = "400502" content = "b4 a4 05 40 00" command = "mov" parameters = "$0x4005a4, %edi"></Row>
//           <Row address = "400502" content = "b4 a4 05 40 00" command = "mov" parameters = "$0x4005a4, %edi"></Row>
//           <Row address = "400502" content = "b4 a4 05 40 00" command = "mov" parameters = "$0x4005a4, %edi"></Row>
//           <Row address = "400502" content = "b4 a4 05 40 00" command = "mov" parameters = "$0x4005a4, %edi"></Row>
//           <Row address = "400502" content = "b4 a4 05 40 00" command = "mov" parameters = "$0x4005a4, %edi"></Row>
//           <Row address = "400502" content = "b4 a4 05 40 00" command = "mov" parameters = "$0x4005a4, %edi"></Row>
//          </p>
//       )
//     }
//   }

//   render() {
//     return (
//     <select className = "program" onChange={this.handleSubmit}>
//       {/* <option value="" selected disabled hidden>&nbsp;&nbsp;&nbsp;Select Program</option>
//       <option value="Sum">&nbsp;&nbsp;&nbsp;Sum</option>
//       <option value="If-Else">&nbsp;&nbsp;&nbsp;If-Else</option>
//       <option value="Switch Statement">&nbsp;&nbsp;&nbsp;Switch Statement</option>
//       <option value="For Loop">&nbsp;&nbsp;&nbsp;For Loop</option>
//       <option value="Recursion">&nbsp;&nbsp;&nbsp;Recursion</option> */}
//       {this.state.options}
//     </select>
//     );
//   }
//   }

// class Nav extends React.Component{
//   constructor(props){
//      super(props);
//      this.state = {show: false}
//      this.open = this.open.bind(this)
//      this.close = this.open.bind(this)
//    }

//    open(){
//     this.setState({show: true});
//    }
//    close(){
//     this.setState({show: false});
//    }

//    render(){
//      if(this.state.show){
//        return(
//          <div className = "navContainer grid-container">
//           <div className = "menu" onClick = {console.log("clicking menu")}>
//             <ul>
//               <li>Description</li>
//               <li>
//                 <ul>
//                   <li>Welcome</li>
//                   <li>Intro</li>
//                   <li>An Analogy</li>
//                   <li>Make Some Orders: Normal</li>
//                   <li>Make Some Orders: Overflow</li>
//                 </ul>
//               </li>
//               <li>Simulation: Normal</li>
//               <li>Simulation: Overflow</li>
//             </ul>
//           </div>
//           <div className = "menuBG" onClick = {console.log("clicking black")}></div>
//          </div>
//        );
//      }
//      else{
//        return(<img className = "nav" alt = "hamburger" src = {hamburger} onClick={this.open}></img>);
//      }

//    }
//  }
