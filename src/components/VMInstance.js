/*eslint-disable*/
import React, {useState, useEffect, useReducer} from 'react';
import {getRegister, interpretCommand, getFlag, setRegister} from '../helperFunctions/VMHelper';

import TopBar from './TopBar';
import Debug from './Debug';
import MemoryDisplay from './MemoryDisplay';
<<<<<<< HEAD
import {sampleCode1} from '../examplePrograms/samplePrograms';

// import Debug from './Debug';
// import info from '../assets/info.svg';
// import add from '../examplePrograms/add.json';
// import forLoop from '../examplePrograms/forLoop.json';
// import ifElse from '../examplePrograms/ifElse.json';
// import switchStatement from '../examplePrograms/switchStatement.json';
// import recursion from '../examplePrograms/recursion.json';
// import bufferOverflow from '../examplePrograms/bufferOverflow.json';
=======
import Modal from './Modal';
import {ProgramList} from '../examplePrograms/ProgramList';
>>>>>>> stackDev

const VMInstance = () => {
  // specify the initial memory array buffer (size in bytes)
  const STACK_SIZE = 256;
  const currMemory = new ArrayBuffer(STACK_SIZE);
  let memoryDV = new DataView(currMemory);

  // toggle the model
  const [codeName, setCodeName] = useState('sum');
  const [isRunable, setRunable] = useState(true);

  useEffect( () => {
    const codePayload = {
      type: 'clear',
    };
    changeMemory(codePayload);
    setupSample();
  }, [codeName]);
  // used for debugger
  const currentProgram = ProgramList[codeName];
  const asmList= currentProgram.asm;
  const asmLength = asmList.length;
  const [userInput, changeInput] = useState('');

  // initialize register/flag states and the stack
  const [varStack] = useState([]);
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

        '0x3C': memoryDV.getUint32(60),
        '0x40': memoryDV.getUint32(64),
        '0x44': memoryDV.getUint32(68),
        '0x48': memoryDV.getUint32(72),
        '0x4C': memoryDV.getUint32(76),

        '0x50': memoryDV.getUint32(80),
        '0x54': memoryDV.getUint32(84),
        '0x58': memoryDV.getUint32(88),
        '0x5C': memoryDV.getUint32(92),
        '0x60': memoryDV.getUint32(96),
      });

  // used to update all register
  const reducer = (memory, action) => {
    switch (action.type) {
      case 'clear':
        const clearMemory = new ArrayBuffer(STACK_SIZE);
        memoryDV = new DataView(clearMemory);
        setRunable(true);
        return clearMemory;
      case 'run':
        const newMemory = memory.slice();
        memoryDV = new DataView(newMemory);
        console.log(action.payload);
        // check if the function can be run at the moment
        if (!isRunable) {
          return newMemory;
        }

        // check if function is returning
        if (action.payload === 'ret') {
          setRunable(false);
          return newMemory;
        }

        // Increment the instruction pointer
        const currentEip = parseInt(getRegister('%eip', memoryDV));

        if (currentEip < 0 || currentEip >= asmLength) {
          return newMemory;
        }
        setRegister('%eip', currentEip + 1, memoryDV);
        interpretCommand(action.payload, memoryDV, varStack);
        return newMemory;
      case 'setup':
        const setupMemory = memory.slice();
        memoryDV = new DataView(setupMemory);
        interpretCommand(action.payload, memoryDV, varStack);
        return setupMemory;
      case 'gets':
        const getsMemory = memory.slice();
        memoryDV = new DataView(getsMemory);
        memoryDV.setInt32(action.payload.address, action.payload.ascii);
        return getsMemory;
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
      '0x3C': tempMemoryDV.getUint32(60),
      '0x40': tempMemoryDV.getUint32(64),
      '0x44': tempMemoryDV.getUint32(68),
      '0x48': tempMemoryDV.getUint32(72),
      '0x4C': tempMemoryDV.getUint32(76),

      '0x50': tempMemoryDV.getUint32(80),
      '0x54': tempMemoryDV.getUint32(84),
      '0x58': tempMemoryDV.getUint32(88),
      '0x5C': tempMemoryDV.getUint32(92),
      '0x60': tempMemoryDV.getUint32(96),
    });
  }, [memory]);

  /**
    run the setup code for the current selected project
  */
  const setupSample = () => {
    currentProgram.setup.map((codeInput) => {
      const codePayload = {
        type: 'setup',
        payload: codeInput,
      };
      changeMemory(codePayload);
    });
  };

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
    if (e) {
      e.preventDefault();
    }
    const codePayload = {
      type: 'clear',
    };
    changeMemory(codePayload);
    setupSample();
    document.getElementById('userInput').disabled = false;
  };

<<<<<<< HEAD
  // const [sourceCode, setSourceCode] = useState(
  //     <p>
  //       int addNum(int a, int b)
  //       <br/>&#x0007B;
  //       <br/>&emsp;&emsp;int sum = a + b;
  //       <br/>&emsp;&emsp;return sum;
  //       <br/>&#x0007D;
  //     </p>,
  // );

  // default state is
  // const [assemblyCode, setAssemblyCode] = useState(
  //     <p>
  //       0000000000400502 &lt;incrementAdd&gt;:
  //       {
  //         add.program.map((line) => {
  //           const command = line.assembly.split(/(?<=^.*) /)[0];
  //           const param = line.assembly.split(/(?<=^[^,]*) /)[1];
  //           return (
  //             <Row
  //               address={line.address}
  //               content={line.hex}
  //               command={command}
  //               parameters={param}
  //               key={line.address}>
  //             </Row>
  //           );
  //         })
  //       }
  //     </p>,
  // );

  // /**
  // * handles change of programs
  // * @param {event} event onClick
  // */
  // function handleSubmit(event) {
  //   const val = event.target.value;
  //   let example;
  //   // event.preventDefault();
  //   if (val === 'Sum') {
  //     setSourceCode(
  //         <p>
  //           int addNum(int a, int b)
  //           <br/>&#x0007B;
  //           <br/>&emsp;&emsp;int sum = a + b;
  //           <br/>&emsp;&emsp;return sum;
  //           <br/>&#x0007D;
  //         </p>,
  //     );
  //     example = add;
  //   } else if (val === 'For Loop') {
  //     setSourceCode(
  //         <p>
  //           int incrementAdd(int a)
  //           <br/>&#x0007B;
  //           <br/>&emsp;&emsp;int sum = 0;
  //           <br/>&emsp;&emsp;for (int i = 0; i &#60; a&#44; i++) &#x0007B;
  //           <br/>&emsp;&emsp;&emsp;&emsp;sum += i;
  //           <br/>&emsp;&emsp;&#x0007D;
  //           <br/>&emsp;&emsp;return sum;
  //           <br/>&#x0007D;
  //         </p>,
  //     );
  //     example = forLoop;
  //   } else if (val === 'If-Else') {
  //     setSourceCode(
  //         <p>
  //           int getMax(int a, int b)
  //           <br/>&#x0007B;
  //           <br/>&emsp;&emsp;if (b &#62; a)
  //           <br/>&emsp;&emsp;&emsp;&emsp;return b;
  //           <br/>&emsp;&emsp;else
  //           <br/>&emsp;&emsp;&emsp;&emsp;return a;
  //           <br/>&#x0007D;
  //         </p>,
  //     );
  //     example = ifElse;
  //   } else if (val === 'Switch Statement') {
  //     setSourceCode(
  //         <p>
  //           int switchTable(int n)
  //           <br/>&#x0007B;
  //           <br/>&emsp;&emsp;int sum = 3;
  //           <br/>&emsp;&emsp;switch (n) &#x0007B;
  //           <br/>&emsp;&emsp;&emsp;&emsp;case 1:
  //           <br/>&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;sum += n;
  //           <br/>&emsp;&emsp;&emsp;&emsp;case 2:
  //           <br/>&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;sum -= 2;
  //           <br/>&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;break;
  //           <br/>&emsp;&emsp;&emsp;&emsp;case 3:
  //           <br/>&emsp;&emsp;&emsp;&emsp;case 4:
  //           <br/>&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;sum = 34 + n;
  //           <br/>&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;break;
  //           <br/>&emsp;&emsp;&emsp;&emsp;default:
  //           <br/>&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;sum = 0;
  //           <br/>&emsp;&emsp;&#x0007D;
  //           <br/>&emsp;&emsp;return sum;
  //           <br/>&#x0007D;
  //         </p>,
  //     );
  //     example = switchStatement;
  //   } else if (val === 'Recursion') {
  //     setSourceCode(
  //         <p>
  //           int incrementAdd(int a)
  //           <br/>&#x0007B;
  //           <br/>&emsp;&emsp;if (n == 1)
  //           <br/>&emsp;&emsp;&emsp;&emsp;return 1;
  //           <br/>
  //           <br/>&emsp;&emsp;return n * factorial(n-1);
  //           <br/>&#x0007D;
  //         </p>,
  //     );
  //     example = recursion;
  //   }
  //   setAssemblyCode(
  //       <p>
  //         0000000000400502 &lt;incrementAdd&gt;:
  //         {
  //           example.program.map((line) => {
  //             const command = line.assembly.split(/(?<=^.*) /)[0];
  //             const param = line.assembly.split(/(?<=^[^,]*) /)[1];
  //             return (
  //               <Row
  //                 address={line.address}
  //                 content={line.hex}
  //                 command={command}
  //                 parameters={param}
  //                 key={line.address}>
  //               </Row>
  //             );
  //           })
  //         }
  //       </p>,
  //   );
  // }
  console.log(codeName);
  return (
    <div className="page-view">
      <div className="page-programs">
        <TopBar></TopBar>
        {/* {showModal && <Modal setModal={setModal}/>} */}
        <Debug clearMemory={clearMemory} runCommand={runCommand}
          currInstr={registerDict['%eip']} instrList={instrList}
          setCodeName={setCodeName}/>
      </div>
=======
  return (
    <div className="page-view">
      {showModal && <Modal setModal={setModal}/>}
      <h2> Current Program : {codeName}</h2>
      <Debug clearMemory={clearMemory} runCommand={runCommand}
        currInstr={registerDict['%eip']} instrList={asmList}
        setCodeName={setCodeName} codeName={codeName}
        userInput={userInput} changeInput={changeInput}
        changeMemory={changeMemory}/>
>>>>>>> stackDev
      <MemoryDisplay registerDict={registerDict}/>
    </div>
  );
};


export default VMInstance;
