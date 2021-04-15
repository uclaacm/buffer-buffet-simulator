import React, {useState, useEffect, useReducer} from 'react';
import {getRegister, interpretCommand, getFlag, setRegister} from '../helperFunctions/VMHelper';

import Debug from './Debug';
import TopBar from './TopBar';
import MemoryDisplay from './MemoryDisplay';
import {ProgramList} from '../examplePrograms/ProgramList';

const VMInstance = () => {
  // specify the initial memory array buffer (size in bytes)
  const STACK_SIZE = 256;
  const currMemory = new ArrayBuffer(STACK_SIZE);
  let memoryDV = new DataView(currMemory);

  // toggle the model
  // const [showModal, setModal] = useState(false);
  const [codeName, setCodeName] = useState('sum');
  const [isRunable, setRunable] = useState(true);
  const [userInput, changeInput] = useState('');
  const [canInput, allowInput] = useState(false);

  useEffect( () => {
    const codePayload = {
      type: 'clear',
    };
    changeMemory(codePayload);
    setStack([]);
    setupSample();
  }, [codeName]);
  // used for debugger
  const currentProgram = ProgramList[codeName];
  const asmList= currentProgram.asm;
  const asmLength = asmList.length;

  // initialize register/flag states and the stack
  const [varStack, setStack] = useState([]);
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
          if (varStack.length > 0) {
            const returnAddress = memoryDV.getUint32(96);
            console.log('ad ' + returnAddress);
            if (returnAddress !== 5 && returnAddress !== 10) {
              alert('segfault');
              setRunable(false);
            }
            setRegister('%eip', returnAddress, memoryDV);
            if (returnAddress === 5) {
              varStack.pop();
            }
          } else {
            setRunable(false);
          }
          return newMemory;
        }

        // check for gets call
        if (action.payload === 'call <gets>') {
          allowInput(true);
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
        memoryDV.setInt32(action.payload.address, action.payload.char);
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
    console.log(varStack);
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
    changeInput('');
    changeMemory(codePayload);
    setupSample();
    if (codeName === 'buffer1' || codeName === 'buffer2') {
      allowInput(false);
    } else {
      allowInput(true);
    }
  };
  return (
    <div className="page-view">
      <div className="page-programs">
        <TopBar></TopBar>
        <Debug clearMemory={clearMemory} runCommand={runCommand}
          currInstr={registerDict['%eip']} instrList={asmList}
          setCodeName={setCodeName} codeName={codeName}
          userInput={userInput} changeInput={changeInput}
          changeMemory={changeMemory} canInput={canInput}
          allowInput={allowInput}/>
      </div>

      <MemoryDisplay registerDict={registerDict}/>
    </div>
  );
};


export default VMInstance;
