import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import CCode from './CCode';
import AsmCode from './AsmCode';
import Toolbar from './Toolbar';
import './Debug.css';

const Debug = ({runCommand, clearMemory, currInstr, instrList, setCodeName}) => {
  Debug.propTypes = {
    runCommand: PropTypes.func,
    clearMemory: PropTypes.func,
    setCodeName: PropTypes.func,
    currInstr: PropTypes.number,
    instrList: PropTypes.arrayOf(PropTypes.string),
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

  const runProgram = async (e) => {
    e.preventDefault();
    setIsRun(true);
    stepProgram(e);
  };

  const stepProgram = async (e) => {
    e.preventDefault();
    await runCommand(e, instrList[currInstr]);
  };

  const clearProgram = async (e) => {
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
      <div className='debug-code'>
        <CCode setCodeName={setCodeName}/>
        <AsmCode toggleBreakPt={toggleBreakPt} instrList={instrList}/>
      </div>
      <Toolbar clearProgram={clearProgram} stepProgram={stepProgram} runProgram={runProgram}/>
    </div>


  );
};

export default Debug;
