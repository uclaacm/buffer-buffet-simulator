import React, {useState} from 'react';
import PropTypes from 'prop-types';
import './AsmCode.css';
const InstrRow = ({instrID, command, toggleBreakPt}) => {
  InstrRow.propTypes = {
    instrID: PropTypes.number,
    command: PropTypes.string,
    toggleBreakPt: PropTypes.func,
  };

  const [isToggeled, togglePt] = useState(false);

  const emit= (e) => {
    togglePt(!isToggeled);
    toggleBreakPt(e);
  };

  return (
    <div className='debug-asm-row'>
      <label>
        {/* <input type='checkbox' instrID={instrID} onChange={toggleBreakPt}></input> */}
        <span className={isToggeled ? 'debug-asm-breakpts-inactive' : 'debug-asm-breakpts-active'}
          instrid={instrID} onClick={emit}></span>
      </label>

      <div className='debug-asm-addr'>
        {instrID}
      </div>

      <div className='debug-asm-instr'>
        {command}
      </div>
    </div>
  );
};

const AsmCode = ({instrList, toggleBreakPt}) => {
  AsmCode.propTypes = {
    instrList: PropTypes.arrayOf(PropTypes.object),
    toggleBreakPt: PropTypes.func,
  };

  const instrDisplay =
        instrList.map((instr, i) => {
          return <InstrRow key={i} instrID={i} toggleBreakPt={toggleBreakPt} command={instr.command}/>;
        });

  return (
    <div className="debug-asm-panel">
      <h2>ASM-Program</h2>
      <div className='debug-asm-body'>
        {instrDisplay}
      </div>
    </div>

  );
};

export default AsmCode;
