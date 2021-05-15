import React from 'react';
import PropTypes from 'prop-types';
import './AsmCode.css';
const InstrRow = ({currInstr, instrID, command, toggleBreakPt, comment, isToggled}) => {
  InstrRow.propTypes = {
    currInstr: PropTypes.number,
    instrID: PropTypes.number,
    command: PropTypes.string,
    toggleBreakPt: PropTypes.func,
    comment: PropTypes.string,
    isToggled: PropTypes.bool,
  };

  const emit= (e) => {
    e.preventDefault();
    toggleBreakPt(e);
  };

  return (
    <div className={currInstr == instrID ? 'debug-asm-instr-inverse' : 'debug-asm-instr'}>
      <div className={isToggled ? 'debug-asm-breakpts-inactive' : 'debug-asm-breakpts-active'}
        instrid={instrID} onClick={emit}></div>
      <div>{instrID}</div>
      <div>{command}</div>
      <div className="debug-asm-comment">{comment}</div>
    </div>
  );
};

const AsmCode = ({currInstr, instrList, toggleBreakPt, breakPts}) => {
  AsmCode.propTypes = {
    currInstr: PropTypes.number,
    instrList: PropTypes.arrayOf(PropTypes.object),
    toggleBreakPt: PropTypes.func,
    breakPts: PropTypes.arrayOf(PropTypes.bool),
  };

  const instrDisplay =
        instrList.map((instr, i) => {
          return <InstrRow currInstr = {currInstr} key={i} instrID={i}
            toggleBreakPt={toggleBreakPt} command={instr.command}
            comment={instr.comment} isToggled={breakPts[i]} />;
        });

  return (
    <div className="debug-asm-panel">
      <div className="debug-asm-header">
        Assembly
      </div>
      <div className='debug-asm-body'>
        {instrDisplay}
      </div>
    </div>

  );
};

export default AsmCode;
