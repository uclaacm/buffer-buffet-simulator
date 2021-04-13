import React, {useState, useEffect} from 'react';
import {checkInput} from '../helperFunctions/VMHelper';
import PropTypes from 'prop-types';
import CCode from './CCode';
import AsmCode from './AsmCode';
import Toolbar from './Toolbar';
const Debug = ({runCommand, clearMemory, currInstr, instrList,
  setCodeName, codeName, paramInput, changeParams, changeMemory}) => {
  Debug.propTypes = {
    runCommand: PropTypes.func,
    clearMemory: PropTypes.func,
    setCodeName: PropTypes.func,
    codeName: PropTypes.string,
    currInstr: PropTypes.number,
    instrList: PropTypes.arrayOf(PropTypes.string),
    paramInput: PropTypes.string,
    changeParams: PropTypes.func,
    changeMemory: PropTypes.func,
  };

  // status of each instruction
  // display the instructions and breakpoint toggles
  const [breakPts, setBreakPts] = useState(new Array(instrList.length).fill(false));
  const [isClear, setIsClear] = useState(false);
  const [isRun, setIsRun] = useState(false);
  /**
  * Handles toggling of the breakpoints
  * @param {event} e of the click
  */
  const toggleBreakPt = (e) => {
    e.preventDefault();
    const instrID = e.target.getAttribute('instrID');
    breakPts[instrID] = !breakPts[instrID];
    setBreakPts(breakPts);
    console.log(breakPts);
  };

  const getInputParam = async () => {
    const params = checkInput(paramInput, codeName);
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

  const runProgram = async (e) => {
    e.preventDefault();
    document.getElementById('paramInput').disabled = true;
    setIsRun(true);
    await stepProgram(e);
  };

  const stepProgram = async (e) => {
    e.preventDefault();
    document.getElementById('paramInput').disabled = true;
    await runCommand(e, instrList[currInstr]);
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
      await runCommand(e, instrList[currInstr]);
    }
  }, [currInstr]);

  return (
    <div className='debug-container'>
      <CCode setCodeName={setCodeName} codeName={codeName}/>
      <AsmCode toggleBreakPt={toggleBreakPt} instrList={instrList}/>
      <Toolbar clearProgram={clearProgram} stepProgram={stepProgram}
        runProgram={runProgram} paramInput={paramInput}
        changeParams={changeParams} codeName={codeName}
        getInputParam={getInputParam}
      />
    </div>


  );
};

export default Debug;
