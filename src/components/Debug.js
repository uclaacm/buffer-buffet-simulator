import React, {useState, useEffect} from 'react';
import {checkInput, parseBufferInput} from '../helperFunctions/VMHelper';
import PropTypes from 'prop-types';
import CCode from './CCode';
import AsmCode from './AsmCode';
import Toolbar from './Toolbar';
import './Debug.css';
const Debug = ({runCommand, clearMemory, currInstr, instrList,
  setCodeName, codeName, userInput, changeInput, changeMemory, canInput, allowInput}) => {
  Debug.propTypes = {
    runCommand: PropTypes.func,
    clearMemory: PropTypes.func,
    setCodeName: PropTypes.func,
    codeName: PropTypes.string,
    currInstr: PropTypes.number,
    instrList: PropTypes.arrayOf(PropTypes.object),
    userInput: PropTypes.string,
    changeInput: PropTypes.func,
    changeMemory: PropTypes.func,
    canInput: PropTypes.bool,
    allowInput: PropTypes.func,
  };

  // status of each instruction
  // display the instructions and breakpoint toggles
  const [breakPts, setBreakPts] = useState(new Array(instrList.length).fill(false));
  const [isClear, setIsClear] = useState(false);
  const [isRun, setIsRun] = useState(false);

  useEffect(() => {
    const tempArray = new Array(instrList.length).fill(false);
    tempArray.fill(false);
    setBreakPts(tempArray);
  }, [codeName]);

  /**
  * Handles toggling of the breakpoints
  * @param {event} e of the click
  */
  const toggleBreakPt = (e) => {
    let instrID;
    if (typeof e === 'object') {
      e.preventDefault();
      instrID = parseInt(e.target.getAttribute('instrid'));
    }

    const tempBreakPts = [...breakPts];
    tempBreakPts[instrID] = !breakPts[instrID];
    setBreakPts(tempBreakPts);
    console.log(tempBreakPts);
  };

  const getInput = async () => {
    const params = checkInput(userInput, codeName);
    if (params === false) {
      alert('Invalid Params');
    } else if (params === 'reset') {
      clearMemory();
    } else {
      const codePayload = {
        type: 'setup',
        payload: `mov ${params[0]}, %edi`,
      };
      await changeMemory(codePayload);
      if (params.length == 2) {
        codePayload.payload = `mov ${params[1]}, %esi`;
      }
      await changeMemory(codePayload);
    }
    return;
  };

  // loads each character's ascii number into memory
  const getStringBytes = (e) => {
    let startAddress;
    if (codeName === 'buffer1') {
      startAddress = 60;
    } else {
      startAddress = 76;
    }
    const parsedInput = parseBufferInput(userInput);
    if (parsedInput === false) {
      alert('Invalid Params');
      return;
    }
    for (let i = 0; i < parsedInput.length; i++) {
      const codePayload = {
        type: 'gets',
        payload: {
          address: startAddress + (i*4),
          char: parseInt(parsedInput[i], 16),
        },
      };
      changeMemory(codePayload);
    }
    runProgram(e);
  };

  const runProgram = async (e) => {
    if (e) {
      e.preventDefault();
    }
    allowInput(false);
    setIsRun(true);
    await stepProgram(e);
  };

  const stepProgram = async (e) => {
    e.preventDefault();
    if (currInstr < 0 || currInstr >= instrList.length) {
      return;
    }
    allowInput(false);
    await runCommand(e, instrList[currInstr].command);
  };

  const clearProgram = (e) => {
    e.preventDefault();
    setIsClear(true);
    setIsRun(false);
    clearMemory(e);
  };

  useEffect( async (e) => {
    if (isClear) {
      setIsClear(false);
      return;
    } else if (!isRun || breakPts[currInstr]) {
      setIsRun(false);
      return;
    } else {
      await runCommand(e, instrList[currInstr].command);
    }
  }, [currInstr]);

  return (
    <div className='debug-container'>
      <div className='debug-code'>
        <CCode setCodeName={setCodeName} codeName={codeName}/>
        <AsmCode currInstr={currInstr} breakPts={breakPts} toggleBreakPt={toggleBreakPt} instrList={instrList}/>
      </div>
      <Toolbar clearProgram={clearProgram} stepProgram={stepProgram}
        runProgram={runProgram} userInput={userInput}
        changeInput={changeInput} codeName={codeName}
        getInput={getInput} getStringBytes={getStringBytes}
        canInput={canInput} allowInput={allowInput}
      />
    </div>
  );
};

export default Debug;
