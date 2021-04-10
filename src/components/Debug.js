import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';

const Debug = ({runCommand, clearMemory, currInstr}) => {
  const code1 = [
    'mov $1, %eax',
    'mov $2, %edi',
    'add %edi, %eax',
  ];

  Debug.propTypes = {
    runCommand: PropTypes.func,
    clearMemory: PropTypes.func,
    currInstr: PropTypes.number,
  };

  // status of each instruction
  const [breakPts, setBreakPts] = useState(new Array(code1.length).fill(false));
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
    await runCommand(e, 'mov $1, %eax');
  };

  const clearProgram = async (e) => {
    e.preventDefault();

    console.log('Clearing');
    setIsClear(true);
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
      await runCommand(e, 'mov $1, %eax');
    }
  }, [currInstr]);

  // display the instructions and breakpoint toggles
  const instrList =
        code1.map((instr, i) => {
          return <li key={i}> <button instrid={i} onClick={toggleBreakPt}> {i} </button> {instr}</li>;
        },
        );

  return (
    <div className='debugger'>
      <div className='debugger-program'>
        {instrList}
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
