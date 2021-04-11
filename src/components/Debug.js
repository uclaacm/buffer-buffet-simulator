import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';

const Debug = ({runCommand, clearMemory, currInstr, instrList}) => {
  Debug.propTypes = {
    runCommand: PropTypes.func,
    clearMemory: PropTypes.func,
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
    const instrID = e.target.getAttribute('instrid');
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

    console.log('Stepping CurrInstr ', currInstr);

    // check if the program is runnable
    await runCommand(e, instrList[currInstr]);
  };

  const clearProgram = async (e) => {
    e.preventDefault();

    console.log('Clearing');
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

  const instrDisplay =
    instrList.map((instr, i) => {
      return <li key={i}> <button instrid={i} onClick={toggleBreakPt}> {i} </button> {instr}</li>;
    });

  return (
    <div className='debugger'>
      <div className='debugger-program'>
        {instrDisplay}
      </div>
      <h4>{breakPts}</h4>
      <h4>next instr:</h4>
      <div className='debugger-toolbar'>
        <button onClick={clearProgram}> Clear </button>
        <button onClick={stepProgram}> Step </button>
        <button onClick={runProgram}>Run</button>
      </div>
    </div>


  );
};

export default Debug;
