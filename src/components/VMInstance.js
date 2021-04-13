import React, {useState, useEffect, useReducer} from 'react';
import {getRegister, interpretCommand, getFlag, setRegister} from '../helperFunctions/VMHelper';

import Debug from './Debug';
import MemoryDisplay from './MemoryDisplay';
import Modal from './Modal';
import {sampleCode1} from '../examplePrograms/samplePrograms';

// import Debug from './Debug';
// import info from '../assets/info.svg';
// import add from '../examplePrograms/add.json';
// import forLoop from '../examplePrograms/forLoop.json';
// import ifElse from '../examplePrograms/ifElse.json';
// import switchStatement from '../examplePrograms/switchStatement.json';
// import recursion from '../examplePrograms/recursion.json';
// import bufferOverflow from '../examplePrograms/bufferOverflow.json';

const VMInstance = () => {
  // specify the initial memory array buffer (size in bytes)
  const STACK_SIZE = 256;
  const currMemory = new ArrayBuffer(STACK_SIZE);
  let memoryDV = new DataView(currMemory);

  // toggle the model
  const [showModal, setModal] = useState(false);
  const [codeName, setCodeName] = useState('sum');

  // used for debugger
  const instrList = sampleCode1.asm;
  const [instrLength] = useState(instrList.length);
  const [paramInput, changeParams] = useState('');

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
      });

  // used to update all register
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
      case 'setup':
        const setupMemory = memory.slice();
        memoryDV = new DataView(setupMemory);
        interpretCommand(action.payload, memoryDV, varStack);
        return setupMemory;
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
    run the setup code for the current selected project
  */
  const setupSample = () => {
    sampleCode1.setup.map((codeInput) => {
      const codePayload = {
        type: 'setup',
        payload: codeInput,
      };
      changeMemory(codePayload);
    });
  };

  useEffect( () => {
    setupSample();
  }, []);
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
    document.getElementById('paramInput').disabled = false;
  };

  return (
    <div className="page-view">
      {showModal && <Modal setModal={setModal}/>}
      <h2> Current Program : {codeName}</h2>
      <Debug clearMemory={clearMemory} runCommand={runCommand}
        currInstr={registerDict['%eip']} instrList={instrList}
        setCodeName={setCodeName} codeName={codeName}
        paramInput={paramInput} changeParams={changeParams}
        changeMemory={changeMemory}/>
      <MemoryDisplay registerDict={registerDict}/>
    </div>
  );
};


export default VMInstance;
