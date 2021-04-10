import React, {useState, useEffect, useReducer} from 'react';
import {getRegister, interpretCommand, getFlag, setRegister} from '../helperFunctions/VMHelper';
import Debug from './Debug';

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

  return (
    <div className="page-view">
      <div>
        <form id="insertCode" onSubmit={(e) => runCommand(e, 'mov $1, %eax')}>
          <input type="text" placeholder="Enter Assembly Code" id="codeInput"/>
          <button type="submit">Submit</button>
        </form>
      </div>

      <Debug clearMemory={clearMemory} runCommand={runCommand} currInstr={registerDict['%eip']}/>

      <h3>Basic format for commands: cmd arg1, arg2</h3>
      <h3>For example: mov %eax, %esp </h3>
      <h3> Available commands</h3>
      <ul>
        <li>mov SRC, DEST</li>
        <li>lea SRC, DEST</li>
        <li>cmp S1, S2</li>
        <li>add SRC, DEST</li>
        <li>sub SRC, DEST</li>
      </ul>
      <h3>Note: The registers are 32 bits and BIG endian.
      </h3>
      <h3>Stack</h3>
      <ul>
        <li>{varStack}</li>
      </ul>
      <h3>Register Values:</h3>
      <h4>Pointer registers</h4>
      <ul>
        <li>ebp (base pointer): {registerDict['%ebp']}</li>
        <li>esp (stack pointer): {registerDict['%esp']}</li>
        <li>eip (instruction pointer): {registerDict['%eip']}</li>
      </ul>
      <h4> Return Register </h4>
      <ul>
        <li>eax (result register): {registerDict['%eax']}</li>
      </ul>
      <h4>Argument Registers (in order)</h4>
      <ul>
        <li>edi: {registerDict['%edi']}</li>
        <li>esi: {registerDict['%esi']}</li>
        <li>edx: {registerDict['%edx']}</li>
        <li>ecx: {registerDict['%ecx']}</li>
        <li>r8D: {registerDict['%r8D']}</li>
        <li>r9D: {registerDict['%r9D']}</li>
      </ul>
      <h4> General Purposes</h4>
      <ul>
        <li>r10D: {registerDict['%r10D']}</li>
        <li>r11D: {registerDict['%r11D']}</li>
        <li>r12D: {registerDict['%r12D']}</li>
        <li>r13D: {registerDict['%r13D']}</li>
      </ul>
      <h4> Flags</h4>
      <ul>
        <li>CF: {registerDict['CF']}</li>
        <li>PF: {registerDict['PF']}</li>
        <li>ZF: {registerDict['ZF']}</li>
        <li>SF: {registerDict['SF']}</li>
        <li>OF: {registerDict['OF']}</li>
        <li>AF: {registerDict['AF']}</li>
      </ul>
    </div>
  );
};

export default VMInstance;
